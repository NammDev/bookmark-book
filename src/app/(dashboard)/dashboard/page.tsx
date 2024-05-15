import AddBookmarkInput from '@/components/bookmark/add-input'
import CardList from '@/components/card-list'
import DashboardHeader from '@/components/dashboard/dashboard-header'
import { EmptyBookmarkState } from '@/components/icons'
import { getBookmarks } from '@/lib/actions/bookmarks'
import { getTags } from '@/lib/actions/tags'

export const revalidate = 3600

export default async function Page() {
  const [bookmarks, tags] = await Promise.all([await getBookmarks(), await getTags()])

  return (
    <>
      <DashboardHeader />
      <AddBookmarkInput className='px-3' btnClassname='relative top-3' />
      <div className='h-full sm:border-r border-border pb-24'>
        {bookmarks.length ? <CardList bookmarks={bookmarks} tags={tags} /> : <EmptyBookmarkState />}
      </div>
    </>
  )
}
