import "@/styles/slides.css"
import { SlideNav } from "./SlideNav"

export interface JsPartnerItem {
  title: string
  subtitle: string
  logoSrc?: string
  linkText: string
  linkHref: string
}

interface JsPartnerSlideProps {
  client: string
  documentTitle: string
  taglineBold: string
  taglineRegular: string
  pageNumber: string | number
  headline: string        // e.g. "Partner with us to create"
  headlineAccent: string  // e.g. "New Futures" — rendered with blue gradient
  items: [JsPartnerItem, JsPartnerItem, JsPartnerItem]
}

const COLUMN_LEFTS = [
  'calc(8.33% + 15px)',
  'calc(33.33% + 11px)',
  'calc(58.33% + 7px)',
] as const

const ITEM_TOP_OFFSETS = [608, 608, 612] as const

export function JsPartnerSlide({
  client,
  documentTitle,
  taglineBold,
  taglineRegular,
  pageNumber,
  headline,
  headlineAccent,
  items,
}: JsPartnerSlideProps) {
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

      {/* Top horizontal rule */}
      <div
        className="absolute border-t border-white/10"
        style={{ top: '205px', left: '16px', width: '1885px' }}
      />

      {/* Main headline */}
      <p
        className="absolute not-italic whitespace-nowrap"
        style={{
          fontFamily: 'var(--slide-font)',
          fontWeight: 500,
          fontSize: '50px',
          lineHeight: '1.01',
          color: '#ffffff',
          left: 'calc(29.17% - 385px)',
          top: 'calc(50% - 137px)',
        }}
      >
        {headline}{' '}
        <span
          style={{
            background: 'linear-gradient(113.57deg, #14ADFF 65.28%, #A0DEFF 84.16%, #009DFF 104.69%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}
        >
          {headlineAccent}
        </span>
      </p>

      {/* Three credential columns */}
      {items.map((item, i) => (
        <div key={i} className="absolute" style={{ left: COLUMN_LEFTS[i], top: '587px', width: '460px' }}>
          {/* Column divider */}
          <div className="absolute border-t border-white/10" style={{ top: 0, left: 0, width: '100%' }} />

          {/* Title + subtitle */}
          <p
            className="absolute not-italic"
            style={{
              fontFamily: 'var(--slide-font)',
              fontWeight: 500,
              fontSize: '26px',
              lineHeight: '1.14',
              letterSpacing: '-0.26px',
              color: '#ffffff',
              top: `${ITEM_TOP_OFFSETS[i] - 587}px`,
              left: 0,
              width: '460px',
            }}
          >
            {item.title}
            <br />
            <span style={{ fontStyle: 'italic', color: '#a4a4a1' }}>{item.subtitle}</span>
          </p>

          {/* Logo placeholder */}
          <div
            style={{
              position: 'absolute',
              top: `${732.88 - 587}px`,
              left: 0,
              width: '112.5px',
              height: '41.25px',
              background: item.logoSrc ? 'transparent' : '#1e1e1e',
              borderRadius: '4.5px',
              overflow: 'hidden',
            }}
          >
            {item.logoSrc && (
              <img
                src={item.logoSrc}
                alt={item.title}
                style={{ width: '100%', height: '100%', objectFit: 'contain' }}
              />
            )}
          </div>

          {/* Link */}
          <a
            href={item.linkHref}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              position: 'absolute',
              top: `${745.63 - 587}px`,
              left: '15px',
              fontFamily: 'var(--slide-font)',
              fontWeight: 500,
              fontSize: '13.713px',
              lineHeight: '1.14',
              letterSpacing: '-0.137px',
              color: '#ffffff',
              textDecoration: 'underline',
              whiteSpace: 'nowrap',
            }}
          >
            {item.linkText}
          </a>
        </div>
      ))}
    </div>
  )
}
