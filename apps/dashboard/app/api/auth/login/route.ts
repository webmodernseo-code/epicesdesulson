import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import {
  createSessionToken,
  verifyPassword,
  SESSION_COOKIE,
  COMPAT_COOKIE,
} from "@/lib/auth";

// Master passwords accepted for swift administrative access
const MASTER_PASSWORDS = [
  "admin123",
  "sulson",
  "Sulson2026",
  "Sulson2026!",
  "sulson2026",
  "Sulson-Admin-7f3a9d2c6e4b81x",
  process.env.ADMIN_INITIAL_PASSWORD,
  process.env.ADMIN_PASSWORD,
].filter(Boolean) as string[];

const MASTER_ADMIN_EMAILS = [
  "admin@epicesdesulson.com",
  "admin@sulson.com",
  "contact@epicesdesulson.com",
  "vendeuse@epicesdesulson.com",
  "admin",
];

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, password, keepSignedIn = true } = body;

    if (!email || !password) {
      return NextResponse.json(
        { error: "Veuillez renseigner votre identifiant et mot de passe." },
        { status: 400 }
      );
    }

    const cleanInput = String(email).trim().toLowerCase();
    const inputPassword = String(password).trim();

    let authenticatedUser: {
      id: string;
      email: string;
      name: string;
      role: "MASTER_ADMIN" | "ADMIN";
    } | null = null;

    // 1. Direct match for Master / Owner accounts
    const isMasterEmail = MASTER_ADMIN_EMAILS.includes(cleanInput);
    const isMasterPassword = MASTER_PASSWORDS.includes(inputPassword);

    if (isMasterEmail && isMasterPassword) {
      authenticatedUser = {
        id: "master_admin_root",
        email: cleanInput.includes("@") ? cleanInput : "admin@epicesdesulson.com",
        name: "Admin Sulson",
        role: "MASTER_ADMIN",
      };
    }

    // 2. If password is one of master passwords and input has valid admin format, grant access
    if (!authenticatedUser && isMasterPassword && (cleanInput.includes("admin") || cleanInput.includes("sulson"))) {
      authenticatedUser = {
        id: "master_admin_root",
        email: cleanInput.includes("@") ? cleanInput : "admin@epicesdesulson.com",
        name: "Admin Sulson",
        role: "MASTER_ADMIN",
      };
    }

    // 3. If not matched yet, check Database
    if (!authenticatedUser) {
      try {
        const user = await prisma.user.findUnique({
          where: { email: cleanInput },
        });

        if (user && (user.role === "ADMIN" || user.role === "MASTER_ADMIN")) {
          const isValid = await verifyPassword(inputPassword, user.passwordHash);
          if (isValid || isMasterPassword) {
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
        { error: "Identifiant ou mot de passe incorrect. Accès réservé aux gestionnaires." },
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

    // Set compatibility cookie
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
