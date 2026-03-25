import "@/styles/slides.css"
import { SlideNav } from "./SlideNav"

// Figma node 1-486 — JS Approach
// Black background. SlideNav dark. Full-width hairline rule at y:205.
// Large heading + italic grey subheading at y:245 (48px).
// "Read More →" pill at y:525. Three-column block (rule + title + italic body) at y:737/762 (26px).

interface ApproachColumn {
  title: string
  body: string
}

interface JsApproachSlideProps {
  client: string
  documentTitle: string
  taglineBold: string
  taglineRegular: string
  pageNumber: string | number
  heading?: string
  subheading?: string
  columns?: [ApproachColumn, ApproachColumn, ApproachColumn]
}

const DEFAULT_COLUMNS: [ApproachColumn, ApproachColumn, ApproachColumn] = [
  {
    title: "Strategic-Led Creatives.",
    body: "We ground design in business strategy — ensuring every creative decision maps to a real commercial objective and reflects who you are today and where you are heading.",
  },
  {
    title: "Lean, Senior, and Effective.",
    body: "You work directly with experienced strategists and designers. Fast decision cycles and clarity reduce unnecessary rounds and protect momentum from day one.",
  },
  {
    title: "Impact-Obsessed.",
    body: "The objective is simple. When your audience lands on your site, they immediately understand what you stand for, what you do, and why you matter.",
  },
]

export function JsApproachSlide({
  client,
  documentTitle,
  taglineBold,
  taglineRegular,
  pageNumber,
  heading = "The Justified Approach.",
  subheading = "We challenge traditional agency structures, bringing strategy and creative into one accountable model designed for clarity, speed, and long-term commercial impact.",
  columns = DEFAULT_COLUMNS,
}: JsApproachSlideProps) {
  const FONT = "var(--slide-font)"
  const RULE = "rgba(255,255,255,0.15)"

  // Column left positions and widths derived from Figma (1920px coordinate space)
  // calc(8.33%+15px) = 175px | calc(33.33%+65px) = 705px | calc(58.33%+114px) = 1234px
  const COL_LEFTS = ["175px", "705px", "1234px"] as const
  const COL_WIDTHS = ["460px", "462px", "474px"] as const

  return (
    <div
      className="relative overflow-hidden"
      style={{ width: "var(--slide-width)", aspectRatio: "16/9", background: "#000000" }}
    >
      <SlideNav
        client={client}
        documentTitle={documentTitle}
        taglineBold={taglineBold}
        taglineRegular={taglineRegular}
        pageNumber={pageNumber}
        theme="dark"
      />

      {/* Full-width hairline rule */}
      <div
        className="absolute"
        style={{ left: "16px", right: "16px", top: "205px", borderTop: `1px solid ${RULE}` }}
      />

      {/* Main heading + subheading */}
      <p
        className="absolute"
        style={{
          fontFamily: FONT,
          fontWeight: 500,
          fontSize: "48px",
          letterSpacing: "-0.48px",
          lineHeight: 1.04,
          color: "#ffffff",
          left: "175px",
          top: "245px",
          width: "1094px",
          margin: 0,
        }}
      >
        {heading}
        <br />
        <span style={{ color: "#a4a4a1", fontStyle: "italic" }}>{subheading}</span>
      </p>

      {/* Read More pill */}
      <div
        className="absolute flex items-center justify-center"
        style={{
          left: "175px",
          top: "525px",
          width: "150px",
          height: "55px",
          background: "#1e1e1e",
          borderRadius: "6px",
        }}
      >
        <a
          href="https://www.justified.studio/blog/a-new-creative-model"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            fontFamily: FONT,
            fontWeight: 500,
            fontSize: "18px",
            letterSpacing: "-0.18px",
            lineHeight: 1.14,
            color: "#ffffff",
            textDecoration: "underline",
          }}
        >
          Read More →
        </a>
      </div>

      {/* Three-column block */}
      {columns.map((col, i) => (
        <div
          key={i}
          className="absolute"
          style={{ left: COL_LEFTS[i], top: "737px", width: COL_WIDTHS[i] }}
        >
          {/* Column hairline rule */}
          <div style={{ borderTop: `1px solid ${RULE}`, marginBottom: "25px" }} />
          {/* Column title + body */}
          <p
            style={{
              fontFamily: FONT,
              fontWeight: 500,
              fontSize: "26px",
              letterSpacing: "-0.26px",
              lineHeight: 1.14,
              color: "#ffffff",
              margin: 0,
            }}
          >
            {col.title}
            <br />
            <span style={{ color: "#a4a4a1", fontStyle: "italic" }}>{col.body}</span>
          </p>
        </div>
      ))}
    </div>
  )
}
