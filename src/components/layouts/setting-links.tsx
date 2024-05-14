import { SettingsIcon } from '../icons'
import NavLink from './nav-link'

import { cn } from '@/lib/utils'

export const SettingsLink = ({ className }: { className?: string }) => (
  <NavLink
    Icon={(props: any) => <SettingsIcon {...props} />}
    className={cn(
      `rounded-xl max-sm:hidden mt-2 p-2.5 transition-colors hover:bg-accent order-5`,
      className
    )}
    href='/settings'
    title='Settings'
  />
)
