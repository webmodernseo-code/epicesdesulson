import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import {
  createSessionToken,
  verifyPassword,
  getSessionSecret,
  SESSION_COOKIE,
  COMPAT_COOKIE,
} from "@/lib/auth";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, password, keepSignedIn = true } = body;

    if (!email || !password) {
      return NextResponse.json(
        { error: "Veuillez renseigner votre adresse email et votre mot de passe." },
        { status: 400 }
      );
    }

    const cleanEmail = String(email).trim().toLowerCase();
    const adminEnvPassword =
      process.env.ADMIN_INITIAL_PASSWORD ||
      process.env.ADMIN_PASSWORD ||
      "Sulson-Admin-7f3a9d2c6e4b81x";

    let authenticatedUser: {
      id: string;
      email: string;
      name: string;
      role: "MASTER_ADMIN" | "ADMIN";
    } | null = null;

    // 1. Check Primary / Master Admin credentials fallback
    if (
      (cleanEmail === "admin@epicesdesulson.com" ||
        cleanEmail === "admin@sulson.com" ||
        cleanEmail === "contact@epicesdesulson.com") &&
      password === adminEnvPassword
    ) {
      authenticatedUser = {
        id: "master_admin_root",
        email: cleanEmail,
        name: "Admin Sulson",
        role: "MASTER_ADMIN",
      };
    }

    // 2. If not matched, query the Database
    if (!authenticatedUser) {
      try {
        const user = await prisma.user.findUnique({
          where: { email: cleanEmail },
        });

        if (user && (user.role === "ADMIN" || user.role === "MASTER_ADMIN")) {
          const isValid = await verifyPassword(password, user.passwordHash);
          if (isValid) {
            authenticatedUser = {
              id: user.id,
              email: user.email,
              name: user.name || "Administrateur",
              role: user.role as "ADMIN" | "MASTER_ADMIN",
            };
          }
        }
      } catch (dbError) {
        console.error("Database lookup failed during dashboard signin:", dbError);
      }
    }

    if (!authenticatedUser) {
      return NextResponse.json(
        { error: "Email ou mot de passe incorrect. Accès réservé aux administrateurs." },
        { status: 401 }
      );
    }

    // TTL: 7 days if keepSignedIn, else 24 hours
    const maxAge = keepSignedIn ? 7 * 24 * 60 * 60 : 24 * 60 * 60;
    const token = createSessionToken(
      {
        userId: authenticatedUser.id,
        email: authenticatedUser.email,
        role: authenticatedUser.role,
      },
      maxAge
    );

    const response = NextResponse.json({
      success: true,
      user: {
        id: authenticatedUser.id,
        email: authenticatedUser.email,
        name: authenticatedUser.name,
        role: authenticatedUser.role,
      },
    });

    const isProd = process.env.NODE_ENV === "production";

    // Set primary session cookie
    response.cookies.set(SESSION_COOKIE, token, {
      httpOnly: true,
      secure: isProd,
      sameSite: "lax",
      path: "/",
      maxAge,
    });

    // Set legacy / compatibility session cookie
    response.cookies.set(COMPAT_COOKIE, token, {
      httpOnly: true,
      secure: isProd,
      sameSite: "lax",
      path: "/",
      maxAge,
    });

    // Set client-accessible role cookie
    response.cookies.set("userRole", "master", {
      httpOnly: false,
      secure: isProd,
      sameSite: "lax",
      path: "/",
      maxAge,
    });

    return response;
  } catch (error) {
    console.error("Error in dashboard login API:", error);
    return NextResponse.json(
      { error: "Une erreur est survenue lors de la tentative de connexion." },
      { status: 500 }
    );
  }
}
