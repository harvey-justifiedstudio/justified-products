import "@/styles/slides.css"
import { SlideNav } from "./SlideNav"

interface JsVenturesSlideProps {
  client: string
  documentTitle: string
  taglineBold: string
  taglineRegular: string
  pageNumber: string | number
  statement: string
  linkText?: string
  linkHref?: string
}

export function JsVenturesSlide({
  client,
  documentTitle,
  taglineBold,
  taglineRegular,
  pageNumber,
  statement,
  linkText = "Read More →",
  linkHref,
}: JsVenturesSlideProps) {
  return (
    <div
      className="relative"
      style={{ width: 'var(--slide-width)', aspectRatio: '16/9', background: 'var(--slide-surface-dark)' }}
    >
      <SlideNav
        client={client}
        documentTitle={documentTitle}
        taglineBold={taglineBold}
        taglineRegular={taglineRegular}
        pageNumber={pageNumber}
        theme="dark"
      />

      {/* Full-width divider */}
      <div className="absolute left-[16px] right-0 border-t border-white/20" style={{ top: '205px' }} />

      {/* Statement text */}
      <p
        className="absolute not-italic"
        style={{
          fontFamily: 'var(--slide-font)',
          fontWeight: 500,
          fontSize: 'var(--slide-statement-size)',
          lineHeight: 'var(--slide-statement-leading)',
          letterSpacing: 'var(--slide-statement-tracking)',
          color: 'var(--slide-ink-dark)',
          left: 'calc(8.33% + 16px)',
          top: '232px',
          width: '1198px',
        }}
      >
        {statement}
      </p>

      {/* Logo placeholder + link */}
      <div
        className="absolute"
        style={{ left: 'calc(8.33% + 15px)', top: '585px' }}
      >
        <div
          className="rounded-[6px]"
          style={{ width: '150px', height: '55px', background: '#1e1e1e' }}
        />
        {linkHref ? (
          <a
            href={linkHref}
            className="absolute not-italic underline"
            style={{
              fontFamily: 'var(--slide-font)',
              fontWeight: 500,
              fontSize: '18.284px',
              lineHeight: '1.14',
              letterSpacing: '-0.1828px',
              color: 'var(--slide-ink-dark)',
              left: '20px',
              top: '17px',
              width: '109px',
            }}
          >
            {linkText}
          </a>
        ) : (
          <span
            className="absolute not-italic underline"
            style={{
              fontFamily: 'var(--slide-font)',
              fontWeight: 500,
              fontSize: '18.284px',
              lineHeight: '1.14',
              letterSpacing: '-0.1828px',
              color: 'var(--slide-ink-dark)',
              left: '20px',
              top: '17px',
              width: '109px',
            }}
          >
            {linkText}
          </span>
        )}
      </div>
    </div>
  )
}
