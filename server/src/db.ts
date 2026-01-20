import fs from "fs";
import path from "path";
import Database from "better-sqlite3";
import { User } from "./types";

const dataDir = path.resolve(process.cwd(), "data");
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

const dbFile = path.join(dataDir, "edu-platform.db");
const db = new Database(dbFile);

db.pragma("journal_mode = WAL");

db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    password_hash TEXT,
    role TEXT NOT NULL DEFAULT 'student',
    oauth_provider TEXT,
    oauth_id TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );
  
  CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
  CREATE INDEX IF NOT EXISTS idx_users_oauth ON users(oauth_provider, oauth_id);
`);

export const userQueries = {
  findByEmail: (email: string): User | undefined => {
    const stmt = db.prepare("SELECT * FROM users WHERE email = ?");
    return stmt.get(email) as User | undefined;
  },

  findById: (id: number): User | undefined => {
    const stmt = db.prepare("SELECT * FROM users WHERE id = ?");
    return stmt.get(id) as User | undefined;
  },

  findByOAuth: (provider: string, oauthId: string): User | undefined => {
    const stmt = db.prepare("SELECT * FROM users WHERE oauth_provider = ? AND oauth_id = ?");
    return stmt.get(provider, oauthId) as User | undefined;
  },

  create: (user: { 
    name: string; 
    email: string; 
    passwordHash?: string; 
    role?: string;
    oauthProvider?: string;
    oauthId?: string;
  }): User => {
    const stmt = db.prepare(`
      INSERT INTO users (name, email, password_hash, role, oauth_provider, oauth_id)
      VALUES (@name, @email, @passwordHash, COALESCE(@role, 'student'), @oauthProvider, @oauthId)
    `);
    const result = stmt.run({
      name: user.name,
      email: user.email,
      passwordHash: user.passwordHash ?? null,
      role: user.role ?? "student",
      oauthProvider: user.oauthProvider ?? null,
      oauthId: user.oauthId ?? null,
    });
    return userQueries.findById(Number(result.lastInsertRowid))!;
  },
};
