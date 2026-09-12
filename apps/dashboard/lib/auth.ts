import { createHmac, randomBytes, scrypt as nodeScrypt, timingSafeEqual } from "node:crypto";
import { promisify } from "node:util";
import type { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";

const scrypt = promisify(nodeScrypt);

export const SESSION_COOKIE = "sulson_admin_session";
export const COMPAT_COOKIE = "sulson_session";

export type SessionRole = "CUSTOMER" | "ADMIN" | "SUPER_ADMIN" | "MASTER_ADMIN";

export interface SessionPayload {
  userId: string;
  email: string;
  role: SessionRole;
  exp: number;
}

export function getSessionSecret(): string {
  const secret = process.env.NEXTAUTH_SECRET;
  if (!secret || secret.length < 32 || secret.includes("your_32_characters")) {
    throw new Error("NEXTAUTH_SECRET doit contenir au moins 32 caractères aléatoires.");
  }
  return secret;
}

export function sign(value: string, secret = getSessionSecret()): string {
  return createHmac("sha256", secret).update(value).digest("base64url");
}

export function createSessionToken(
  payload: Omit<SessionPayload, "exp">,
  maxAgeSeconds = 7 * 24 * 60 * 60
): string {
  const exp = Math.floor(Date.now() / 1000) + maxAgeSeconds;
  const encoded = Buffer.from(
    JSON.stringify({ ...payload, exp })
  ).toString("base64url");
  return `${encoded}.${sign(encoded)}`;
}

export function readSession(req: NextRequest): SessionPayload | null {
  try {
    const token =
      req.cookies.get(SESSION_COOKIE)?.value ||
      req.cookies.get(COMPAT_COOKIE)?.value;
    if (!token) return null;

    const [encoded, signature] = token.split(".");
    if (!encoded || !signature) return null;

    const expected = Buffer.from(sign(encoded));
    const received = Buffer.from(signature);
    if (expected.length !== received.length || !timingSafeEqual(expected, received)) {
      return null;
    }

    const payload = JSON.parse(
      Buffer.from(encoded, "base64url").toString()
    ) as SessionPayload;

    if (!payload.userId || !payload.email || payload.exp <= Math.floor(Date.now() / 1000)) {
      return null;
    }

    return payload;
  } catch {
    return null;
  }
}

export async function isAdmin(req: NextRequest): Promise<boolean> {
  try {
    const session = readSession(req);
    if (!session || !["ADMIN", "SUPER_ADMIN", "MASTER_ADMIN"].includes(session.role)) return false;
    const user = await prisma.user.findUnique({
      where: { id: session.userId },
      select: { role: true, adminEnabled: true },
    });
    return Boolean(user?.adminEnabled && ["ADMIN", "SUPER_ADMIN", "MASTER_ADMIN"].includes(user.role));
  } catch {
    return false;
  }
}

export async function isSuperAdmin(req: NextRequest): Promise<boolean> {
  const session = readSession(req);
  if (!session || (session.role !== "SUPER_ADMIN" && session.role !== "MASTER_ADMIN")) return false;
  const user = await prisma.user.findUnique({
    where: { id: session.userId },
    select: { role: true, adminEnabled: true },
  }).catch(() => null);
  return Boolean(user?.adminEnabled && (user.role === "SUPER_ADMIN" || user.role === "MASTER_ADMIN"));
}

export async function hashPassword(password: string): Promise<string> {
  const salt = randomBytes(16).toString("hex");
  const derived = (await scrypt(password, salt, 64)) as Buffer;
  return `scrypt:${salt}:${derived.toString("hex")}`;
}

export async function verifyPassword(
  password: string,
  stored: string | null
): Promise<boolean> {
  if (!stored) return false;
  try {
    const [algorithm, salt, hash] = stored.split(":");
    if (algorithm !== "scrypt" || !salt || !hash) return false;
    const expected = Buffer.from(hash, "hex");
    const actual = (await scrypt(password, salt, expected.length)) as Buffer;
    return actual.length === expected.length && timingSafeEqual(actual, expected);
  } catch {
    return false;
  }
}
