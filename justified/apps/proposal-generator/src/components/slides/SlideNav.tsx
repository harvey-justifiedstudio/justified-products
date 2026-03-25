interface SlideNavProps {
  client: string
  documentTitle: string
  taglineBold: string
  taglineRegular: string
  pageNumber: string | number
  theme?: 'light' | 'dark'
}

export function SlideNav({
  client,
  documentTitle,
  taglineBold,
  taglineRegular,
  pageNumber,
  theme = 'light',
}: SlideNavProps) {
  const color = theme === 'dark' ? 'var(--slide-ink-dark)' : 'var(--slide-ink)'

  return (
    <div
      className="absolute left-0 top-0 flex h-[48px] w-[1920px] flex-col items-center justify-center"
      style={{ fontFamily: 'var(--slide-font)' }}
    >
      <div
        className="relative h-[16px] w-[1888px] shrink-0 whitespace-nowrap not-italic"
        style={{
          color,
          fontSize: 'var(--slide-nav-size)',
          letterSpacing: 'var(--slide-nav-tracking)',
          fontWeight: 500,
        }}
      >
        <p className="absolute left-0 top-0 leading-none">{client}</p>
        <p className="absolute left-1/2 top-0 -translate-x-1/2 leading-none">{documentTitle}</p>
        <p className="absolute right-[24px] top-0 leading-none">
          <span style={{ fontWeight: 700 }}>{taglineBold}</span>
          <span>{taglineRegular}</span>
        </p>
        <p className="absolute right-0 top-0 leading-none text-right">{pageNumber}</p>
      </div>
    </div>
  )
}
