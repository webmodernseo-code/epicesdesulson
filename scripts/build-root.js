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

// 3. Ensure .next at root is also synchronized if Vercel checks root .next
try {
  const rootNext = path.resolve(rootDir, '.next');
  const webNext = path.resolve(webDir, '.next');
  if (fs.existsSync(webNext) && !fs.existsSync(rootNext)) {
    if (process.platform === 'win32') {
      try { fs.symlinkSync(webNext, rootNext, 'junction'); } catch (_) {}
    } else {
      try { fs.symlinkSync(webNext, rootNext, 'dir'); } catch (_) {}
    }
  }
} catch (e) {
  // Ignore non-fatal symlink
}

console.log('✅ Build pipeline completed successfully!');
