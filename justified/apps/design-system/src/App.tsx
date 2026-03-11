import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Agentation } from "agentation";
import { ArrowRight, Check, Download, Loader2, Mail, Plus, Send, Settings, Trash2, X } from "lucide-react";
import {
  Button,
  Badge,
  Input,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarRail,
  SidebarTrigger,
} from "@justified/ui";

type NavItem = { label: string; href: string };

const navItems: { foundations: NavItem[]; components: NavItem[] } = {
  foundations: [
    { label: "Colours", href: "#palette" },
    { label: "Typography", href: "#typography" },
    { label: "Shadows", href: "#shadows" },
  ],
  components: [
    { label: "Buttons", href: "#buttons" },
    { label: "Inputs", href: "#inputs" },
    { label: "Form example", href: "#form-mockup" },
    { label: "Badges", href: "#badges" },
    { label: "Toasts", href: "#toasts" },
  ],
};

const navButtonClass =
  "h-7 text-xs text-sidebar-foreground/40 hover:bg-transparent hover:text-sidebar-foreground data-[active=true]:bg-transparent data-[active=true]:text-sidebar-foreground data-[active=true]:font-normal";

function AppSidebar() {
  const [activeHref, setActiveHref] = useState(() => window.location.hash || "#palette");

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <div className="flex items-center gap-2 px-6 py-6">
          <div className="flex size-8 shrink-0 items-center justify-center rounded bg-sidebar-foreground text-[11px] font-semibold tracking-tight text-sidebar select-none">
            JS
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup className="px-6 py-0">
          <SidebarGroupContent>
            <SidebarMenu className="gap-0">
              {navItems.foundations.map((item) => (
                <SidebarMenuItem key={item.href}>
                  <SidebarMenuButton asChild tooltip={item.label} isActive={activeHref === item.href} className={navButtonClass}>
                    <a href={item.href} onClick={() => setActiveHref(item.href)}>
                      <span>{item.label}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}

              <div className="py-2" />

              {navItems.components.map((item) => (
                <SidebarMenuItem key={item.href}>
                  <SidebarMenuButton asChild tooltip={item.label} isActive={activeHref === item.href} className={navButtonClass}>
                    <a href={item.href} onClick={() => setActiveHref(item.href)}>
                      <span>{item.label}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <div className="flex items-center gap-2 px-6 py-5">
          <div className="flex size-6 shrink-0 items-center justify-center rounded-full bg-sidebar-foreground text-[9px] font-semibold text-sidebar select-none group-data-[collapsible=icon]:mx-auto">
            BD
          </div>
          <span className="text-xs text-sidebar-foreground/40 group-data-[collapsible=icon]:hidden">Tailwind v4 · shadcn/ui</span>
        </div>
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  );
}

const COLOR_PALETTES = [
  { id: "brand", label: "Brand", prefix: "--color-brand" },
  { id: "neutral", label: "Neutral", prefix: "--color-neutral" },
  { id: "info", label: "Info", prefix: "--color-info" },
  { id: "success", label: "Success", prefix: "--color-success" },
  { id: "warning", label: "Warning", prefix: "--color-warning" },
  { id: "danger", label: "Danger", prefix: "--color-danger" },
  { id: "accent", label: "Accent", prefix: "--color-accent" },
] as const;

const SHADES = ["50", "100", "200", "300", "400", "500", "600", "700", "800", "900", "950"] as const;

const SEMANTIC_TOKENS = [
  { id: "success", label: "Success", varName: "--color-success" },
  { id: "warning", label: "Warning", varName: "--color-warning" },
  { id: "danger", label: "Danger", varName: "--color-danger" },
  { id: "info", label: "Info", varName: "--color-info" },
] as const;

export default function App() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);

  return (
    <div className={dark ? "dark" : ""}>
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
          {/* Floating toggles */}
          <SidebarTrigger
            className="fixed bottom-6 right-6 z-50 size-12 rounded-full shadow-lg border bg-background hover:bg-muted transition-colors"
            aria-label="Toggle sidebar"
          />
          <Button
            variant="outline"
            size="icon"
            onClick={() => setDark((d) => !d)}
            className="fixed bottom-6 right-20 z-50 size-12 rounded-full shadow-lg bg-background hover:bg-muted transition-colors"
            aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
          >
            {dark ? "☀" : "☾"}
          </Button>

          {/* Main content */}
          <main className="flex-1 p-6 md:p-10">
            <div className="mx-auto max-w-3xl space-y-12 md:space-y-16">
              <div>
                <h1 className="text-2xl md:text-3xl font-semibold tracking-tight">Brand Design System</h1>
                <p className="text-muted-foreground mt-1 text-sm">Review how tokens map to components, in one place.</p>
              </div>

              {/* ── FOUNDATIONS: Colours first ── */}
              <section id="palette" className="py-6 md:py-8 space-y-6">
                <div>
                  <h2 className="text-lg font-semibold">Colours</h2>
                  <p className="text-sm text-muted-foreground mt-1">Hover to inspect a token. Click any swatch to copy it to your clipboard.</p>
                </div>

                <TooltipProvider delayDuration={150}>
                  <div className="space-y-2">
                    {COLOR_PALETTES.map((palette) => (
                      <div key={palette.id} className="flex items-center gap-4">
                        <span className="w-14 shrink-0 text-right text-xs text-muted-foreground">{palette.label}</span>
                        <div className="flex flex-1 overflow-hidden rounded-lg h-10" style={{ boxShadow: "inset 0 0 0 1px rgba(0,0,0,0.08)" }}>
                          {SHADES.map((shade) => {
                            const varName = `${palette.prefix}-${shade}`;
                            const semanticLabel = `${palette.label} ${shade}`;
                            return (
                              <Tooltip key={shade}>
                                <TooltipTrigger asChild>
                                  <button
                                    className="flex-1 h-full cursor-pointer transition-opacity hover:opacity-75 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring"
                                    style={{
                                      background: `var(${varName})`,
                                      boxShadow: "inset 0 0 0 0.5px rgba(0,0,0,0.07)",
                                    }}
                                    onClick={() => {
                                      navigator.clipboard.writeText(varName);
                                      toast(`Copied ${semanticLabel}`, { duration: 1500 });
                                    }}
                                    aria-label={`Copy ${semanticLabel}`}
                                  />
                                </TooltipTrigger>
                                <TooltipContent side="bottom">
                                  <p className="font-medium text-xs">{semanticLabel}</p>
                                  <p className="font-mono text-[11px] text-muted-foreground">{varName}</p>
                                </TooltipContent>
                              </Tooltip>
                            );
                          })}
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="space-y-2 pt-2">
                    <p className="text-xs font-medium text-muted-foreground">Semantic tokens</p>
                    <div className="flex gap-2 flex-wrap">
                      {SEMANTIC_TOKENS.map((token) => (
                        <Tooltip key={token.id}>
                          <TooltipTrigger asChild>
                            <button
                              className="flex items-center gap-2 rounded-md border border-border/30 px-3 py-1.5 text-xs hover:bg-muted/50 transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                              onClick={() => {
                                navigator.clipboard.writeText(token.varName);
                                toast(`Copied ${token.varName}`, { duration: 1500 });
                              }}
                            >
                              <span className="size-3 rounded-full shrink-0" style={{ background: `var(${token.varName})` }} />
                              {token.label}
                            </button>
                          </TooltipTrigger>
                          <TooltipContent side="bottom">
                            <p className="font-mono text-[11px]">{token.varName}</p>
                          </TooltipContent>
                        </Tooltip>
                      ))}
                    </div>
                  </div>
                </TooltipProvider>
              </section>

              {/* ── FOUNDATIONS: Typography ── */}
              <section id="typography" className="py-6 md:py-8 space-y-6">
                <div>
                  <h2 className="text-lg font-semibold">Typography</h2>
                  <p className="text-sm text-muted-foreground mt-1">Headings, body copy, and muted styles based on your font tokens.</p>
                </div>
                <div className="space-y-4">
                  <div className="space-y-1">
                    <p className="text-xs font-medium text-muted-foreground">Display</p>
                    <p className="font-display text-4xl font-bold">Heading 1 — 4xl bold / display</p>
                    <p className="font-display text-3xl font-semibold">Heading 2 — 3xl semibold / display</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs font-medium text-muted-foreground">Headings</p>
                    <p className="text-2xl font-semibold">Heading 3 — 2xl semibold</p>
                    <p className="text-xl font-medium">Heading 4 — xl medium</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs font-medium text-muted-foreground">Body</p>
                    <p className="text-base">Body — base regular. Use this for most product copy and paragraphs.</p>
                    <p className="text-sm text-muted-foreground">Small muted — sm / muted-foreground. Ideal for helper text and descriptions.</p>
                    <p className="text-xs text-muted-foreground">Extra small — xs / muted-foreground. Use sparingly for meta labels.</p>
                  </div>
                </div>
              </section>

              {/* ── FOUNDATIONS: Shadows ── */}
              <section id="shadows" className="py-6 md:py-8 space-y-6">
                <div>
                  <h2 className="text-lg font-semibold">Shadows</h2>
                  <p className="text-sm text-muted-foreground mt-1">
                    Shadow tokens from your theme. Use <code className="bg-muted px-1 py-0.5 rounded text-xs">shadow-*</code> utilities or{" "}
                    <code className="bg-muted px-1 py-0.5 rounded text-xs">--shadow-*</code> in{" "}
                    <code className="bg-muted px-1 py-0.5 rounded text-xs">packages/ui/src/index.css</code> to rebrand.
                  </p>
                </div>
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {[
                    { id: "sm", label: "Small", token: "shadow-sm", desc: "Subtle elevation" },
                    { id: "md", label: "Medium", token: "shadow-md", desc: "Cards, dropdowns" },
                    { id: "lg", label: "Large", token: "shadow-lg", desc: "Modals, popovers" },
                  ].map((s) => (
                    <div key={s.id} className="space-y-2 rounded-lg p-4">
                      <div className="flex items-baseline justify-between">
                        <h3 className="text-sm font-medium">{s.label}</h3>
                        <span className="text-[10px] text-muted-foreground">{s.token}</span>
                      </div>
                      <p className="text-xs text-muted-foreground">{s.desc}</p>
                      <div className={`h-20 rounded-md bg-muted/50 ${s.token}`} />
                    </div>
                  ))}
                </div>
              </section>

              {/* ── COMPONENTS ── */}
              {/* Buttons */}
              <section id="buttons" className="py-6 md:py-8 space-y-6">
                <div>
                  <h2 className="text-lg font-semibold">Buttons</h2>
                  <p className="text-sm text-muted-foreground mt-1">All button variants, sizes, icon placements, and states using your theme tokens.</p>
                </div>

                {/* Variants */}
                <div className="space-y-2">
                  <p className="text-xs font-medium text-muted-foreground">Variants</p>
                  <div className="rounded-lg y-4">
                    <div className="flex flex-wrap gap-3">
                      <Button>
                        <Plus className="size-4" /> Default
                      </Button>
                      <Button variant="secondary">
                        <Settings className="size-4" /> Secondary
                      </Button>
                      <Button variant="outline">
                        <Download className="size-4" /> Outline
                      </Button>
                      <Button variant="ghost">
                        <Mail className="size-4" /> Ghost
                      </Button>
                      <Button variant="link">
                        <ArrowRight className="size-4" /> Link
                      </Button>
                      <Button variant="destructive">
                        <Trash2 className="size-4" /> Destructive
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Sizes */}
                <div className="space-y-2">
                  <p className="text-xs font-medium text-muted-foreground">Sizes</p>
                  <div className="rounded-lg y-4">
                    <div className="flex flex-wrap items-center gap-3">
                      <Button size="sm">
                        <Plus className="size-3.5" /> Small
                      </Button>
                      <Button size="default">
                        <Plus className="size-4" /> Default
                      </Button>
                      <Button size="lg">
                        <Plus className="size-4" /> Large
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Icon placement */}
                <div className="space-y-2">
                  <p className="text-xs font-medium text-muted-foreground">Icon placement</p>
                  <div className="rounded-lg y-4">
                    <div className="flex flex-wrap items-center gap-3">
                      <Button>
                        <Mail className="size-4" /> Leading icon
                      </Button>
                      <Button>
                        Trailing icon <ArrowRight className="size-4" />
                      </Button>
                      <Button variant="outline">
                        <Download className="size-4" /> Leading outline
                      </Button>
                      <Button variant="outline">
                        Send <Send className="size-4" />
                      </Button>
                      <Button variant="secondary">
                        <Check className="size-4" /> Confirm
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Icon-only */}
                <div className="space-y-2">
                  <p className="text-xs font-medium text-muted-foreground">Icon only</p>
                  <div className="rounded-lg y-4">
                    <div className="flex flex-wrap items-center gap-3">
                      <Button size="icon" aria-label="Add">
                        <Plus className="size-4" />
                      </Button>
                      <Button size="icon" variant="secondary" aria-label="Settings">
                        <Settings className="size-4" />
                      </Button>
                      <Button size="icon" variant="outline" aria-label="Download">
                        <Download className="size-4" />
                      </Button>
                      <Button size="icon" variant="ghost" aria-label="Close">
                        <X className="size-4" />
                      </Button>
                      <Button size="icon" variant="destructive" aria-label="Delete">
                        <Trash2 className="size-4" />
                      </Button>
                    </div>
                  </div>
                </div>

                {/* States */}
                <div className="space-y-2">
                  <p className="text-xs font-medium text-muted-foreground">States</p>
                  <div className="rounded-lg y-4">
                    <div className="flex flex-wrap items-center gap-3">
                      <Button disabled>
                        <Plus className="size-4" /> Disabled
                      </Button>
                      <Button variant="outline" disabled>
                        <Download className="size-4" /> Disabled outline
                      </Button>
                      <Button disabled>
                        <Loader2 className="size-4 animate-spin" /> Loading…
                      </Button>
                      <Button variant="secondary" disabled>
                        <Loader2 className="size-4 animate-spin" /> Saving…
                      </Button>
                    </div>
                  </div>
                </div>
              </section>

              {/* Inputs */}
              <section id="inputs" className="py-6 md:py-8 space-y-6">
                <div>
                  <h2 className="text-lg font-semibold">Inputs</h2>
                  <p className="text-sm text-muted-foreground mt-1">
                    Input states: default, placeholder, focus, hover, disabled, error, and read-only.
                  </p>
                </div>
                <div className="grid gap-4 max-w-md sm:grid-cols-2">
                  <div className="space-y-1">
                    <p className="text-xs font-medium text-muted-foreground">Default</p>
                    <Input placeholder="Search..." />
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs font-medium text-muted-foreground">Placeholder</p>
                    <Input placeholder="Enter your email" />
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs font-medium text-muted-foreground">Disabled</p>
                    <Input placeholder="Disabled" disabled />
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs font-medium text-muted-foreground">Error</p>
                    <Input placeholder="Invalid value" error defaultValue="not-an-email" />
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs font-medium text-muted-foreground">Read-only</p>
                    <Input readOnly defaultValue="Cannot edit" />
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs font-medium text-muted-foreground">Hover</p>
                    <Input placeholder="Hover to see state" />
                  </div>
                </div>
              </section>

              {/* Form mockup */}
              <section id="form-mockup" className="py-6 md:py-8 space-y-6">
                <div>
                  <h2 className="text-lg font-semibold">Form example</h2>
                  <p className="text-sm text-muted-foreground mt-1">
                    A sample form using inputs, labels, and buttons so you can see how the design system looks in a real layout.
                  </p>
                </div>
                <div className="max-w-md space-y-6">
                  <div className="space-y-2">
                    <h3 className="text-base font-medium">Contact us</h3>
                    <p className="text-sm text-muted-foreground">Send a message and we'll get back to you.</p>
                  </div>
                  <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                    <div className="space-y-2">
                      <label htmlFor="form-name" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                        Full name
                      </label>
                      <Input id="form-name" placeholder="Jane Doe" />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="form-email" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                        Email
                      </label>
                      <Input id="form-email" type="email" placeholder="jane@example.com" />
                      <p className="text-xs text-muted-foreground">We'll never share your email.</p>
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="form-subject" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                        Subject
                      </label>
                      <Input id="form-subject" placeholder="How can we help?" />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="form-message" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                        Message
                      </label>
                      <textarea
                        id="form-message"
                        placeholder="Your message..."
                        rows={4}
                        className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 hover:border-muted-foreground/30 hover:bg-muted/30 transition-colors resize-none"
                      />
                    </div>
                    <div className="flex gap-2 pt-2">
                      <Button type="submit">Send message</Button>
                      <Button type="button" variant="outline">
                        Cancel
                      </Button>
                    </div>
                  </form>
                </div>
              </section>

              {/* Badges */}
              <section id="badges" className="py-6 md:py-8 space-y-6">
                <div>
                  <h2 className="text-lg font-semibold">Badges</h2>
                  <p className="text-sm text-muted-foreground mt-1">Inline labels using primary, secondary, outline, and destructive styles.</p>
                </div>
                <div className="flex flex-wrap gap-3">
                  <Badge>Default</Badge>
                  <Badge variant="secondary">Secondary</Badge>
                  <Badge variant="outline">Outline</Badge>
                  <Badge variant="destructive">Destructive</Badge>
                </div>
              </section>

              {/* Toasts */}
              <section id="toasts" className="py-6 md:py-8 space-y-6">
                <div>
                  <h2 className="text-lg font-semibold">Toasts</h2>
                  <p className="text-sm text-muted-foreground mt-1">
                    Notifications via <code className="bg-muted px-1 py-0.5 rounded text-xs">sonner</code>. Call{" "}
                    <code className="bg-muted px-1 py-0.5 rounded text-xs">toast()</code> anywhere in your app.
                  </p>
                </div>
                <div className="flex flex-wrap gap-2">
                  <Button variant="outline" onClick={() => toast("Event has been created.")}>
                    Default
                  </Button>
                  <Button variant="outline" onClick={() => toast.success("Changes saved successfully.")}>
                    Success
                  </Button>
                  <Button variant="outline" onClick={() => toast.error("Something went wrong.")}>
                    Error
                  </Button>
                  <Button variant="outline" onClick={() => toast.warning("This action cannot be undone.")}>
                    Warning
                  </Button>
                  <Button variant="outline" onClick={() => toast.info("New version available.")}>
                    Info
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() =>
                      toast("File uploaded", {
                        description: "profile-image.png was uploaded to /assets.",
                        action: { label: "Undo", onClick: () => toast("Undo clicked") },
                      })
                    }
                  >
                    With action
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => {
                      const id = toast.loading("Uploading file…");
                      setTimeout(() => toast.success("Upload complete!", { id }), 2000);
                    }}
                  >
                    Promise / loading
                  </Button>
                </div>
              </section>
            </div>
          </main>
        </SidebarInset>
      </SidebarProvider>
      <Agentation />
    </div>
  );
}
