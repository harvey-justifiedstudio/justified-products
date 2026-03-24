// Page-specific component for the 3-step proposal generation flow.
// Local to proposal-generator — not promoted to @justified/ui because
// the step content (budget tiers, TOV options, context items) is domain-specific.

import React, { useState, useEffect } from "react";
import { Badge, Button, Separator, cn } from "@justified/ui";
import { ArrowLeft } from "lucide-react";

// ── Types ──────────────────────────────────────────────────────────────────────

type Step = "budget" | "tov" | "context";
const STEPS: Step[] = ["budget", "tov", "context"];

// ── Static data ────────────────────────────────────────────────────────────────

const BUDGET_OPTIONS = [
  { id: "small", label: "Small (£0k–£20k)" },
  { id: "medium", label: "Medium (£20k–£60k)" },
  { id: "large", label: "Large (£60k–£150k)" },
  { id: "extra-large", label: "Extra Large (£150k+)" },
];

const TOV_OPTIONS = [
  { id: "executive", label: "Executive", description: "Outcomes first" },
  { id: "explanatory", label: "Explanatory", description: "Clear process" },
  { id: "technical", label: "Technical", description: "Detail-led" },
];

const CONTEXT_ITEMS = [
  {
    id: "brief",
    label: "Brief from client",
    badgeLabel: "Uploaded",
    badgeVariant: "outline" as const,
  },
  {
    id: "logs",
    label: "Call logs",
    badgeLabel: "Uploaded",
    badgeVariant: "outline" as const,
  },
  {
    id: "questionnaire",
    label: "Client questionnaire",
    badgeLabel: "1 More",
    badgeVariant: "secondary" as const,
  },
];

// ── Animation wrapper ──────────────────────────────────────────────────────────
// Uses requestAnimationFrame to defer the opacity/translateY change to the next
// paint, giving the browser a "from" state to transition from.

function AnimatedStep({ children }: { children: React.ReactNode }) {
  const [entered, setEntered] = useState(false);

  useEffect(() => {
    const raf = requestAnimationFrame(() => setEntered(true));
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <div
      style={{
        opacity: entered ? 1 : 0,
        transform: entered ? "translateY(0)" : "translateY(10px)",
        transition: "opacity 200ms ease-out, transform 200ms ease-out",
      }}
    >
      {children}
    </div>
  );
}

// ── Step components ────────────────────────────────────────────────────────────

function BudgetStep({
  selected,
  onSelect,
}: {
  selected: string | null;
  onSelect: (id: string) => void;
}) {
  return (
    <div className="flex flex-col gap-9">
      <h2 className="px-1 font-display text-[32px] leading-10 font-medium text-foreground">
        How big is the budget?
      </h2>
      <div className="rounded-lg border border-border overflow-hidden bg-card">
        {BUDGET_OPTIONS.map((option, i) => (
          <button
            key={option.id}
            onClick={() => onSelect(option.id)}
            className={cn(
              "w-full text-left px-4 h-[52px] flex items-center transition-colors duration-100",
              i > 0 && "border-t border-border",
              selected === option.id
                ? "bg-secondary text-secondary-foreground"
                : "text-foreground hover:bg-muted/60"
            )}
          >
            <span className="text-sm font-medium">{option.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

function TovStep({
  selected,
  onSelect,
}: {
  selected: string | null;
  onSelect: (id: string) => void;
}) {
  return (
    <div className="flex flex-col gap-9">
      <h2 className="px-1 font-display text-[32px] leading-10 font-medium text-foreground">
        How would you like to talk to the client?
      </h2>
      <div className="rounded-lg border border-border overflow-hidden bg-card">
        {TOV_OPTIONS.map((option, i) => (
          <button
            key={option.id}
            onClick={() => onSelect(option.id)}
            className={cn(
              "w-full text-left px-4 h-[72px] flex flex-col justify-center gap-0.5 transition-colors duration-100",
              i > 0 && "border-t border-border",
              selected === option.id
                ? "bg-secondary text-secondary-foreground"
                : "text-foreground hover:bg-muted/60"
            )}
          >
            <span className="text-sm font-medium">{option.label}</span>
            <span className="text-xs text-muted-foreground">{option.description}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

function ContextStep() {
  return (
    <div className="flex flex-col gap-9">
      <h2 className="px-1 font-display text-[32px] leading-10 font-medium text-foreground">
        Do we have enough context?
      </h2>
      <div className="flex flex-col">
        {CONTEXT_ITEMS.map((item, i) => (
          <React.Fragment key={item.id}>
            {i > 0 && <Separator />}
            <div className="flex items-center justify-between py-[18px]">
              <span className="text-sm font-medium text-foreground">{item.label}</span>
              <Badge variant={item.badgeVariant} className="rounded-full">
                {item.badgeLabel}
              </Badge>
            </div>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}

// ── Main flow overlay ─────────────────────────────────────────────────────────

export interface GenerationFlowProps {
  onComplete: () => void;
}

export function GenerationFlow({ onComplete }: GenerationFlowProps) {
  const [stepIndex, setStepIndex] = useState(0);
  const [budget, setBudget] = useState<string | null>(null);
  const [tov, setTov] = useState<string | null>(null);
  // contentKey forces AnimatedStep to remount (and re-animate) on step change
  const [contentKey, setContentKey] = useState(0);
  // Overlay fades in on mount
  const [overlayVisible, setOverlayVisible] = useState(false);

  useEffect(() => {
    const raf = requestAnimationFrame(() => setOverlayVisible(true));
    return () => cancelAnimationFrame(raf);
  }, []);

  const currentStep = STEPS[stepIndex];
  const isLast = stepIndex === STEPS.length - 1;

  const canProceed =
    (currentStep === "budget" && !!budget) ||
    (currentStep === "tov" && !!tov) ||
    currentStep === "context";

  function goNext() {
    if (isLast) {
      // Fade out overlay, then notify parent
      setOverlayVisible(false);
      setTimeout(onComplete, 220);
    } else {
      setContentKey((k) => k + 1);
      setStepIndex((s) => s + 1);
    }
  }

  function goBack() {
    if (stepIndex > 0) {
      setContentKey((k) => k + 1);
      setStepIndex((s) => s - 1);
    }
  }

  return (
    <div
      className="fixed inset-0 bg-background z-50 flex flex-col"
      style={{
        opacity: overlayVisible ? 1 : 0,
        transition: "opacity 200ms ease-out",
      }}
    >
      {/* Step progress — active pill widens via transition-all */}
      <div className="flex items-center justify-center gap-2 pt-8">
        {STEPS.map((_, i) => (
          <div
            key={i}
            className={cn(
              "h-1 rounded-full bg-foreground transition-all duration-300",
              i === stepIndex ? "w-9 opacity-100" : "w-3 opacity-20"
            )}
          />
        ))}
      </div>

      {/* Step content — remounted on key change to re-trigger entrance animation */}
      <div className="flex-1 flex items-center justify-center px-6">
        <AnimatedStep key={contentKey}>
          <div style={{ width: "515px", maxWidth: "calc(100vw - 48px)" }}>
            {currentStep === "budget" && (
              <BudgetStep selected={budget} onSelect={setBudget} />
            )}
            {currentStep === "tov" && (
              <TovStep selected={tov} onSelect={setTov} />
            )}
            {currentStep === "context" && <ContextStep />}
          </div>
        </AnimatedStep>
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-center gap-3 pb-14">
        {stepIndex > 0 && (
          <Button
            variant="outline"
            size="icon"
            className="size-11 rounded-full"
            onClick={goBack}
          >
            <ArrowLeft className="size-4" />
          </Button>
        )}
        <Button
          className="h-11 w-60 rounded-full"
          onClick={goNext}
          disabled={!canProceed}
        >
          Next
        </Button>
      </div>
    </div>
  );
}
