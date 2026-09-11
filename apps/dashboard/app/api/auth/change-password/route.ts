import { NextRequest, NextResponse } from "next/server";
import { hashPassword, isAdmin, readSession, verifyPassword } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { getClientIp, rateLimit } from "@/lib/rate-limit";

export const dynamic = "force-dynamic";

const BOOTSTRAP_PASSWORDS = [
  process.env.ADMIN_INITIAL_PASSWORD,
  process.env.ADMIN_PASSWORD,
].filter(Boolean) as string[];

export async function POST(req: NextRequest) {
  const limit = rateLimit(`change-password:${getClientIp(req)}`, 5, 15 * 60 * 1000);
  if (!limit.success) {
    return NextResponse.json(
      { success: false, error: "Trop de tentatives. Réessayez dans quelques minutes." },
      { status: 429 }
    );
  }

  try {
    const session = readSession(req);
    if (!session || !isAdmin(req)) {
      return NextResponse.json(
        { success: false, error: "Session expirée ou non autorisée. Veuillez vous reconnecter." },
        { status: 401 }
      );
    }

    const { oldPassword, newPassword, confirmPassword } = await req.json();
    if (typeof oldPassword !== "string" || !oldPassword) {
      return NextResponse.json(
        { success: false, error: "Le mot de passe actuel est requis." },
        { status: 400 }
      );
    }
    if (typeof newPassword !== "string" || newPassword.length < 12 || newPassword.length > 128) {
      return NextResponse.json(
        { success: false, error: "Le nouveau mot de passe doit contenir entre 12 et 128 caractères." },
        { status: 400 }
      );
    }
    if (newPassword !== confirmPassword) {
      return NextResponse.json(
        { success: false, error: "Le nouveau mot de passe et la confirmation ne correspondent pas." },
        { status: 400 }
      );
    }
    if (!process.env.DATABASE_URL) {
      return NextResponse.json(
        { success: false, error: "Service temporairement indisponible. Le mot de passe n'a pas été modifié." },
        { status: 503 }
      );
    }

    const targetEmail = (session.email || "admin@epicesdesulson.com").toLowerCase();
    let user;
    try {
      user = await prisma.user.findFirst({
        where: {
          OR: [
            { id: session.userId },
            { email: { equals: targetEmail, mode: "insensitive" } },
          ],
        },
      });
    } catch (error) {
      console.error("Impossible de lire le compte administrateur:", error);
      return NextResponse.json(
        { success: false, error: "Service temporairement indisponible. Le mot de passe n'a pas été modifié." },
        { status: 503 }
      );
    }

    const oldPasswordIsValid = user?.passwordHash
      ? await verifyPassword(oldPassword, user.passwordHash)
      : BOOTSTRAP_PASSWORDS.includes(oldPassword);

    if (!oldPasswordIsValid) {
      return NextResponse.json(
        { success: false, error: "Le mot de passe actuel est incorrect." },
        { status: 400 }
      );
    }

    const passwordHash = await hashPassword(newPassword);
    if (user) {
      await prisma.user.update({
        where: { id: user.id },
        data: { passwordHash },
      });
    } else {
      await prisma.user.create({
        data: {
          email: targetEmail,
          name: "Administrateur Sulson",
          passwordHash,
          role: "MASTER_ADMIN",
        },
      });
    }

    return NextResponse.json({
      success: true,
      message: "Votre mot de passe a été mis à jour avec succès.",
    });
  } catch (error) {
    console.error("Erreur change-password:", error);
    return NextResponse.json(
      { success: false, error: "Erreur lors du changement de mot de passe." },
      { status: 500 }
    );
  }
}
