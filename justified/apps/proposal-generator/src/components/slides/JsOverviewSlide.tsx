import "@/styles/slides.css"
import { SlideNav } from "./SlideNav"

interface ServiceColumn {
  heading: string
  description: string
  tags: string[]
}

interface JsOverviewSlideProps {
  client: string
  documentTitle: string
  taglineBold: string
  taglineRegular: string
  pageNumber: string | number
  statement: string
  columns: [ServiceColumn, ServiceColumn, ServiceColumn]
}

const COL_POSITIONS = [
  { left: 'calc(8.33% + 15px)', width: '460px', dividerTop: '668px' },
  { left: 'calc(33.33% + 11px)', width: '460px', dividerTop: '668px' },
  { left: 'calc(58.33% + 7px)', width: '460px', dividerTop: '668px' },
]

export function JsOverviewSlide({
  client,
  documentTitle,
  taglineBold,
  taglineRegular,
  pageNumber,
  statement,
  columns,
}: JsOverviewSlideProps) {
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

      <div className="absolute left-[16px] right-0 border-t border-white/20" style={{ top: '205px' }} />

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
          width: '1217px',
        }}
      >
        {statement}
      </p>

      {columns.map((col, i) => {
        const pos = COL_POSITIONS[i]
        return (
          <div key={col.heading}>
            <div
              className="absolute border-t border-white/20"
              style={{ left: pos.left, top: pos.dividerTop, width: pos.width }}
            />
            <p
              className="absolute not-italic"
              style={{
                fontFamily: 'var(--slide-font)',
                fontWeight: 500,
                fontSize: 'var(--slide-service-size)',
                lineHeight: 'var(--slide-service-leading)',
                letterSpacing: 'var(--slide-service-tracking)',
                color: 'var(--slide-ink-dark)',
                left: pos.left,
                top: '689px',
                width: pos.width,
                whiteSpace: 'pre-wrap',
              }}
            >
              <span style={{ display: 'block' }}>{col.heading}</span>
              <span style={{ fontStyle: 'italic', color: 'var(--slide-ink-muted-dark)' }}>
                {col.description}
              </span>
            </p>
            <div className="absolute flex flex-col" style={{ left: pos.left, top: '819px', gap: '14px' }}>
              {col.tags.map((tag) => (
                <span
                  key={tag}
                  className="shrink-0 whitespace-nowrap rounded-[4px] px-[8px] py-[2px]"
                  style={{
                    fontFamily: 'var(--slide-tag-font)',
                    fontWeight: 500,
                    fontSize: 'var(--slide-tag-size)',
                    lineHeight: 'var(--slide-tag-leading)',
                    letterSpacing: 'var(--slide-tag-tracking)',
                    background: 'var(--slide-tag-bg)',
                    color: 'var(--slide-tag-color)',
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        )
      })}
    </div>
  )
}
