# Design system — how it works and how to use it

## 1. Do I need to add every Shadcn component?

**No.** Add components **as you need them** for your design system.

- **Curate a core set** (e.g. Button, Input, Card, Dialog, Select, Tabs, Badge, etc.) and add more when a new project needs them:  
  `npx shadcn@latest add dialog select tabs`
- To see what’s available:  
  `npx shadcn@latest search`
- Adding `--all` is optional; it pulls many components you may never use. Prefer adding the ones you want to support and documenting that list (e.g. in this file or in Storybook).

## 2. How is styling done?

**Your design system styling is already in `src/index.css`.**

- **Tokens** (in the `@theme` block): brand, neutral, info, success, warning, danger, accent, typography, spacing, radius, shadows.
- **Semantic variables** (in `:root` and `.dark`): `--background`, `--foreground`, `--primary`, `--muted`, etc. Shadcn components use these by default, so they automatically follow your brand.
- **No need to “style” each component** unless you want different variants or behaviour. Tweak tokens in `index.css` to change the look everywhere; override individual components only when you need a one-off change.

## 3. How do new projects use this design system?

You have two main options.

### Option A — NPM (or private registry) package

1. **Build** this repo into a package (e.g. `dist/` with JS + CSS).
2. **Publish** as something like `@your-org/design-system` (or a private registry).
3. In a new project:
   - Install:  
     `npm install @your-org/design-system`
   - Import components:  
     `import { Button, Card } from '@your-org/design-system'`
   - Import the theme **once** in the app entry (e.g. `main.tsx`):  
     `import '@your-org/design-system/styles.css'`  
     (or whatever path you publish for the built CSS from `src/index.css`)

### Option B — Monorepo workspace package

1. Put this repo inside a monorepo as a workspace package (e.g. `packages/design-system`).
2. In other apps in the same monorepo, add a dependency:  
   `"@your-org/design-system": "workspace:*"`
3. In the app:
   - Import components from `@your-org/design-system`.
   - Import the theme CSS from the package, e.g.:  
     `import '@your-org/design-system/src/index.css'`  
     (or the built CSS path if you add a build step for the design system).

### What the consuming app must have

- **React** and **Tailwind** (same major version as this repo, e.g. v4) so the theme and utilities work.
- **One import of the design system CSS** so `:root`/`.dark` and `@theme` tokens apply. Without it, components won’t look right.

### Importing the theme in a new project

This package exposes its theme CSS so consumers can import it once (e.g. in `main.tsx`):

```ts
// In the consuming app (e.g. src/main.tsx)
import "tailwind-shadcn-brand/styles.css";
import { Button, Card, cn } from "tailwind-shadcn-brand";
```

If you publish under a different name (e.g. `@your-org/design-system`), use that name instead of `tailwind-shadcn-brand`.

### Using this repo as a package (workspace or npm)

- **Entry point:** `src/design-system.ts` re-exports the public API (components, `cn`).
- **Theme:** `src/index.css` is exposed as the `styles.css` export so consumers can `import "tailwind-shadcn-brand/styles.css"`.

Internal files use the `@/` path alias. For **workspace** use, the consuming app’s bundler must resolve `@/` when it’s compiling files inside this package (e.g. in Vite, the package is linked and the app’s `resolve.alias` may need to include the design-system’s `src` for `@/` when resolving from inside the package). If you hit “module not found” for `@/lib/utils` when importing from the design system, either:

1. **Build the design system** and consume the built output (recommended): run `npm run build:lib`, then point `main`/`exports` to the `dist/` output and have apps import from the built files and `dist/styles.css`, or  
2. **Alias in the consuming app** so that when resolving modules from inside `tailwind-shadcn-brand`, `@/` maps to `path-to-this-repo/src`.

---

**Summary:** Add Shadcn components as needed; styling lives in `src/index.css`; new projects install/link this package, import the theme CSS once, and import components from the package entry. Use a library build when you need reliable consumption without path-alias setup.
