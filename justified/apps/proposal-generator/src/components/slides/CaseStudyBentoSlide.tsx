import "@/styles/slides.css"

export interface CaseStudyBentoImages {
  topLeft?: string      // large top-left cell (website/hero)
  bottomLeft?: string   // small bottom-left cell
  bottomCenter?: string // small bottom-center cell (CGI/abstract)
  right?: string        // tall right cell (brand book)
}

interface CaseStudyBentoSlideProps {
  client: string
  documentTitle: string
  taglineBold: string
  taglineRegular: string
  pageNumber: string | number
  images: CaseStudyBentoImages
}

// Background colours used as placeholders when no image is supplied
const BG = {
  topLeft: '#d3d3d3',
  bottomLeft: '#49494a',
  bottomCenter: '#d3d3d3',
  right: '#ededed',
}

function Cell({
  style,
  src,
  alt,
  bg,
}: {
  style: React.CSSProperties
  src?: string
  alt?: string
  bg: string
}) {
  return (
    <div
      className="absolute overflow-hidden"
      style={{ borderRadius: '8px', background: bg, ...style }}
    >
      {src && (
        <img
          src={src}
          alt={alt ?? ''}
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'center',
            display: 'block',
          }}
        />
      )}
    </div>
  )
}

export function CaseStudyBentoSlide({
  images,
}: CaseStudyBentoSlideProps) {
  return (
    <div
      className="relative"
      style={{ width: 'var(--slide-width)', aspectRatio: '16/9', background: '#1c1b1b' }}
    >
      {/* Top-left — large */}
      <Cell
        bg={BG.topLeft}
        src={images.topLeft}
        alt="Case study — website"
        style={{ left: '16px', top: '16px', width: '834px', height: '516px' }}
      />

      {/* Bottom-left — dark solid / typography */}
      <Cell
        bg={BG.bottomLeft}
        src={images.bottomLeft}
        alt="Case study — brand strategy"
        style={{ left: '16px', top: '549px', width: '405px', height: '516px' }}
      />

      {/* Bottom-center — CGI / abstract */}
      <Cell
        bg={BG.bottomCenter}
        src={images.bottomCenter}
        alt="Case study — key visual"
        style={{ left: '437px', top: '549px', width: '413px', height: '516px' }}
      />

      {/* Right — tall brand book */}
      <Cell
        bg={BG.right}
        src={images.right}
        alt="Case study — brand book"
        style={{ left: '865px', top: '16px', width: '1039px', height: '1049px' }}
      />
    </div>
  )
}
