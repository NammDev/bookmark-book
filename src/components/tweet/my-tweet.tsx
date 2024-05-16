import {
  QuotedTweet,
  TweetBody,
  TweetContainer,
  TweetHeader,
  TweetInReplyTo,
  TweetInfo,
  TweetMedia,
  type TwitterComponents,
  enrichTweet,
} from 'react-tweet'
import type { Tweet } from 'react-tweet/api'

type Props = {
  tweet: Tweet
  components?: TwitterComponents
}

export const MyTweet = ({ tweet: t, components }: Props) => {
  const tweet = enrichTweet(t)
  return (
    <TweetContainer className='!dark:bg-black !dark:border-black'>
      <TweetHeader tweet={tweet} components={components} />
      {tweet.in_reply_to_status_id_str && <TweetInReplyTo tweet={tweet} />}
      <TweetBody tweet={tweet} />
      {tweet.mediaDetails?.length ? <TweetMedia tweet={tweet} components={components} /> : null}
      {tweet.quoted_tweet && <QuotedTweet tweet={tweet.quoted_tweet} />}
      <TweetInfo tweet={tweet} />
      {/* <TweetActions tweet={tweet} /> */}
    </TweetContainer>
  )
}
