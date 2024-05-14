import Link from 'next/link'
// import UploadBookmarks from './upload'
import { Logo } from '@/components/icons'
import { setWelcomePageAsVisited } from '@/lib/actions/users'

const title = 'Bookmark it. | Import Bookmarks'
const description =
  'Bookmark It. is an open-source bookmark manager to organize, discover and personalize your bookmarking experience'

export const metadata = {
  title,
  description,
}

export default async function Page() {
  await setWelcomePageAsVisited()

  return (
    <div className='max-w-[600px] m-auto flex min-h-dvh w-full homepage-account'>
      <main className='flex flex-col w-full min-h-[100vh] '>
        <div className='h-full pb-24 flex flex-col justify-center items-center'>
          <header className='mt-10'>
            <Logo className='w-36 h-36' />
          </header>
          <div className='flex mt-10 flex-col items-center justify-center'>
            <h1 className='sm:text-4xl text-2xl font-bold tracking-wide'>Import Bookmarks</h1>
            <p className='text-lg mt-4 text-muted-foreground text-center'>
              Seamlessly import your existing bookmarks
            </p>
          </div>
          {/* <UploadBookmarks /> */}
          <Link
            href='/dashboard'
            className='items-center hover:text-primary active:text-primary underline text-muted-foreground mt-2 h-[40px] tracking-wide text-sm flex justify-center py-2 px-5 transition-colors'
          >
            Do it later
          </Link>
        </div>
      </main>
    </div>
  )
}
