const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const rootDir = path.resolve(__dirname, '..');
const sourceLogo = path.join(rootDir, 'apps/web/public/images/logo-sulson.png');

if (!fs.existsSync(sourceLogo)) {
  console.error('Source logo not found at:', sourceLogo);
  process.exit(1);
}

async function generateAllFavicons() {
  console.log('🌿 Génération des véritables favicons officiels Les Épices de Sulson...');

  // 1. Trim source logo to get pure square emblem with high crispness
  const trimmedBuffer = await sharp(sourceLogo)
    .trim()
    .toBuffer();

  const { width, height } = await sharp(trimmedBuffer).metadata();
  const maxDim = Math.max(width, height);
  const padH = Math.round((maxDim - width) / 2);
  const padV = Math.round((maxDim - height) / 2);

  // Create perfect 1:1 square canvas with transparent background
  const squareEmblem = await sharp(trimmedBuffer)
    .extend({
      top: padV + 20,
      bottom: padV + 20,
      left: padH + 20,
      right: padH + 20,
      background: { r: 255, g: 255, b: 255, alpha: 0 },
    })
    .png()
    .toBuffer();

  // 2. High-res sizes
  const icon512 = await sharp(squareEmblem).resize(512, 512).png().toBuffer();
  const icon192 = await sharp(squareEmblem).resize(192, 192).png().toBuffer();
  const apple180 = await sharp(squareEmblem).resize(180, 180).png().toBuffer();
  const icon96 = await sharp(squareEmblem).resize(96, 96).png().toBuffer();
  const icon48 = await sharp(squareEmblem).resize(48, 48).png().toBuffer();
  const icon32 = await sharp(squareEmblem).resize(32, 32).png().toBuffer();
  const icon16 = await sharp(squareEmblem).resize(16, 16).png().toBuffer();

  // Create SVG version of the official emblem with embedded high-res PNG for vector crispness
  const base64Png = icon512.toString('base64');
  const officialSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="100%" height="100%">
  <image href="data:image/png;base64,${base64Png}" x="0" y="0" width="512" height="512" />
</svg>`;

  // Target directories
  const targetDirs = [
    path.join(rootDir, 'apps/web/public'),
    path.join(rootDir, 'apps/web/public/images'),
    path.join(rootDir, 'apps/web/app'),
    path.join(rootDir, 'apps/dashboard/public'),
    path.join(rootDir, 'apps/dashboard/public/images'),
    path.join(rootDir, 'apps/dashboard/public/images/logo'),
    path.join(rootDir, 'apps/dashboard/app'),
  ];

  for (const dir of targetDirs) {
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

    // Write all standard favicon names
    fs.writeFileSync(path.join(dir, 'favicon.ico'), icon48);
    fs.writeFileSync(path.join(dir, 'favicon.png'), icon192);
    fs.writeFileSync(path.join(dir, 'icon.png'), icon512);
    fs.writeFileSync(path.join(dir, 'apple-icon.png'), apple180);
    fs.writeFileSync(path.join(dir, 'favicon-32x32.png'), icon32);
    fs.writeFileSync(path.join(dir, 'favicon-16x16.png'), icon16);
    console.log(`✓ Synchronisé dans : ${path.relative(rootDir, dir)}`);
  }

  // Also replace template logo icons in dashboard
  const logoDir = path.join(rootDir, 'apps/dashboard/public/images/logo');
  if (fs.existsSync(logoDir)) {
    fs.writeFileSync(path.join(logoDir, 'logo-green-icon.png'), icon512);
    fs.writeFileSync(path.join(logoDir, 'logo-white-icon.png'), icon512);
    fs.writeFileSync(path.join(logoDir, 'logo-green-icon.svg'), officialSvg);
    fs.writeFileSync(path.join(logoDir, 'logo-white-icon.svg'), officialSvg);
    console.log(`✓ Remplacé tous les anciens templates dans apps/dashboard/public/images/logo`);
  }

  console.log('🎉 Tous les favicons officiels de marque ont été générés avec succès !');
}

generateAllFavicons().catch(console.error);
