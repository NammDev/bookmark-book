'use client'

import { useState } from 'react'
import { useHotkeys } from 'react-hotkeys-hook'
import { AddIcon as Add } from '@/components/icons'
import { cn } from '@/lib/utils'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import AddBookmark from '../modal/add-bookmark'

export default function AddIcon({ className }: { className?: string }) {
  const [open, setOpen] = useState(false)

  useHotkeys(['a'], (_, handler) => {
    const keys = handler.keys?.join('')
    if (keys === 'a') setOpen(true)
  })

  return (
    <>
      <Tooltip>
        <TooltipTrigger asChild>
          <button
            aria-label='Add'
            onClick={() => setOpen(true)}
            className={cn(
              'rounded-full flex justify-center p-2 max-sm:p-3 text-white bg-blue-600 hover:bg-blue-500',
              className
            )}
          >
            <Add className='text-white w-6 h-6' />
          </button>
        </TooltipTrigger>
        <TooltipContent side='right' className='flex items-center ml-4 text-white dark:text-black'>
          Add{' '}
          <kbd className='pointer-events-none ml-2 border dark:text-black text-white border-input inline-flex h-4 select-none items-center gap-1 rounded  px-1 font-mono text-[10px] font-medium text-primary opacity-100'>
            A
          </kbd>
        </TooltipContent>
      </Tooltip>

      {open ? <AddBookmark open={open} onHide={setOpen} /> : null}
    </>
  )
}
