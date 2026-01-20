import { Request } from "express";

export interface User {
  id: number;
  name: string;
  email: string;
  password_hash: string | null;
  role: "student" | "instructor" | "admin" | string;
  oauth_provider: string | null;
  oauth_id: string | null;
  created_at: string;
}

export interface AuthenticatedRequest extends Request {
  user?: Omit<User, "password_hash">;
}
