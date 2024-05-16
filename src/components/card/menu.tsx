'use client'

import { useState } from 'react'
import { Eye, EyeOff } from 'lucide-react'
import { toast } from 'sonner'
import {
  DeleteIcon,
  EditIcon,
  FavIcon,
  LinkIcon,
  MoreIcon,
  RefreshIcon,
  ShareIcon,
} from '@/components/icons'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { cn } from '@/lib/utils'
import { BookmarkModified, MetaTags } from '@/types/data'
import { addToFav, deleteBookmark, refreshBookmark } from '@/lib/actions/bookmarks'
import { incrementBookmarkUsage, incrementFavUsage } from '@/lib/actions/users'
import { getOg } from '@/lib/actions/og'
import { BookmarkRefreshSchemaType } from '@/lib/validations/bookmark'

type CardMenuProps = {
  data: BookmarkModified
  className?: string
  onDone?: () => void
  isSearch?: boolean
}

export default function CardMenu({ data, className, onDone, isSearch }: CardMenuProps) {
  const [loading, setLoading] = useState(false)
  const [open, setOpen] = useState(false)
  const { url, id } = data

  const onRefresh = async () => {
    try {
      setLoading(true)
      const ogData = (await getOg(url)) as MetaTags
      const payload: BookmarkRefreshSchemaType = {
        metadata: {
          ...((data.metadata as object) || {}),
          image: ogData.image,
          isFallback: ogData.isFallback,
        },
      }
      if (!data.title) {
        payload.title = ogData.title
      }
      if (!data.description) {
        payload.description = ogData.description
      }
      await refreshBookmark(id, payload)
      onDone?.()
      // refreshInChromeExt()
      toast.success('Bookmark refreshed.')
    } catch {
      toast.error('Unable to refresh, try again.')
    } finally {
      setLoading(false)
      setOpen(false)
    }
  }

  const hidePreview = async () => {
    try {
      setLoading(true)
      const payload: BookmarkRefreshSchemaType = {
        previewImage: !Boolean(data.previewImage),
      }
      await refreshBookmark(id, payload)
      onDone?.()
    } catch {
      toast.error('Unable to hide preview, try again.')
    } finally {
      setLoading(false)
      setOpen(false)
    }
  }

  const onDelete = async () => {
    try {
      setLoading(true)
      await incrementBookmarkUsage(-1)
      if (data.isFav) {
        await incrementFavUsage(-1)
      }
      await deleteBookmark(id)
      onDone?.()
      // refreshInChromeExt()
      toast.success('Bookmark is deleted.')
    } catch {
      toast.error('Unable to delete, try again.')
    } finally {
      setLoading(false)
    }
  }

  const siteUrl = new URL(url)
  siteUrl.searchParams.append('utm_source', 'bmrk.cc')

  const share = async () => {
    try {
      const shareData = {
        text: data.description ?? '',
        title: data.title ?? '',
        url: siteUrl.href,
      }
      await navigator?.share(shareData)
    } catch (error) {
      console.log('Sharing failed!', error)
    }
  }

  const onFav = async () => {
    try {
      setLoading(true)
      await addToFav(id, !data.isFav)
      onDone?.()
      toast.success(`Bookmark ${!data.isFav ? 'added' : 'removed'} as favorite.`)
    } catch {
      toast.error('Unable to add as favorite, try again.')
    } finally {
      setLoading(false)
      setOpen(false)
    }
  }

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger
          aria-label='Menu'
          className={cn(
            `cursor-pointer h-9 w-9 mt-1 flex items-center justify-center transition-colors rounded-full hover:bg-accent hover:border hover:border-input active:bg-accent shrink-0`,
            className
          )}
        >
          <MoreIcon className='fill-muted-foreground !h-4 !w-4' />
        </DropdownMenuTrigger>
        <DropdownMenuContent className='mr-2 max-sm:min-w-44 min-w-40'>
          <DropdownMenuItem
            onClick={() => {
              setOpen(true)
            }}
            disabled={loading}
          >
            <EditIcon className='h-4 w-4 mr-2' /> Edit
          </DropdownMenuItem>
          <DropdownMenuItem
            disabled={loading}
            onClick={() => {
              navigator.clipboard.writeText(url)
              toast.success('Link copied to clipboard.')
            }}
          >
            <LinkIcon className='h-4 w-4 mr-2' /> Copy link
          </DropdownMenuItem>
          <DropdownMenuItem
            disabled={loading}
            onClick={async () => {
              await onRefresh()
            }}
          >
            <RefreshIcon className='h-4 w-4 mr-2' /> Refresh
          </DropdownMenuItem>
          <DropdownMenuItem
            disabled={loading}
            onClick={async () => {
              await hidePreview()
            }}
          >
            {data.previewImage ? (
              <EyeOff strokeWidth={1.5} className='h-4 w-4 mr-2' />
            ) : (
              <Eye strokeWidth={1.5} className='h-4 w-4 mr-2' />
            )}
            {data.previewImage ? 'Hide' : 'Show'} preview
          </DropdownMenuItem>
          {isSearch ? (
            <DropdownMenuItem
              disabled={loading}
              onClick={async () => {
                await onFav()
              }}
            >
              <FavIcon className='h-4 w-4 mr-2' /> {data.isFav ? 'Remove' : 'Add'} favorite
            </DropdownMenuItem>
          ) : null}
          {typeof window !== 'undefined' && navigator && !!navigator?.share ? (
            <DropdownMenuItem
              onClick={async () => {
                await share()
              }}
            >
              <ShareIcon className='h-4 w-4 mr-2' /> Share
            </DropdownMenuItem>
          ) : null}
          <DropdownMenuItem
            disabled={loading}
            onClick={async () => {
              await onDelete()
            }}
            className='!text-red-600 focus:bg-red-100 active:bg-red-100 dark:focus:bg-red-800/30 dark:active:bg-red-800/30'
          >
            <DeleteIcon className='h-4 w-4 mr-2' /> Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      {/* {open ? <EditBookmark onDone={onDone} data={data} open={open} setOpen={setOpen} /> : null} */}
    </>
  )
}
