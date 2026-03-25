import "@/styles/slides.css"
import { SlideNav } from "./SlideNav"

export interface CostPhase {
  phaseNumber: string  // "01"
  phaseName: string    // "Strategic Repositioning & Market Definition"
  duration: string     // "2 weeks"
  fee: string          // "£XX,XXX"
}

interface CostSlideProps {
  client: string
  documentTitle: string
  taglineBold: string
  taglineRegular: string
  pageNumber: string | number
  phases: CostPhase[]
  total: string
  pleaseNote?: string
  feeNote?: string
}

const DEFAULT_PLEASE_NOTE =
  "The costs outlined are estimates, informed by our current understanding of the project's requirements, goals, and our experience with similar clients.\n\nEach phase offers opportunities to refine the specific activities and outputs to suit your needs. Following this, we will provide a detailed scoping document that will serve as the foundation for our collaboration. We look forward to working closely with you to further define these stages and confirm the best approach."

const DEFAULT_FEE_NOTE =
  "The proposed fee reflects the team we would assemble to deliver this project. However, we are open to a collaborative scoping phase to ensure alignment on both the task and the team required."

const NOTE_STYLE: React.CSSProperties = {
  fontFamily: 'var(--slide-font)',
  fontWeight: 500,
  fontSize: '16px',
  lineHeight: '1.28',
  letterSpacing: '-0.32px',
  color: '#999',
  whiteSpace: 'pre-wrap',
}

const LABEL_STYLE: React.CSSProperties = {
  fontFamily: "'Helvetica Now Text', sans-serif",
  fontWeight: 400,
  fontSize: '15.216px',
  lineHeight: '1.28',
  letterSpacing: '-0.3043px',
  color: '#999',
}

const PHASE_NAME_STYLE: React.CSSProperties = {
  fontFamily: 'var(--slide-font)',
  fontWeight: 500,
  fontSize: '20.288px',
  lineHeight: '1.1',
  letterSpacing: '-0.2029px',
  color: '#434343',
}

const FEE_STYLE: React.CSSProperties = {
  fontFamily: "'Helvetica Now Text', sans-serif",
  fontWeight: 400,
  fontSize: '15.216px',
  lineHeight: '1.28',
  letterSpacing: '-0.3043px',
  color: '#121212',
  textAlign: 'right',
}

const TOTAL_STYLE: React.CSSProperties = {
  fontFamily: "'Helvetica Now Text', sans-serif",
  fontWeight: 700,
  fontSize: '15.22px',
  lineHeight: '1.28',
  letterSpacing: '-0.3044px',
  color: '#121212',
}

export function CostSlide({
  client,
  documentTitle,
  taglineBold,
  taglineRegular,
  pageNumber,
  phases,
  total,
  pleaseNote = DEFAULT_PLEASE_NOTE,
  feeNote = DEFAULT_FEE_NOTE,
}: CostSlideProps) {
  return (
    <div
      className="relative"
      style={{ width: 'var(--slide-width)', aspectRatio: '16/9', background: 'var(--slide-surface)' }}
    >
      {/* Left gray panel */}
      <div
        className="absolute"
        style={{ left: '-5px', top: '-6px', width: '447px', height: '1086px', background: '#f7f6f5' }}
      />

      <SlideNav
        client={client}
        documentTitle={documentTitle}
        taglineBold={taglineBold}
        taglineRegular={taglineRegular}
        pageNumber={pageNumber}
        theme="light"
      />

      {/* Top divider */}
      <div
        className="absolute border-t border-black/10"
        style={{ top: '48px', left: '16px', width: '1888px' }}
      />

      {/* Left panel — notes */}
      <div
        className="absolute"
        style={{ left: '16px', top: '95px', width: '386px' }}
      >
        <p style={{ ...NOTE_STYLE, color: '#666', marginBottom: '4px' }}>Please Note.</p>
        <p style={{ ...NOTE_STYLE, marginBottom: '24px' }}>{pleaseNote}</p>
        <p style={{ ...NOTE_STYLE, color: '#666', marginBottom: '4px' }}>Fee.</p>
        <p style={NOTE_STYLE}>{feeNote}</p>
      </div>

      {/* Main heading */}
      <p
        className="absolute not-italic"
        style={{
          fontFamily: 'var(--slide-font)',
          fontWeight: 500,
          fontSize: '32px',
          lineHeight: '1.1',
          letterSpacing: '-0.32px',
          color: '#434343',
          left: 'calc(25% + 12px)',
          top: '80px',
          width: '444px',
        }}
      >
        Estimated Project Scope
      </p>

      {/* Phase rows */}
      <div
        className="absolute flex flex-col"
        style={{ left: 'calc(25% + 12px)', top: '144px', width: '899px' }}
      >
        {phases.map((phase) => (
          <div
            key={phase.phaseNumber}
            className="relative shrink-0"
            style={{ height: '67.625px', width: '100%' }}
          >
            {/* Row top border — extends to 1411px from container left */}
            <div
              className="absolute border-t border-black/10"
              style={{ top: '-0.32px', left: '0', width: '1411px' }}
            />
            {/* Phase label */}
            <p
              className="absolute not-italic"
              style={{ ...LABEL_STYLE, left: '0', top: '25.36px', width: '202px' }}
            >
              Phase - {phase.phaseNumber}
            </p>
            {/* Phase name */}
            <p
              className="absolute not-italic"
              style={{ ...PHASE_NAME_STYLE, left: '161px', top: '22.82px', width: '518px' }}
            >
              {phase.phaseName}
            </p>
            {/* Duration */}
            <p
              className="absolute not-italic"
              style={{ ...LABEL_STYLE, left: '954px', top: '25.36px', width: '202px' }}
            >
              {phase.duration}
            </p>
            {/* Fee — right-aligned to x=1411px */}
            <p
              className="absolute not-italic"
              style={{ ...FEE_STYLE, left: '1411px', top: '25.68px', width: '175px', transform: 'translateX(-100%)' }}
            >
              {phase.fee}
            </p>
          </div>
        ))}
      </div>

      {/* Total section */}
      <div
        className="absolute border-t border-black/10"
        style={{ top: '537px', left: 'calc(75% + 8px)', width: '456px' }}
      />
      <p
        className="absolute not-italic"
        style={{ ...TOTAL_STYLE, left: 'calc(75% + 3px)', top: '564px' }}
      >
        Total
      </p>
      <p
        className="absolute not-italic"
        style={{ ...TOTAL_STYLE, top: '564px', left: 'calc(83.33% + 300px)', transform: 'translateX(-100%)', width: '218px', textAlign: 'right' }}
      >
        {total}
      </p>
      <div
        className="absolute border-t border-black/10"
        style={{ top: '630px', left: 'calc(75% + 6px)', width: '456px' }}
      />
    </div>
  )
}
