const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs');

// Ensure DATABASE_URL is always defined so prisma generate never fails during Vercel build
if (!process.env.DATABASE_URL) {
  process.env.DATABASE_URL = 'postgresql://postgres:postgres@localhost:5432/epicesdesulson?sslmode=disable';
}
if (!process.env.DIRECT_URL) {
  process.env.DIRECT_URL = process.env.DATABASE_URL;
}

const rootDir = path.resolve(__dirname, '..');
const webDir = path.resolve(rootDir, 'apps/web');

console.log('🚀 Running monorepo root build for Les Épices de Sulson...');

// 1. Generate Prisma Client in apps/web
try {
  console.log('⚡ Generating Prisma Client in apps/web...');
  execSync('npx prisma generate', {
    cwd: webDir,
    env: process.env,
    stdio: 'inherit',
  });
  console.log('✓ Prisma Client generated');
} catch (err) {
  console.warn('⚠️ Prisma generate warning:', err.message);
}

// 2. Build Next.js in apps/web
console.log('⚡ Building Next.js application in apps/web...');
execSync('npx next build', {
  cwd: webDir,
  env: process.env,
  stdio: 'inherit',
});
console.log('✓ Next.js build completed in apps/web');

// 3. Ensure .next at root is synchronized for Vercel
try {
  const rootNext = path.resolve(rootDir, '.next');
  const webNext = path.resolve(webDir, '.next');
  if (fs.existsSync(webNext)) {
    if (fs.existsSync(rootNext)) {
      try { fs.rmSync(rootNext, { recursive: true, force: true }); } catch (_) {}
    }
    fs.cpSync(webNext, rootNext, { recursive: true });
    console.log('✓ Synchronized .next build artifacts to root');
  }
} catch (e) {
  console.warn('⚠️ Artifact sync warning:', e.message);
}

console.log('✅ Build pipeline completed successfully!');
