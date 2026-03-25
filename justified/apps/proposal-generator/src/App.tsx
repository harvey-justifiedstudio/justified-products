import React, { useRef, useState } from "react";
import { Badge, cn } from "@justified/ui";
import { Search } from "lucide-react";
import { GenerationFlow } from "./GenerationFlow";
import { ProposalReview } from "./ProposalReview";

// ── Data types ────────────────────────────────────────────────────────────────

type Tab = "generate" | "review" | "sent" | "archive";
type AppView = "list" | "review";

interface ProposalItem {
  id: number;
  title: string;
  dateGroup: "today" | "yesterday";
}

// ── App ───────────────────────────────────────────────────────────────────────

export default function App() {
  // ── View routing ───────────────────────────────────────────────────────────
  const [appView, setAppView] = useState<AppView>("list");
  const [reviewingItem, setReviewingItem] = useState<ProposalItem | null>(null);

  // ── Tab state ──────────────────────────────────────────────────────────────
  const [activeTab, setActiveTab] = useState<Tab>("generate");

  // ── Proposal lists ─────────────────────────────────────────────────────────
  const [toGenerateItems, setToGenerateItems] = useState<ProposalItem[]>([
    { id: 1, title: "500_Brightfield", dateGroup: "today" },
    { id: 2, title: "Hazel_Grove_Terrace", dateGroup: "today" },
    { id: 3, title: "Marchmont_Square", dateGroup: "today" },
    { id: 4, title: "Elm_Park_Residence", dateGroup: "yesterday" },
    { id: 5, title: "Cedar_House_West", dateGroup: "yesterday" },
    { id: 6, title: "Ashwood_Gardens", dateGroup: "yesterday" },
  ]);

  const [inReviewItems, setInReviewItems] = useState<ProposalItem[]>([
    { id: 100, title: "Inspired_Capital", dateGroup: "today" },
    { id: 101, title: "500_Brightfield", dateGroup: "today" },
    { id: 102, title: "Hazel_Grove_Terrace", dateGroup: "today" },
    { id: 103, title: "Marchmont_Square", dateGroup: "yesterday" },
    { id: 104, title: "Elm_Park_Residence", dateGroup: "yesterday" },
  ]);

  const [sentItems, setSentItems] = useState<ProposalItem[]>([]);

  // ── Glass card hover (shared pattern for Generate + Review lists) ──────────
  const generateListRef = useRef<HTMLDivElement>(null);
  const generateItemRefs = useRef<Map<number, HTMLButtonElement>>(new Map());
  const [generateGlassCard, setGenerateGlassCard] = useState<{ top: number; height: number } | null>(null);
  const [generateFocusedId, setGenerateFocusedId] = useState<number | null>(null);

  const reviewListRef = useRef<HTMLDivElement>(null);
  const reviewItemRefs = useRef<Map<number, HTMLButtonElement>>(new Map());
  const [reviewGlassCard, setReviewGlassCard] = useState<{ top: number; height: number } | null>(null);
  const [reviewFocusedId, setReviewFocusedId] = useState<number | null>(null);

  // ── GenerationFlow state ───────────────────────────────────────────────────
  const [generatingItemId, setGeneratingItemId] = useState<number | null>(null);

  // ── Counts ─────────────────────────────────────────────────────────────────
  const tabCounts: Record<Tab, number> = {
    generate: toGenerateItems.length,
    review: inReviewItems.length,
    sent: sentItems.length,
    archive: 0,
  };

  // ── Grouped data ───────────────────────────────────────────────────────────
  function groupByDate(items: ProposalItem[]) {
    return [
      { label: "Today", items: items.filter((i) => i.dateGroup === "today") },
      { label: "Yesterday", items: items.filter((i) => i.dateGroup === "yesterday") },
    ].filter((g) => g.items.length > 0);
  }

  // ── Handlers ───────────────────────────────────────────────────────────────
  function handleGenerateMouseEnter(item: ProposalItem) {
    const el = generateItemRefs.current.get(item.id);
    const listEl = generateListRef.current;
    if (el && listEl) {
      const ir = el.getBoundingClientRect();
      const lr = listEl.getBoundingClientRect();
      setGenerateGlassCard({ top: ir.top - lr.top, height: ir.height });
    }
    setGenerateFocusedId(item.id);
  }

  function handleReviewMouseEnter(item: ProposalItem) {
    const el = reviewItemRefs.current.get(item.id);
    const listEl = reviewListRef.current;
    if (el && listEl) {
      const ir = el.getBoundingClientRect();
      const lr = listEl.getBoundingClientRect();
      setReviewGlassCard({ top: ir.top - lr.top, height: ir.height });
    }
    setReviewFocusedId(item.id);
  }

  function handleStartGeneration(item: ProposalItem) {
    setGeneratingItemId(item.id);
  }

  function handleFlowComplete() {
    if (generatingItemId === null) return;
    const item = toGenerateItems.find((i) => i.id === generatingItemId);
    if (item) {
      setToGenerateItems((items) => items.filter((i) => i.id !== generatingItemId));
      setInReviewItems((items) => [item, ...items]);
    }
    setGeneratingItemId(null);
    // Switch to Review tab so the user sees the result
    setActiveTab("review");
  }

  function handleOpenReview(item: ProposalItem) {
    setReviewingItem(item);
    setAppView("review");
  }

  function handleSend(item: ProposalItem) {
    setInReviewItems((items) => items.filter((i) => i.id !== item.id));
    setSentItems((items) => [item, ...items]);
    setAppView("list");
    setReviewingItem(null);
    setActiveTab("sent");
  }

  const tabs: Array<{ id: Tab; label: string; disabled?: boolean }> = [
    { id: "generate", label: "Generate" },
    { id: "review", label: "Review" },
    { id: "sent", label: "Sent" },
    { id: "archive", label: "Archive", disabled: true },
  ];

  // ── Review viewer ──────────────────────────────────────────────────────────
  if (appView === "review" && reviewingItem) {
    return (
      <ProposalReview
        item={reviewingItem}
        onBack={() => {
          setAppView("list");
          setReviewingItem(null);
        }}
        onSend={handleSend}
      />
    );
  }

  // ── List view ──────────────────────────────────────────────────────────────
  return (
    <div className="bg-background min-h-screen relative overflow-hidden">
      <div className="pt-28 pb-40">
        <div className="w-[484px] mx-auto flex flex-col">

          {/* Heading */}
          <h1 className="font-display text-[32px] leading-9 font-medium text-foreground">
            Your proposals
          </h1>

          {/* Tab bar */}
          <div className="mt-6 flex items-center h-[34px] -ml-4">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                disabled={tab.disabled}
                onClick={() => !tab.disabled && setActiveTab(tab.id)}
                className={cn(
                  "flex items-center gap-2 px-4 py-1.5 rounded-full text-base font-medium tracking-[-0.5px] transition-colors whitespace-nowrap",
                  activeTab === tab.id
                    ? "bg-neutral-100 text-foreground"
                    : tab.disabled
                      ? "text-muted-foreground/40 cursor-default"
                      : "text-muted-foreground hover:text-foreground cursor-pointer"
                )}
              >
                <span>{tab.label}</span>
                {!tab.disabled && <span>{tabCounts[tab.id]}</span>}
              </button>
            ))}
          </div>

          {/* ── Generate tab ─────────────────────────────────────────────── */}
          {activeTab === "generate" && (
            <div
              ref={generateListRef}
              className="mt-6 flex flex-col relative"
            >
              {generateGlassCard && (
                <div
                  className="absolute -inset-x-8 rounded-xl border border-white shadow-[0px_4px_28px_0px_rgba(0,0,0,0.08)] overflow-hidden pointer-events-none transition-all duration-200 ease-out"
                  style={{ top: generateGlassCard.top, height: generateGlassCard.height }}
                >
                  <div className="absolute inset-0 bg-[#fafafa] backdrop-blur-[14px]" />
                  <div className="absolute inset-0 shadow-[inset_0px_4px_16px_0px_white]" />
                </div>
              )}

              {groupByDate(toGenerateItems).map((group) => (
                <div key={group.label} className="flex flex-col pb-6">
                  <div className="pt-4 pb-2">
                    <span className="text-xs font-medium text-muted-foreground">{group.label}</span>
                  </div>
                  <div className="flex flex-col">
                    {group.items.map((item) => (
                      <button
                        key={item.id}
                        ref={(el) => {
                          if (el) generateItemRefs.current.set(item.id, el);
                          else generateItemRefs.current.delete(item.id);
                        }}
                        className="relative flex items-center justify-between py-6 w-full text-left cursor-pointer"
                        onMouseEnter={() => handleGenerateMouseEnter(item)}
                        onClick={() => handleStartGeneration(item)}
                      >
                        <span
                          className={cn(
                            "relative text-base font-medium tracking-[-0.5px] transition-colors duration-150",
                            generateFocusedId === item.id ? "text-foreground" : "text-muted-foreground"
                          )}
                        >
                          {item.title}
                        </span>
                        <Badge variant="secondary" className="relative rounded-full px-2 py-1 text-xs font-medium">
                          Generate
                        </Badge>
                      </button>
                    ))}
                  </div>
                </div>
              ))}

              {toGenerateItems.length === 0 && (
                <p className="mt-6 text-sm text-muted-foreground">All proposals generated.</p>
              )}
            </div>
          )}

          {/* ── Review tab ───────────────────────────────────────────────── */}
          {activeTab === "review" && (
            <div
              ref={reviewListRef}
              className="mt-6 flex flex-col relative"
            >
              {reviewGlassCard && (
                <div
                  className="absolute -inset-x-8 rounded-xl border border-white shadow-[0px_4px_28px_0px_rgba(0,0,0,0.08)] overflow-hidden pointer-events-none transition-all duration-200 ease-out"
                  style={{ top: reviewGlassCard.top, height: reviewGlassCard.height }}
                >
                  <div className="absolute inset-0 bg-[#fafafa] backdrop-blur-[14px]" />
                  <div className="absolute inset-0 shadow-[inset_0px_4px_16px_0px_white]" />
                </div>
              )}

              {groupByDate(inReviewItems).map((group) => (
                <div key={group.label} className="flex flex-col pb-6">
                  <div className="pt-4 pb-2">
                    <span className="text-xs font-medium text-muted-foreground">{group.label}</span>
                  </div>
                  <div className="flex flex-col">
                    {group.items.map((item) => (
                      <button
                        key={item.id}
                        ref={(el) => {
                          if (el) reviewItemRefs.current.set(item.id, el);
                          else reviewItemRefs.current.delete(item.id);
                        }}
                        className="relative flex items-center justify-between py-6 w-full text-left cursor-pointer"
                        onMouseEnter={() => handleReviewMouseEnter(item)}
                        onClick={() => handleOpenReview(item)}
                      >
                        <span
                          className={cn(
                            "relative text-base font-medium tracking-[-0.5px] transition-colors duration-150",
                            reviewFocusedId === item.id ? "text-foreground" : "text-muted-foreground"
                          )}
                        >
                          {item.title}
                        </span>
                        <Badge variant="info" className="relative rounded-full px-2 py-1 text-xs font-medium">
                          In Review
                        </Badge>
                      </button>
                    ))}
                  </div>
                </div>
              ))}

              {inReviewItems.length === 0 && (
                <p className="mt-6 text-sm text-muted-foreground">No proposals in review.</p>
              )}
            </div>
          )}

          {/* ── Sent tab ─────────────────────────────────────────────────── */}
          {activeTab === "sent" && (
            <div className="mt-6 flex flex-col">
              {sentItems.length === 0 ? (
                <p className="text-sm text-muted-foreground">No sent proposals.</p>
              ) : (
                sentItems.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between py-6 border-b border-border last:border-0"
                  >
                    <span className="text-base font-medium tracking-[-0.5px] text-muted-foreground">
                      {item.title}
                    </span>
                    <Badge variant="outline" className="rounded-full px-2 py-1 text-xs font-medium">
                      Sent
                    </Badge>
                  </div>
                ))
              )}
            </div>
          )}

        </div>
      </div>

      {/* Gradient fade */}
      <div className="fixed bottom-0 left-0 right-0 h-32 bg-gradient-to-b from-transparent to-background pointer-events-none z-10" />

      {/* Floating glass search bar */}
      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-20">
        <div className="relative flex items-center pl-4 pr-6 py-3 rounded-[52px] border border-white shadow-[0px_4px_8px_1px_rgba(0,0,0,0.06),0px_4px_28px_0px_rgba(0,0,0,0.08)] overflow-hidden">
          <div className="absolute inset-0 bg-[rgba(240,240,240,0.8)] backdrop-blur-[14px] rounded-[52px] pointer-events-none" />
          <div className="absolute inset-0 rounded-[52px] shadow-[inset_0px_4px_4px_0px_rgba(255,255,255,0.25)] pointer-events-none" />
          <div className="relative flex items-center gap-2">
            <Search className="size-4 text-muted-foreground shrink-0" />
            <span className="text-sm text-muted-foreground whitespace-nowrap tracking-[-0.2px]">
              Search for a proposal
            </span>
          </div>
        </div>
      </div>

      {/* Generation flow overlay */}
      {generatingItemId !== null && (
        <GenerationFlow
          onComplete={handleFlowComplete}
          onClose={() => setGeneratingItemId(null)}
        />
      )}
    </div>
  );
}
