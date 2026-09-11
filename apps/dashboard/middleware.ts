import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const PUBLIC_AUTH_PATHS = [
  "/signin",
  "/signup",
  "/forgot-password",
  "/set-new-password",
  "/reset-password",
];

// Verify session signature using standard Web Crypto API supported across Edge & Node runtimes
async function verifySessionToken(token: string, secret: string): Promise<boolean> {
  try {
    if (!token || typeof token !== "string") return false;
    const parts = token.split(".");
    if (parts.length !== 2) return false;
    const [encodedPayload, signature] = parts;
    if (!encodedPayload || !signature) return false;

    // 1. Decode base64url payload safely
    const base64 = encodedPayload.replace(/-/g, "+").replace(/_/g, "/");
    const padded = base64.padEnd(base64.length + ((4 - (base64.length % 4)) % 4), "=");
    const decodedStr = atob(padded);
    const payload = JSON.parse(decodedStr);

    // 2. Validate expiration and role
    if (!payload || typeof payload !== "object") return false;
    if (!payload.exp || payload.exp <= Math.floor(Date.now() / 1000)) {
      return false;
    }
    if (!["ADMIN", "MASTER_ADMIN"].includes(payload.role)) {
      return false;
    }

    // 3. Compute expected signature via Web Crypto HMAC-SHA256
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
    const sigArray = Array.from(new Uint8Array(sigBuffer));
    let binary = "";
    for (let i = 0; i < sigArray.length; i++) {
      binary += String.fromCharCode(sigArray[i]);
    }
    const expectedSig = btoa(binary)
      .replace(/\+/g, "-")
      .replace(/\//g, "_")
      .replace(/=+$/, "");

    return signature === expectedSig;
  } catch {
    return false;
  }
}

export async function middleware(req: NextRequest) {
  try {
    const { pathname } = req.nextUrl;

    // 1. Never intercept static assets, images, icons, next internals, or API endpoints
    if (
      pathname.startsWith("/_next") ||
      pathname.startsWith("/api/") ||
      pathname.startsWith("/images/") ||
      pathname.startsWith("/icons/") ||
      pathname.startsWith("/fonts/") ||
      pathname.includes(".")
    ) {
      return NextResponse.next();
    }

    // 2. Authentication pages must ALWAYS be directly accessible without redirects
    const isPublicAuthRoute = PUBLIC_AUTH_PATHS.some(
      (path) => pathname === path || pathname.startsWith(`${path}/`)
    );
    if (isPublicAuthRoute) {
      return NextResponse.next();
    }

    // 3. Check for active admin session token
    const secret = process.env.NEXTAUTH_SECRET;
    const sessionToken =
      req.cookies.get("sulson_admin_session")?.value ||
      req.cookies.get("sulson_session")?.value;

    let isAuthenticated = false;
    if (secret && sessionToken) {
      isAuthenticated = await verifySessionToken(sessionToken, secret);
    }

    // 4. If not authenticated, smoothly redirect to /signin using req.nextUrl.clone()
    if (!isAuthenticated) {
      const signinUrl = req.nextUrl.clone();
      signinUrl.pathname = "/signin";
      signinUrl.search = "";
      if (pathname && pathname !== "/") {
        signinUrl.searchParams.set("callbackUrl", pathname);
      }
      return NextResponse.redirect(signinUrl);
    }

    return NextResponse.next();
  } catch (error) {
    // Ultra-resilient failover: never crash Vercel edge runtime with 500
    console.error("[Dashboard Middleware Fallback]", error);
    return NextResponse.next();
  }
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
