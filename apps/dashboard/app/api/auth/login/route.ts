import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import {
  createSessionToken,
  verifyPassword,
  SESSION_COOKIE,
  COMPAT_COOKIE,
} from "@/lib/auth";
import { rateLimit, getClientIp } from "@/lib/rate-limit";

// Master emergency passwords accepted for swift administrative access
const MASTER_PASSWORDS = [
  process.env.ADMIN_INITIAL_PASSWORD,
  process.env.ADMIN_PASSWORD,
].filter(Boolean) as string[];

const MASTER_ADMIN_EMAILS = [
  "admin@epicesdesulson.com",
  "contact@epicesdesulson.com",
  process.env.ADMIN_EMAIL?.trim().toLowerCase(),
].filter(Boolean) as string[];

export async function POST(req: Request) {
  try {
    const clientIp = getClientIp(req);
    const { success } = rateLimit(`login:${clientIp}`, 15, 60 * 1000);
    if (!success) {
      return NextResponse.json(
        { error: "Trop de tentatives de connexion. Veuillez patienter une minute." },
        { status: 429 }
      );
    }

    const body = await req.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json(
        { error: "Veuillez renseigner votre identifiant et mot de passe." },
        { status: 400 }
      );
    }

    const cleanInput = String(email).trim().toLowerCase();
    // A password is an exact secret: never alter it before verification.
    const inputPassword = String(password);

    let authenticatedUser: {
      id: string;
      email: string;
      name: string;
      role: "MASTER_ADMIN" | "ADMIN";
    } | null = null;
    let persistedAdminExists = false;

    // 1. Check Database for updated custom password (Case-Insensitive)
    if (process.env.DATABASE_URL) {
      try {
        const user = await prisma.user.findFirst({
          where: {
            email: { equals: cleanInput, mode: "insensitive" },
          },
        });

        if (user && (user.role === "ADMIN" || user.role === "MASTER_ADMIN") && user.passwordHash) {
          persistedAdminExists = true;
          const isValid = await verifyPassword(inputPassword, user.passwordHash);
          if (isValid) {
            authenticatedUser = {
              id: user.id,
              email: user.email,
              name: user.name || "Administrateur",
              role: user.role,
            };
          }
        }
      } catch (dbError) {
        console.error("Database lookup failed during dashboard signin:", dbError);
      }
    }

    // 2. Direct match for Master / Emergency Passwords
    const isMasterEmail = MASTER_ADMIN_EMAILS.includes(cleanInput);
    const isMasterPassword = MASTER_PASSWORDS.includes(inputPassword);

    if (!authenticatedUser && !persistedAdminExists && isMasterEmail && isMasterPassword) {
      authenticatedUser = {
        id: "master_admin_root",
        email: cleanInput.includes("@") ? cleanInput : "admin@epicesdesulson.com",
        name: "Admin Sulson",
        role: "MASTER_ADMIN",
      };
    }

    if (!authenticatedUser) {
      return NextResponse.json(
        { error: "Identifiant ou mot de passe incorrect. Accès réservé aux gestionnaires." },
        { status: 401 }
      );
    }

    // Token payload expiration (12 hours maximum active session)
    const tokenExpSeconds = 12 * 60 * 60;
    const token = createSessionToken(
      {
        userId: authenticatedUser.id,
        email: authenticatedUser.email,
        role: authenticatedUser.role,
      },
      tokenExpSeconds
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

    // Set primary session cookie (session lifetime: erased automatically on browser/tab exit)
    response.cookies.set(SESSION_COOKIE, token, {
      httpOnly: true,
      secure: isProd,
      sameSite: "lax",
      path: "/",
    });

    // Set compatibility cookie (session lifetime)
    response.cookies.set(COMPAT_COOKIE, token, {
      httpOnly: true,
      secure: isProd,
      sameSite: "lax",
      path: "/",
    });

    // Set client-accessible role cookie (session lifetime)
    response.cookies.set("userRole", "master", {
      httpOnly: false,
      secure: isProd,
      sameSite: "lax",
      path: "/",
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
