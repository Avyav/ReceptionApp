import Head from 'next/head'
export default function Layout({ children }) {
  return (
    <div>
      <Head>
        <title>AV — 12.12.2025</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="Avyav & Partner — Wedding micro-site" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700&display=swap" rel="stylesheet" />
      </Head>
      {children}
    </div>
  )
}