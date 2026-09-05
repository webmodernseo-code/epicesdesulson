import { createHmac, randomBytes, scrypt as nodeScrypt, timingSafeEqual } from "node:crypto";
import { promisify } from "node:util";
import type { NextRequest } from "next/server";

const scrypt = promisify(nodeScrypt);
export const SESSION_COOKIE = "sulson_session";
export type SessionRole = "CUSTOMER" | "ADMIN" | "MASTER_ADMIN";
interface SessionPayload { userId: string; email: string; role: SessionRole; exp: number }

function sessionSecret(): string {
  const value = process.env.NEXTAUTH_SECRET;
  if (!value || value.length < 32 || value.includes("your_32_characters")) {
    throw new Error("NEXTAUTH_SECRET doit contenir au moins 32 caractères aléatoires.");
  }
  return value;
}

function sign(value: string): string {
  return createHmac("sha256", sessionSecret()).update(value).digest("base64url");
}

export function createSessionToken(payload: Omit<SessionPayload, "exp">): string {
  const encoded = Buffer.from(JSON.stringify({ ...payload, exp: Math.floor(Date.now() / 1000) + 604800 })).toString("base64url");
  return `${encoded}.${sign(encoded)}`;
}

export function readSession(req: NextRequest): SessionPayload | null {
  try {
    const token = req.cookies.get(SESSION_COOKIE)?.value;
    if (!token) return null;
    const [encoded, signature] = token.split(".");
    if (!encoded || !signature) return null;
    const expected = Buffer.from(sign(encoded));
    const received = Buffer.from(signature);
    if (expected.length !== received.length || !timingSafeEqual(expected, received)) return null;
    const payload = JSON.parse(Buffer.from(encoded, "base64url").toString()) as SessionPayload;
    if (!payload.userId || !payload.email || payload.exp <= Math.floor(Date.now() / 1000)) return null;
    return payload;
  } catch { return null; }
}

export function isAdmin(req: NextRequest): boolean {
  const role = readSession(req)?.role;
  return role === "ADMIN" || role === "MASTER_ADMIN";
}

export async function hashPassword(password: string): Promise<string> {
  const salt = randomBytes(16).toString("hex");
  const derived = (await scrypt(password, salt, 64)) as Buffer;
  return `scrypt:${salt}:${derived.toString("hex")}`;
}

export async function verifyPassword(password: string, stored: string | null): Promise<boolean> {
  if (!stored) return false;
  const [algorithm, salt, hash] = stored.split(":");
  if (algorithm !== "scrypt" || !salt || !hash) return false;
  const expected = Buffer.from(hash, "hex");
  const actual = (await scrypt(password, salt, expected.length)) as Buffer;
  return actual.length === expected.length && timingSafeEqual(actual, expected);
}
