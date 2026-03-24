import React, { useState } from "react";
import {
  AppSidebar,
  SidebarUserFooter,
  sidebarNavButtonClass,
  Badge,
  Button,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarProvider,
} from "@justified/ui";
import { ArrowRight, Eye, Home, ScrollText, User } from "lucide-react";
import { GenerationFlow } from "./GenerationFlow";

// AvatarStack: local helper — specific to the proposals board layout.
function AvatarStack({ count }: { count: number }) {
  return (
    <div className="flex items-center">
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="size-6 rounded-full bg-muted border-2 border-background flex items-center justify-center -ml-1.5 first:ml-0"
          style={{ zIndex: count - i }}
        >
          <User className="size-3 text-muted-foreground" />
        </div>
      ))}
    </div>
  );
}

// ── Data types ────────────────────────────────────────────────────────────────

interface ProposalItem {
  id: number;
  title: string;
  timeAgo: string;
}

interface SentItem {
  id: number;
  title: string;
  timeAgo: string;
  views: number;
}

// ── App ───────────────────────────────────────────────────────────────────────

export default function App() {
  const [toGenerateItems, setToGenerateItems] = useState<ProposalItem[]>([
    { id: 1, title: "500_Brightfield", timeAgo: "4 days ago" },
    { id: 2, title: "500_Brightfield", timeAgo: "4 days ago" },
    { id: 3, title: "500_Brightfield", timeAgo: "4 days ago" },
  ]);

  const [inReviewItems, setInReviewItems] = useState<ProposalItem[]>([
    { id: 101, title: "500_Brightfield", timeAgo: "4 days ago" },
    { id: 102, title: "500_Brightfield", timeAgo: "4 days ago" },
    { id: 103, title: "500_Brightfield", timeAgo: "4 days ago" },
    { id: 104, title: "500_Brightfield", timeAgo: "4 days ago" },
  ]);

  const recentlySentItems: SentItem[] = [
    { id: 1, title: "400_Example", timeAgo: "4 days ago", views: 4 },
    { id: 2, title: "400_Example", timeAgo: "4 days ago", views: 4 },
    { id: 3, title: "400_Example", timeAgo: "4 days ago", views: 4 },
    { id: 4, title: "400_Example", timeAgo: "4 days ago", views: 4 },
  ];

  // null = no active flow; a proposal id = flow is running for that item
  const [activeItemId, setActiveItemId] = useState<number | null>(null);

  function handleStartGeneration(item: ProposalItem) {
    setActiveItemId(item.id);
  }

  function handleFlowComplete() {
    if (activeItemId === null) return;

    const item = toGenerateItems.find((i) => i.id === activeItemId);
    if (!item) return;

    // Move item from "To Generate" → "In Review"
    setToGenerateItems((items) => items.filter((i) => i.id !== activeItemId));
    setInReviewItems((items) => [item, ...items]);
    setActiveItemId(null);
  }

  return (
    <SidebarProvider style={{ "--sidebar-width": "240px" } as React.CSSProperties}>
      <AppSidebar
        collapsible="none"
        appName="Justified Studio"
        footer={<SidebarUserFooter name="Luke Patton" />}
      >
        <SidebarContent>
          <SidebarGroup className="px-6 py-0">
            <SidebarGroupLabel>Tools</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton className={sidebarNavButtonClass}>
                    <Home className="size-4" />
                    Home
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton className={sidebarNavButtonClass}>
                    <User className="size-4" />
                    Clients
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton isActive className={sidebarNavButtonClass}>
                    <ScrollText className="size-4" />
                    Proposals
                  </SidebarMenuButton>
                  <SidebarMenuSub>
                    <SidebarMenuSubItem>
                      <SidebarMenuSubButton>Generate</SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                    <SidebarMenuSubItem>
                      <SidebarMenuSubButton>Review</SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                    <SidebarMenuSubItem>
                      <SidebarMenuSubButton>Sent</SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                  </SidebarMenuSub>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>

          <SidebarGroup className="px-6 py-0">
            <SidebarGroupLabel>Recent</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton className={sidebarNavButtonClass}>
                    <Home className="size-4" />
                    Home
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton className={sidebarNavButtonClass}>
                    <User className="size-4" />
                    Clients
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton className={sidebarNavButtonClass}>
                    <ScrollText className="size-4" />
                    Proposals
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </AppSidebar>

      <SidebarInset className="bg-background min-h-screen">
        <div className="px-[120px] py-[80px]">
          {/* Page header */}
          <div className="flex flex-col gap-[7px] mb-16">
            <p className="text-sm font-medium text-muted-foreground">Proposal Generator</p>
            <h1 className="font-display text-[32px] leading-10 font-medium text-foreground">
              Lets create a proposal
            </h1>
          </div>

          <div className="flex flex-col gap-16">
            {/* To Generate */}
            <div className="flex flex-col gap-5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1">
                  <span className="text-xs font-medium text-foreground">To Generate</span>
                  <span className="text-xs font-medium text-blue-600">{toGenerateItems.length}</span>
                </div>
                <Button variant="ghost" size="sm" className="h-6 px-2 text-xs text-muted-foreground gap-1">
                  See all
                  <ArrowRight className="size-3" />
                </Button>
              </div>
              <div className="flex gap-2">
                {toGenerateItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => handleStartGeneration(item)}
                    className="flex-1 bg-card rounded-lg p-4 flex flex-col gap-3 text-left cursor-pointer hover:bg-secondary transition-colors duration-100"
                  >
                    <p className="text-base font-medium tracking-tight">{item.title}</p>
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary" className="rounded-full">Generate</Badge>
                      <span className="text-xs text-muted-foreground">{item.timeAgo}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* In Review + Recently Sent */}
            <div className="flex items-start gap-8">
              {/* In Review */}
              <div className="flex flex-col gap-4 flex-1">
                <div className="flex items-center gap-1">
                  <span className="text-xs font-medium text-muted-foreground">In Review</span>
                  <span className="text-xs font-medium text-muted-foreground">{inReviewItems.length}</span>
                </div>
                <div className="flex flex-col gap-2">
                  {inReviewItems.map((item) => (
                    <div key={item.id} className="bg-card rounded-lg p-4 flex flex-col gap-4">
                      <p className="text-base font-medium tracking-tight">{item.title}</p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1">
                          <Badge variant="info" className="rounded-full">In Review</Badge>
                          <span className="text-xs text-muted-foreground">{item.timeAgo}</span>
                        </div>
                        <AvatarStack count={2} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recently Sent */}
              <div className="flex flex-col gap-4 w-[388px] shrink-0">
                <div className="flex items-center gap-1">
                  <span className="text-xs font-medium text-muted-foreground">Recently Sent</span>
                  <span className="text-xs font-medium text-muted-foreground">24</span>
                </div>
                <div className="flex flex-col gap-4">
                  {recentlySentItems.map((item) => (
                    <div key={item.id} className="flex items-center justify-between">
                      <p className="text-base font-medium tracking-tight">{item.title}</p>
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-muted-foreground">{item.timeAgo}</span>
                        <div className="flex items-center gap-1 bg-blue-50 text-blue-600 rounded-lg px-1.5 py-0.5">
                          <span className="text-xs font-medium">{item.views}</span>
                          <Eye className="size-4" />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </SidebarInset>

      {/* Generation flow overlay — rendered outside SidebarInset so it covers the full viewport */}
      {activeItemId !== null && (
        <GenerationFlow onComplete={handleFlowComplete} />
      )}
    </SidebarProvider>
  );
}
