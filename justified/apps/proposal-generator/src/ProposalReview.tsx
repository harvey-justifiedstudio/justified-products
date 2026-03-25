// Page-specific component for the full-page proposal slide viewer.
// Local to proposal-generator — domain-specific content, not a candidate for @justified/ui.

import React, { useEffect, useRef, useState } from "react";
import { ContentsSlide } from "@/components/slides/ContentsSlide";
import { JsOverviewSlide } from "@/components/slides/JsOverviewSlide";
import { JsVenturesSlide } from "@/components/slides/JsVenturesSlide";
import { LogoWallSlide } from "@/components/slides/LogoWallSlide";
import { PhaseSlide } from "@/components/slides/PhaseSlide";
import { CostSlide } from "@/components/slides/CostSlide";
import { IntroductionSlide } from "@/components/slides/IntroductionSlide";
import { MissionStatementSlide } from "@/components/slides/MissionStatementSlide";
import { JsWhySlide } from "@/components/slides/JsWhySlide";
import { JsPartnerSlide } from "@/components/slides/JsPartnerSlide";
import { JsEndSlide } from "@/components/slides/JsEndSlide";
import { CaseStudySlide } from "@/components/slides/CaseStudySlide";
import { CaseStudyBentoSlide } from "@/components/slides/CaseStudyBentoSlide";
import { CaseStudyBentoBaseSlide } from "@/components/slides/CaseStudyBentoBaseSlide";
import { CaseStudyChapterSlide } from "@/components/slides/CaseStudyChapterSlide";
import { ChapterSlide } from "@/components/slides/ChapterSlide";
import { JsApproachSlide } from "@/components/slides/JsApproachSlide";
import { NextStepsSlide } from "@/components/slides/NextStepsSlide";
import { JsCoverSlide } from "@/components/slides/JsCoverSlide";
import { Badge, Button, cn } from "@justified/ui";
import {
  ArrowLeft,
  Check,
  ChevronLeft,
  ChevronRight,
  Copy,
  ExternalLink,
  ImageIcon,
  Maximize2,
  Plus,
  Send,
  Settings2,
  X,
} from "lucide-react";

// ── Available case studies (from justified.studio) ────────────────────────────

const AVAILABLE_CASE_STUDIES = [
  { id: "indicium", name: "Indicium AI", category: "Brand Identity" },
  { id: "native", name: "Native", category: "Brand & Digital" },
  { id: "concept", name: "Concept Ventures", category: "Brand Strategy" },
  { id: "focal", name: "Focal", category: "Brand Platform" },
  { id: "brightfield", name: "Brightfield", category: "Brand Identity" },
  { id: "marchmont", name: "Marchmont Capital", category: "Brand Strategy" },
];

// ── Swappable assets per slide key ────────────────────────────────────────────
// Each entry maps a slide key → list of swappable image slots.
// `defaultUrl` is the generation-time image; overrides are stored separately.
const SLIDE_ASSETS: Record<string, Array<{ key: string; label: string; defaultUrl: string }>> = {
  introduction: [
    { key: "introduction:image", label: "Client Photo", defaultUrl: "" },
  ],
  "js-why": [
    { key: "js-why:image", label: "Team Photo", defaultUrl: "" },
  ],
  "case-study": [
    { key: "case-study:image", label: "Hero Image", defaultUrl: "https://www.figma.com/api/mcp/asset/f67b31f8-7779-43f8-a315-5d9112e58a76" },
  ],
  "case-study-bento": [
    { key: "case-study-bento:topLeft", label: "Top Left", defaultUrl: "https://www.figma.com/api/mcp/asset/8e88bd0b-3c50-419c-883f-e71390162257" },
    { key: "case-study-bento:bottomCenter", label: "Bottom", defaultUrl: "https://www.figma.com/api/mcp/asset/db6807a0-3dbc-4cf1-8e90-7b4b1e745628" },
    { key: "case-study-bento:right", label: "Right", defaultUrl: "https://www.figma.com/api/mcp/asset/e3311d35-23f0-40e4-a78c-edcec376bd0d" },
  ],
  "phase-01": [{ key: "phase-01:image", label: "Phase Image", defaultUrl: "" }],
  "phase-02": [{ key: "phase-02:image", label: "Phase Image", defaultUrl: "" }],
  "phase-03": [{ key: "phase-03:image", label: "Phase Image", defaultUrl: "" }],
  "phase-04": [{ key: "phase-04:image", label: "Phase Image", defaultUrl: "" }],
};

const DEFAULT_LOGOS: Array<{ src: string; alt: string }> = [
  { src: "https://www.figma.com/api/mcp/asset/8bb5b7ce-b023-4f94-a7c3-b274c76c4077", alt: "Concept Ventures" },
  { src: "https://www.figma.com/api/mcp/asset/5cb7b5e9-0674-4a10-a465-691059f4f8de", alt: "Eka" },
  { src: "https://www.figma.com/api/mcp/asset/8bc43d43-cee3-4372-98cb-718e0423ba3d", alt: "Stride" },
  { src: "https://www.figma.com/api/mcp/asset/31cc58e4-b34a-4e8b-a8f8-48f696894638", alt: "Google" },
  { src: "https://www.figma.com/api/mcp/asset/332b1489-c387-4f12-a310-ea18ad888951", alt: "Onstage" },
  { src: "https://www.figma.com/api/mcp/asset/7304b787-6222-4608-b302-dfc2a0ec6fce", alt: "January Ventures" },
  { src: "https://www.figma.com/api/mcp/asset/09f2c479-7b71-4171-951b-667b6bd381f3", alt: "MoonPay" },
  { src: "https://www.figma.com/api/mcp/asset/bb6f82ed-867f-4218-9d4c-72b44a739739", alt: "Brighteye" },
  { src: "https://www.figma.com/api/mcp/asset/4d61aaf0-2305-4ad6-8f68-2e968d36656d", alt: "Cleo" },
  { src: "https://www.figma.com/api/mcp/asset/fea9e94f-7c22-406a-bd3a-e97c9247e155", alt: "Mountside Ventures" },
  { src: "https://www.figma.com/api/mcp/asset/45ed5d9b-f99e-47dd-bc33-05951ddb6b04", alt: "Daybreak" },
  { src: "https://www.figma.com/api/mcp/asset/3cebcb2a-1d1d-413b-88eb-6195ba0d4ef2", alt: "The Dots" },
  { src: "https://www.figma.com/api/mcp/asset/1c719968-f095-42f9-8fea-04ecb7f7b3ce", alt: "Wise" },
  { src: "https://www.figma.com/api/mcp/asset/a2160f99-f40d-4e67-81d7-e316ec50dc77", alt: "Cash App" },
  { src: "https://www.figma.com/api/mcp/asset/48898676-0ec9-4795-8502-28436fff4133", alt: "Treefera" },
  { src: "https://www.figma.com/api/mcp/asset/0afb8e43-e510-43d0-9dc2-bc3cb4c775b2", alt: "Vemi Ventures" },
];

// ── Types ─────────────────────────────────────────────────────────────────────

export interface ProposalItem {
  id: number;
  title: string;
  dateGroup: "today" | "yesterday";
}

export interface SlideContent {
  clientName: string;
  tagline: string;
  date: string;
  introHeading: string;
  introBody: string;
  workProjects: Array<{ name: string; category: string }>;
  approachPillars: Array<{ label: string; description: string }>;
  services: Array<{ name: string; description: string }>;
  budgetTier: string;
  deliverables: string[];
  nextSteps: string[];
}

export interface ProposalReviewProps {
  item: ProposalItem;
  onBack: () => void;
  onSend: (item: ProposalItem) => void;
}

// ── Helpers ───────────────────────────────────────────────────────────────────

function slugify(title: string): string {
  return title.toLowerCase().replace(/[^a-z0-9]+/g, "-");
}

// ── ScaledSlide ───────────────────────────────────────────────────────────────
// Renders children at a 960×540 reference size then scales to fit the container.
// This lets slide components use "real" font sizes (designed for ~960px) without
// needing to know the actual rendered dimensions.

const SLIDE_BASE_W = 960;
const SLIDE_BASE_H = 540;

function ScaledSlide({ children }: { children: React.ReactNode }) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    function measure() {
      if (wrapperRef.current) {
        setScale(wrapperRef.current.offsetWidth / SLIDE_BASE_W);
      }
    }
    measure();
    const observer = new ResizeObserver(measure);
    if (wrapperRef.current) observer.observe(wrapperRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={wrapperRef} className="w-full h-full relative overflow-hidden">
      <div
        style={{
          width: SLIDE_BASE_W,
          height: SLIDE_BASE_H,
          transform: `scale(${scale})`,
          transformOrigin: "top left",
          position: "absolute",
          top: 0,
          left: 0,
        }}
      >
        {children}
      </div>
    </div>
  );
}

// ── FigmaSlide ────────────────────────────────────────────────────────────────
// Renders a 1920×1080 Figma slide inside the 960×540 ScaledSlide reference frame.

function FigmaSlide({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ width: SLIDE_BASE_W, height: SLIDE_BASE_H, overflow: "hidden", position: "relative" }}>
      <div
        style={{
          transform: "scale(0.5)",
          transformOrigin: "top left",
          width: 1920,
          height: 1080,
          position: "absolute",
          top: 0,
          left: 0,
        }}
      >
        {children}
      </div>
    </div>
  );
}

// ── EditableText ──────────────────────────────────────────────────────────────
// Click to edit inline. Blur to save. Ring colour adapts to dark/light slides.

function EditableText({
  value,
  onChange,
  multiline = false,
  dark = false,
  className,
  style,
}: {
  value: string;
  onChange: (v: string) => void;
  multiline?: boolean;
  dark?: boolean;
  className?: string;
  style?: React.CSSProperties;
}) {
  const [editing, setEditing] = useState(false);
  const ref = useRef<HTMLInputElement & HTMLTextAreaElement>(null);

  useEffect(() => {
    if (editing) ref.current?.focus();
  }, [editing]);

  const hoverRing = dark
    ? "hover:ring-1 hover:ring-white/25 rounded"
    : "hover:ring-1 hover:ring-zinc-900/15 rounded";
  const activeRing = dark ? "ring-1 ring-white/40" : "ring-1 ring-zinc-900/30";

  if (!editing) {
    const Tag = multiline ? "p" : "span";
    return (
      <Tag
        className={cn("cursor-text rounded px-0.5 -mx-0.5 transition-shadow", hoverRing, className)}
        style={style}
        onClick={() => setEditing(true)}
      >
        {value}
      </Tag>
    );
  }

  if (multiline) {
    return (
      <textarea
        ref={ref}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onBlur={() => setEditing(false)}
        style={style}
        className={cn(
          "bg-transparent resize-none w-full outline-none rounded px-0.5 -mx-0.5",
          activeRing,
          className
        )}
        rows={4}
      />
    );
  }

  return (
    <input
      ref={ref}
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      onBlur={() => setEditing(false)}
      style={style}
      className={cn(
        "bg-transparent w-full outline-none rounded px-0.5 -mx-0.5",
        activeRing,
        className
      )}
    />
  );
}

// ── Slide nav bar (rendered inside every slide) ───────────────────────────────

function SlideNavBar({
  clientName,
  tagline,
  slideNumber,
  dark,
}: {
  clientName: string;
  tagline: string;
  slideNumber: number;
  dark: boolean;
}) {
  const muted = dark ? "text-white/40" : "text-zinc-900/40";
  const border = dark ? "border-white/10" : "border-zinc-900/10";
  return (
    <div
      className={cn(
        "flex items-center justify-between text-[10px] font-medium tracking-tight pb-3 border-b mb-6",
        border,
        muted
      )}
    >
      <span>{clientName}</span>
      <span>{tagline}</span>
      <span>{String(slideNumber).padStart(2, "0")}</span>
    </div>
  );
}

// ── Slide 1: Cover (generic fallback — non-IC proposals) ─────────────────────
// The IC deck now uses JsCoverSlide via FigmaSlide. This version is kept for
// the generic proposal flow only.

function CoverSlide({
  content,
  onChange,
}: {
  content: SlideContent;
  onChange: (p: Partial<SlideContent>) => void;
}) {
  return (
    <div className="h-full flex flex-col text-white overflow-hidden" style={{ background: "#0003fe" }}>
      <div
        className="shrink-0 flex items-center justify-between text-white/80"
        style={{ height: 24, paddingLeft: 8, paddingRight: 8, fontSize: 6, fontWeight: 500 }}
      >
        <EditableText value={content.clientName} onChange={(v) => onChange({ clientName: v })} dark style={{ fontSize: 6 }} />
        <span style={{ fontSize: 6 }}>{content.tagline}</span>
        <span style={{ fontSize: 6 }}><strong>BOLD VISION.</strong> New Futures.</span>
        <span style={{ fontSize: 6 }}>01</span>
      </div>
      <div className="flex-1" />
      <div style={{ paddingLeft: 16, overflow: "hidden" }}>
        <p className="font-display font-medium text-white leading-none whitespace-nowrap" style={{ fontSize: 160, lineHeight: 1, marginTop: -22 }}>
          Justified.Studio
        </p>
      </div>
    </div>
  );
}

// ── Slide 2: Introduction ─────────────────────────────────────────────────────

function IntroSlide({
  content,
  onChange,
}: {
  content: SlideContent;
  onChange: (p: Partial<SlideContent>) => void;
}) {
  return (
    <div className="bg-white h-full flex flex-col p-10 text-zinc-950">
      <SlideNavBar
        clientName={content.clientName}
        tagline={content.tagline}
        slideNumber={2}
        dark={false}
      />
      <div className="flex-1 flex flex-col justify-center gap-8 max-w-lg">
        <EditableText
          value={content.introHeading}
          onChange={(v) => onChange({ introHeading: v })}
          dark={false}
          className="font-display text-4xl font-medium leading-snug tracking-tight text-zinc-950"
        />
        <EditableText
          value={content.introBody}
          onChange={(v) => onChange({ introBody: v })}
          multiline
          dark={false}
          className="text-sm text-zinc-500 leading-relaxed"
        />
      </div>
    </div>
  );
}

// ── Slide 3: Our Work ─────────────────────────────────────────────────────────

function WorkSlide({ content }: { content: SlideContent }) {
  return (
    <div className="bg-zinc-950 h-full flex flex-col p-10 text-white">
      <SlideNavBar
        clientName={content.clientName}
        tagline={content.tagline}
        slideNumber={3}
        dark
      />
      <p className="text-[10px] font-medium text-white/40 uppercase tracking-widest mb-5">
        Selected Work
      </p>
      <div className="flex-1 grid grid-cols-3 gap-4">
        {content.workProjects.map((project, i) => (
          <div key={i} className="flex flex-col gap-2">
            <div className="flex-1 bg-zinc-800 rounded-lg" />
            <div>
              <p className="text-sm font-medium text-white">{project.name}</p>
              <p className="text-xs text-white/40">{project.category}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Slide 4: Approach ─────────────────────────────────────────────────────────

function ApproachSlide({ content }: { content: SlideContent }) {
  return (
    <div className="bg-white h-full flex flex-col p-10 text-zinc-950">
      <SlideNavBar
        clientName={content.clientName}
        tagline={content.tagline}
        slideNumber={4}
        dark={false}
      />
      <p className="text-[10px] font-medium text-zinc-400 uppercase tracking-widest mb-5">
        Our Approach
      </p>
      <div className="flex-1 grid grid-cols-3 gap-6 items-start">
        {content.approachPillars.map((pillar, i) => (
          <div key={i} className="flex flex-col gap-3 pt-4 border-t border-zinc-200">
            <span className="text-xs font-medium text-zinc-400">
              {String(i + 1).padStart(2, "0")}
            </span>
            <p className="font-display text-xl font-medium text-zinc-950">{pillar.label}</p>
            <p className="text-sm text-zinc-500 leading-relaxed">{pillar.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Slide 5: Scope of Work ────────────────────────────────────────────────────

function ScopeSlide({ content }: { content: SlideContent }) {
  return (
    <div className="bg-zinc-950 h-full flex flex-col p-10 text-white">
      <SlideNavBar
        clientName={content.clientName}
        tagline={content.tagline}
        slideNumber={5}
        dark
      />
      <p className="text-[10px] font-medium text-white/40 uppercase tracking-widest mb-5">
        Scope of Work
      </p>
      <div className="flex-1 flex flex-col justify-center">
        {content.services.map((service, i) => (
          <div
            key={i}
            className={cn(
              "flex items-center justify-between py-5",
              i > 0 && "border-t border-white/10"
            )}
          >
            <p className="text-base font-medium text-white">{service.name}</p>
            <p className="text-sm text-white/40 max-w-xs text-right">{service.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Slide 6: Investment ───────────────────────────────────────────────────────

function InvestmentSlide({
  content,
  onChange,
}: {
  content: SlideContent;
  onChange: (p: Partial<SlideContent>) => void;
}) {
  return (
    <div className="bg-white h-full flex flex-col p-10 text-zinc-950">
      <SlideNavBar
        clientName={content.clientName}
        tagline={content.tagline}
        slideNumber={6}
        dark={false}
      />
      <p className="text-[10px] font-medium text-zinc-400 uppercase tracking-widest mb-5">
        Investment
      </p>
      <div className="flex-1 grid grid-cols-2 gap-12 items-start">
        <div className="flex flex-col gap-3">
          <EditableText
            value={content.budgetTier}
            onChange={(v) => onChange({ budgetTier: v })}
            dark={false}
            className="font-display text-3xl font-medium text-zinc-950"
          />
          <p className="text-sm text-zinc-400 leading-relaxed">
            Pricing is based on the agreed budget tier and the scope outlined on the previous slide.
          </p>
        </div>
        <div className="flex flex-col gap-4">
          <p className="text-[10px] font-medium text-zinc-400 uppercase tracking-widest">
            Deliverables
          </p>
          <div className="flex flex-col gap-2.5">
            {content.deliverables.map((d, i) => (
              <div key={i} className="flex items-center gap-2.5 text-sm text-zinc-700">
                <span className="size-1.5 rounded-full bg-zinc-300 shrink-0" />
                {d}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Slide 7: Next Steps (generic fallback — non-IC proposals) ─────────────────

function GenericNextStepsSlide({ content }: { content: SlideContent }) {
  return (
    <div className="bg-zinc-950 h-full flex flex-col p-10 text-white">
      <SlideNavBar
        clientName={content.clientName}
        tagline={content.tagline}
        slideNumber={7}
        dark
      />
      <div className="flex-1 flex flex-col justify-center gap-10">
        <div className="flex flex-col gap-3">
          <p className="text-[10px] font-medium text-white/40 uppercase tracking-widest">
            Ready to begin?
          </p>
          <p className="font-display text-5xl font-medium tracking-tight leading-tight max-w-lg text-white">
            Let's build something remarkable together.
          </p>
        </div>
        <div className="flex flex-col gap-4">
          {content.nextSteps.map((step, i) => (
            <div key={i} className="flex items-center gap-4">
              <span className="text-xs font-medium text-white/30 w-6 tabular-nums">
                {String(i + 1).padStart(2, "0")}
              </span>
              <p className="text-sm text-white/70">{step}</p>
            </div>
          ))}
        </div>
        <p className="text-xs text-white/25">hello@justified.studio · justified.studio</p>
      </div>
    </div>
  );
}

// ── Slide registry ────────────────────────────────────────────────────────────

const BASE_SLIDE_NAMES = ["Cover", "Introduction", "Our Work", "Approach", "Scope", "Investment", "Next Steps"];

// ── Share modal ───────────────────────────────────────────────────────────────

function ShareModal({
  item,
  onCancel,
  onConfirm,
}: {
  item: ProposalItem;
  onCancel: () => void;
  onConfirm: () => void;
}) {
  const [copied, setCopied] = useState(false);
  const url = `https://proposals.justified.studio/${slugify(item.title)}`;

  function copyLink() {
    navigator.clipboard.writeText(url).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }

  // Esc to dismiss
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onCancel();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onCancel]);

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center"
      onClick={(e) => e.target === e.currentTarget && onCancel()}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />

      {/* Card */}
      <div className="relative bg-background rounded-2xl shadow-2xl w-full max-w-sm mx-4 p-6 flex flex-col gap-5">
        <div className="flex flex-col gap-1">
          <h3 className="font-display text-xl font-medium text-foreground">Share with client</h3>
          <p className="text-sm text-muted-foreground">
            Anyone with this link can view the proposal.
          </p>
        </div>

        {/* URL row */}
        <div className="flex items-center gap-2 bg-secondary rounded-lg px-3 py-2.5">
          <ExternalLink className="size-3.5 text-muted-foreground shrink-0" />
          <span className="text-xs text-muted-foreground flex-1 truncate font-mono">{url}</span>
          <button
            onClick={copyLink}
            className="shrink-0 text-xs font-medium text-foreground flex items-center gap-1.5 hover:text-muted-foreground transition-colors"
          >
            {copied ? (
              <Check className="size-3.5 text-green-600" />
            ) : (
              <Copy className="size-3.5" />
            )}
            {copied ? "Copied" : "Copy"}
          </button>
        </div>

        {/* Actions */}
        <div className="flex gap-2">
          <Button variant="outline" className="flex-1" onClick={onCancel}>
            Cancel
          </Button>
          <Button className="flex-1 gap-1.5" onClick={onConfirm}>
            <Send className="size-3.5" />
            Send proposal
          </Button>
        </div>
      </div>
    </div>
  );
}

// ── FullscreenPreview ─────────────────────────────────────────────────────────
// Shows slides full-viewport at exact 16:9 proportions. Arrow keys to navigate,
// ESC to close. Thin HUD fades after 2s of inactivity.

function FullscreenPreview({
  slides,
  initialIndex,
  onClose,
}: {
  slides: React.ReactNode[];
  initialIndex: number;
  onClose: () => void;
}) {
  const [index, setIndex] = useState(initialIndex);
  const [hudVisible, setHudVisible] = useState(true);
  const hudTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  function showHud() {
    setHudVisible(true);
    if (hudTimerRef.current) clearTimeout(hudTimerRef.current);
    hudTimerRef.current = setTimeout(() => setHudVisible(false), 2000);
  }

  useEffect(() => {
    showHud();
    return () => { if (hudTimerRef.current) clearTimeout(hudTimerRef.current); };
  }, []);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") { onClose(); return; }
      if (e.key === "ArrowRight" || e.key === "ArrowDown") {
        setIndex((v) => Math.min(slides.length - 1, v + 1)); showHud();
      }
      if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
        setIndex((v) => Math.max(0, v - 1)); showHud();
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [slides.length, onClose]);

  return (
    <div
      className="fixed inset-0 z-[80] bg-black flex items-center justify-center"
      onMouseMove={showHud}
      onClick={showHud}
    >
      {/* Slide — fills viewport at 16:9 */}
      <div className="w-full h-full flex items-center justify-center">
        <div className="w-full aspect-[16/9] max-h-screen overflow-hidden">
          <ScaledSlide>{slides[index]}</ScaledSlide>
        </div>
      </div>

      {/* HUD overlay — fades in/out */}
      <div
        className="absolute inset-0 pointer-events-none transition-opacity duration-300"
        style={{ opacity: hudVisible ? 1 : 0 }}
      >
        {/* Close */}
        <button
          className="pointer-events-auto absolute top-4 right-4 size-9 flex items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
          onClick={onClose}
        >
          <X className="size-4" />
        </button>

        {/* Slide counter */}
        <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex items-center gap-4">
          <button
            className="pointer-events-auto size-8 flex items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors disabled:opacity-30"
            onClick={() => setIndex((v) => Math.max(0, v - 1))}
            disabled={index === 0}
          >
            <ChevronLeft className="size-4" />
          </button>
          <span className="text-xs text-white/60 tabular-nums min-w-[3rem] text-center">
            {index + 1} / {slides.length}
          </span>
          <button
            className="pointer-events-auto size-8 flex items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors disabled:opacity-30"
            onClick={() => setIndex((v) => Math.min(slides.length - 1, v + 1))}
            disabled={index === slides.length - 1}
          >
            <ChevronRight className="size-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

// ── ProposalReview ────────────────────────────────────────────────────────────

export function ProposalReview({ item, onBack, onSend }: ProposalReviewProps) {
  const [activeSlide, setActiveSlide] = useState(0);
  const [showShareModal, setShowShareModal] = useState(false);
  const [showFullscreen, setShowFullscreen] = useState(false);
  const [assetOverrides, setAssetOverrides] = useState<Record<string, string>>({});
  const [swappingAsset, setSwappingAsset] = useState<{ key: string; label: string; currentUrl: string } | null>(null);
  const [assetInputUrl, setAssetInputUrl] = useState("");
  const [showProposalSettings, setShowProposalSettings] = useState(false);
  const [proposalTitle, setProposalTitle] = useState("Approach & Proposal");
  const [logos, setLogos] = useState(DEFAULT_LOGOS);
  const [newLogoSrc, setNewLogoSrc] = useState("");
  const [newLogoAlt, setNewLogoAlt] = useState("");
  const [selectedCaseStudyIds, setSelectedCaseStudyIds] = useState<string[]>([
    "indicium",
    "native",
    "concept",
  ]);

  const [content, setContent] = useState<SlideContent>({
    clientName: item.title.replace(/_/g, " "),
    tagline: "Approach & Proposal",
    date: "March 2026",
    introHeading: "Strategy-led identities that define, differentiate, and endure.",
    introBody:
      "We are a new-age creative consultancy, built for the next decade. We partner with ambitious brands at defining moments to sharpen positioning, platform, and perception — helping them win from first pitch to global scale.",
    workProjects: [
      { name: "Indicium AI", category: "Brand Identity" },
      { name: "Native", category: "Brand & Digital" },
      { name: "Concept Ventures", category: "Brand Strategy" },
    ],
    approachPillars: [
      {
        label: "Discover",
        description: "Deep-dive into your brand, audience, and competitive landscape.",
      },
      {
        label: "Define",
        description: "Establish positioning, messaging, and creative direction.",
      },
      {
        label: "Deliver",
        description: "Execute across brand, digital, and communications.",
      },
    ],
    services: [
      { name: "Brand Strategy", description: "Positioning, naming, and brand architecture." },
      {
        name: "Visual Identity",
        description: "Logo system, typography, colour, and design language.",
      },
      {
        name: "Digital Design",
        description: "Website design, UI/UX, and interactive experiences.",
      },
      { name: "Brand Activation", description: "Campaigns, content, and launch strategy." },
    ],
    budgetTier: "Medium (£20k–£60k)",
    deliverables: [
      "Brand strategy document",
      "Full visual identity system",
      "Brand guidelines (120+ pages)",
      "Website design (up to 8 pages)",
      "Social media templates",
    ],
    nextSteps: [
      "Review and sign the proposal",
      "Kick-off call to align on timeline",
      "Discovery phase begins",
    ],
  });

  function patch(update: Partial<SlideContent>) {
    setContent((c) => ({ ...c, ...update }));
  }

  function toggleCaseStudy(id: string) {
    setSelectedCaseStudyIds((prev) => {
      const next = prev.includes(id)
        ? prev.filter((s) => s !== id)
        : prev.length < 3
          ? [...prev, id]
          : prev;
      // Sync workProjects to match selection (maintain order)
      const projects = AVAILABLE_CASE_STUDIES.filter((cs) => next.includes(cs.id)).map((cs) => ({
        name: cs.name,
        category: cs.category,
      }));
      setContent((c) => ({ ...c, workProjects: projects }));
      return next;
    });
  }

  const isInspiredCapital = item.title.replace(/_/g, " ").toLowerCase().includes("inspired capital");

  // Slide factories receive their 1-based page number automatically from position in the array.
  type SlideFactory = (pageNumber: number) => React.ReactNode;

  const IC_CLIENT = "Inspired Capital";
  const IC_TITLE = proposalTitle;
  const IC_BOLD = "BOLD VISION.";
  const IC_REGULAR = " New Futures.";

  // Ordered keys for IC figma slides (cover excluded — always page 1).
  // Reorder or add keys here and all page numbers — including Contents TOC refs — update automatically.
  const SLIDE_KEYS = [
    "contents", "js-overview", "js-ventures", "logo-wall", "mission", "js-approach",
    "introduction", "chapter", "phase-01", "phase-02", "phase-03", "phase-04",
    "cost", "next-steps", "case-study-chapter", "case-study", "case-study-bento-base", "case-study-bento-alt",
    "js-why", "js-partner", "end",
  ];
  const pageFor = (key: string) => String(SLIDE_KEYS.indexOf(key) + 2).padStart(2, "0");
  // Returns the overridden URL if one exists, otherwise the generation-time default.
  const assetUrl = (key: string, defaultUrl: string) => assetOverrides[key] ?? defaultUrl;

  const figmaSlideFactories: SlideFactory[] = isInspiredCapital
    ? [
        // ── 02 Contents ──────────────────────────────────────────────────────────
        (n) => (
          <FigmaSlide key="contents">
            <ContentsSlide
              client={IC_CLIENT}
              documentTitle={IC_TITLE}
              taglineBold={IC_BOLD}
              taglineRegular={IC_REGULAR}
              pageNumber={String(n).padStart(2, "0")}
              contextTitle="Document Context"
              contextBody={
                <>
                  Thank you for the opportunity to collaborate with Inspired Capital, a New York-based
                  early-stage venture capital firm backing founders building an inspired future. This
                  proposal outlines how Justified Studio will evolve your brand expression and digital
                  presence to better reflect your credibility, thesis, and founder relationships.
                  <br /><br />
                  The focus is alignment, visual cohesion, and a marketing site that confidently
                  represents Inspired Capital for the next stage of growth.
                </>
              }
              items={[
                { title: "Justified Studio", page: pageFor("js-overview") },
                { title: "Introduction", page: pageFor("introduction") },
                { title: "Approach & Proposal", page: pageFor("phase-01") },
                { title: "Estimated Cost Associations", page: pageFor("cost") },
                { title: "Case Studies", page: pageFor("case-study") },
              ]}
            />
          </FigmaSlide>
        ),
        // ── 03 JS Overview ───────────────────────────────────────────────────────
        (n) => (
          <FigmaSlide key="js-overview">
            <JsOverviewSlide
              client={IC_CLIENT}
              documentTitle={IC_TITLE}
              taglineBold={IC_BOLD}
              taglineRegular={IC_REGULAR}
              pageNumber={String(n).padStart(2, "0")}
              statement="We're a creative consultancy shaping new futures through brand, digital, and campaign. We partner with innovative and purposeful organisations to create impact, and accelerate growth."
              columns={[
                {
                  heading: "Brand",
                  description: "Strategy-led identities that define, differentiate, and endure.",
                  tags: ["Brand Strategy", "Verbal Identity", "Visual Identity"],
                },
                {
                  heading: "Digital",
                  description: "High-performing websites and products that connect directly to audiences.",
                  tags: ["Marketing & Commerce", "Products & Apps", "Experiences"],
                },
                {
                  heading: "Campaign",
                  description: "Stories and content that shape conversation and drive engagement.",
                  tags: ["Content & Social", "Experiential & Activation", "Creative Campaigns"],
                },
              ]}
            />
          </FigmaSlide>
        ),
        // ── 04 JS Ventures ───────────────────────────────────────────────────────
        (n) => (
          <FigmaSlide key="js-ventures">
            <JsVenturesSlide
              client={IC_CLIENT}
              documentTitle={IC_TITLE}
              taglineBold={IC_BOLD}
              taglineRegular={IC_REGULAR}
              pageNumber={String(n).padStart(2, "0")}
              statement="We operate a specialist arm dedicated to the venture ecosystem. We partner with funds at defining moments to sharpen positioning, platform, and perception, while helping portfolio companies build the brands and digital foundations they need to win, from first pitch to global scale."
              linkText="Read More →"
              linkHref="https://www.justified.studio/blog/ventures"
            />
          </FigmaSlide>
        ),
        // ── 05 Logo Wall ─────────────────────────────────────────────────────────
        (n) => (
          <FigmaSlide key="logo-wall">
            <LogoWallSlide
              client={IC_CLIENT}
              documentTitle={IC_TITLE}
              taglineBold={IC_BOLD}
              taglineRegular={IC_REGULAR}
              pageNumber={String(n).padStart(2, "0")}
              logos={logos}
            />
          </FigmaSlide>
        ),
        // ── 06 Mission Statement ─────────────────────────────────────────────────
        (n) => (
          <FigmaSlide key="mission">
            <MissionStatementSlide
              client={IC_CLIENT}
              documentTitle={IC_TITLE}
              taglineBold={IC_BOLD}
              taglineRegular={IC_REGULAR}
              pageNumber={String(n).padStart(2, "0")}
            />
          </FigmaSlide>
        ),
        // ── 07 JS Approach ───────────────────────────────────────────────────────
        (n) => (
          <FigmaSlide key="js-approach">
            <JsApproachSlide
              client={IC_CLIENT}
              documentTitle={IC_TITLE}
              taglineBold={IC_BOLD}
              taglineRegular={IC_REGULAR}
              pageNumber={String(n).padStart(2, "0")}
            />
          </FigmaSlide>
        ),
        // ── 08 Client Introduction ───────────────────────────────────────────────
        (n) => (
          <FigmaSlide key="introduction">
            <IntroductionSlide
              client={IC_CLIENT}
              documentTitle={IC_TITLE}
              taglineBold={IC_BOLD}
              taglineRegular={IC_REGULAR}
              pageNumber={String(n).padStart(2, "0")}
              image={assetUrl("introduction:image", "") || undefined}
              paragraphs={[
                "Inspired Capital has reached an inflection point. The firm's reputation, network, and portfolio strength have matured significantly, yet the current brand expression and website no longer reflect that evolution. The disconnect is not strategic. It is visual and experiential.",
                "This is the moment to bring alignment between who Inspired Capital is internally and how it appears externally. By refining the visual identity and rebuilding the marketing site in Webflow, we will create a system that is modern, cohesive, founder-centric, and robust enough to carry the firm confidently into its next seven years.",
              ]}
            />
          </FigmaSlide>
        ),
        // ── 09 Chapter Slide ─────────────────────────────────────────────────────
        (n) => (
          <FigmaSlide key="chapter">
            <ChapterSlide
              client={IC_CLIENT}
              documentTitle={IC_TITLE}
              taglineBold={IC_BOLD}
              taglineRegular={IC_REGULAR}
              pageNumber={String(n).padStart(2, "0")}
              chapterNumber="01"
              chapterTitle="Approach & Proposal"
            />
          </FigmaSlide>
        ),
        // ── 10 Phase 01 ──────────────────────────────────────────────────────────
        (n) => (
          <FigmaSlide key="phase-01">
            <PhaseSlide
              client={IC_CLIENT}
              documentTitle={IC_TITLE}
              taglineBold={IC_BOLD}
              taglineRegular={IC_REGULAR}
              pageNumber={String(n).padStart(2, "0")}
              phaseNumber="01"
              phaseName="Strategic Repositioning & Market Definition"
              duration="2 Weeks"
              fee="£XX,XXX"
              introduction={[
                "Every strong brand identity begins with a clear strategic foundation. Before any visual work begins, we need to deeply understand Inspired Capital's positioning, competitive context, and the perception you want to own in the market.",
                "This phase aligns the team on a shared strategic direction and provides the creative brief that underpins all subsequent design and digital decisions.",
              ]}
              keyActivities={[
                {
                  title: "Brand Audit & Competitive Review",
                  body: "We assess the existing brand, identify what is working and what is not, and map the competitive landscape to understand white space and opportunity.",
                },
                {
                  title: "Positioning Workshop",
                  body: "A focused working session with the Inspired Capital team to define the brand's core promise, personality, and target audience.",
                },
                {
                  title: "Strategic Framework",
                  body: "We synthesise workshop outputs into a clear positioning document that defines the direction for visual identity and digital presence.",
                },
              ]}
              deliverables={[
                {
                  title: "Brand Strategy Document",
                  body: "A concise strategic framework covering positioning, audience, tone of voice principles, and creative direction.",
                },
              ]}
            />
          </FigmaSlide>
        ),
        // ── 09 Phase 02 ──────────────────────────────────────────────────────────
        (n) => (
          <FigmaSlide key="phase-02">
            <PhaseSlide
              client={IC_CLIENT}
              documentTitle={IC_TITLE}
              taglineBold={IC_BOLD}
              taglineRegular={IC_REGULAR}
              pageNumber={String(n).padStart(2, "0")}
              phaseNumber="02"
              phaseName="Visual Identity Evolution"
              duration="4 Weeks"
              fee="£XX,XXX"
              introduction={[
                "Inspired Capital does not require a wholesale rebrand. It requires refinement and elevation. The objective is to create a cohesive, credible, and modern visual language that aligns with your maturity and ambition while remaining approachable to founders.",
                "The identity must scale beyond the website. It should work at conferences, across LinkedIn, within portfolio communications, and across future funds. We will design a system that balances institutional confidence with personal partnership.",
              ]}
              keyActivities={[
                {
                  title: "Core Identity Refinement",
                  body: "We evolve logo usage, typography, colour systems, and layout logic. We will assess whether refinement or controlled evolution is required to elevate perception. Typography and layout will anchor credibility and clarity.",
                },
                {
                  title: "Design System Development",
                  body: "We build a flexible and scalable visual system. This includes grid systems, typographic hierarchies, digital-first components, and visual rules. The system will be built to support Webflow implementation and future marketing needs.",
                },
                {
                  title: "Application Testing & Mockups",
                  body: "We apply the system across real scenarios. This includes website pages, social presence, conference materials, and founder-facing touchpoints. Testing in context ensures the identity works practically, not just conceptually.",
                },
              ]}
              deliverables={[
                {
                  title: "Visual Identity Toolkit",
                  body: "A complete digital identity system including logo files, typography specifications, colour codes, layout principles, and example applications. Delivered in organised, usable formats with usage rationale.",
                },
              ]}
            />
          </FigmaSlide>
        ),
        // ── 10 Phase 03 ──────────────────────────────────────────────────────────
        (n) => (
          <FigmaSlide key="phase-03">
            <PhaseSlide
              client={IC_CLIENT}
              documentTitle={IC_TITLE}
              taglineBold={IC_BOLD}
              taglineRegular={IC_REGULAR}
              pageNumber={String(n).padStart(2, "0")}
              phaseNumber="03"
              phaseName="Website Design & Webflow Development"
              duration="6–8 Weeks"
              fee="£XX,XXX"
              introduction={[
                "The website is the primary touchpoint for founders, LPs, and portfolio companies. It must communicate Inspired Capital's thesis, portfolio, and people with clarity and confidence.",
                "We design and build the site in Webflow — giving the team full editorial control post-launch without ongoing developer dependency.",
              ]}
              keyActivities={[
                {
                  title: "UX & Information Architecture",
                  body: "We define the site structure, page hierarchy, and user journeys. The goal is a site that is fast to navigate and immediately communicates credibility.",
                },
                {
                  title: "Visual Design & Prototyping",
                  body: "Full page designs in Figma, responsive across desktop and mobile. We prototype key interactions before build to align on the final experience.",
                },
                {
                  title: "Webflow Development",
                  body: "We build the site in Webflow CMS, ensuring clean code, fast performance, and a CMS structure the team can manage independently.",
                },
              ]}
              deliverables={[
                {
                  title: "Live Webflow Website",
                  body: "A fully designed and developed marketing site in Webflow, including CMS setup, responsive layouts, and editor documentation for the Inspired Capital team.",
                },
              ]}
            />
          </FigmaSlide>
        ),
        // ── 11 Phase 04 ──────────────────────────────────────────────────────────
        (n) => (
          <FigmaSlide key="phase-04">
            <PhaseSlide
              client={IC_CLIENT}
              documentTitle={IC_TITLE}
              taglineBold={IC_BOLD}
              taglineRegular={IC_REGULAR}
              pageNumber={String(n).padStart(2, "0")}
              phaseNumber="04"
              phaseName="Brand Guidelines & Handover"
              duration="1–2 Weeks"
              fee="£XX,XXX"
              introduction={[
                "The final phase ensures Inspired Capital can independently manage and extend the brand after handover. We package everything into a clear, usable system.",
                "Brand guidelines are not just documentation — they are a tool for consistent, confident decision-making across all future applications.",
              ]}
              keyActivities={[
                {
                  title: "Brand Guidelines Document",
                  body: "We produce a concise, digital-first guidelines document covering identity usage, typography, colour, photography, and tone of voice.",
                },
                {
                  title: "Asset Handover",
                  body: "All brand files, design assets, and source files are organised and transferred. Webflow CMS is documented for internal team use.",
                },
                {
                  title: "Handover Session",
                  body: "A walkthrough session with the Inspired Capital team covering brand usage, Webflow editing, and how to extend the system in future.",
                },
              ]}
              deliverables={[
                {
                  title: "Brand Guidelines & Asset Pack",
                  body: "A complete brand guidelines PDF plus all source files, logo exports, and a Webflow editor guide. Everything needed to manage the brand confidently.",
                },
              ]}
            />
          </FigmaSlide>
        ),
        // ── 12 Cost ──────────────────────────────────────────────────────────────
        (n) => (
          <FigmaSlide key="cost">
            <CostSlide
              client={IC_CLIENT}
              documentTitle={IC_TITLE}
              taglineBold={IC_BOLD}
              taglineRegular={IC_REGULAR}
              pageNumber={String(n).padStart(2, "0")}
              phases={[
                { phaseNumber: "01", phaseName: "Strategic Repositioning & Market Definition", duration: "2 weeks", fee: "£XX,XXX" },
                { phaseNumber: "02", phaseName: "Visual Identity Evolution", duration: "4 weeks", fee: "£XX,XXX" },
                { phaseNumber: "03", phaseName: "Website Design & Webflow Development", duration: "6–8 weeks", fee: "£XX,XXX" },
                { phaseNumber: "04", phaseName: "Brand Guidelines & Handover", duration: "1–2 weeks", fee: "£XX,XXX" },
              ]}
              total="£XX,XXX"
            />
          </FigmaSlide>
        ),
        // ── 14 Next Steps ────────────────────────────────────────────────────────
        (n) => (
          <FigmaSlide key="next-steps">
            <NextStepsSlide
              client={IC_CLIENT}
              documentTitle={IC_TITLE}
              taglineBold={IC_BOLD}
              taglineRegular={IC_REGULAR}
              pageNumber={String(n).padStart(2, "0")}
              steps={[
                "Review and sign the proposal",
                "Kick-off call to align on timeline",
                "Discovery phase begins",
              ]}
            />
          </FigmaSlide>
        ),
        // ── 15 Case Study Chapter ────────────────────────────────────────────────
        (n) => (
          <FigmaSlide key="case-study-chapter">
            <CaseStudyChapterSlide
              client={IC_CLIENT}
              documentTitle={IC_TITLE}
              taglineBold={IC_BOLD}
              taglineRegular={IC_REGULAR}
              pageNumber={String(n).padStart(2, "0")}
              projectName="Concept Ventures"
              projectTagline="Backing bold founders with clarity and conviction."
              image={assetUrl("case-study-chapter:image", "")}
            />
          </FigmaSlide>
        ),
        // ── 16 Case Study Write Up ───────────────────────────────────────────────
        (n) => (
          <FigmaSlide key="case-study">
            <CaseStudySlide
              client={IC_CLIENT}
              documentTitle={IC_TITLE}
              taglineBold={IC_BOLD}
              taglineRegular={IC_REGULAR}
              pageNumber={String(n).padStart(2, "0")}
              projectName="Concept Ventures"
              projectTagline="Backing bold founders with clarity and conviction."
              tags={["Naming", "Brand Strategy", "Tone of Voice & Messaging", "Visual Identity", "Guidelines & Toolkits", "UX & UI Design", "Marketing Websites"]}
              challenge="For many early-stage founders, raising capital often means giving up equity to partners who lack their vision or the support they truly need. Concept Ventures exists to rethink that model by offering intentional, aligned pre-seed investment from day one.\n\nOur challenge was to create an identity that embodied this founder-first commitment. It needed to feel clear, modern and grounded, cutting through the jargon and convention that define much of the VC world, while also delivering practical tools that directly support the people building what's next."
              solution="We created a bold identity system that puts founders at the centre. Confident typography, a minimal palette and modular layouts bring clarity without feeling rigid, allowing the brand to communicate with both speed and intent.\n\nAlongside the identity, we designed and built Fundfinder – a digital tool that helps founders explore over 160 UK investors by sector, stage and more. Together, the brand and platform express a fund that is precise, efficient and genuinely supportive."
              results="The rebrand positioned Concept Ventures as a clear leader in early-stage capital. With a sharper voice and digital presence, the fund now engages founders more effectively while standing apart in a crowded VC landscape. Over 100 founders have already been backed and the Fundfinder tool has reinforced Concept's reputation for accessibility and transparency. Today, Concept is recognised as the UK's largest pre-seed fund, defined not just by capital, but by clarity, care and a belief in bold ideas."
              image={assetUrl("case-study:image", "https://www.figma.com/api/mcp/asset/f67b31f8-7779-43f8-a315-5d9112e58a76")}
            />
          </FigmaSlide>
        ),
        // ── 18 Case Study Bento (base layout) ───────────────────────────────────
        (n) => (
          <FigmaSlide key="case-study-bento-base">
            <CaseStudyBentoBaseSlide
              client={IC_CLIENT}
              documentTitle={IC_TITLE}
              taglineBold={IC_BOLD}
              taglineRegular={IC_REGULAR}
              pageNumber={String(n).padStart(2, "0")}
            />
          </FigmaSlide>
        ),
        // ── 19 Case Study Bento Alt ──────────────────────────────────────────────
        (n) => (
          <FigmaSlide key="case-study-bento-alt">
            <CaseStudyBentoSlide
              client={IC_CLIENT}
              documentTitle={IC_TITLE}
              taglineBold={IC_BOLD}
              taglineRegular={IC_REGULAR}
              pageNumber={String(n).padStart(2, "0")}
              images={{
                topLeft: assetUrl("case-study-bento:topLeft", "https://www.figma.com/api/mcp/asset/8e88bd0b-3c50-419c-883f-e71390162257"),
                bottomCenter: assetUrl("case-study-bento:bottomCenter", "https://www.figma.com/api/mcp/asset/db6807a0-3dbc-4cf1-8e90-7b4b1e745628"),
                right: assetUrl("case-study-bento:right", "https://www.figma.com/api/mcp/asset/e3311d35-23f0-40e4-a78c-edcec376bd0d"),
              }}
            />
          </FigmaSlide>
        ),
        // ── 15 Why Justified ─────────────────────────────────────────────────────
        (n) => (
          <FigmaSlide key="js-why">
            <JsWhySlide
              client={IC_CLIENT}
              documentTitle={IC_TITLE}
              taglineBold={IC_BOLD}
              taglineRegular={IC_REGULAR}
              pageNumber={String(n).padStart(2, "0")}
              image={assetUrl("js-why:image", "") || undefined}
              paragraphs={[
                "Justified Studio is not a traditional agency. We are a lean, senior team of strategists and creatives who work directly with founders and leadership from day one. Every project is led by the people who designed it.",
                "We bring together brand strategy, visual identity, and digital execution under one roof. This means faster decisions, tighter alignment, and work that performs as well as it looks. Our clients include some of the most ambitious funds and startups in Europe and the US.",
              ]}
            />
          </FigmaSlide>
        ),
        // ── 16 JS Partner ────────────────────────────────────────────────────────
        (n) => (
          <FigmaSlide key="js-partner">
            <JsPartnerSlide
              client={IC_CLIENT}
              documentTitle={IC_TITLE}
              taglineBold={IC_BOLD}
              taglineRegular={IC_REGULAR}
              pageNumber={String(n).padStart(2, "0")}
              headline="Partner with us to create"
              headlineAccent="New Futures"
              items={[
                {
                  title: "Testimonials",
                  subtitle: "How our clients describe the work, the process, and the impact.",
                  linkText: "Read More →",
                  linkHref: "https://www.justified.studio/blog/testimonials",
                },
                {
                  title: "Our Approach",
                  subtitle: "The Justified creative model, a Creative Consultancy for a new era.",
                  linkText: "Read More →",
                  linkHref: "https://www.justified.studio/blog/a-new-creative-model",
                },
                {
                  title: "Recent Press: Forbes",
                  subtitle: "Strategic Thinking: Can Creativity Supercharge A Startup?",
                  linkText: "Read More →",
                  linkHref: "https://www.forbes.com/sites/trevorclawson/2023/05/31/strategic-thinking-can-creativity-supercharge-a-startup/",
                },
              ]}
            />
          </FigmaSlide>
        ),
        // ── 17 End ───────────────────────────────────────────────────────────────
        (_n) => (
          <FigmaSlide key="end">
            <JsEndSlide
              taglineBold={IC_BOLD}
              taglineRegular={IC_REGULAR}
            />
          </FigmaSlide>
        ),
      ]
    : [];

  const IC_FIGMA_SLIDE_NAMES = [
    "Contents", "JS Overview", "JS Ventures", "Logo Wall", "Mission", "JS Approach",
    "Client Introduction", "Chapter", "Phase 01", "Phase 02", "Phase 03", "Phase 04",
    "Cost", "Next Steps", "Case Study Chapter", "Case Study", "Case Study Bento", "Case Study Bento Alt",
    "Why Justified", "Partner", "End",
  ];

  const slideNames = isInspiredCapital
    ? ["Cover", ...IC_FIGMA_SLIDE_NAMES]
    : BASE_SLIDE_NAMES;

  // Build slides array — each factory receives its 1-based page number automatically.
  const allSlideFactories: SlideFactory[] = isInspiredCapital
    ? [
        (n) => (
          <FigmaSlide key="cover">
            <JsCoverSlide
              client={IC_CLIENT}
              documentTitle={IC_TITLE}
              taglineBold={IC_BOLD}
              taglineRegular={IC_REGULAR}
              pageNumber={String(n).padStart(2, "0")}
            />
          </FigmaSlide>
        ),
        ...figmaSlideFactories,
      ]
    : [
        (_n) => <CoverSlide key="cover" content={content} onChange={patch} />,
        (_n) => <IntroSlide key="intro" content={content} onChange={patch} />,
        (_n) => <WorkSlide key="work" content={content} />,
        (_n) => <ApproachSlide key="approach" content={content} />,
        (_n) => <ScopeSlide key="scope" content={content} />,
        (_n) => <InvestmentSlide key="investment" content={content} onChange={patch} />,
        (_n) => <GenericNextStepsSlide key="next" content={content} />,
      ];

  const slides = allSlideFactories.map((factory, i) => factory(i + 1));

  // Derive the SLIDE_KEYS key for the currently active slide (cover = "cover", others offset by 1).
  const activeSlideKey = isInspiredCapital
    ? activeSlide === 0 ? "cover" : (SLIDE_KEYS[activeSlide - 1] ?? "")
    : "";
  const slideAssets = SLIDE_ASSETS[activeSlideKey] ?? [];

  return (
    <div className="fixed inset-0 bg-background z-50 flex flex-col">
      {/* Header — no keyline, subtle shadow separates it */}
      <header className="flex items-center justify-between px-5 h-12 shrink-0">
        <button
          onClick={onBack}
          className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="size-3.5" />
          Back
        </button>
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-foreground">
            {item.title.replace(/_/g, " ")}
          </span>
          <Badge variant="secondary" className="rounded-full text-xs">
            In Review
          </Badge>
          {isInspiredCapital && (
            <button
              onClick={() => setShowProposalSettings(true)}
              className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground border border-border/60 rounded-full px-2.5 py-1 hover:bg-muted/60 transition-colors"
            >
              <Settings2 className="size-3" />
              Settings
            </button>
          )}
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowFullscreen(true)}
            className="size-8 flex items-center justify-center rounded-full text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
            aria-label="Fullscreen preview"
          >
            <Maximize2 className="size-3.5" />
          </button>
          <Button
            size="sm"
            className="rounded-full gap-1.5 h-8 px-3 text-xs"
            onClick={() => setShowShareModal(true)}
          >
            <Send className="size-3" />
            Share
          </Button>
        </div>
      </header>

      {/* Body */}
      <div className="flex flex-1 overflow-hidden">
        {/* Thumbnail strip — differentiated by background, no border */}
        <aside className="w-48 shrink-0 bg-muted/40 overflow-y-auto flex flex-col gap-1 p-2">
          {slides.map((slide, i) => (
            <button
              key={i}
              onClick={() => setActiveSlide(i)}
              className={cn(
                "w-full flex flex-col gap-1.5 rounded-lg p-1.5 transition-colors text-left",
                i === activeSlide ? "bg-background shadow-sm" : "hover:bg-background/60"
              )}
            >
              <div
                className={cn(
                  "w-full aspect-[16/9] rounded-md overflow-hidden",
                  i === activeSlide ? "shadow-sm ring-1 ring-foreground/10" : "opacity-70"
                )}
              >
                <div className="pointer-events-none w-full h-full">
                  <ScaledSlide>{slide}</ScaledSlide>
                </div>
              </div>
              <div className="flex items-center gap-1.5 px-0.5">
                <span className="text-[10px] tabular-nums text-muted-foreground/50">{i + 1}</span>
                <span
                  className={cn(
                    "text-[10px]",
                    i === activeSlide ? "font-medium text-foreground" : "text-muted-foreground"
                  )}
                >
                  {slideNames[i]}
                </span>
              </div>
            </button>
          ))}
        </aside>

        {/* Slide canvas */}
        <main className="flex-1 flex flex-col items-center justify-center gap-3 p-4 bg-zinc-100/60 overflow-hidden">
          <div className="w-full max-w-5xl aspect-[16/9] overflow-hidden rounded-xl shadow-2xl">
            <ScaledSlide>{slides[activeSlide]}</ScaledSlide>
          </div>
          {/* Inline nav — no footer bar */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => setActiveSlide((v) => Math.max(0, v - 1))}
              disabled={activeSlide === 0}
              className="size-7 flex items-center justify-center rounded-full text-muted-foreground hover:text-foreground hover:bg-background transition-colors disabled:opacity-30 disabled:pointer-events-none"
            >
              <ChevronLeft className="size-4" />
            </button>
            <span className="text-xs text-muted-foreground tabular-nums min-w-[3rem] text-center">
              {activeSlide + 1} / {slides.length}
            </span>
            <button
              onClick={() => setActiveSlide((v) => Math.min(slides.length - 1, v + 1))}
              disabled={activeSlide === slides.length - 1}
              className="size-7 flex items-center justify-center rounded-full text-muted-foreground hover:text-foreground hover:bg-background transition-colors disabled:opacity-30 disabled:pointer-events-none"
            >
              <ChevronRight className="size-4" />
            </button>
          </div>
        </main>

        {/* Right panel — slide assets only */}
        <aside className="w-60 shrink-0 bg-muted/40 overflow-y-auto flex flex-col">
          <div className="px-4 pt-4 pb-3 border-b border-border/40">
            <p className="text-xs font-medium text-foreground">Slide Assets</p>
            <p className="text-[10px] text-muted-foreground/70 mt-0.5">
              {slideAssets.length > 0 ? "Swap images for the current slide." : "No swappable assets on this slide."}
            </p>
          </div>

          {/* Assets — contextual to the active slide */}
          {slideAssets.length > 0 && (
            <div className="px-4 pb-4 flex flex-col gap-3 border-t border-border/60 pt-4">
              <div className="flex flex-col gap-1">
                <p className="text-[10px] font-medium text-muted-foreground uppercase tracking-widest">
                  Assets
                </p>
                <p className="text-[10px] text-muted-foreground/70 leading-relaxed">
                  Swap images for this slide.
                </p>
              </div>
              <div className="flex flex-col gap-3">
                {slideAssets.map((asset) => {
                  const url = assetUrl(asset.key, asset.defaultUrl);
                  const hasOverride = !!assetOverrides[asset.key];
                  return (
                    <div key={asset.key} className="flex flex-col gap-1.5">
                      <div className="flex items-center justify-between">
                        <p className="text-[10px] text-muted-foreground">{asset.label}</p>
                        {hasOverride && (
                          <span className="text-[9px] text-green-600 font-medium">Custom</span>
                        )}
                      </div>
                      <div className="aspect-video rounded-md overflow-hidden bg-muted/60 border border-border/40">
                        {url ? (
                          <img src={url} alt={asset.label} className="w-full h-full object-cover" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <ImageIcon className="size-4 text-muted-foreground/30" />
                          </div>
                        )}
                      </div>
                      <button
                        onClick={() => {
                          setSwappingAsset({ key: asset.key, label: asset.label, currentUrl: url });
                          setAssetInputUrl(url);
                        }}
                        className="text-[10px] text-muted-foreground hover:text-foreground transition-colors text-left"
                      >
                        {url ? "Swap →" : "Add image →"}
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </aside>
      </div>

      {/* Proposal Settings modal */}
      {showProposalSettings && (
        <div className="fixed inset-0 z-[60] bg-black/40 flex items-center justify-center p-4">
          <div className="bg-background rounded-xl shadow-xl w-full max-w-md max-h-[85vh] flex flex-col">
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-border shrink-0">
              <p className="text-sm font-medium">Proposal Settings</p>
              <button
                onClick={() => setShowProposalSettings(false)}
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <X className="size-4" />
              </button>
            </div>

            {/* Scrollable body */}
            <div className="overflow-y-auto flex flex-col gap-0 divide-y divide-border">

              {/* General */}
              <div className="px-5 py-4 flex flex-col gap-3">
                <p className="text-[10px] font-medium text-muted-foreground uppercase tracking-widest">General</p>
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs text-muted-foreground">Document Title</label>
                  <input
                    type="text"
                    value={proposalTitle}
                    onChange={(e) => setProposalTitle(e.target.value)}
                    className="text-xs px-3 py-2 rounded-md border border-border bg-background focus:outline-none focus:ring-1 focus:ring-foreground/20 w-full"
                    placeholder="Approach & Proposal"
                  />
                  <p className="text-[10px] text-muted-foreground/60">Shown in the slide nav bar and cover.</p>
                </div>
              </div>

              {/* Case Studies */}
              <div className="px-5 py-4 flex flex-col gap-3">
                <div className="flex flex-col gap-0.5">
                  <p className="text-[10px] font-medium text-muted-foreground uppercase tracking-widest">Case Studies</p>
                  <p className="text-[10px] text-muted-foreground/60">Select up to 3 projects to feature in the proposal.</p>
                </div>
                <div className="flex flex-col gap-1">
                  {AVAILABLE_CASE_STUDIES.map((cs) => {
                    const selected = selectedCaseStudyIds.includes(cs.id);
                    const disabled = !selected && selectedCaseStudyIds.length >= 3;
                    return (
                      <button
                        key={cs.id}
                        onClick={() => !disabled && toggleCaseStudy(cs.id)}
                        className={cn(
                          "flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-left transition-colors w-full",
                          selected ? "bg-muted shadow-sm" : disabled ? "opacity-40 cursor-default" : "hover:bg-muted/60"
                        )}
                      >
                        <div className={cn(
                          "size-3.5 rounded shrink-0 flex items-center justify-center transition-colors",
                          selected ? "bg-foreground" : "border border-border"
                        )}>
                          {selected && <Check className="size-2.5 text-background" strokeWidth={3} />}
                        </div>
                        <div className="flex flex-col min-w-0">
                          <span className="text-xs font-medium text-foreground truncate">{cs.name}</span>
                          <span className="text-[10px] text-muted-foreground">{cs.category}</span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Logo Wall */}
              <div className="px-5 py-4 flex flex-col gap-3">
                <div className="flex flex-col gap-0.5">
                  <p className="text-[10px] font-medium text-muted-foreground uppercase tracking-widest">Logo Wall</p>
                  <p className="text-[10px] text-muted-foreground/60">Logos shown in the Logo Wall slide. {logos.length} / 16</p>
                </div>

                {/* Logo list */}
                <div className="flex flex-col gap-1">
                  {logos.map((logo, i) => (
                    <div key={i} className="flex items-center gap-2.5 px-3 py-2 rounded-lg bg-muted/40 hover:bg-muted/70 transition-colors group">
                      <div className="size-7 rounded bg-zinc-900 shrink-0 overflow-hidden flex items-center justify-center p-1">
                        {logo.src ? (
                          <img src={logo.src} alt={logo.alt} className="w-full h-full object-contain" style={{ mixBlendMode: "screen" }} />
                        ) : (
                          <ImageIcon className="size-3 text-white/30" />
                        )}
                      </div>
                      <span className="text-xs text-foreground flex-1 truncate min-w-0">{logo.alt || "Unnamed"}</span>
                      <button
                        onClick={() => setLogos((prev) => prev.filter((_, j) => j !== i))}
                        className="opacity-0 group-hover:opacity-100 text-muted-foreground hover:text-destructive transition-all shrink-0"
                      >
                        <X className="size-3.5" />
                      </button>
                    </div>
                  ))}
                </div>

                {/* Add logo */}
                <div className="flex flex-col gap-2 pt-1 border-t border-border/40">
                  <p className="text-[10px] text-muted-foreground">Add logo</p>
                  <input
                    type="text"
                    value={newLogoAlt}
                    onChange={(e) => setNewLogoAlt(e.target.value)}
                    placeholder="Company name"
                    className="text-xs px-3 py-2 rounded-md border border-border bg-background focus:outline-none focus:ring-1 focus:ring-foreground/20"
                  />
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={newLogoSrc}
                      onChange={(e) => setNewLogoSrc(e.target.value)}
                      placeholder="Image URL (Cloudinary, Figma…)"
                      className="flex-1 text-xs px-3 py-2 rounded-md border border-border bg-background focus:outline-none focus:ring-1 focus:ring-foreground/20 min-w-0"
                    />
                    <button
                      onClick={() => {
                        if (newLogoSrc.trim() || newLogoAlt.trim()) {
                          setLogos((prev) => [...prev, { src: newLogoSrc.trim(), alt: newLogoAlt.trim() }]);
                          setNewLogoSrc("");
                          setNewLogoAlt("");
                        }
                      }}
                      className="shrink-0 size-8 flex items-center justify-center rounded-md bg-foreground text-background hover:bg-foreground/90 transition-colors"
                    >
                      <Plus className="size-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="px-5 py-3 border-t border-border shrink-0 flex justify-end">
              <button
                onClick={() => setShowProposalSettings(false)}
                className="text-xs px-5 py-2 rounded-md bg-foreground text-background hover:bg-foreground/90 transition-colors font-medium"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Asset swap modal */}
      {swappingAsset && (
        <div className="fixed inset-0 z-[60] bg-black/40 flex items-center justify-center p-4">
          <div className="bg-background rounded-xl shadow-xl w-full max-w-sm flex flex-col gap-4 p-5">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium">Swap {swappingAsset.label}</p>
              <button
                onClick={() => setSwappingAsset(null)}
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <X className="size-4" />
              </button>
            </div>

            {/* Live preview */}
            <div className="aspect-video rounded-lg overflow-hidden bg-muted/60 border border-border/40">
              {assetInputUrl ? (
                <img
                  src={assetInputUrl}
                  alt="Preview"
                  className="w-full h-full object-cover"
                  onError={(e) => { (e.currentTarget as HTMLImageElement).style.opacity = "0.2"; }}
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <ImageIcon className="size-6 text-muted-foreground/30" />
                </div>
              )}
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] text-muted-foreground">Image URL (Cloudinary, Figma, or any CDN)</label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={assetInputUrl}
                  onChange={(e) => setAssetInputUrl(e.target.value)}
                  placeholder="https://res.cloudinary.com/..."
                  className="flex-1 text-xs px-3 py-2 rounded-md border border-border bg-background focus:outline-none focus:ring-1 focus:ring-foreground/20 min-w-0"
                />
                <button
                  onClick={async () => {
                    try {
                      const text = await navigator.clipboard.readText();
                      setAssetInputUrl(text);
                    } catch { /* clipboard blocked */ }
                  }}
                  className="text-xs px-3 py-2 rounded-md bg-muted hover:bg-muted/60 transition-colors whitespace-nowrap shrink-0"
                >
                  Paste
                </button>
              </div>
            </div>

            <div className="flex items-center gap-2 justify-between pt-1">
              {assetOverrides[swappingAsset.key] && (
                <button
                  onClick={() => {
                    setAssetOverrides((prev) => {
                      const next = { ...prev };
                      delete next[swappingAsset.key];
                      return next;
                    });
                    setSwappingAsset(null);
                  }}
                  className="text-xs text-muted-foreground hover:text-destructive transition-colors"
                >
                  Reset to default
                </button>
              )}
              <div className="flex gap-2 ml-auto">
                <button
                  onClick={() => setSwappingAsset(null)}
                  className="text-xs px-4 py-2 rounded-md text-muted-foreground hover:text-foreground transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    if (assetInputUrl.trim()) {
                      setAssetOverrides((prev) => ({ ...prev, [swappingAsset.key]: assetInputUrl.trim() }));
                    }
                    setSwappingAsset(null);
                  }}
                  className="text-xs px-4 py-2 rounded-md bg-foreground text-background hover:bg-foreground/90 transition-colors"
                >
                  Apply
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Share modal */}
      {showShareModal && (
        <ShareModal
          item={item}
          onCancel={() => setShowShareModal(false)}
          onConfirm={() => {
            setShowShareModal(false);
            onSend(item);
          }}
        />
      )}

      {/* Fullscreen preview */}
      {showFullscreen && (
        <FullscreenPreview
          slides={slides}
          initialIndex={activeSlide}
          onClose={() => setShowFullscreen(false)}
        />
      )}
    </div>
  );
}
