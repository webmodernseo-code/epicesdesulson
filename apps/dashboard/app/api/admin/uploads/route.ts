import { createHash } from "node:crypto";
import { NextRequest, NextResponse } from "next/server";
import { isAdmin } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  if (!isAdmin(req)) return NextResponse.json({ error: "Non autorisé." }, { status: 401 });
  const input = await req.formData(); const file = input.get("file");
  if (!(file instanceof File) || !file.type.startsWith("image/") || file.size > 8 * 1024 * 1024) return NextResponse.json({ error: "Image JPG, PNG ou WebP de 8 Mo maximum requise." }, { status: 400 });
  const config = await prisma.mediaStorageConfig.findUnique({ where: { provider: "cloudinary" } });
  if (!config?.isEnabled) return NextResponse.json({ error: "Cloudinary n'est pas configuré ou activé." }, { status: 503 });
  const timestamp = Math.floor(Date.now() / 1000); const params = `folder=${config.uploadFolder}&timestamp=${timestamp}`; const signature = createHash("sha1").update(`${params}${config.apiSecret}`).digest("hex");
  const form = new FormData(); form.set("file", file); form.set("folder", config.uploadFolder); form.set("timestamp", String(timestamp)); form.set("api_key", config.apiKey); form.set("signature", signature);
  const response = await fetch(`https://api.cloudinary.com/v1_1/${config.cloudName}/image/upload`, { method: "POST", body: form }); const data = await response.json();
  if (!response.ok) return NextResponse.json({ error: data.error?.message || "Échec du téléversement." }, { status: 502 });
  return NextResponse.json({ success: true, data: { url: data.secure_url, publicId: data.public_id, width: data.width, height: data.height } });
}
