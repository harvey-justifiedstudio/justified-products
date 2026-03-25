import "@/styles/slides.css"

export interface CaseStudySlideProps {
  client: string
  documentTitle: string
  taglineBold: string
  taglineRegular: string
  pageNumber: string | number
  projectName: string
  projectTagline: string
  tags: string[]
  challenge: string
  solution: string
  results: string
  image?: string
}

const BODY_STYLE: React.CSSProperties = {
  fontFamily: 'var(--slide-font)',
  fontWeight: 400,
  fontSize: '16px',
  lineHeight: '1.28',
  letterSpacing: '-0.32px',
  color: '#9c9fa2',
  margin: 0,
  whiteSpace: 'pre-wrap',
}

const LABEL_STYLE: React.CSSProperties = {
  fontFamily: 'var(--slide-font)',
  fontWeight: 500,
  fontSize: '16px',
  lineHeight: '1.28',
  letterSpacing: '-0.32px',
  color: '#ffffff',
  margin: 0,
}

export function CaseStudySlide({
  projectName,
  projectTagline,
  tags,
  challenge,
  solution,
  results,
  image,
}: CaseStudySlideProps) {
  return (
    <div
      className="relative"
      style={{ width: 'var(--slide-width)', aspectRatio: '16/9', background: '#181819' }}
    >
      {/* Left panel */}
      <div
        className="absolute flex flex-col"
        style={{ left: '16px', top: '17px', width: '458px', gap: '24px' }}
      >
        {/* Project name + tagline */}
        <div>
          <p
            style={{
              fontFamily: 'var(--slide-font)',
              fontWeight: 500,
              fontSize: '20px',
              lineHeight: '1.14',
              letterSpacing: '-0.2px',
              color: '#ffffff',
              margin: 0,
            }}
          >
            {projectName}
          </p>
          <p
            style={{
              fontFamily: 'var(--slide-font)',
              fontWeight: 500,
              fontSize: '20px',
              lineHeight: '1.14',
              letterSpacing: '-0.2px',
              color: '#9c9fa2',
              margin: 0,
            }}
          >
            {projectTagline}
          </p>
        </div>

        {/* Service tags */}
        <div className="flex flex-wrap" style={{ gap: '8px' }}>
          {tags.map((tag) => (
            <div
              key={tag}
              style={{
                background: '#27282b',
                height: '28px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '6px 10px 8px',
                borderRadius: '4px',
              }}
            >
              <span
                style={{
                  fontFamily: 'var(--slide-font)',
                  fontWeight: 400,
                  fontSize: '12px',
                  lineHeight: 1,
                  letterSpacing: '0.12px',
                  color: '#e3e5e8',
                  whiteSpace: 'nowrap',
                }}
              >
                {tag}
              </span>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div style={{ height: '1px', background: 'rgba(255,255,255,0.1)', width: '100%' }} />

        {/* Challenge */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
          <p style={LABEL_STYLE}>Challenge:</p>
          <p style={BODY_STYLE}>{challenge}</p>
        </div>

        {/* Solution */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
          <p style={LABEL_STYLE}>Solution:</p>
          <p style={BODY_STYLE}>{solution}</p>
        </div>

        {/* Results */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
          <p style={LABEL_STYLE}>Results:</p>
          <p style={BODY_STYLE}>{results}</p>
        </div>
      </div>

      {/* Right image */}
      <div
        className="absolute overflow-hidden"
        style={{
          left: '491px',
          top: '17px',
          width: '1412px',
          height: '1048px',
          borderRadius: '8px',
          background: '#27282b',
        }}
      >
        {image && (
          <img
            src={image}
            alt={projectName}
            style={{
              position: 'absolute',
              width: '132%',
              height: '100%',
              left: '-17.5%',
              top: 0,
              objectFit: 'cover',
              objectPosition: 'center',
              display: 'block',
            }}
          />
        )}
      </div>
    </div>
  )
}
