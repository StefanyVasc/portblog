import { PostState } from '../types/posts'

export const postInitialState: PostState = {
  posts: [],
  content: null,
  loading: true,
  error: null,
  tags: []
}
