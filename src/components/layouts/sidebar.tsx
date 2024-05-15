'use client'

import Link from 'next/link'

import { FavIcon, HomeIcon, Logo, TagsIcon } from '../icons'
import Profile from '../profile'
// import SearchIcon from '../search'
import NavLink from './nav-link'
import { SettingsLink } from './setting-links'
import AddIcon from './add-icon'

export default function Sidebar() {
  return (
    <nav className='flex transition-opacity duration-150 ease-out fixed sm:top-0 max-sm:bottom-0 max-sm:dark:bg-black/60 max-sm:bg-background/50 max-sm:h-[86px] z-10 justify-center sm:justify-between max-sm:px-4 sm:flex-col sm:min-h-dvh bottom-t sm:border-r sm:w-[70px] w-full border-border'>
      <div className='flex sm:flex-col items-center max-sm:pb-[calc(env(safe-area-inset-bottom)/3)] max-sm:gap-6 gap-3 text-primary'>
        <Link href='/' className='active:opacity-85 mt-2 mb-2 hidden sm:block group'>
          <Logo className='w-[38px] h-[38px] group-active:scale-95 duration-150 transition-transform' />
          <span className='sr-only'>Home page</span>
        </Link>
        <NavLink Icon={(props: any) => <HomeIcon {...props} />} href={'/dashboard'} title='Home' />
        {/* <SearchIcon /> */}
        <NavLink
          Icon={(props: any) => <FavIcon {...props} />}
          className='max-sm:order-4'
          href={'/dashboard/favorites'}
          title='Favorites'
        />

        <NavLink
          Icon={(props: any) => <TagsIcon {...props} />}
          className='max-sm:order-4'
          href={'/dashboard/tags'}
          title='Tags'
        />

        <AddIcon className='max-sm:order-3 sm:mt-2' />
      </div>
      <div className='hidden sm:flex sm:flex-col items-center max-sm:gap-6 max-sm:ml-4 gap-3 sm:mb-4'>
        <Profile />
        <SettingsLink />
      </div>
    </nav>
  )
}
