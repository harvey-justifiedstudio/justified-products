/**
 * Design system public API.
 * Import from this file (or from the package name) in consuming projects.
 *
 * In the consuming app, also import the theme once, e.g.:
 *   import '@your-package/design-system/src/index.css'
 * or the built CSS path if you publish a built package.
 */

// Utils
export { cn } from "./lib/utils";

// UI components
export { Button, buttonVariants } from "./components/ui/button";
export { Input } from "./components/ui/input";
export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent } from "./components/ui/card";
export { Badge, badgeVariants } from "./components/ui/badge";
export { Separator } from "./components/ui/separator";
export { Skeleton } from "./components/ui/skeleton";
export { Sheet, SheetTrigger, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "./components/ui/sheet";
export {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider,
} from "./components/ui/tooltip";
export { Toaster } from "./components/ui/sonner";
export {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupAction,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInput,
  SidebarInset,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSkeleton,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarProvider,
  SidebarRail,
  SidebarSeparator,
  SidebarTrigger,
  useSidebar,
} from "./components/ui/sidebar";
