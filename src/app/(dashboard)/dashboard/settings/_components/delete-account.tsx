'use client'

import { useState } from 'react'
import { urls } from '@/config/urls'
import { toast } from 'sonner'
import { DeleteIcon } from '@/components/icons'
import { useUser } from '@clerk/nextjs'
import SettingsCard from './settings-card'
import { Skeleton } from '@/components/ui/skeleton'
import DeleteAccountModal from '@/components/modal/delete-account'
import { getUserEmail } from '@/lib/utils'
// import { refreshInChromeExt } from 'lib/chrome-extension'

export default function DeleteAccount() {
  const { user } = useUser()
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const email =
    user?.emailAddresses?.find((e) => e.id === user.primaryEmailAddressId)?.emailAddress ?? ''

  const onSubmit = async (email: string) => {
    try {
      setLoading(true)
      console.log(email)
      // const response = await fetch('/api/account/delete', {
      //   method: 'POST',
      //   body: JSON.stringify({ email }),
      // })
      // if (!response.ok) {
      //   throw new Error('Unable to delete your account, try again.')
      // }
      // refreshInChromeExt()
      // await supabase.auth.signOut()
    } catch {
      toast.error('Unable to delete your account, try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <SettingsCard className='flex flex-col items-start border-red-200 dark:border-red-500/30'>
      <div className='flex flex-col p-4 pb-0'>
        <div className='font-medium'>
          {user?.firstName ? 'Delete My Account' : <Skeleton className='w-52 h-4 bg-accent' />}
        </div>
        <div className='text-sm mt-1 text-muted-foreground'>
          {user?.firstName ? (
            `Permanently delete your account and all its associated data, this
          action cannot be undone.`
          ) : (
            <Skeleton className='w-80 h-10 bg-accent mt-1.5' />
          )}
        </div>
      </div>
      <div className='flex w-full justify-end bg-red-50 dark:bg-red-500/30 border-red-200 dark:border-red-500/30 rounded-bl-[calc(var(--radius)-1px)] rounded-br-[calc(var(--radius)-1px)] p-2 px-3.5'>
        {user?.firstName ? (
          <button
            className='items-center h-[40px] tracking-wide rounded-full text-red-700 dark:text-white dark:bg-red-600 dark:hover:bg-red-700 dark:hover:border-red-700 dark:border-red-600 border border-red-300 focus:outline-0 active:bg-accent/80 text-sm flex justify-center py-2 px-3 transition-colors bg-background hover:border-red-300/80 hover:bg-red-300/80 focus:bg-red-300/80'
            onClick={() => setOpen(true)}
          >
            <DeleteIcon className='w-3.5 h-3.5 mr-1.5' /> Delete
          </button>
        ) : null}
        {open ? (
          <DeleteAccountModal
            loading={loading}
            open={true}
            setOpen={setOpen}
            emailId={email}
            onSubmit={onSubmit}
          />
        ) : null}
      </div>
    </SettingsCard>
  )
}
