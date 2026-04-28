import fs from "node:fs";
import path from "node:path";

const cwd = process.cwd();
const hasApp = fs.existsSync(path.join(cwd, "app"));
const hasPages = fs.existsSync(path.join(cwd, "pages"));

if (!hasApp && !hasPages) {
  console.error("Netlify is building from the wrong directory.");
  console.error(`Current directory: ${cwd}`);
  console.error("Expected to find either an app/ or pages/ directory here.");
  console.error("Set Netlify Base directory to the folder that contains package.json and app/.");
  process.exit(1);
}

console.log(`Next.js root verified: ${hasApp ? "app/" : ""}${hasPages ? " pages/" : ""}`);
