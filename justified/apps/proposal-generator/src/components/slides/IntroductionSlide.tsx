import "@/styles/slides.css"
import { SlideNav } from "./SlideNav"

interface IntroductionSlideProps {
  client: string
  documentTitle: string
  taglineBold: string
  taglineRegular: string
  pageNumber: string | number
  image?: string
  paragraphs: string[]  // 2 paragraphs of introduction copy
}

export function IntroductionSlide({
  client,
  documentTitle,
  taglineBold,
  taglineRegular,
  pageNumber,
  image,
  paragraphs,
}: IntroductionSlideProps) {
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

      {/* Left half — full-bleed image */}
      <div
        className="absolute overflow-hidden"
        style={{ left: 0, top: '132px', width: '952px', height: '948px' }}
      >
        {image ? (
          <img
            src={image}
            alt={client}
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
          <div style={{ width: '100%', height: '100%', background: '#e8e8e8' }} />
        )}
      </div>

      {/* Left divider — spans the left half */}
      <div
        className="absolute border-t border-black/10"
        style={{ top: '130px', left: '17px', width: '935px' }}
      />

      {/* Right divider — spans the right half */}
      <div
        className="absolute border-t border-black/10"
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
          color: 'var(--slide-ink)',
          left: 'calc(75% + 2px)',
          top: '148px',
          width: '460px',
        }}
      >
        Introduction
      </p>

      {/* Body text */}
      <div
        className="absolute not-italic"
        style={{
          fontFamily: 'var(--slide-font)',
          fontWeight: 500,
          fontSize: '20px',
          lineHeight: '1.2',
          letterSpacing: '-0.1px',
          color: 'var(--slide-ink-secondary)',
          left: 'calc(75% + 4px)',
          top: '376px',
          width: '458px',
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
