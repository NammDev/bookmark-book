'use client'

import { useState } from 'react'
import { InfoIcon } from '@/components/icons'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import { isProPlan, isProPlanExpired } from '@/lib/data'
import { cn } from '@/lib/utils'
import { useUser } from '@/components/layouts/user-provider'

export default function FeatureToolip({ className, text }: { className?: string; text?: string }) {
  const { user } = useUser()
  const [open, setOpen] = useState(false)
  const hasProPlan = isProPlan(user)
  const isPlanExpired = hasProPlan && isProPlanExpired(user)

  if (hasProPlan && !isPlanExpired) return null

  return (
    <Tooltip open={open} onOpenChange={setOpen}>
      <TooltipTrigger
        className={cn(`cursor-pointer`, className)}
        onClick={() => {
          setOpen(true)
        }}
        onBlur={() => {
          setOpen(false)
        }}
      >
        <InfoIcon className='w-3.5 h-3.5 ml-2 text-muted-foreground' />
      </TooltipTrigger>
      <TooltipContent side='top' className='text-white dark:text-black'>
        {text ?? 'This feature is available only in Pro plan.'}
      </TooltipContent>
    </Tooltip>
  )
  return null
}
