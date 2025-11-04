import '../styles/globals.css'
import Head from 'next/head'
import ThemeSwitcher from '../components/ThemeSwitcher'

export default function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>AV — 12.12.2025</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="Welcome to Avyav & Taran's Reception — Wedding micro-site" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
      </Head>
      {/* SVG Filters */}
      <svg style={{ position: 'absolute', width: 0, height: 0, visibility: 'hidden' }}>
        <defs>
          <filter id="liquid-glass">
            <feTurbulence
              type="turbulence"
              baseFrequency="0.02"
              numOctaves="3"
              seed="2"
              result="turb"
            />
            <feDisplacementMap
              in="SourceGraphic"
              in2="turb"
              scale="15"
              xChannelSelector="R"
              yChannelSelector="G"
            />
          </filter>
          <filter id="switcher">
            <feTurbulence
              type="turbulence"
              baseFrequency="0.02"
              numOctaves="3"
              seed="2"
              result="turb"
            />
            <feDisplacementMap
              in="SourceGraphic"
              in2="turb"
              scale="15"
              xChannelSelector="R"
              yChannelSelector="G"
            />
          </filter>
        </defs>
      </svg>
      <ThemeSwitcher />
      <Component {...pageProps} />
    </>
  )
}