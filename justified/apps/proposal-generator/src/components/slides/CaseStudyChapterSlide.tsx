import "@/styles/slides.css"
import { SlideNav } from "./SlideNav"

// Case Study section chapter slide — awaiting Figma node

interface CaseStudyChapterSlideProps {
  client: string
  documentTitle: string
  taglineBold: string
  taglineRegular: string
  pageNumber: string | number
  projectName?: string
  projectTagline?: string
  image?: string
}

export function CaseStudyChapterSlide({
  client,
  documentTitle,
  taglineBold,
  taglineRegular,
  pageNumber,
  projectName = "Concept Ventures",
  projectTagline = "Backing bold founders with clarity and conviction.",
  image,
}: CaseStudyChapterSlideProps) {
  return (
    <div
      className="relative overflow-hidden"
      style={{ width: "var(--slide-width)", aspectRatio: "16/9", background: "#181819" }}
    >
      <SlideNav
        client={client}
        documentTitle={documentTitle}
        taglineBold={taglineBold}
        taglineRegular={taglineRegular}
        pageNumber={pageNumber}
        theme="dark"
      />

      {/* Full-bleed image if provided */}
      {image && (
        <div
          className="absolute"
          style={{ top: "48px", left: "960px", right: 0, bottom: 0 }}
        >
          <img
            src={image}
            alt={projectName}
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        </div>
      )}

      {/* Left column text */}
      <div
        className="absolute flex flex-col justify-end"
        style={{ top: "48px", left: "16px", width: "900px", bottom: "80px" }}
      >
        <p style={{ fontFamily: "var(--slide-font)", fontSize: "14px", color: "rgba(255,255,255,0.4)", marginBottom: "16px", letterSpacing: "0.1em", textTransform: "uppercase" }}>
          Stub — Awaiting Figma Design
        </p>
        <p style={{ fontFamily: "var(--slide-font)", fontSize: "14px", color: "rgba(255,255,255,0.5)", margin: "0 0 12px", letterSpacing: "0.05em" }}>
          Case Study
        </p>
        <p style={{ fontFamily: "var(--slide-font)", fontSize: "72px", fontWeight: 500, color: "#ffffff", margin: "0 0 16px", lineHeight: 1 }}>
          {projectName}
        </p>
        <p style={{ fontFamily: "var(--slide-font)", fontSize: "24px", color: "rgba(255,255,255,0.6)", margin: 0 }}>
          {projectTagline}
        </p>
      </div>
    </div>
  )
}
