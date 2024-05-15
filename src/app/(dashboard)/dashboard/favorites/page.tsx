// import { getFavBookmarks } from 'app/actions/bookmarks'
// import { getTags } from 'app/actions/tags'

import CardList from '@/components/card-list'
import DashboardHeader from '@/components/dashboard/dashboard-header'
import { EmptyFavoriteState } from '@/components/icons'
import { getFavBookmarks } from '@/lib/actions/bookmarks'
import { getTags } from '@/lib/actions/tags'

const title = 'Bookmark it. | Favorites'
const description =
  'Bookmark It. is an open-source bookmark manager to organize, discover and personalize your bookmarking experience'

export const metadata = {
  title,
  description,
}

export default async function Page() {
  const [bookmarks, tags] = await Promise.all([await getFavBookmarks(), await getTags()])

  return (
    <>
      <DashboardHeader headerText='Favorites' />
      <div className='min-h-dvh sm:border-r border-border pb-24'>
        {bookmarks.length ? <CardList bookmarks={bookmarks} tags={tags} /> : <EmptyFavoriteState />}
      </div>
    </>
  )
}
