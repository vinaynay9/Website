import { readFileSync, existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const rootDir = join(__dirname, "..");
const publicDir = join(rootDir, "public");

const errors = [];
const warnings = [];

// Check projects data file exists
const projectsPath = join(rootDir, "data", "projects.ts");
if (!existsSync(projectsPath)) {
  console.error("❌ Projects file not found");
  process.exit(1);
}

// Check required placeholder images
const requiredPlaceholders = [
  "/placeholders/this-website.svg",
  "/placeholders/read-the-field.svg",
  "/placeholders/anchor.svg",
  "/placeholders/blank-white.svg"
];

for (const placeholder of requiredPlaceholders) {
  const placeholderPath = join(publicDir, placeholder.replace(/^\//, ""));
  if (!existsSync(placeholderPath)) {
    warnings.push(`Missing placeholder: ${placeholder}`);
  }
}

// Report results
if (errors.length > 0) {
  console.error("\n❌ Errors:");
  errors.forEach((err) => console.error(`  ${err}`));
}

if (warnings.length > 0) {
  console.warn("\n⚠️  Warnings:");
  warnings.forEach((warn) => console.warn(`  ${warn}`));
}

if (errors.length === 0 && warnings.length === 0) {
  console.log("✅ All checks passed!");
  process.exit(0);
} else if (errors.length > 0) {
  process.exit(1);
} else {
  console.log("✅ Basic checks passed with warnings");
  process.exit(0);
}
