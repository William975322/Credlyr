import { mkdir, writeFile, cp, rm } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const rootDir = path.dirname(fileURLToPath(import.meta.url));
const apiServerDist = path.resolve(rootDir, "artifacts/api-server/dist");
const frontendDist = path.resolve(rootDir, "artifacts/credlyr/dist/public");
const outputDir = path.resolve(rootDir, ".vercel/output");

async function buildVercelOutput() {
  const { execSync } = await import("node:child_process");

  // Determine pnpm command
  let pnpmCmd = "pnpm";
  try {
    execSync("pnpm --version", { stdio: "ignore" });
  } catch {
    pnpmCmd = "npx pnpm";
  }

  // Ensure env variables for vite build are set
  process.env.PORT = process.env.PORT || "5173";
  process.env.BASE_PATH = process.env.BASE_PATH || "/";

  // 1. Run the workspace build
  console.log("Running workspace build...");
  execSync(`${pnpmCmd} run build`, {
    cwd: rootDir,
    stdio: "inherit",
  });

  // 2. Clean and recreate the .vercel/output directory
  console.log("Cleaning and creating .vercel/output...");
  await rm(outputDir, { recursive: true, force: true });
  await mkdir(outputDir, { recursive: true });

  // 3. Create the static files directory and copy frontend output there
  const staticDir = path.join(outputDir, "static");
  await mkdir(staticDir, { recursive: true });
  console.log("Copying frontend static assets...");
  await cp(frontendDist, staticDir, { recursive: true });

  // 4. Create the function directory for the backend serverless function
  const funcDir = path.join(outputDir, "functions/api.func");
  await mkdir(funcDir, { recursive: true });
  console.log("Copying backend API server...");
  await cp(apiServerDist, funcDir, { recursive: true });

  // 5. Write the serverless function configuration (.vc-config.json)
  console.log("Writing .vc-config.json...");
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

  // 6. Write the global routing configuration (config.json)
  console.log("Writing global config.json...");
  await writeFile(
    path.join(outputDir, "config.json"),
    JSON.stringify(
      {
        version: 3,
        routes: [
          // Route explicit API requests to the serverless function
          {
            src: "/api",
            dest: "/api",
          },
          {
            src: "/api/(.*)",
            dest: "/api",
          },
          // Serve static files from static directory if they match
          {
            handle: "filesystem",
          },
          // Route all other requests to the frontend client router index.html
          {
            src: "/(.*)",
            dest: "/index.html",
          },
        ],
      },
      null,
      2,
    ),
  );

  console.log("Vercel Build Output API structure created successfully!");
}

buildVercelOutput().catch((err) => {
  console.error(err);
  process.exit(1);
});
