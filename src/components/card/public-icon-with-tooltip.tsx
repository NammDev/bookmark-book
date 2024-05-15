'use client'

import { useState } from 'react'

import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import { PublicShareIcon } from '../icons'

export const PublicIconWithTooltip = ({ className }: { className?: string }) => {
  const [open, setOpen] = useState(false)
  return (
    <Tooltip open={open} onOpenChange={setOpen}>
      <TooltipTrigger
        onClick={(event) => {
          event.stopPropagation()
          setOpen(true)
        }}
        onBlur={() => {
          setOpen(false)
        }}
      >
        <PublicShareIcon className={className} />
      </TooltipTrigger>
      <TooltipContent>This tag has been shared publically</TooltipContent>
    </Tooltip>
  )
}
