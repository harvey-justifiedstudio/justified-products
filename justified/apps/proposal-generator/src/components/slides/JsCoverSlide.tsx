import "@/styles/slides.css"
import { SlideNav } from "./SlideNav"

// Figma node 1-288 — "JS Intro"
// Layout: #0003fe background, standard SlideNav (white text), oversized wordmark at bottom.
// All coordinates are at the 1920×1080 Figma reference — this component is always
// rendered inside <FigmaSlide> which applies scale(0.5) to fit the 960×540 ScaledSlide.

interface JsCoverSlideProps {
  client: string
  documentTitle: string
  taglineBold: string
  taglineRegular: string
  pageNumber: string | number
}

export function JsCoverSlide({
  client,
  documentTitle,
  taglineBold,
  taglineRegular,
  pageNumber,
}: JsCoverSlideProps) {
  return (
    <div
      className="relative overflow-hidden"
      style={{
        width: "var(--slide-width)",
        aspectRatio: "16/9",
        background: "#0003fe",
      }}
    >
      {/* Nav bar — white text on blue */}
      <SlideNav
        client={client}
        documentTitle={documentTitle}
        taglineBold={taglineBold}
        taglineRegular={taglineRegular}
        pageNumber={pageNumber}
        theme="dark"
      />

      {/* Wordmark — 16px left padding, full bleed right + bottom */}
      <div
        className="absolute overflow-hidden"
        style={{ left: "16px", top: "820px", right: 0, bottom: 0 }}
      >
        <p
          style={{
            fontFamily: "var(--slide-font)",
            fontWeight: 500,
            fontSize: "320px",
            lineHeight: 1,
            color: "#ffffff",
            margin: 0,
            whiteSpace: "nowrap",
          }}
        >
          Justified.Studio
        </p>
      </div>
    </div>
  )
}
