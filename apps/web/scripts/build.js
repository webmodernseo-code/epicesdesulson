const { execSync } = require('child_process');
const path = require('path');

// Ensure DATABASE_URL is always defined so prisma generate never fails during Vercel build
if (!process.env.DATABASE_URL) {
  process.env.DATABASE_URL = 'postgresql://postgres:postgres@localhost:5432/epicesdesulson?sslmode=disable';
}
if (!process.env.DIRECT_URL) {
  process.env.DIRECT_URL = process.env.DATABASE_URL;
}

const args = process.argv.slice(2);
const isGenerateOnly = args.includes('--generate-only');

try {
  console.log('⚡ Generating Prisma Client...');
  execSync('npx prisma generate', {
    cwd: path.resolve(__dirname, '..'),
    env: process.env,
    stdio: 'inherit',
  });
  console.log('✓ Prisma Client generated successfully');
} catch (err) {
  console.warn('⚠️ Prisma generate warning (proceeding):', err.message);
}

if (!isGenerateOnly) {
  console.log('⚡ Building Next.js application...');
  execSync('npx next build', {
    cwd: path.resolve(__dirname, '..'),
    env: process.env,
    stdio: 'inherit',
  });
}
