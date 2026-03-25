import "@/styles/slides.css"
import { SlideNav } from "./SlideNav"

export interface PhaseActivity {
  title: string
  body: string
}

export interface PhaseDeliverable {
  title: string
  body: string
}

interface PhaseSlideProps {
  client: string
  documentTitle: string
  taglineBold: string
  taglineRegular: string
  pageNumber: string | number
  phaseNumber: string       // e.g. "02"
  phaseName: string         // e.g. "Visual Identity Evolution"
  introduction: string[]    // array of paragraphs
  keyActivities: PhaseActivity[]
  deliverables: PhaseDeliverable[]
  duration: string          // e.g. "4 Weeks"
  fee: string               // e.g. "£XX,XXX"
  image?: string
}

const HEADING = {
  fontFamily: 'var(--slide-font)',
  fontWeight: 500,
  fontSize: '28px',
  lineHeight: '1.2',
  letterSpacing: '-0.28px',
  color: 'var(--slide-ink)',
}

const BODY = {
  fontFamily: 'var(--slide-font)',
  fontWeight: 500,
  fontSize: '18px',
  lineHeight: '1.2',
  color: 'var(--slide-ink-secondary)',
}

const ACTIVITY_TITLE = {
  fontFamily: 'var(--slide-font)',
  fontWeight: 700,
  fontSize: '18px',
  lineHeight: '1.2',
  color: 'var(--slide-ink)',
}

export function PhaseSlide({
  client,
  documentTitle,
  taglineBold,
  taglineRegular,
  pageNumber,
  phaseNumber,
  phaseName,
  introduction,
  keyActivities,
  deliverables,
  duration,
  fee,
  image,
}: PhaseSlideProps) {
  return (
    <div
      className="relative"
      style={{ width: 'var(--slide-width)', aspectRatio: '16/9', background: 'var(--slide-surface)' }}
    >
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
        style={{ top: '120px', left: '19px', right: '0' }}
      />

      {/* Col 1 — Image */}
      <div
        className="absolute overflow-hidden rounded-[8px]"
        style={{ left: '16px', top: '147px', width: '460px', height: '460px', background: '#e8e8e8' }}
      >
        {image && (
          <img
            src={image}
            alt={phaseName}
            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
          />
        )}
      </div>

      {/* Col 1 — Phase name */}
      <p
        className="absolute not-italic"
        style={{ ...HEADING, left: '16px', top: '619px', width: '432px' }}
      >
        <span style={{ fontWeight: 500 }}>Phase {phaseNumber}</span>
        <br />
        <span style={{ color: 'var(--slide-ink-secondary)' }}>{phaseName}</span>
      </p>

      {/* Col 1 — Phase Duration row */}
      <div className="absolute border-t border-black/10" style={{ top: '707px', left: '16px', width: '460px' }} />
      <p
        className="absolute not-italic"
        style={{ ...BODY, left: '16px', top: '716px' }}
      >
        <span style={{ fontWeight: 700, color: 'var(--slide-ink)' }}>Phase Duration: </span>
        <span>{duration}</span>
      </p>
      <div className="absolute border-t border-black/10" style={{ top: '750px', left: '16px', width: '460px' }} />

      {/* Col 1 — Phase Fee row */}
      <p
        className="absolute not-italic"
        style={{ ...BODY, left: '16px', top: '759px' }}
      >
        <span style={{ fontWeight: 700, color: 'var(--slide-ink)' }}>Phase Fee: </span>
        <span>{fee}</span>
      </p>
      <div className="absolute border-t border-black/10" style={{ top: '793px', left: '16px', width: '460px' }} />

      {/* Col 2 — Introduction */}
      <div
        className="absolute not-italic"
        style={{ left: 'calc(25% + 12px)', top: '144px', width: '431px' }}
      >
        <p style={{ ...HEADING, marginBottom: '24px' }}>Introduction</p>
        {introduction.map((para, i) => (
          <p
            key={i}
            style={{ ...BODY, marginBottom: i < introduction.length - 1 ? '18px' : '0' }}
          >
            {para}
          </p>
        ))}
      </div>

      {/* Col 3 — Key Activities */}
      <div
        className="absolute not-italic"
        style={{ left: 'calc(50% + 8px)', top: '144px', width: '429px' }}
      >
        <p style={{ ...HEADING, marginBottom: '24px' }}>Key Activities</p>
        {keyActivities.map((activity, i) => (
          <div key={i} style={{ marginBottom: i < keyActivities.length - 1 ? '18px' : '0' }}>
            <p style={{ ...ACTIVITY_TITLE, marginBottom: '4px' }}>{activity.title}</p>
            <p style={BODY}>{activity.body}</p>
          </div>
        ))}
      </div>

      {/* Col 4 — Deliverables */}
      <div
        className="absolute not-italic"
        style={{ left: 'calc(75% + 7px)', top: '144px', width: '421px' }}
      >
        <p style={{ ...HEADING, marginBottom: '24px' }}>Deliverables</p>
        {deliverables.map((deliverable, i) => (
          <div key={i} style={{ marginBottom: i < deliverables.length - 1 ? '18px' : '0' }}>
            <p style={{ ...ACTIVITY_TITLE, marginBottom: '4px' }}>{deliverable.title}</p>
            <p style={{ ...BODY, color: '#999' }}>{deliverable.body}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
