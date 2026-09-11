import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { createSessionToken, SESSION_COOKIE, verifyPassword } from "@/lib/auth";
import { getClientIp, rateLimit } from "@/lib/rate-limit";

export async function POST(req: Request) {
  try {
    const limit = rateLimit(`customer-login:${getClientIp(req)}`, 5, 15 * 60 * 1000);
    if (!limit.success) {
      return NextResponse.json(
        { success: false, error: "Trop de tentatives. Réessayez dans quelques minutes." },
        { status: 429, headers: { "Retry-After": String(Math.ceil((limit.reset - Date.now()) / 1000)) } }
      );
    }
    const { email, password } = await req.json();
    if (typeof email !== "string" || typeof password !== "string" || !email.trim() || !password) {
      return NextResponse.json({ success: false, error: "Email et mot de passe requis." }, { status: 400 });
    }

    const dbUser = await prisma.user.findUnique({ where: { email: email.trim().toLowerCase() } });
    if (!dbUser || !(await verifyPassword(password, dbUser.passwordHash))) {
      return NextResponse.json({ success: false, error: "Identifiants invalides." }, { status: 401 });
    }

    const user = { id: dbUser.id, name: dbUser.name, email: dbUser.email, role: dbUser.role };
    const response = NextResponse.json({ success: true, message: "Connexion réussie.", user });
    response.cookies.set({
      name: SESSION_COOKIE,
      value: createSessionToken({ userId: user.id, email: user.email, role: user.role }),
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 604800,
      path: "/",
    });
    response.cookies.set({
      name: "userRole",
      value: user.role.toLowerCase(),
      httpOnly: false,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 604800,
      path: "/",
    });
    return response;
  } catch (error: unknown) {
    console.error("Customer login failed:", error);
    return NextResponse.json({ success: false, error: "Erreur de connexion." }, { status: 500 });
  }
}
