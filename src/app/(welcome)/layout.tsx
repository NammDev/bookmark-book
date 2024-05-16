import { UserProvider } from '@/components/layouts/user-provider'
import { getCachedUser } from '@/lib/actions/users'
import { redirect } from 'next/navigation'

export default async function WelcomeLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const user = await getCachedUser()
  if (!user) redirect('/')

  return <UserProvider user={user}>{children}</UserProvider>
}
