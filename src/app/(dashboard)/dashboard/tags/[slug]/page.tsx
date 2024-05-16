import CardList from '@/components/card-list'
import DashboardHeader from '@/components/dashboard/dashboard-header'
import { EmptyTagState } from '@/components/icons'
import { getBookmarksForTag } from '@/lib/actions/bookmarks'
import { getTags } from '@/lib/actions/tags'
import { filterByTagName } from '@/lib/data'

// import SharePopover from 'components/popover/share'
// import { PublicIconWithTooltip } from 'components/public-icon-with-tooltip'

const title = 'Bookmark it.'
const description =
  'Bookmark It. is an open-source bookmark manager to organize, discover and personalize your bookmarking experience'

type MetadataType = {
  params: { slug: string }
}

export async function generateMetadata({ params }: MetadataType) {
  const { slug } = params
  return {
    title: `${title} | Tag: ${decodeURIComponent(slug)}`,
    description,
  }
}

export default async function Page({ params }: { params: { slug: string } }) {
  const { slug } = params
  const tagName = decodeURIComponent(slug)
  const [bookmarks, tags] = await Promise.all([await getBookmarksForTag(tagName), await getTags()])

  const filteredBookmarks = filterByTagName(bookmarks, tagName)
  const tag = tags.find((tag) => tag.name === tagName) || null

  return (
    <>
      <DashboardHeader
        // icon={tag?.shared ? <PublicIconWithTooltip className='h-3 w-3 relative -top-0.5' /> : null}
        // shareIcon={<SharePopover tag={tag} />}
        headerText={`Tag: ${tagName}`}
      />
      <div className='h-full sm:border-r border-border pb-24'>
        {bookmarks.length ? (
          <CardList bookmarks={filteredBookmarks} tags={tags} />
        ) : (
          <EmptyTagState tagName={tagName} />
        )}
      </div>
    </>
  )
}
