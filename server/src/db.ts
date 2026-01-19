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
    password_hash TEXT NOT NULL,
    role TEXT NOT NULL DEFAULT 'student',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );
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

  create: (user: { name: string; email: string; passwordHash: string; role?: string }): User => {
    const stmt = db.prepare(`
      INSERT INTO users (name, email, password_hash, role)
      VALUES (@name, @email, @passwordHash, COALESCE(@role, 'student'))
    `);
    const result = stmt.run(user);
    return userQueries.findById(Number(result.lastInsertRowid))!;
  },
};
