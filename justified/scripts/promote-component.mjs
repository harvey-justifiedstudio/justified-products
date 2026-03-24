#!/usr/bin/env node
/**
 * promote-component.mjs
 *
 * Extracts a locally-defined React component from an app and promotes it
 * to packages/ui — creating the component file and wiring up the export.
 *
 * Usage:
 *   pnpm promote <ComponentName> --from=<app-name>
 *
 * Example:
 *   pnpm promote AvatarStack --from=proposal-generator
 *
 * What it does:
 *   1. Finds the component definition in the app source.
 *   2. Creates packages/ui/src/components/ui/<kebab-name>.tsx with the code.
 *   3. Adds the named export to packages/ui/src/design-system.ts.
 *   4. Prints the import line to use in the app, and instructions to remove
 *      the local definition.
 *
 * What it does NOT do (review manually after running):
 *   - Remove the local definition from the app file (shown in output).
 *   - Migrate local TypeScript types referenced by the component.
 *   - Handle components that import from other local app files.
 */

import { existsSync, readFileSync, readdirSync, writeFileSync } from "fs";
import { join, relative } from "path";
import { fileURLToPath } from "url";

// ── Utilities ─────────────────────────────────────────────────────────────────

/** PascalCase → kebab-case */
function toKebab(str) {
  return str
    .replace(/([A-Z])/g, (c, _, i) => (i === 0 ? c.toLowerCase() : `-${c.toLowerCase()}`));
}

/** Parse CLI arguments: `promote <Name> --from=<app>` */
function parseArgs(argv) {
  const name = argv[2];
  const fromFlag = argv.find((a) => a.startsWith("--from="));
  if (!name || !fromFlag) {
    console.error(
      "Usage:   pnpm promote <ComponentName> --from=<app-name>\n" +
        "Example: pnpm promote AvatarStack --from=proposal-generator"
    );
    process.exit(1);
  }
  return { name, app: fromFlag.replace("--from=", "") };
}

/** Recursively list .tsx / .ts files, skipping node_modules. */
function walkSync(dir) {
  const results = [];
  let entries;
  try {
    entries = readdirSync(dir, { withFileTypes: true });
  } catch {
    return results;
  }
  for (const entry of entries) {
    const full = join(dir, entry.name);
    if (entry.isDirectory() && entry.name !== "node_modules") {
      results.push(...walkSync(full));
    } else if (entry.isFile() && (full.endsWith(".tsx") || full.endsWith(".ts"))) {
      results.push(full);
    }
  }
  return results;
}

/**
 * Extract a full component definition from source text.
 * Works by finding the function/const declaration, then brace-counting to
 * locate the closing `}`. Returns null if not found.
 */
function extractComponent(src, name) {
  // Matches either `function Name(` or `const Name =` (with optional JSDoc above).
  const startRe = new RegExp(
    `(\\/\\*\\*[\\s\\S]*?\\*\\/\\n)?` +           // optional JSDoc
    `(?:export\\s+)?` +                            // optional export
    `(?:function\\s+${name}[\\s<(]|const\\s+${name}\\s*[=:])`,
    "m"
  );

  const startMatch = src.match(startRe);
  if (!startMatch) return null;

  const startIdx = startMatch.index;
  let braceDepth = 0;
  let seenFirstBrace = false;
  let endIdx = startIdx;

  for (let i = startIdx; i < src.length; i++) {
    if (src[i] === "{") {
      braceDepth++;
      seenFirstBrace = true;
    } else if (src[i] === "}") {
      braceDepth--;
      if (seenFirstBrace && braceDepth === 0) {
        endIdx = i + 1;
        break;
      }
    }
  }

  if (endIdx === startIdx) return null;

  // Strip `export` from the snippet — the UI package file adds its own.
  return src.slice(startIdx, endIdx).trimEnd().replace(/^export\s+/, "");
}

// ── Main ──────────────────────────────────────────────────────────────────────

const __dirname = fileURLToPath(new URL(".", import.meta.url));
const root = join(__dirname, "..");
const { name, app } = parseArgs(process.argv);

// Validate the app exists.
const appSrc = join(root, "apps", app, "src");
if (!existsSync(appSrc)) {
  console.error(`✗  App not found: apps/${app}/src`);
  process.exit(1);
}

// 1. Search for the component across app source files.
const files = walkSync(appSrc);
let found = null;

for (const file of files) {
  const src = readFileSync(file, "utf-8");
  const snippet = extractComponent(src, name);
  if (snippet) {
    found = { file, snippet };
    break;
  }
}

if (!found) {
  console.error(
    `✗  Could not find "${name}" in apps/${app}/src/\n` +
      `   Run "pnpm audit:ui" to list all local components.`
  );
  process.exit(1);
}

console.log(`\nFound "${name}" in ${relative(root, found.file)}\n`);
console.log("─".repeat(64));
console.log(found.snippet);
console.log("─".repeat(64) + "\n");

// 2. Write to packages/ui.
const kebab = toKebab(name);
const destFile = join(root, "packages/ui/src/components/ui", `${kebab}.tsx`);

if (existsSync(destFile)) {
  console.warn(`⚠  ${relative(root, destFile)} already exists — skipping file creation.`);
} else {
  const fileContent = [
    `import * as React from "react";`,
    `import { cn } from "../../lib/utils";`,
    ``,
    found.snippet,
    ``,
    `export { ${name} };`,
    ``,
  ].join("\n");

  writeFileSync(destFile, fileContent);
  console.log(`✓  Created  packages/ui/src/components/ui/${kebab}.tsx`);
}

// 3. Register in design-system.ts.
const dsPath = join(root, "packages/ui/src/design-system.ts");
const dsSrc = readFileSync(dsPath, "utf-8");
const exportLine = `export { ${name} } from "./components/ui/${kebab}";`;

if (dsSrc.includes(exportLine)) {
  console.log(`   (export already present in design-system.ts)`);
} else {
  writeFileSync(dsPath, dsSrc.trimEnd() + `\n${exportLine}\n`);
  console.log(`✓  Exported  packages/ui/src/design-system.ts  ← ${exportLine}`);
}

// 4. Instructions.
const firstLine = found.snippet.split("\n")[0].trim();
console.log(`
Next steps
──────────
1. Review the generated file and move any local types into it:
     packages/ui/src/components/ui/${kebab}.tsx

2. In ${relative(root, found.file)}:
   a) Remove the local definition (starts with: ${firstLine})
   b) Add to the @justified/ui import block:
        ${name}

3. Verify nothing is broken:
     pnpm --filter @justified/${app} dev

4. Confirm no local components remain:
     pnpm audit:ui
`);
