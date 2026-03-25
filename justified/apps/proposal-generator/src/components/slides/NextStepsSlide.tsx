import "@/styles/slides.css"
import { SlideNav } from "./SlideNav"

// Figma node 1-617 — Next Steps
// Black background, typographic only. Heading + body at 31px white,
// positioned left:16px, vertically centred in the slide.

interface NextStepsSlideProps {
  client: string
  documentTitle: string
  taglineBold: string
  taglineRegular: string
  pageNumber: string | number
  heading?: string
  body?: string
}

export function NextStepsSlide({
  client,
  documentTitle,
  taglineBold,
  taglineRegular,
  pageNumber,
  heading = "Next Steps",
  body = "If this direction aligns, we will refine scope and timeline in collaboration and confirm a start date. Upon approval, we will issue a formal agreement and staged payment schedule. We are excited by the opportunity to partner with you and bring clarity, cohesion, and credibility to your next chapter.",
}: NextStepsSlideProps) {
  const TEXT_STYLE: React.CSSProperties = {
    fontFamily: "var(--slide-font)",
    fontWeight: 500,
    fontSize: "31px",
    letterSpacing: "-0.31px",
    lineHeight: 1.1,
    color: "#ffffff",
    margin: 0,
  }

  return (
    <div
      className="relative overflow-hidden"
      style={{
        width: "var(--slide-width)",
        aspectRatio: "16/9",
        background: "#000000",
      }}
    >
      {/* Nav bar — white text on black */}
      <SlideNav
        client={client}
        documentTitle={documentTitle}
        taglineBold={taglineBold}
        taglineRegular={taglineRegular}
        pageNumber={pageNumber}
        theme="dark"
      />

      {/* Content block — left:16px, vertically centred */}
      <div
        className="absolute"
        style={{
          left: "16px",
          width: "988px",
          top: "50%",
          transform: "translateY(-50%)",
          display: "flex",
          flexDirection: "column",
          gap: "24px",
        }}
      >
        <p style={TEXT_STYLE}>{heading}</p>
        <p style={{ ...TEXT_STYLE, color: "rgba(255,255,255,0.75)" }}>{body}</p>
      </div>
    </div>
  )
}
