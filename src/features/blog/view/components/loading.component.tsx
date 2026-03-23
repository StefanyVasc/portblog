import { PostContentSkeleton, PostListSkeleton } from '@/shared/components'

export const Loading = ({ type }: { type?: 'list' | 'content' }) => {
  if (type === 'content') return <PostContentSkeleton />
  return <PostListSkeleton />
}
