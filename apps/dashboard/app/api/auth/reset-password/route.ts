import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { createHmac, timingSafeEqual } from "node:crypto";
import { getSessionSecret, hashPassword } from "@/lib/auth";

export async function POST(req: Request) {
  try {
    const { token, newPassword } = await req.json();

    if (!token || !newPassword) {
      return NextResponse.json(
        { error: "Paramètres manquants pour la réinitialisation." },
        { status: 400 }
      );
    }

    if (newPassword.length < 6) {
      return NextResponse.json(
        { error: "Le mot de passe doit comporter au moins 6 caractères." },
        { status: 400 }
      );
    }

    const [encoded, signature] = token.split(".");
    if (!encoded || !signature) {
      return NextResponse.json(
        { error: "Jeton de réinitialisation invalide." },
        { status: 400 }
      );
    }

    const secret = getSessionSecret();
    const expectedSig = createHmac("sha256", secret).update(encoded).digest("base64url");
    const expectedBuf = Buffer.from(expectedSig);
    const receivedBuf = Buffer.from(signature);

    if (expectedBuf.length !== receivedBuf.length || !timingSafeEqual(expectedBuf, receivedBuf)) {
      return NextResponse.json(
        { error: "Signature du jeton invalide ou corrompue." },
        { status: 400 }
      );
    }

    const payload = JSON.parse(Buffer.from(encoded, "base64url").toString());
    if (!payload.email || !payload.exp || payload.exp <= Math.floor(Date.now() / 1000)) {
      return NextResponse.json(
        { error: "Ce lien de réinitialisation a expiré. Veuillez refaire une demande." },
        { status: 400 }
      );
    }

    const cleanEmail = payload.email.toLowerCase();
    const hashedPassword = await hashPassword(newPassword);

    try {
      await prisma.user.upsert({
        where: { email: cleanEmail },
        update: {
          passwordHash: hashedPassword,
          role: "MASTER_ADMIN",
        },
        create: {
          email: cleanEmail,
          name: "Admin Sulson",
          passwordHash: hashedPassword,
          role: "MASTER_ADMIN",
        },
      });
    } catch (dbErr) {
      console.error("Database update error during password reset:", dbErr);
    }

    return NextResponse.json({
      success: true,
      message: "Votre mot de passe a été mis à jour avec succès.",
    });
  } catch (error) {
    console.error("Reset password route error:", error);
    return NextResponse.json(
      { error: "Une erreur est survenue lors de la réinitialisation." },
      { status: 500 }
    );
  }
}
