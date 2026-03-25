import "@/styles/slides.css"

const COPYRIGHT =
  "Copyright © 2026 Justified Studio Limited. All rights are reserved. This document/presentation contains confidential and proprietary information and methodology belonging to the Operating Company. No part of this information may be disclosed to others, nor may it be used, reproduced, copied or transmitted in any form or by any means, electronic, mechanical, or otherwise without prior written permission of the Operating Company and this document/presentation must be returned immediately upon the Operating Company's request."

interface JsEndSlideProps {
  taglineBold: string
  taglineRegular: string
  contactName?: string
  contactEmail?: string
  copyright?: string
}

const TEXT_STYLE: React.CSSProperties = {
  fontFamily: 'var(--slide-font)',
  fontWeight: 400,
  fontSize: '20px',
  lineHeight: '1.2',
  letterSpacing: '-0.1px',
}

export function JsEndSlide({
  taglineBold,
  taglineRegular,
  contactName = "Will Whiting - Director",
  contactEmail = "will@justified.studio",
  copyright = COPYRIGHT,
}: JsEndSlideProps) {
  return (
    <div
      className="relative overflow-hidden"
      style={{ width: 'var(--slide-width)', aspectRatio: '16/9', background: '#000000' }}
    >
      {/* Top-left tagline */}
      <p
        className="absolute"
        style={{ ...TEXT_STYLE, left: '16px', top: '16px', color: '#ffffff', whiteSpace: 'nowrap' }}
      >
        <strong style={{ fontWeight: 700 }}>{taglineBold}</strong>
        {taglineRegular}
      </p>

      {/* Contact block */}
      <div
        className="absolute"
        style={{ ...TEXT_STYLE, left: 'calc(33.33% + 11px)', top: '16px' }}
      >
        <p style={{ color: '#ffffff', marginBottom: 0 }}>Contact</p>
        <p style={{ color: '#999999', margin: 0 }}>{contactName}</p>
        <p style={{ color: '#999999', margin: 0 }}>{contactEmail}</p>
      </div>

      {/* Located block */}
      <div
        className="absolute"
        style={{ ...TEXT_STYLE, left: 'calc(33.33% + 11px)', top: '159px' }}
      >
        <p style={{ color: '#ffffff', marginBottom: 0 }}>Located</p>
        <p style={{ color: '#999999', margin: 0 }}>Justified Studio</p>
        <p style={{ color: '#999999', margin: 0 }}>20 Waterson Street</p>
        <p style={{ color: '#999999', margin: 0 }}>London E2 8HL</p>
      </div>

      {/* Copyright — top right */}
      <p
        className="absolute"
        style={{
          fontFamily: 'var(--slide-font)',
          fontWeight: 400,
          fontSize: '14px',
          lineHeight: '1.2',
          letterSpacing: '-0.14px',
          color: '#666666',
          left: 'calc(75% + 4px)',
          top: '16px',
          width: '460px',
        }}
      >
        {copyright}
      </p>

      {/* Oversized wordmark — full bleed, 16px left padding, bleeds right + bottom */}
      <div
        className="absolute"
        style={{ left: '16px', top: '856px', right: 0, overflow: 'hidden' }}
      >
        <p
          style={{
            fontFamily: 'var(--slide-font)',
            fontWeight: 500,
            fontSize: '320px',
            lineHeight: 1,
            color: '#ffffff',
            margin: 0,
            whiteSpace: 'nowrap',
          }}
        >
          Justified.Studio
        </p>
      </div>
    </div>
  )
}
