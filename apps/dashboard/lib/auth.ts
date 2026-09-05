import { createHmac, timingSafeEqual } from "node:crypto";
import type { NextRequest } from "next/server";

export function isAdmin(req: NextRequest): boolean {
  try {
    const secret = process.env.NEXTAUTH_SECRET;
    const token = req.cookies.get("sulson_session")?.value;
    if (!secret || secret.length < 32 || !token) return false;
    const [encoded, signature] = token.split(".");
    if (!encoded || !signature) return false;
    const expected = Buffer.from(createHmac("sha256", secret).update(encoded).digest("base64url"));
    const received = Buffer.from(signature);
    if (expected.length !== received.length || !timingSafeEqual(expected, received)) return false;
    const payload = JSON.parse(Buffer.from(encoded, "base64url").toString());
    return payload.exp > Date.now() / 1000 && ["ADMIN", "MASTER_ADMIN"].includes(payload.role);
  } catch { return false; }
}
