import type { Metadata } from 'next'

// import Sidebar from 'components/sidebar'

const title = 'Bookmark it. | Home'
const description =
  'Bookmark It. is an open-source bookmark manager to organize, discover and personalize your bookmarking experience.'

export const metadata: Metadata = {
  metadataBase: new URL('https://bmrk.cc'),
  title,
  description,
  twitter: {
    card: 'summary_large_image',
    title,
    site: '@gokul_i',
    description,
    creator: '@gokul_i',
    images: [
      {
        type: 'image/jpeg',
        url: '/images/og.jpg',
        width: 1920,
        height: 1080,
        alt: 'Bookmark it.',
      },
    ],
  },
  openGraph: {
    type: 'website',
    siteName: 'Bookmark it.',
    title,
    description,
    url: 'https://bmrk.cc',
    images: [
      {
        type: 'image/jpeg',
        url: '/images/og.jpg',
        width: 1200,
        height: 630,
        alt: 'Bookmark it.',
      },
    ],
  },
}

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className='max-w-2xl m-auto flex min-h-dvh w-full'>
      {/* <Sidebar /> */}
      <h1>Sidebar</h1>
      <main className='flex sm:ml-[69px] max-sm:pb-[69px] flex-col w-full min-h-[100vh] '>
        {children}
      </main>
    </div>
  )
}
