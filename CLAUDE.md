# Colour tokens

**Always use existing semantic tokens for colours.**
Prefer `bg-primary`, `text-foreground`, `border-border`, etc. (the shadcn/Tailwind semantic layer)
over raw palette tokens like `--color-brand-50`.

Using semantic tokens means: if the design changes (e.g. all backgrounds go lighter), there is one
place to update — not every component.

**When to use a raw palette token:**

- It is a genuine one-off with no semantic equivalent
- A new semantic token is not warranted

**When to create a new semantic token:**

- The same value is needed in more than one place
- There is a clear, named role for it (e.g. `--sidebar-border`)
- Before creating it, check whether an existing token already covers the use-case

**Avoid dead code.** Only define tokens you are actually using. Do not add a full colour scale
"for future use" — add values when they are needed.

# Localising vs. sharing styles

- Component-specific tokens (e.g. `--sidebar-background`) belong next to the component, not in
  the global `index.css`.
- If the same token is needed in more than one component, promote it to `packages/ui/src/index.css`.
- When in doubt: localise first, promote later.

# Tailwind overrides

Check whether a custom token overrides a Tailwind default before adding it. If it does, and you
are not intentionally replacing that default, remove it.

# Design system file locations

| What                                                     | Where                              |
| -------------------------------------------------------- | ---------------------------------- |
| All brand tokens (colour, type, spacing, radius, shadow) | `packages/ui/src/index.css`        |
| Component exports                                        | `packages/ui/src/design-system.ts` |
| shadcn/ui components                                     | `packages/ui/src/components/ui/`   |

**Do not duplicate token definitions.** `index.css` is the single source of truth — all apps
import it via `@import "@justified/ui/styles.css"`.

# App Scaffolding & Layout Consistency

## Sidebar shell — always use `AppSidebar`

Every Justified app **must** use `AppSidebar` from `@justified/ui` as its sidebar root.
Never compose a sidebar from raw `Sidebar` + `SidebarHeader` + `SidebarFooter` primitives — that
is how drift happens.

```tsx
import { AppSidebar, SidebarUserFooter, sidebarNavButtonClass } from "@justified/ui";

<AppSidebar
  appName="My App"
  footer={<SidebarUserFooter name="Luke Patton" />}
  collapsible="none" // or "icon" for collapsible apps
>
  <SidebarContent>
    <SidebarGroup className="px-6 py-0">
      …nav items…
    </SidebarGroup>
  </SidebarContent>
</AppSidebar>
```

**What `AppSidebar` enforces automatically (do not override):**

| Area | Class |
| --- | --- |
| Header padding | `px-6 py-6` |
| Footer padding | `px-6 py-5` |
| Logo block | `size-8 rounded bg-sidebar-foreground text-sidebar text-[11px] font-semibold tracking-tight` |
| `SidebarRail` | always rendered |

## Sidebar spacing conventions

Nav group content must sit at `px-6 py-0` on the `SidebarGroup`:

```tsx
<SidebarGroup className="px-6 py-0">
  <SidebarGroupLabel>Section</SidebarGroupLabel>
  <SidebarGroupContent>…</SidebarGroupContent>
</SidebarGroup>
```

Never add horizontal padding to `SidebarContent` directly — set it per-group so different sections
can have different treatment if needed.

## Sidebar colour tokens

Always use **sidebar-scoped** tokens inside the sidebar, not generic foreground/background tokens.

| Purpose | Token to use | Do NOT use |
| --- | --- | --- |
| Logo background | `bg-sidebar-foreground` | `bg-foreground` / `bg-primary` |
| Logo text | `text-sidebar` | `text-background` |
| Nav label / muted text | `text-sidebar-foreground/40` | `text-muted-foreground` |
| Nav active / hover text | `text-sidebar-foreground` | `text-foreground` |
| Footer user name | `text-sidebar-foreground/40` | `text-foreground` |
| Avatar background | `bg-sidebar-foreground` | `bg-muted` |
| Avatar text | `text-sidebar` | `text-background` |

## Nav button class

Import `sidebarNavButtonClass` from `@justified/ui` for every nav `SidebarMenuButton`.
**Do not write this string inline** — changes to the nav style must be made in one place.

```tsx
import { sidebarNavButtonClass } from "@justified/ui";

<SidebarMenuButton isActive className={sidebarNavButtonClass}>
  <Icon className="size-4" /> Label
</SidebarMenuButton>
```

The class encodes: `h-7 text-xs text-sidebar-foreground/40 hover:bg-transparent
hover:text-sidebar-foreground data-[active=true]:bg-transparent
data-[active=true]:text-sidebar-foreground data-[active=true]:font-normal`

Key points:
- Nav items use **text colour only** to communicate active state — no background highlight
- `hover:bg-transparent` keeps the hover clean; no tile effect

## User footer

Use `SidebarUserFooter` from `@justified/ui` for the standard identity footer slot.
Initials are inferred automatically from the name if not provided.

```tsx
<AppSidebar footer={<SidebarUserFooter name="Luke Patton" />} />
// renders: LP avatar + "Luke Patton"
```

For non-user footers (e.g. an action button), pass any node directly to the `footer` prop.

## `SidebarProvider` width override

The default sidebar width is `16rem`. To match a specific design spec, override it on the provider:

```tsx
<SidebarProvider style={{ "--sidebar-width": "240px" } as React.CSSProperties}>
```

Only do this when the design spec calls for a specific width. Do not hard-code a `w-*` class on
the `Sidebar` itself.

## Badge variants

| Variant | Use case |
| --- | --- |
| `default` | Primary label, high-emphasis status |
| `secondary` | Low-emphasis state (e.g. "Generate", "Draft") |
| `outline` | Neutral, border-only label |
| `destructive` | Error or destructive state |
| `info` | Information states (e.g. "In Review") — renders `bg-blue-50 text-blue-600` |

The `info` variant uses raw `blue` palette classes because the Figma `information/500` token
(#2871ff) does not map to the `sky`-based `--color-info` semantic token. This is a documented
exception.

## Avoiding future drift

- **Sidebar shell decisions belong in `AppSidebar`.** Spacing, logo, and footer tokens live there.
  Per-app sidebars only supply nav content as children.
- **Nav button style belongs in `sidebarNavButtonClass`.** Never copy-paste the class string into
  an app; always import the constant.
- **Do not reach for `SidebarHeader` / `SidebarFooter` primitives directly** in app code — those
  are internals of `AppSidebar`.
- If a new spacing or colour pattern is needed in more than one app, add it to `AppSidebar` or
  export a new constant from `app-sidebar.tsx` — do not duplicate it.

_Rationale: all Justified apps share a single visual sidebar language. One change in `AppSidebar`
propagates everywhere without touching individual apps._

# Component placement rule

Before defining any React component helper in an app file, ask:
**"Could this be used in more than one app, or is it a pure UI primitive?"**

If yes → create it in `packages/ui/src/components/ui/` first, export it from
`packages/ui/src/design-system.ts`, then import it in the app.

If no → it may stay local, but flag it in a comment so it is easy to find later.

**Never define a reusable component inline in App.tsx or a page file.**
The only component that belongs as a non-export in an app file is the page's
own default export.

## Enforcement

- `pnpm audit:ui` — lists all local component definitions across every app.
  Run this after adding new components.
- `pnpm promote <Name> --from=<app>` — extracts a local component into the UI
  package and wires up the export automatically.

## When building new UI with me (Claude)

Before defining any helper component in an app file, check if it belongs in `@justified/ui`
and create it there first. Specifically:

1. Stop and check whether the component belongs in `@justified/ui`.
2. If it does, create the file in `packages/ui/src/components/ui/` first.
3. Export it from `packages/ui/src/design-system.ts`.
4. Import it in the app from `@justified/ui`.

Only skip this if the component is genuinely page-specific and will never be reused
(e.g. a one-off slide layout in pitch-maker).

# General coding rules

- Avoid over-engineering. Only make changes that are directly requested or clearly necessary.
- No "dead code" — remove unused variables, imports, and files rather than leaving them.
- Do not add component-level files (e.g. `main.tsx`) to `packages/ui` unless they serve a
  clear purpose for the shared package.
- Follow the existing file/folder conventions before introducing new patterns.
