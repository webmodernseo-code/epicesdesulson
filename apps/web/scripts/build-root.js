const { execFileSync } = require("node:child_process");
const path = require("node:path");

const appDirectory = path.resolve(__dirname, "..");

if (!process.env.DATABASE_URL) {
  process.env.DATABASE_URL = "postgresql://postgres:postgres@localhost:5432/build_placeholder";
}
if (!process.env.DIRECT_URL) process.env.DIRECT_URL = process.env.DATABASE_URL;

function run(command, args) {
  execFileSync(command, args, {
    cwd: appDirectory,
    env: process.env,
    stdio: "inherit",
    shell: process.platform === "win32",
  });
}

console.log("Generating Prisma Client for the storefront...");
run("npx", ["prisma", "generate"]);

console.log("Building the storefront...");
run("npx", ["next", "build"]);
