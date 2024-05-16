import Sidebar from '@/components/layouts/sidebar'
import { UserProvider } from '@/components/layouts/user-provider'
import { getCachedUser } from '@/lib/actions/users'
import type { Metadata } from 'next'
import { redirect } from 'next/navigation'

const title = 'Bookmark it. | Home'
const description =
  'Bookmark It. is an open-source bookmark manager to organize, discover and personalize your bookmarking experience.'

export const metadata: Metadata = {
  metadataBase: new URL('https://bookmarkx-c53b200cd6d8.herokuapp.com'),
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
    url: 'https://bookmarkx-c53b200cd6d8.herokuapp.com',
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

export default async function DashboardLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const user = await getCachedUser()
  if (!user) {
    redirect('/')
  }
  return (
    <UserProvider user={user}>
      <div className='max-w-2xl m-auto flex min-h-dvh w-full'>
        <Sidebar />
        <main className='flex sm:ml-[69px] max-sm:pb-[69px] flex-col w-full min-h-[100vh] '>
          {children}
        </main>
      </div>
    </UserProvider>
  )
}
