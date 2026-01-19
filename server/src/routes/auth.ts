import { Router, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import createHttpError from "http-errors";
import { z } from "zod";
import { userQueries } from "../db";
import { env } from "../env";
import { authMiddleware } from "../middleware/auth";
import { AuthenticatedRequest } from "../types";

const router = Router();

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

export default router;
