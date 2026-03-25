import "@/styles/slides.css"
import { SlideNav } from "./SlideNav"

interface JsWhySlideProps {
  client: string
  documentTitle: string
  taglineBold: string
  taglineRegular: string
  pageNumber: string | number
  image?: string
  paragraphs: string[]
}

export function JsWhySlide({
  client,
  documentTitle,
  taglineBold,
  taglineRegular,
  pageNumber,
  image,
  paragraphs,
}: JsWhySlideProps) {
  return (
    <div
      className="relative"
      style={{ width: 'var(--slide-width)', aspectRatio: '16/9', background: '#000000' }}
    >
      <SlideNav
        client={client}
        documentTitle={documentTitle}
        taglineBold={taglineBold}
        taglineRegular={taglineRegular}
        pageNumber={pageNumber}
        theme="dark"
      />

      {/* Left half — full-bleed image */}
      <div
        className="absolute overflow-hidden"
        style={{ left: 0, top: '132px', width: '952px', height: '948px' }}
      >
        {image ? (
          <img
            src={image}
            alt="Why Justified"
            style={{
              position: 'absolute',
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              objectPosition: 'center',
              display: 'block',
            }}
          />
        ) : (
          <div style={{ width: '100%', height: '100%', background: '#1a1a1a' }} />
        )}
      </div>

      {/* Left divider */}
      <div
        className="absolute border-t border-white/10"
        style={{ top: '130px', left: '17px', width: '935px' }}
      />

      {/* Right divider */}
      <div
        className="absolute border-t border-white/10"
        style={{ top: '130px', left: 'calc(50% + 8px)', width: '954px' }}
      />

      {/* Heading */}
      <p
        className="absolute not-italic"
        style={{
          fontFamily: 'var(--slide-font)',
          fontWeight: 500,
          fontSize: '48px',
          lineHeight: '1.1',
          letterSpacing: '-0.48px',
          color: '#ffffff',
          left: 'calc(75% + 2px)',
          top: '148px',
          width: '460px',
        }}
      >
        Why Justified
      </p>

      {/* Body text */}
      <div
        className="absolute not-italic"
        style={{
          fontFamily: 'var(--slide-font)',
          fontWeight: 500,
          fontSize: '18px',
          lineHeight: '1.2',
          letterSpacing: '-0.1px',
          color: 'rgba(255,255,255,0.7)',
          left: 'calc(75% + 4px)',
          top: '376px',
          width: '428px',
        }}
      >
        {paragraphs.map((para, i) => (
          <p key={i} style={{ margin: 0, marginBottom: i < paragraphs.length - 1 ? '20px' : 0 }}>
            {para}
          </p>
        ))}
      </div>
    </div>
  )
}
