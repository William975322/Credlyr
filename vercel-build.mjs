import { mkdir, writeFile, cp, rm } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const rootDir = path.dirname(fileURLToPath(import.meta.url));
const apiServerDist = path.resolve(
  rootDir,
  "artifacts/api-server/dist",
);
const outputDir = path.resolve(rootDir, ".vercel/output");

async function buildVercelOutput() {
  // 1. Build the API server using its own esbuild bundler
  const { execSync } = await import("node:child_process");
  console.log("Building API server...");

  // Determine pnpm command — on Vercel, pnpm is in PATH; locally, use npx
  let pnpmCmd = "pnpm";
  try {
    execSync("pnpm --version", { stdio: "ignore" });
  } catch {
    pnpmCmd = "npx pnpm";
  }

  execSync(`${pnpmCmd} --filter @workspace/api-server run build`, {
    cwd: rootDir,
    stdio: "inherit",
  });

  // 2. Clean and create the .vercel/output structure
  await rm(outputDir, { recursive: true, force: true });
  const funcDir = path.join(outputDir, "functions/index.func");
  await mkdir(funcDir, { recursive: true });

  // 3. Copy the bundled output into the function directory
  await cp(apiServerDist, funcDir, { recursive: true });

  // 4. Write the function config
  await writeFile(
    path.join(funcDir, ".vc-config.json"),
    JSON.stringify(
      {
        runtime: "nodejs22.x",
        handler: "index.mjs",
        launcherType: "Nodejs",
      },
      null,
      2,
    ),
  );

  // 5. Write the global routing config
  await writeFile(
    path.join(outputDir, "config.json"),
    JSON.stringify(
      {
        version: 3,
        routes: [
          {
            src: "/(.*)",
            dest: "/index",
          },
        ],
      },
      null,
      2,
    ),
  );

  console.log("Vercel Build Output API structure created at .vercel/output/");
}

buildVercelOutput().catch((err) => {
  console.error(err);
  process.exit(1);
});
