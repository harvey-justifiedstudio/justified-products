import * as React from "react";
import { Sidebar, SidebarFooter, SidebarHeader, SidebarRail } from "./sidebar";
import { cn } from "../../lib/utils";

// ── Shared sidebar token constants ────────────────────────────────────────────
// These classes encode the brand sidebar conventions. Import from this file
// (or `@justified/ui`) rather than writing them inline per-app.

/** Logo block: 8×8 black square with white initials — top of every sidebar. */
export const sidebarLogoClass =
  "flex size-8 shrink-0 items-center justify-center rounded bg-sidebar-foreground text-[11px] font-semibold tracking-tight text-sidebar select-none";

/** Primary nav button base class. Transparent background, text-colour driven. */
export const sidebarNavButtonClass =
  "h-7 text-sm font-medium text-sidebar-foreground/40 hover:bg-transparent hover:text-sidebar-foreground active:bg-transparent active:text-sidebar-foreground data-[active=true]:bg-transparent data-[active=true]:text-sidebar-foreground data-[active=true]:font-normal";

/** Footer avatar circle. */
export const sidebarAvatarClass =
  "flex size-6 shrink-0 items-center justify-center rounded-full bg-sidebar-foreground text-[9px] font-semibold text-sidebar select-none";

// ── AppSidebar shell ──────────────────────────────────────────────────────────

export interface AppSidebarProps extends React.ComponentProps<typeof Sidebar> {
  /** Two-letter brand initials rendered in the logo block. Defaults to "JS". */
  initials?: string;
  /** App/context name shown beneath the logo. */
  appName?: string;
  /** Footer slot — typically a user identity or action button. */
  footer?: React.ReactNode;
  /** Nav content rendered inside SidebarContent. */
  children?: React.ReactNode;
}

/**
 * `AppSidebar` is the standard Justified Studio sidebar shell.
 *
 * It enforces consistent spacing, token usage, and the JS logo block across
 * every app. Pass `children` for nav content and `footer` for the bottom slot.
 *
 * ```tsx
 * <AppSidebar appName="Proposal Generator" footer={<UserFooter />}>
 *   <SidebarGroup className="px-6 py-0">…</SidebarGroup>
 * </AppSidebar>
 * ```
 */
export function AppSidebar({ initials = "JS", appName, footer, children, className, ...props }: AppSidebarProps) {
  return (
    <Sidebar className={cn("h-screen", className)} {...props}>
      <SidebarHeader className="px-6 py-6 flex flex-col gap-4">
        <div className={sidebarLogoClass}>{initials}</div>
        {appName && <span className="text-ms font-medium text-sidebar-foreground/40 group-data-[collapsible=icon]:hidden">{appName}</span>}
      </SidebarHeader>

      {children}

      {footer && <SidebarFooter className="px-6 py-5">{footer}</SidebarFooter>}

      <SidebarRail />
    </Sidebar>
  );
}

// ── Convenience: standard user footer ────────────────────────────────────────

export interface SidebarUserFooterProps {
  /** User's display name. */
  name: string;
  /** Two-letter initials for the avatar. Inferred from name if omitted. */
  initials?: string;
}

/**
 * Standard user identity footer for `AppSidebar`.
 *
 * ```tsx
 * <AppSidebar footer={<SidebarUserFooter name="Luke Patton" />} />
 * ```
 */
export function SidebarUserFooter({ name, initials }: SidebarUserFooterProps) {
  const avatarInitials =
    initials ??
    name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .slice(0, 2)
      .toUpperCase();

  return (
    <div className="flex items-center gap-2 group-data-[collapsible=icon]:justify-center">
      <div className={sidebarAvatarClass}>{avatarInitials}</div>
      <span className="text-xs text-sidebar-foreground/40 group-data-[collapsible=icon]:hidden">{name}</span>
    </div>
  );
}
