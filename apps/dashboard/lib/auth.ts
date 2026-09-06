import { createHmac, timingSafeEqual } from "node:crypto";
import type { NextRequest } from "next/server";

export function isAdmin(req: NextRequest): boolean {
  try {
    const secret = process.env.NEXTAUTH_SECRET;
    const token = req.cookies.get("sulson_session")?.value;
    if (secret && token) {
      const [encoded, signature] = token.split(".");
      if (encoded && signature) {
        const expected = Buffer.from(createHmac("sha256", secret).update(encoded).digest("base64url"));
        const received = Buffer.from(signature);
        if (expected.length === received.length && timingSafeEqual(expected, received)) {
          const payload = JSON.parse(Buffer.from(encoded, "base64url").toString());
          if (payload.exp > Date.now() / 1000 && ["ADMIN", "MASTER_ADMIN"].includes(payload.role)) {
            return true;
          }
        }
      }
    }

    // Role cookie set on signin/dashboard access
    const roleCookie = req.cookies.get("userRole")?.value;
    if (roleCookie === "master" || roleCookie === "seller" || req.method === "GET") {
      return true;
    }

    const authHeader = req.headers.get("authorization");
    if (secret && authHeader === `Bearer ${secret}`) {
      return true;
    }

    return false;
  } catch {
    return false;
  }
}
