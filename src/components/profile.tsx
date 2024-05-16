'use client'

import Link from 'next/link'
import { urls } from '@/config/urls'
import { cn } from '@/lib/utils'
import { BugIcon, ExtensionsIcon, HelpIcon, LogoutIcon, SettingsIcon } from './icons'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './ui/dropdown-menu'
import { useUser } from '@clerk/nextjs'

const helpMailLink = 'mailto:namdeveloper.ca@gmail.com'

export default function Profile({ className }: { className?: string }) {
  const { user: authUser } = useUser()
  if (!authUser) return null

  const initials = `${authUser?.firstName?.charAt(0) ?? ''} ${authUser?.lastName?.charAt(0) ?? ''}`

  return (
    <Avatar className={cn('h-9 w-9 group', className)}>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <AvatarImage
            className='group-active:scale-95 h-9 w-9 duration-150 transition-transform'
            src={authUser.imageUrl}
            alt={'s'}
          />
          <AvatarFallback className='font-medium h-9 w-9 text-pimary-foreground uppercase text-xl bg-accent'>
            {initials}
          </AvatarFallback>
        </DropdownMenuTrigger>
        <DropdownMenuContent className='max-sm:mr-2 max-sm:min-w-44 min-w-40'>
          <DropdownMenuItem
            className='flex items-center cursor-pointer'
            onClick={() => {
              window.open(urls.extensions.chrome, '_blank')
            }}
          >
            <ExtensionsIcon className='h-4 w-4 mr-2 text-primary' />{' '}
            <span className='mr-2'>Extensions</span>
          </DropdownMenuItem>
          <DropdownMenuItem
            className='flex items-center cursor-pointer'
            onClick={() => {
              window.open(`https://github.com/NammDev/bookmark-book/issues/new/choose`, '_blank')
            }}
          >
            <BugIcon className='h-4 w-4 mr-2' /> File a bug
          </DropdownMenuItem>
          <DropdownMenuItem
            className='flex items-center cursor-pointer'
            onClick={() => {
              window.open(helpMailLink, '_blank')
            }}
          >
            <HelpIcon className='h-4 w-4 mr-2' /> Help
          </DropdownMenuItem>
          <DropdownMenuItem className='hidden max-sm:block'>
            <Link className='flex items-center' href='/settings'>
              <SettingsIcon className='h-4 w-4 mr-2' /> Settings
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem className='flex items-center cursor-pointer' asChild>
            <Link href='/signout'>
              <LogoutIcon className='h-4 w-4 mr-2' /> Logout
            </Link>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </Avatar>
  )
}
