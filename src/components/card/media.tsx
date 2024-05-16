'use client'

import { useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import humanizeUrl from 'humanize-url'
import { BookmarkModified } from '@/types/data'
import { useUser } from '../layouts/user-provider'
import { metadata } from '@/app/layout'

// https://stackoverflow.com/a/33919020/266535
const blurDataURL = `data:image/gif;base64,R0lGODlhAQABAPAAABsbG////yH5BAAAAAAALAAAAAABAAEAAAICRAEAOw==`

export default function CardMedia({ data }: { data: BookmarkModified }) {
  const { user } = useUser()
  const ref = useRef<HTMLImageElement>(null)

  //@ts-ignore
  if (!data.metadata?.image || !data.previewImage || !user.previewImage) {
    return null
  }

  const url = new URL(data.url)
  url.searchParams.append('utm_source', 'nammdev')

  return (
    <Link
      className='group max-w-[450px] relative w-full mt-2 max-sm:max-w-[calc(100%-30px)] mb-2 rounded-2xl'
      target='_blank'
      href={url.href}
      prefetch={false}
    >
      <Image
        ref={ref}
        className='h-full rounded-2xl w-full border border-border'
        //@ts-ignore
        src={data.metadata?.image}
        alt={data.title ?? ''}
        width={350}
        height={180}
        loading='lazy'
        placeholder='blur'
        onError={() => {
          if (ref.current) {
            ref.current.style.height = '160px'
            ref.current.srcset = `https://t0.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=${data.url}&size=128`
            ref.current.style.objectFit = 'none'
          }
        }}
        blurDataURL={blurDataURL}
        style={{
          maxWidth: '100%',
          //@ts-ignore
          ...(data.metadata?.isFallback ? { height: '160px' } : {}),
          //@ts-ignore
          objectFit: data.metadata?.isFallback ? 'none' : 'cover',
        }}
      />
      <span className='bg-black/50 text-[11px] w-fit tracking-wide text-white flex p-0.5 px-1 rounded-md absolute bottom-2 left-2'>
        {humanizeUrl(url.hostname)}
      </span>
    </Link>
  )
}
