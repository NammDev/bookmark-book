import { Shell } from '@/components/shell'
import { AuthenticateWithRedirectCallback } from '@clerk/nextjs'
import { Loader2 } from 'lucide-react'

export default async function SSOCallbackPage() {
  return (
    <Shell className='max-w-lg place-items-center'>
      <Loader2 className='size-16 animate-spin' aria-hidden='true' />
      <AuthenticateWithRedirectCallback />
    </Shell>
  )
}
