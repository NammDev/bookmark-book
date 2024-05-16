import { groupByDate } from '@/lib/data'
import Card from './card'
import Header from './header'
import { PublicIconWithTooltip } from '@/components/card/public-icon-with-tooltip'
import { EmptyBookmarkSharedState } from '@/components/icons'
import { getSharedTag } from '@/lib/actions/shared'
import { notFound } from 'next/navigation'
import { getBookmarksForTag } from '@/lib/actions/bookmarks'

const title = 'Bookmark it.'
const description =
  'Bookmark It. is an open-source bookmark manager to organize, discover and personalize your bookmarking experience'

type MetadataType = {
  params: { tag: string }
}

export const revalidate = 600

export async function generateMetadata({ params }: MetadataType) {
  const { tag } = params
  return {
    title: `${title} | Shared ${decodeURIComponent(tag)}`,
    description,
  }
}

export default async function Page({ params }: { params: { tag: string } }) {
  const { tag } = params
  const hash = decodeURIComponent(tag)
  const tagShared = await getSharedTag(hash)
  const bookmarks = await getBookmarksForTag(tagShared.name)
  if (!bookmarks) {
    return notFound
  }
  const data = groupByDate(bookmarks)

  return (
    <>
      <Header
        data={bookmarks}
        headerText={`Tag: ${tagShared.name}`}
        icon={<PublicIconWithTooltip className='h-3 w-3 relative -top-0.5' />}
      />
      <div className='h-full sm:border-r sm:border-border pb-24'>
        {bookmarks?.length ? (
          <Card bookmarksLength={bookmarks.length} data={data} />
        ) : (
          <EmptyBookmarkSharedState />
        )}
      </div>
    </>
  )
}
