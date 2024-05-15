import { formatDate } from '@/lib/date'

import { BookmarkModified } from '@/types/data'

export default function CardDate({ data }: { data: BookmarkModified }) {
  const date = formatDate(data.createdAt)
  const currentDate = formatDate(new Date())
  const isToday = currentDate === date
  return (
    <div className='w-16 pt-3 relative top-[1px] pl-2 shrink-0 flex flex-col font-medium text-center text-[11px] text-muted-foreground '>
      <span>{isToday ? 'Today' : date}</span>
    </div>
  )
}
