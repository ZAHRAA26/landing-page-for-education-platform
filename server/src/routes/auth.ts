import express, { Router, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import createHttpError from "http-errors";
import { z } from "zod";
import crypto from "crypto";
import { userQueries } from "../db";
import { env } from "../env";
import { authMiddleware } from "../middleware/auth";
import { AuthenticatedRequest } from "../types";

const router = Router();

// Simple in-memory OAuth state store (use Redis in production)
const oauthStates = new Map<string, { expiresAt: number }>();
const OAUTH_STATE_TTL = 10 * 60 * 1000; // 10 minutes

const cleanupExpiredStates = () => {
  const now = Date.now();
  for (const [state, data] of oauthStates.entries()) {
    if (data.expiresAt < now) {
      oauthStates.delete(state);
    }
  }
};

setInterval(cleanupExpiredStates, 60 * 1000); // Cleanup every minute

const authSchema = z.object({
  name: z.string().min(2, "Name is required").optional(),
  email: z.string().email("Valid email is required"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

const createToken = (userId: number) =>
  jwt.sign({ userId }, env.jwtSecret, { expiresIn: "7d" });

const setAuthCookie = (res: Response, token: string) => {
  res.cookie("edu_platform_token", token, {
    httpOnly: true,
    sameSite: "lax",
    secure: env.nodeEnv === "production",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });
};

router.post("/register", async (req, res, next) => {
  try {
    const parsed = authSchema.parse(req.body);
    const { name, email, password } = parsed;

    if (userQueries.findByEmail(email)) {
      throw createHttpError(409, "Email already registered");
    }

    const passwordHash = await bcrypt.hash(password, 10);
    const user = userQueries.create({
      name: name ?? email.split("@")[0],
      email,
      passwordHash,
      role: "student",
    });

    const token = createToken(user.id);
    setAuthCookie(res, token);

    const { password_hash, ...safeUser } = user;
    res.status(201).json({ user: safeUser });
  } catch (error) {
    next(error);
  }
});

router.post("/login", async (req, res, next) => {
  try {
    const parsed = authSchema.omit({ name: true }).parse(req.body);
    const { email, password } = parsed;

    const existing = userQueries.findByEmail(email);
    if (!existing) {
      throw createHttpError(401, "Invalid credentials");
    }

    // Check if user has a password (not OAuth-only)
    if (!existing.password_hash) {
      throw createHttpError(401, "Please sign in with your OAuth provider");
    }

    const isValid = await bcrypt.compare(password, existing.password_hash);
    if (!isValid) {
      throw createHttpError(401, "Invalid credentials");
    }

    const token = createToken(existing.id);
    setAuthCookie(res, token);

    const { password_hash, ...safeUser } = existing;
    res.json({ user: safeUser });
  } catch (error) {
    next(error);
  }
});

router.post("/logout", (_req, res) => {
  res.clearCookie("edu_platform_token", {
    httpOnly: true,
    sameSite: "lax",
    secure: env.nodeEnv === "production",
  });
  res.status(204).send();
});

router.get("/me", authMiddleware, (req: AuthenticatedRequest, res) => {
  res.json({ user: req.user });
});

// Helper to get backend URL
const getBackendUrl = (req: express.Request): string => {
  const protocol = req.protocol;
  const host = req.get("host");
  return `${protocol}://${host}`;
};

// OAuth initiation routes
router.get("/oauth/google", (req, res) => {
  const state = crypto.randomBytes(32).toString("hex");
  oauthStates.set(state, { expiresAt: Date.now() + OAUTH_STATE_TTL });

  const backendUrl = getBackendUrl(req);
  const redirectUri = `${backendUrl}/api/auth/oauth/callback/google`;
  
  const googleAuthUrl = new URL("https://accounts.google.com/o/oauth2/v2/auth");
  googleAuthUrl.searchParams.set("client_id", env.googleClientId || "demo");
  googleAuthUrl.searchParams.set("redirect_uri", redirectUri);
  googleAuthUrl.searchParams.set("response_type", "code");
  googleAuthUrl.searchParams.set("scope", "openid email profile");
  googleAuthUrl.searchParams.set("state", state);
  googleAuthUrl.searchParams.set("access_type", "online");

  res.redirect(googleAuthUrl.toString());
});

router.get("/oauth/github", (req, res) => {
  const state = crypto.randomBytes(32).toString("hex");
  oauthStates.set(state, { expiresAt: Date.now() + OAUTH_STATE_TTL });

  const backendUrl = getBackendUrl(req);
  const redirectUri = `${backendUrl}/api/auth/oauth/callback/github`;
  
  const githubAuthUrl = new URL("https://github.com/login/oauth/authorize");
  githubAuthUrl.searchParams.set("client_id", env.githubClientId || "demo");
  githubAuthUrl.searchParams.set("redirect_uri", redirectUri);
  githubAuthUrl.searchParams.set("scope", "user:email");
  githubAuthUrl.searchParams.set("state", state);

  res.redirect(githubAuthUrl.toString());
});

// OAuth callback handler
router.get("/oauth/callback/:provider", async (req, res, next) => {
  try {
    const { provider } = req.params;
    const { code, state } = req.query;

    if (!code || !state || typeof code !== "string" || typeof state !== "string") {
      throw createHttpError(400, "Invalid OAuth callback");
    }

    // Verify state
    const stateData = oauthStates.get(state);
    if (!stateData || stateData.expiresAt < Date.now()) {
      throw createHttpError(400, "Invalid or expired OAuth state");
    }
    oauthStates.delete(state);

    let userData: { email: string; name: string; id: string };
    const backendUrl = getBackendUrl(req);
    const redirectUri = `${backendUrl}/api/auth/oauth/callback/${provider}`;

    if (provider === "google") {
      userData = await handleGoogleCallback(code, redirectUri);
    } else if (provider === "github") {
      userData = await handleGitHubCallback(code, redirectUri);
    } else {
      throw createHttpError(400, "Invalid OAuth provider");
    }

    // Find or create user
    let user = userQueries.findByOAuth(provider, userData.id);
    if (!user) {
      // Check if email already exists
      const existingByEmail = userQueries.findByEmail(userData.email);
      if (existingByEmail) {
        // Link OAuth to existing account
        user = existingByEmail;
      } else {
        // Create new user
        user = userQueries.create({
          name: userData.name,
          email: userData.email,
          oauthProvider: provider,
          oauthId: userData.id,
          role: "student",
        });
      }
    }

    const token = createToken(user.id);
    setAuthCookie(res, token);

    // Redirect to frontend with success
    res.redirect(`${env.clientUrl}/auth/oauth/success`);
  } catch (error) {
    next(error);
  }
});

async function handleGoogleCallback(code: string, redirectUri: string): Promise<{ email: string; name: string; id: string }> {
  if (!env.googleClientId || !env.googleClientSecret) {
    // Demo mode - return mock data
    return {
      email: `demo-${Date.now()}@example.com`,
      name: "Demo User",
      id: `demo-${Date.now()}`,
    };
  }

  // Exchange code for token
  const tokenResponse = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      client_id: env.googleClientId,
      client_secret: env.googleClientSecret,
      code,
      grant_type: "authorization_code",
      redirect_uri: redirectUri,
    }),
  });

  if (!tokenResponse.ok) {
    throw createHttpError(401, "Failed to exchange OAuth code");
  }

  const tokens = await tokenResponse.json();
  const accessToken = tokens.access_token;

  // Get user info
  const userResponse = await fetch("https://www.googleapis.com/oauth2/v2/userinfo", {
    headers: { Authorization: `Bearer ${accessToken}` },
  });

  if (!userResponse.ok) {
    throw createHttpError(401, "Failed to fetch user info");
  }

  const googleUser = await userResponse.json();
  return {
    email: googleUser.email,
    name: googleUser.name || googleUser.email.split("@")[0],
    id: googleUser.id,
  };
}

async function handleGitHubCallback(code: string, redirectUri: string): Promise<{ email: string; name: string; id: string }> {
  if (!env.githubClientId || !env.githubClientSecret) {
    // Demo mode - return mock data
    return {
      email: `demo-${Date.now()}@example.com`,
      name: "Demo User",
      id: `demo-${Date.now()}`,
    };
  }

  // Exchange code for token
  const tokenResponse = await fetch("https://github.com/login/oauth/access_token", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      client_id: env.githubClientId,
      client_secret: env.githubClientSecret,
      code,
      redirect_uri: redirectUri,
    }),
  });

  if (!tokenResponse.ok) {
    throw createHttpError(401, "Failed to exchange OAuth code");
  }

  const tokens = await tokenResponse.json();
  const accessToken = tokens.access_token;

  // Get user info
  const userResponse = await fetch("https://api.github.com/user", {
    headers: { Authorization: `Bearer ${accessToken}` },
  });

  if (!userResponse.ok) {
    throw createHttpError(401, "Failed to fetch user info");
  }

  const githubUser = await userResponse.json();

  // Get email (might need separate call)
  let email = githubUser.email;
  if (!email) {
    const emailsResponse = await fetch("https://api.github.com/user/emails", {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    if (emailsResponse.ok) {
      const emails = await emailsResponse.json();
      const primaryEmail = emails.find((e: any) => e.primary) || emails[0];
      email = primaryEmail?.email || `${githubUser.login}@users.noreply.github.com`;
    }
  }

  return {
    email: email || `${githubUser.login}@users.noreply.github.com`,
    name: githubUser.name || githubUser.login,
    id: String(githubUser.id),
  };
}

export default router;
