import { Request } from "express";

export interface User {
  id: number;
  name: string;
  email: string;
  password_hash: string;
  role: "student" | "instructor" | "admin" | string;
  created_at: string;
}

export interface AuthenticatedRequest extends Request {
  user?: Omit<User, "password_hash">;
}
