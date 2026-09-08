const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const rootDir = path.resolve(__dirname, '..');
const sourceLogo = path.join(rootDir, 'apps/web/public/images/logo-sulson.png');

if (!fs.existsSync(sourceLogo)) {
  console.error('Source logo not found at:', sourceLogo);
  process.exit(1);
}

async function generateFavicons() {
  console.log('✨ Processing official Sulson logo for Favicon generation...');

  // Target destinations
  const destinations = [
    path.join(rootDir, 'apps/web/public'),
    path.join(rootDir, 'apps/web/app'),
    path.join(rootDir, 'apps/dashboard/public'),
    path.join(rootDir, 'apps/dashboard/app'),
  ];

  // Also specific image folder destinations
  const imageDestinations = [
    path.join(rootDir, 'apps/web/public/images'),
    path.join(rootDir, 'apps/dashboard/public/images'),
  ];

  // 1. Generate 512x512 High-Res icon.png
  const icon512 = await sharp(sourceLogo)
    .resize(512, 512, { fit: 'contain', background: { r: 255, g: 255, b: 255, alpha: 0 } })
    .png()
    .toBuffer();

  // 2. Generate 180x180 Apple Touch Icon
  const appleIcon = await sharp(sourceLogo)
    .resize(180, 180, { fit: 'contain', background: { r: 255, g: 255, b: 255, alpha: 0 } })
    .png()
    .toBuffer();

  // 3. Generate 32x32 & 48x48 Favicon PNG
  const favicon32 = await sharp(sourceLogo)
    .resize(32, 32, { fit: 'contain', background: { r: 255, g: 255, b: 255, alpha: 0 } })
    .png()
    .toBuffer();

  const favicon48 = await sharp(sourceLogo)
    .resize(48, 48, { fit: 'contain', background: { r: 255, g: 255, b: 255, alpha: 0 } })
    .png()
    .toBuffer();

  // 4. Generate 192x192 Standard Favicon
  const favicon192 = await sharp(sourceLogo)
    .resize(192, 192, { fit: 'contain', background: { r: 255, g: 255, b: 255, alpha: 0 } })
    .png()
    .toBuffer();

  // Write files to all app locations
  for (const dest of destinations) {
    if (!fs.existsSync(dest)) fs.mkdirSync(dest, { recursive: true });

    fs.writeFileSync(path.join(dest, 'icon.png'), icon512);
    fs.writeFileSync(path.join(dest, 'apple-icon.png'), appleIcon);
    fs.writeFileSync(path.join(dest, 'favicon.ico'), favicon48); // Standard ICO compatibility
    fs.writeFileSync(path.join(dest, 'favicon.png'), favicon192);
    console.log(`✓ Updated favicons in ${path.relative(rootDir, dest)}`);
  }

  for (const imgDest of imageDestinations) {
    if (fs.existsSync(imgDest)) {
      fs.writeFileSync(path.join(imgDest, 'favicon.png'), favicon192);
      console.log(`✓ Updated favicon.png in ${path.relative(rootDir, imgDest)}`);
    }
  }

  console.log('🎉 All official Sulson favicons generated and synchronized successfully!');
}

generateFavicons().catch((err) => {
  console.error('Error generating favicons:', err);
  process.exit(1);
});
