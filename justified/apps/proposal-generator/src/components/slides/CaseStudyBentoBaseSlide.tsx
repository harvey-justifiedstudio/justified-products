import "@/styles/slides.css"
import { SlideNav } from "./SlideNav"

// Case Study Bento (non-alt layout) — awaiting Figma node

interface CaseStudyBentoBaseSlideProps {
  client: string
  documentTitle: string
  taglineBold: string
  taglineRegular: string
  pageNumber: string | number
  images?: {
    topLeft?: string
    topRight?: string
    bottom?: string
  }
}

export function CaseStudyBentoBaseSlide({
  client,
  documentTitle,
  taglineBold,
  taglineRegular,
  pageNumber,
  images = {},
}: CaseStudyBentoBaseSlideProps) {
  const BG = "#181819"
  const PLACEHOLDER = "#27282b"

  return (
    <div
      className="relative overflow-hidden"
      style={{ width: "var(--slide-width)", aspectRatio: "16/9", background: BG }}
    >
      <SlideNav
        client={client}
        documentTitle={documentTitle}
        taglineBold={taglineBold}
        taglineRegular={taglineRegular}
        pageNumber={pageNumber}
        theme="dark"
      />

      {/* Placeholder bento grid */}
      <div
        className="absolute flex gap-[8px] p-[8px]"
        style={{ top: "48px", left: 0, right: 0, bottom: 0 }}
      >
        {/* Left two-thirds */}
        <div className="flex flex-col gap-[8px]" style={{ flex: 2 }}>
          <div
            className="flex-1 rounded-[8px] flex items-center justify-center"
            style={{ background: images.topLeft ? "transparent" : PLACEHOLDER }}
          >
            {images.topLeft
              ? <img src={images.topLeft} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: "8px" }} />
              : <p style={{ fontFamily: "var(--slide-font)", fontSize: "14px", color: "#555", textAlign: "center" }}>Stub — Awaiting Figma Design<br />Case Study Bento</p>
            }
          </div>
          <div
            className="rounded-[8px]"
            style={{ height: "320px", background: images.topRight ? "transparent" : PLACEHOLDER }}
          >
            {images.topRight && (
              <img src={images.topRight} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: "8px" }} />
            )}
          </div>
        </div>
        {/* Right third */}
        <div
          className="rounded-[8px]"
          style={{ flex: 1, background: images.bottom ? "transparent" : PLACEHOLDER }}
        >
          {images.bottom && (
            <img src={images.bottom} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: "8px" }} />
          )}
        </div>
      </div>
    </div>
  )
}
