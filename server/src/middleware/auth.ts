import { NextFunction, Response } from "express";
import jwt from "jsonwebtoken";
import createHttpError from "http-errors";
import { env } from "../env";
import { AuthenticatedRequest } from "../types";
import { userQueries } from "../db";

interface TokenPayload {
  userId: number;
}

export const authMiddleware = (req: AuthenticatedRequest, _res: Response, next: NextFunction) => {
  try {
    const token = req.cookies?.["edu_platform_token"];
    if (!token) {
      throw createHttpError(401, "Authentication required");
    }

    const decoded = jwt.verify(token, env.jwtSecret) as TokenPayload;
    const user = userQueries.findById(decoded.userId);

    if (!user) {
      throw createHttpError(401, "User not found");
    }

    const { password_hash, ...safeUser } = user;
    req.user = safeUser;
    next();
  } catch (error) {
    next(createHttpError(401, "Authentication failed"));
  }
};
