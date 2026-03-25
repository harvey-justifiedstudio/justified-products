import "@/styles/slides.css"
import { SlideNav } from "./SlideNav"

export interface LogoItem {
  src: string
  alt: string
}

interface LogoWallSlideProps {
  client: string
  documentTitle: string
  taglineBold: string
  taglineRegular: string
  pageNumber: string | number
  logos: LogoItem[]  // up to 16
}

const CELL_W = 460
const CELL_H = 210
const GAP    = 16
const GRID_LEFT = 16
const GRID_TOP  = 126

export function LogoWallSlide({
  client,
  documentTitle,
  taglineBold,
  taglineRegular,
  pageNumber,
  logos,
}: LogoWallSlideProps) {
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

      {/* Divider — sits immediately below nav */}
      <div className="absolute left-[16px] right-[16px] border-t border-white/20" style={{ top: '48px' }} />

      {/* Logo grid */}
      {logos.slice(0, 16).map((logo, i) => {
        const col = i % 4
        const row = Math.floor(i / 4)
        const left = GRID_LEFT + col * (CELL_W + GAP)
        const top  = GRID_TOP  + row * (CELL_H + GAP)

        return (
          <div
            key={i}
            className="absolute overflow-hidden rounded-[8px]"
            style={{
              left,
              top,
              width: CELL_W,
              height: CELL_H,
              background: '#1e1e1e',
              padding: '28px 40px',
            }}
          >
            {logo.src && (
              <img
                src={logo.src}
                alt={logo.alt}
                style={{
                  display: 'block',
                  width: '100%',
                  height: '100%',
                  objectFit: 'contain',
                  mixBlendMode: 'screen',
                }}
              />
            )}
          </div>
        )
      })}
    </div>
  )
}
