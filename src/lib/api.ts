import { User } from "@/types/auth";

const API_URL = import.meta.env.VITE_API_URL ?? "http://localhost:4000";

type RequestOptions = RequestInit & { json?: unknown };

async function request<T>(path: string, options: RequestOptions = {}): Promise<T> {
  const { json, headers, ...rest } = options;

  const response = await fetch(`${API_URL}${path}`, {
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      ...(headers || {}),
    },
    body: json ? JSON.stringify(json) : options.body,
    ...rest,
  });

  const data = await response.json().catch(() => null);
  if (!response.ok) {
    const message = data?.message ?? "Something went wrong";
    throw new Error(message);
  }

  return data as T;
}

export const authApi = {
  login: (email: string, password: string) =>
    request<{ user: User }>("/api/auth/login", { method: "POST", json: { email, password } }),
  register: (name: string, email: string, password: string) =>
    request<{ user: User }>("/api/auth/register", { method: "POST", json: { name, email, password } }),
  me: () => request<{ user: User }>("/api/auth/me", { method: "GET" }),
  logout: () => request<void>("/api/auth/logout", { method: "POST" }),
};
