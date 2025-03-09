import { PostActions } from '../actions/postActions'
import { PostState } from '../types/posts'

export function postReducer(state: PostState, action: PostActions): PostState {
  const { type, payload } = action

  switch (type) {
    case 'SET_POSTS':
      return { ...state, posts: payload, loading: false, error: null }
    case 'SET_CONTENT':
      return { ...state, content: payload, loading: false, error: null }
    case 'SET_LOADING':
      return { ...state, loading: payload }
    case 'SET_ERROR':
      return { ...state, error: payload, loading: false }
    default:
      return state
  }
}
