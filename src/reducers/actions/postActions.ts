import { Post } from '../types/posts'

export type PostActions =
  | { type: 'SET_POSTS'; payload: Post[] }
  | { type: 'SET_CONTENT'; payload: string | null }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null }
