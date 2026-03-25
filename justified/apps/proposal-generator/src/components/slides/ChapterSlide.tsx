import "@/styles/slides.css"
import { SlideNav } from "./SlideNav"

// Figma node 1-509 — Chapter / section divider slide
// Pure black background, large headline left-aligned at 16px, vertically centred.

interface ChapterSlideProps {
  client: string
  documentTitle: string
  taglineBold: string
  taglineRegular: string
  pageNumber: string | number
  // The chapter headline — e.g. "Approach & Proposal"
  title?: string
}

export function ChapterSlide({
  client,
  documentTitle,
  taglineBold,
  taglineRegular,
  pageNumber,
  title = "Approach & Proposal",
}: ChapterSlideProps) {
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

      {/* Headline — left-aligned, vertically centred */}
      <p
        className="absolute"
        style={{
          fontFamily: "var(--slide-font)",
          fontWeight: 500,
          fontSize: "51px",
          letterSpacing: "-0.51px",
          lineHeight: 1,
          color: "#ffffff",
          left: "16px",
          top: "50%",
          transform: "translateY(-50%)",
          margin: 0,
          whiteSpace: "nowrap",
        }}
      >
        {title}
      </p>
    </div>
  )
}
