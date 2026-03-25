import "@/styles/slides.css"
import { SlideNav } from "./SlideNav"

interface MissionStatementSlideProps {
  client: string
  documentTitle: string
  taglineBold: string
  taglineRegular: string
  pageNumber: string | number
}

export function MissionStatementSlide({
  client,
  documentTitle,
  taglineBold,
  taglineRegular,
  pageNumber,
}: MissionStatementSlideProps) {
  return (
    <div
      className="relative"
      style={{ width: 'var(--slide-width)', aspectRatio: '16/9', background: '#0003fe' }}
    >
      <SlideNav
        client={client}
        documentTitle={documentTitle}
        taglineBold={taglineBold}
        taglineRegular={taglineRegular}
        pageNumber={pageNumber}
        theme="dark"
      />

      <p
        className="absolute not-italic text-center"
        style={{
          fontFamily: 'var(--slide-font)',
          fontWeight: 500,
          fontSize: '48px',
          lineHeight: '1.1',
          letterSpacing: '-0.48px',
          color: '#ffffff',
          left: '50%',
          top: 'calc(50% - 26px)',
          width: '1920px',
          transform: 'translateX(-50%)',
        }}
      >
        We are a new-age consultancy, built for the next decade.
      </p>
    </div>
  )
}
