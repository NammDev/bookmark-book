import { Shell } from '@/components/shell'
import { createUser, getCachedAuthUser, getCachedUser } from '@/lib/actions/users'
import { Loader2 } from 'lucide-react'
import { redirect } from 'next/navigation'

export default async function SSOCallbackPage() {
  let userData = null
  const userAuth = await getCachedAuthUser()

  if (userAuth) {
    userData = await getCachedUser()
    if (!userData) {
      userData = await createUser()
    }
    redirect('/')
  }

  return (
    <Shell className='max-w-lg place-items-center'>
      <Loader2 className='size-16 animate-spin' aria-hidden='true' />
    </Shell>
  )
}
