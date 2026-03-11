# Justified — Developer Guide

## Overview

This is a pnpm monorepo. All apps share a single design system (`packages/ui`) so that brand
changes and component updates propagate everywhere automatically — no copying, no syncing.

---

## Structure

```
justified/
├── apps/
│   ├── design-system/        → Brand showcase for stakeholders (localhost:5176)
│   ├── pitch-maker/          → Pitch deck builder (localhost:5175)
│   ├── invoice-generator/    → (stub)
│   └── onboarding-dashboard/ → (stub)
│
└── packages/
    └── ui/                   → Shared design system (@justified/ui)
        └── src/
            ├── index.css         ← ALL brand tokens live here (colours, type, spacing)
            ├── design-system.ts  ← Public exports — what apps can import
            └── components/ui/    ← shadcn/ui components, styled to the brand
```

---

## Getting started

```bash
pnpm install
pnpm dev          # starts all apps via Turborepo
```

Or start a single app:

```bash
cd apps/pitch-maker && pnpm dev       # localhost:5175
cd apps/design-system && pnpm dev     # localhost:5176
```

---

## The design system (`packages/ui`)

### Tokens — `src/index.css`

This is the **single source of truth** for all brand values. Every app imports this file.
Change a value here and it hot-reloads across all running apps instantly.

Key sections:
- `@theme` — typography, spacing, radius, shadows
- `:root` — colour palette (brand, neutral, info, success, warning, danger, accent)
- `:root` semantic block — maps palette colours to component roles (`--primary`, `--background`, etc.)
- `.dark` — dark mode overrides

**To rebrand:** only touch `index.css`. No component files need to change.

### Components — `src/components/ui/`

shadcn/ui components styled to the brand. They use semantic tokens (`bg-primary`, `text-foreground`,
etc.) so they automatically reflect whatever tokens are set in `index.css`.

Because `@justified/ui` is a workspace package, Vite resolves it as live source — editing a
component file hot-reloads in every running app immediately.

### Public API — `src/design-system.ts`

The only file apps should import from. When you add a new component, export it here:

```ts
export { MyComponent } from './components/ui/my-component'
```

---

## Adding a new component

1. Add the component file to `packages/ui/src/components/ui/`
2. Export it from `packages/ui/src/design-system.ts`
3. Add a preview section to `apps/design-system/src/App.tsx` so it shows in the brand showcase
4. Use it in any app: `import { MyComponent } from '@justified/ui'`

**shadcn/ui components** can be installed directly into `packages/ui/src/components/ui/`.
The components use `../../lib/utils` for the `cn()` helper (not `@/lib/utils` — that alias
only works in app-level code, not package-level code).

---

## Adding a new app

1. Create `apps/my-app/` — mirror the structure of `apps/pitch-maker/`
2. In `apps/my-app/src/index.css`:
   ```css
   @import "@justified/ui/styles.css";
   @source "../../../packages/ui/src/**/*.{ts,tsx}";
   ```
   The `@source` line is required — it tells Tailwind v4 to scan the UI package for class names.
   Without it, component utility classes won't be generated.
3. In `apps/my-app/package.json`, add `"@justified/ui": "workspace:*"` as a dependency
4. Run `pnpm install` from the monorepo root

---

## How tokens flow

```
packages/ui/src/index.css
    └── imported by every app via @import "@justified/ui/styles.css"
            ├── apps/design-system   (hot-reloads on change)
            ├── apps/pitch-maker     (hot-reloads on change)
            └── future apps...
```

```
packages/ui/src/components/ui/*.tsx
    └── resolved as live source via pnpm workspace symlink
            ├── apps/design-system   (hot-reloads on change)
            ├── apps/pitch-maker     (hot-reloads on change)
            └── future apps...
```

---

## Tech stack

| Layer | Tool |
|---|---|
| Monorepo | pnpm workspaces + Turborepo |
| Framework | React 18 + TypeScript |
| Bundler | Vite 6 |
| Styling | Tailwind CSS v4 (`@tailwindcss/vite`) |
| Components | shadcn/ui (manually scaffolded, no CLI) |
| Toasts | Sonner |

### Important: Tailwind v4 has no config file

There is no `tailwind.config.js`. Everything is configured in CSS via `@theme` blocks inside
`packages/ui/src/index.css`. Refer to the [Tailwind v4 docs](https://tailwindcss.com/docs) if
you're used to v3 — the configuration approach is different.

---

## Design system showcase

Open `localhost:5176` to see all colours, typography, shadows, and components rendered live.
This is built from `apps/design-system` and imports directly from `@justified/ui` — it is a
true reflection of the shared package, not a separate copy.
