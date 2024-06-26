import CardDate from '@/components/card/date'
import CardInfo from '@/components/card/info'
import CardTimeline from '@/components/card/timeline'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'
import { BookmarkModified } from '@/types/data'

import CardMedia from './card-media'
import CardMenu from './card-menu'

export default function Card({
  bookmarksLength,
  data,
}: {
  bookmarksLength: number
  data: { [key: string]: BookmarkModified[] }
}) {
  return (
    <div className='h-full border-border pb-24'>
      {Object.keys(data).map((dateKey: string) => {
        const bookmarksData = data[dateKey]
        return (
          <div
            className={cn(`flex flex-col w-full`, {
              'border-b border-border': bookmarksLength,
            })}
            key={dateKey}
          >
            {bookmarksData.map((bookmark: BookmarkModified) => (
              <div
                key={bookmark.id}
                className={cn(
                  `justify-between group gap-3 transition-colors flex hover:bg-secondary/70 dark:hover:bg-secondary/20 text-primary w-full`,
                  {
                    'border-b border-border': bookmarksData.length - 1 === bookmarksData.length,
                  }
                )}
              >
                <CardDate data={bookmark} />
                <CardTimeline url={bookmark.url} title={bookmark.title} />
                <div className='w-full flex flex-col'>
                  <div className='flex w-full justify-between'>
                    <CardInfo data={bookmark} />
                    <div className='pr-2'>
                      <CardMenu data={bookmark} />
                    </div>
                  </div>
                  <CardMedia data={bookmark} />
                  <div className='justify-between mb-2 h-[36px] flex items-center w-full'>
                    <div className='tracking-wide items-center text-muted-foreground text-xs gap-2 flex w-full'>
                      <div
                        className={`flex gap-y-1.5 items-center overflow-x-scroll max-sm:max-w-[200px] max-w-[350px] w-full hidden-scrollbar mask-start-and-end`}
                      >
                        {bookmark?.BookmarkTag?.map(({ Tag: { id, name } }) => {
                          return (
                            <Badge
                              key={id}
                              className={`border bg-primary-foreground border-border hover:bg-accent/80 dark:hover:bg-accent dark:active:bg-accent transition-colors focus:bg-accent/80 rounded-full mr-2 font-normal py-1 h-[28px] w-max`}
                              variant='secondary'
                            >
                              {name}
                            </Badge>
                          )
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )
      })}
    </div>
  )
}
