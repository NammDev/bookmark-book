'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import { cn } from '@/lib/utils'

type NavLinkProps = {
  children?: React.ReactNode
  href: string
  title: string
  side?: 'top' | 'right' | 'bottom' | 'left'
  className?: string
  target?: 'external'
  Icon?: React.ComponentType<{
    isActive?: boolean
    className?: string
  }>
}

export default function NavLink(props: NavLinkProps) {
  const { children, href, title, side = 'right', className = '', target, Icon } = props
  const pathname = usePathname()

  if (target === 'external') {
    return (
      <Tooltip>
        <TooltipTrigger aria-label={title} asChild>
          <a
            href={href}
            className={cn(
              `p-2.5 inline-block max-md:p-3 rounded-xl group transition-colors text-center text-primary hover:bg-accent`,
              {
                'bg-accent': pathname === href,
              },
              className
            )}
          >
            {Icon ? (
              <Icon
                className='w-6 h-6 text-pimary-foreground group-hover:scale-95 duration-150 transition-transform'
                isActive={pathname === href}
              />
            ) : (
              children
            )}
          </a>
        </TooltipTrigger>
        <TooltipContent className='ml-4 text-white dark:text-black' side={side}>
          {title}
        </TooltipContent>
      </Tooltip>
    )
  }

  return (
    <Tooltip>
      <TooltipTrigger aria-label={title} asChild>
        <Link
          href={href}
          className={cn(
            `p-2.5 inline-block max-md:p-3 rounded-xl group transition-colors text-center text-primary/50 hover:text-primary hover:bg-accent`,
            {
              'bg-accent text-primary': pathname === href,
            },
            className
          )}
        >
          {Icon ? (
            <Icon
              className='w-6 h-6 text-pimary-foreground group-hover:scale-95 duration-150 transition-transform'
              isActive={pathname === href}
            />
          ) : (
            children
          )}
        </Link>
      </TooltipTrigger>
      <TooltipContent className='ml-4 text-white dark:text-black' side={side}>
        {title}
      </TooltipContent>
    </Tooltip>
  )
}
