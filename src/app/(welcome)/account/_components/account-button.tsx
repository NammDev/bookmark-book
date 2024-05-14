'use client'

import { useState } from 'react'
import { cn } from '@/lib/utils'
import Loader, { GoogleIcon } from '@/components/icons'
import { useSignIn } from '@clerk/nextjs'
import { type OAuthStrategy } from '@clerk/types'

export default function AccountButton() {
  const [loading, setLoading] = useState(false)
  const { isLoaded, signIn } = useSignIn()

  async function oauthSignIn(provider: OAuthStrategy) {
    if (!isLoaded) return null
    try {
      setLoading(true)
      await signIn.authenticateWithRedirect({
        strategy: provider,
        redirectUrl: '/sso-callback',
        redirectUrlComplete: '/auth-callback',
      })
    } catch (err) {
      console.log(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <button
      className={cn(
        `items-center max-w-sm justify-center text-sm transition-colors focus-visible:outline-none disabled:pointer-events-none disabled:opacity-40 hover:bg-primary/80 active:scale-[0.98] rounded-xl bg-primary px-6 py-3 text-secondary font-medium flex space-x-2 w-full`,
        {
          'bg-primary/80 cursor-default': loading,
        }
      )}
      onClick={() => void oauthSignIn('oauth_google')}
    >
      {loading ? <Loader className='mr-2 text-white dark:text-black' /> : <GoogleIcon />}
      Continue with Google
    </button>
  )
}
