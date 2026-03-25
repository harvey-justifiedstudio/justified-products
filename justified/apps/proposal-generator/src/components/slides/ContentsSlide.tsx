import type { ReactNode } from "react"
import "@/styles/slides.css"
import { SlideNav } from "./SlideNav"

interface TocItem {
  title: string
  page: string | number
}

interface ContentsSlideProps {
  client: string
  documentTitle: string
  taglineBold: string
  taglineRegular: string
  pageNumber: string | number
  contextTitle: string
  contextBody: ReactNode
  items: TocItem[]
}

export function ContentsSlide({
  client,
  documentTitle,
  taglineBold,
  taglineRegular,
  pageNumber,
  contextTitle,
  contextBody,
  items,
}: ContentsSlideProps) {
  return (
    <div
      className="relative bg-white"
      style={{ width: 'var(--slide-width)', aspectRatio: '16/9' }}
    >
      <SlideNav
        client={client}
        documentTitle={documentTitle}
        taglineBold={taglineBold}
        taglineRegular={taglineRegular}
        pageNumber={pageNumber}
      />

      <div
        className="absolute left-[17px] right-0 border-t"
        style={{ top: 'var(--slide-divider-top)', borderColor: 'var(--slide-border)' }}
      />

      <div
        className="absolute not-italic"
        style={{
          fontFamily: 'var(--slide-font)',
          fontWeight: 500,
          fontSize: 'var(--slide-context-size)',
          lineHeight: 'var(--slide-context-leading)',
          letterSpacing: 'var(--slide-context-tracking)',
          left: 'var(--slide-context-padding-x)',
          top: 'var(--slide-context-top)',
          width: 'var(--slide-context-width)',
          color: 'var(--slide-ink)',
          whiteSpace: 'pre-wrap',
        }}
      >
        <p className="mb-0">{contextTitle}</p>
        <p style={{ color: 'var(--slide-ink-muted)' }}>{contextBody}</p>
      </div>

      <div
        className="absolute flex flex-col"
        style={{
          left: 'calc(var(--slide-col-split) + var(--slide-col-gutter))',
          top: 'var(--slide-divider-top)',
          width: 'var(--slide-toc-width)',
        }}
      >
        {items.map((item) => (
          <div
            key={item.title}
            className="flex shrink-0 items-center justify-between border-t"
            style={{
              height: 'var(--slide-toc-row-height)',
              padding: '24px 0',
              borderColor: 'var(--slide-border)',
              fontFamily: 'var(--slide-font)',
              fontWeight: 500,
              fontSize: 'var(--slide-toc-size)',
              lineHeight: 'var(--slide-toc-leading)',
              letterSpacing: 'var(--slide-toc-tracking)',
              color: 'var(--slide-ink)',
            }}
          >
            <span className="shrink-0">{item.title}</span>
            <span className="shrink-0 whitespace-nowrap">{item.page}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
