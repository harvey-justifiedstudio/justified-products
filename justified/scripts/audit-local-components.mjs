#!/usr/bin/env node
/**
 * audit-local-components.mjs
 *
 * Scans every app's src/ directory for React component definitions that are
 * NOT the default export. These are candidates for promotion to @justified/ui.
 *
 * Usage:
 *   pnpm audit:ui
 */

import { readFileSync, readdirSync } from "fs";
import { join, relative } from "path";
import { fileURLToPath } from "url";

const __dirname = fileURLToPath(new URL(".", import.meta.url));
const root = join(__dirname, "..");
const appsDir = join(root, "apps");

// Matches PascalCase React components (first letter upper, second lower).
// Deliberately excludes ALL_CAPS constants like SLIDES, SHADES, COLOR_PALETTES.
// Covers both `function Foo(` and `const Foo = (` / `const Foo: React.FC`.
const NAMED_COMPONENT_RE =
  /^(?:export\s+)?(?:function|const)\s+([A-Z][a-z][a-zA-Z0-9]*)\s*(?:[=:(])/gm;

// The default export name — excluded from results.
const DEFAULT_EXPORT_RE =
  /^export\s+default\s+(?:function\s+)?([A-Z][a-zA-Z0-9]+)/m;

function walk(dir) {
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
      results.push(...walk(full));
    } else if (entry.isFile() && (full.endsWith(".tsx") || full.endsWith(".ts"))) {
      results.push(full);
    }
  }
  return results;
}

const findings = [];

for (const entry of readdirSync(appsDir, { withFileTypes: true })) {
  if (!entry.isDirectory()) continue;

  const files = walk(join(appsDir, entry.name, "src"));

  for (const file of files) {
    const src = readFileSync(file, "utf-8");

    // Determine the page-level default export name so we skip it.
    const defaultMatch = src.match(DEFAULT_EXPORT_RE);
    const defaultName = defaultMatch?.[1];

    NAMED_COMPONENT_RE.lastIndex = 0;
    let match;
    while ((match = NAMED_COMPONENT_RE.exec(src)) !== null) {
      const name = match[1];
      if (name !== defaultName) {
        findings.push({
          app: entry.name,
          name,
          file: relative(root, file),
        });
      }
    }
  }
}

if (findings.length === 0) {
  console.log("✓ No local components found — all reusable components are in @justified/ui.");
  process.exit(0);
}

// Group by app for readable output.
const byApp = {};
for (const f of findings) {
  (byApp[f.app] ??= []).push(f);
}

console.log(
  `\n⚠  Found ${findings.length} component(s) defined locally in apps rather than in @justified/ui:\n`
);

for (const [app, items] of Object.entries(byApp)) {
  console.log(`  ${app}`);
  for (const { name, file } of items) {
    console.log(`    ${name.padEnd(32)} ${file}`);
  }
}

console.log(
  "\nIf any of these are reusable across apps, promote them:\n" +
    "  pnpm promote <ComponentName> --from=<app-name>\n"
);
