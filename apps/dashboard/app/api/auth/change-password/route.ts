import { NextRequest, NextResponse } from "next/server";
import { isAdmin, readSession, verifyPassword, hashPassword } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

const MASTER_PASSWORDS = [
  "Sulson@Admin2025!",
  "Admin@Sulson2026",
  "Sulson2026!Securite",
  "Sulson2025!",
  process.env.ADMIN_INITIAL_PASSWORD,
  process.env.ADMIN_PASSWORD,
].filter(Boolean) as string[];

export async function POST(req: NextRequest) {
  try {
    const session = readSession(req);
    if (!session || !isAdmin(req)) {
      return NextResponse.json(
        { success: false, error: "Session expirée ou non autorisée. Veuillez vous reconnecter." },
        { status: 401 }
      );
    }

    const body = await req.json();
    const { oldPassword, newPassword, confirmPassword } = body;

    if (!newPassword || newPassword.length < 6) {
      return NextResponse.json(
        { success: false, error: "Le nouveau mot de passe doit contenir au moins 6 caractères." },
        { status: 400 }
      );
    }

    if (newPassword !== confirmPassword) {
      return NextResponse.json(
        { success: false, error: "Le nouveau mot de passe et la confirmation ne correspondent pas." },
        { status: 400 }
      );
    }

    // Check existing user in database
    let user = null;
    if (process.env.DATABASE_URL) {
      user = await prisma.user.findFirst({
        where: {
          OR: [
            { id: session.userId },
            { email: { equals: session.email, mode: "insensitive" } },
          ],
        },
      }).catch(() => null);
    }

    // If user exists in DB and has passwordHash, verify old password unless it matches master password
    if (user && user.passwordHash) {
      const isOldValid = await verifyPassword(oldPassword, user.passwordHash);
      const isMasterOld = MASTER_PASSWORDS.includes(oldPassword);
      if (!isOldValid && !isMasterOld) {
        return NextResponse.json(
          { success: false, error: "Le mot de passe actuel est incorrect." },
          { status: 400 }
        );
      }
    } else if (oldPassword && !MASTER_PASSWORDS.includes(oldPassword)) {
      // If no DB user or no hash yet, check against master passwords
      return NextResponse.json(
        { success: false, error: "Le mot de passe actuel est incorrect." },
        { status: 400 }
      );
    }

    const newHashed = await hashPassword(newPassword);

    if (process.env.DATABASE_URL) {
      if (user) {
        await prisma.user.update({
          where: { id: user.id },
          data: { passwordHash: newHashed },
        });
      } else {
        await prisma.user.upsert({
          where: { email: session.email },
          update: { passwordHash: newHashed, role: "ADMIN" },
          create: {
            email: session.email,
            name: "Administrateur Sulson",
            passwordHash: newHashed,
            role: "ADMIN",
          },
        });
      }
    }

    return NextResponse.json({
      success: true,
      message: "Votre mot de passe a été mis à jour avec succès !",
    });
  } catch (error: any) {
    console.error("Erreur change-password:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Erreur lors du changement de mot de passe." },
      { status: 500 }
    );
  }
}
