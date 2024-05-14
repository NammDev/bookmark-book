import Link from 'next/link'
import Image from 'next/image'
import { urls } from '@/config/urls'
import { getCachedAuthUser } from '@/lib/actions/users'

export default async function Header({ className }: { className?: string }) {
  const user = await getCachedAuthUser()
  return (
    <header className='flex justify-between items-center'>
      <h1 className='font-semibold text-xl flex items-center'>
        <Link className='flex text-primary items-center active:opacity-80' href='/'>
          <Image
            src='/icons/icon.svg'
            width={40}
            height={40}
            alt='Bookmark it'
            className='mr-2.5 rounded-full'
            priority
          />
          Bookmark It.
        </Link>
      </h1>
      {user ? (
        <Link
          href={urls.app}
          className='rounded-full inline-flex text-sm items-center focus:outline-0 bg-black hover:bg-black/80 shadow border border-black px-4 py-2 text-white'
        >
          Dashboard
        </Link>
      ) : (
        <Link
          href={urls.account}
          className='rounded-full inline-flex text-sm items-center focus:outline-0 bg-black hover:bg-black/80 shadow border border-black px-4 py-2 text-white'
        >
          Sign In
        </Link>
      )}
    </header>
  )
}
