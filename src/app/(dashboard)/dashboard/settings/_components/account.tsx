'use client'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

import SettingsCard from './settings-card'
import { Skeleton } from '@/components/ui/skeleton'
import { useUser } from '@/components/layouts/user-provider'

export default function SettingsAccount() {
  const { user } = useUser()
  const initials = `${user?.firstName?.charAt(0) ?? ''} ${user?.lastName?.charAt(0) ?? ''}`

  return (
    <SettingsCard className='h-[86px] px-3'>
      <div className='flex gap-3 w-full items-center'>
        <Avatar className='h-[50px] w-[50px]'>
          <AvatarImage src={user.avatarUrl ?? ''} alt={user.fullName ?? ''} />
          <AvatarFallback className='font-medium text-pimary-foreground uppercase text-xl bg-accent'>
            {initials}
          </AvatarFallback>
        </Avatar>
        <div className='grid max-w-sm w-full'>
          <div className='font-medium truncate pr-4' title={user.fullName ?? ''}>
            {user?.fullName ?? <Skeleton className='w-52 h-5 bg-accent mb-1.5' />}
          </div>
          <div className='text-sm truncate pr-4 text-muted-foreground' title={user?.email ?? ''}>
            {user?.email ?? <Skeleton className='w-36 h-5 bg-accent' />}
          </div>
        </div>
      </div>
    </SettingsCard>
  )
}
