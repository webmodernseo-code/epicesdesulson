import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const PUBLIC_AUTH_PATHS = ["/signin", "/forgot-password", "/set-new-password", "/signup"];

async function verifySessionToken(token: string, secret: string): Promise<boolean> {
  try {
    if (!token) return false;
    const parts = token.split(".");
    if (parts.length !== 2) return false;
    const [encodedPayload, signature] = parts;
    if (!encodedPayload || !signature) return false;

    // 1. Decode base64url payload
    const base64 = encodedPayload.replace(/-/g, "+").replace(/_/g, "/");
    const padded = base64.padEnd(base64.length + (4 - (base64.length % 4)) % 4, "=");
    const decodedStr = atob(padded);
    const payload = JSON.parse(decodedStr);

    // 2. Validate expiration and role
    if (!payload.exp || payload.exp <= Math.floor(Date.now() / 1000)) {
      return false;
    }
    if (!["ADMIN", "MASTER_ADMIN"].includes(payload.role)) {
      return false;
    }

    // 3. Verify HMAC-SHA256 signature using standard Web Crypto API
    const encoder = new TextEncoder();
    const key = await crypto.subtle.importKey(
      "raw",
      encoder.encode(secret),
      { name: "HMAC", hash: "SHA-256" },
      false,
      ["sign"]
    );
    const sigBuffer = await crypto.subtle.sign(
      "HMAC",
      key,
      encoder.encode(encodedPayload)
    );
    const signatureBase64 = signature.replace(/-/g, "+").replace(/_/g, "/");
    const signaturePadded = signatureBase64.padEnd(
      signatureBase64.length + (4 - (signatureBase64.length % 4)) % 4,
      "="
    );
    const signatureBytes = Uint8Array.from(atob(signaturePadded), (char) => char.charCodeAt(0));
    return crypto.subtle.verify("HMAC", key, signatureBytes, encoder.encode(encodedPayload));
  } catch {
    return false;
  }
}

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // 1. Bypass static files, internal Next.js assets, and API routes
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api/") ||
    pathname.startsWith("/images/") ||
    pathname.startsWith("/icons/") ||
    pathname.includes(".")
  ) {
    return NextResponse.next();
  }

  const secret = process.env.NEXTAUTH_SECRET;

  const sessionToken =
    req.cookies.get("sulson_admin_session")?.value ||
    req.cookies.get("sulson_session")?.value;

  const isAuthenticated = secret && secret.length >= 32 && sessionToken
    ? await verifySessionToken(sessionToken, secret)
    : false;

  const isPublicAuthRoute = PUBLIC_AUTH_PATHS.some((path) =>
    pathname.startsWith(path)
  );

  // 2. If logged in and visiting login/auth pages, redirect to dashboard cockpit
  if (isPublicAuthRoute && isAuthenticated) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  // 3. If accessing login/auth pages while not logged in, allow
  if (isPublicAuthRoute) {
    return NextResponse.next();
  }

  // 4. If accessing protected dashboard pages without session, redirect to /signin
  if (!isAuthenticated) {
    const signinUrl = new URL("/signin", req.url);
    if (pathname !== "/") {
      signinUrl.searchParams.set("callbackUrl", pathname);
    }
    return NextResponse.redirect(signinUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - static images (.svg, .png, .jpg, .jpeg, .gif, .webp)
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
