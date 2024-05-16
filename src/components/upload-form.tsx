'use client'

import { SyntheticEvent, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import { messages } from '@/config/messages'
import { toast } from 'sonner'
import Loader, { HelpIcon, UploadArrowIcon } from '@/components/icons'
import { Input } from '@/components/ui/input'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'

import { checkBookmarkLimit } from '@/lib/data'
import { cn, getBrowserName } from '@/lib/utils'
import { useUser } from './layouts/user-provider'
import PlanTooltip from '@/app/(dashboard)/dashboard/settings/_components/plan-tooltip'

type UploadModalProps = {
  onHide?: (open: boolean) => void
  SubmitBtn?: React.FC<{ children: React.ReactNode; disabled: boolean }>
}

const helpLinks: { [key: string]: string } = {
  chrome: 'https://support.google.com/chrome/answer/96816?hl=en',
  safari:
    'https://www.idownloadblog.com/2016/10/17/exporting-safari-bookmarks-from-iphone-ipad-mac-pc/',
  firefox: 'https://support.mozilla.org/en-US/kb/export-firefox-bookmarks-to-backup-or-transfer',
}

export default function UploadForm({ onHide, SubmitBtn }: UploadModalProps) {
  const { user, currentPlan, isProPlan } = useUser()
  const [loading, setLoading] = useState(false)
  const [fileDetails, setFileDetails] = useState({
    name: '',
    size: 0,
    type: '',
  })
  const hiddenInputRef = useRef<HTMLInputElement>(null)
  const router = useRouter()

  const allowedSize = 500
  const fileSize = Math.ceil(fileDetails.size / 1024)
  const isFileAllowed = fileSize <= allowedSize
  const isFileTypeAllowed = fileDetails.type === 'text/html'

  const createBookmarks = async (content: string | ArrayBuffer | null) => {
    if (!content) {
      toast.error('Error occurred, try again')
    }
    try {
      const res = await fetch('/api/bookmarks', {
        method: 'POST',
        body: JSON.stringify({ content }),
      })
      const data = await res.json()
      if (!res.ok) {
        throw new Error(data?.message)
      }
      onHide?.(false)
      toast.success('Bookmarks created successfully.')
      if (SubmitBtn) {
        router.replace('/')
      } else {
        router.refresh()
      }
    } catch (error) {
      toast.error((error as Error)?.message, {
        duration: 5000,
      })
    } finally {
      setLoading(false)
    }
  }

  const onFileChange = ({ target }: { target: HTMLInputElement }) => {
    const files = target?.files ?? []
    if (files && files.length) {
      const file = files[0]
      if (file) {
        setFileDetails({ name: file.name, size: file.size, type: file.type })
      }
    }
  }

  const onSubmit = () => {
    try {
      const files = hiddenInputRef.current?.files ?? []
      if (files && files.length && isFileAllowed && isFileTypeAllowed) {
        const file = files[0]
        if (file) {
          if (checkBookmarkLimit(user, [])) {
            toast.error(`Bookmark limit reached! ${isProPlan ? '' : 'Upgrade to pro plan.'}`)
            return
          }
          toast.info(`Don't refresh this page.`, {
            duration: 5000,
          })
          setLoading(true)
          const reader = new FileReader()
          reader.readAsText(file)
          reader.onload = async function () {
            const content = reader.result
            await createBookmarks(content)
          }
        }
      }
    } catch {
      toast.error('Error occurred, try again')
    }
  }

  return (
    <form
      className='flex flex-col w-full md:max-w-md'
      onSubmit={(event: SyntheticEvent<HTMLFormElement>) => {
        event.preventDefault()
        onSubmit()
      }}
    >
      <div className='relative h-56 flex flex-col justify-center border border-neutral-300 dark:border-neutral-600 border-dashed rounded-lg'>
        <button
          className='absolute top-0 left-0 w-full h-full bg-transparent z-0 cursor-pointer focus:outline-none'
          type='button'
          onClick={() => {
            hiddenInputRef.current?.click()
          }}
        />
        <Input
          className='opacity-0 absolute inset-0 flex h-full w-full'
          type='file'
          accept='.html'
          ref={hiddenInputRef}
          onChange={onFileChange}
        />
        <div className='flex w-full justify-center flex-col items-center'>
          <UploadArrowIcon className='w-10 h-10' />
          <p className='text-sm mt-2 font-medium'>Click to browse</p>
        </div>
        <div className='text-sm flex flex-col mt-2 text-muted-foreground text-center px-4'>
          {fileDetails.name?.length ? (
            <>
              <span
                className={cn(`text-primary`, {
                  'text-red-600': !isFileTypeAllowed,
                })}
                title={fileDetails.name}
              >
                {isFileTypeAllowed ? fileDetails.name : `File type ${fileDetails.type} not allowed`}
              </span>
              <span className='text-xs mt-1.5 text-muted-foreground truncate'>
                File Size:{' '}
                <span
                  className={cn(`font-medium`, {
                    'text-red-600': !isFileAllowed || !isFileTypeAllowed,
                  })}
                >
                  {!isFileAllowed ? 'Greater than 500 KB' : fileSize + ' KB'}
                </span>
              </span>
            </>
          ) : (
            <>
              <p className='relative'>
                Drop your html file here or select a file
                <Tooltip>
                  <TooltipTrigger
                    className='z-11 absolute -top-0.5 ml-1'
                    onClick={(event) => {
                      event.stopPropagation()
                      const name = getBrowserName()
                      const link = helpLinks[name] ?? helpLinks['chrome']
                      window.open(link, '_blank')
                    }}
                  >
                    <HelpIcon className='w-3.5 h-3.5' />
                  </TooltipTrigger>
                  <TooltipContent className='text-white dark:text-black'>
                    Click me to know how to export your bookmarks
                  </TooltipContent>
                </Tooltip>
              </p>
              <span className='text-xs mt-2 text-muted-foreground'>
                Max file size: <span className='font-medium'>500 KB</span>
              </span>
            </>
          )}
          {user.uploadCount < currentPlan.limit.imports ? (
            <p className='text-sm mt-4'>
              Import unlimited bookmarks up to{' '}
              <span className='text-green-600 relative inline-flex'>
                {Math.abs(currentPlan.limit.imports - user.uploadCount)} time
                {currentPlan.limit.imports > 1 ? 's' : ''}.
                <PlanTooltip
                  className='relative -top-1 -left-1'
                  text={messages.importLimitWarning(currentPlan.limit.imports)}
                />
              </span>
            </p>
          ) : null}
        </div>
      </div>
      {!SubmitBtn ? (
        <div className='flex w-full justify-end mt-3 mb-1'>
          <button
            type='submit'
            disabled={loading || !fileDetails.name?.length || !isFileAllowed}
            className={cn(
              `rounded-full w-[86px] h-[40px] transition-colors items-center bg-blue-600 hover:bg-blue-700 focus:bg-blue-700 active:bg-blue-700 disabled:opacity-40 disabled:active:bg-blue-600 disabled:hover:bg-blue-600 disabled:focus:bg-blue-600 border-0 flex justify-center py-2 px-4 text-white`,
              {
                '!opacity-50 cursor-not-allowed': loading,
              }
            )}
          >
            {loading ? <Loader /> : 'Submit'}
          </button>
        </div>
      ) : (
        <div className='flex w-full justify-center'>
          <SubmitBtn disabled={loading || !fileDetails.name?.length || !isFileAllowed}>
            {loading ? (
              <>
                <Loader className='mr-2' /> Submit
              </>
            ) : (
              'Submit'
            )}
          </SubmitBtn>
        </div>
      )}
    </form>
  )
}
