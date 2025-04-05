import { useCallback, useEffect, useReducer, useRef } from 'react'
import { useParams } from 'react-router-dom'

import { postInitialState } from '@/reducers/initialStates/postInitialState'
import { postReducer } from '@/reducers/reducer/postReducer'
import { Post, PostState } from '@/reducers/types/posts'

// Hook personalizado para gerenciar posts e conteúdos do blog
export function usePost() {
  const { slug } = useParams<{ slug?: string }>()
  const [state, dispatch] = useReducer(
    postReducer,
    postInitialState as PostState
  )

  const hasFetchedPosts = useRef(false)
  const hasFetchedContent = useRef(false)

  // 🔥 Buscar a lista de posts (memorizado para evitar re-renderizações)
  const getPostsList = useCallback(async () => {
    if (hasFetchedPosts.current) return

    hasFetchedPosts.current = true
    dispatch({ type: 'SET_LOADING', payload: true })

    try {
      const res = await fetch('/posts/posts.json')
      const posts: Post[] = await res.json()
      dispatch({ type: 'SET_POSTS', payload: posts })

      if (slug) {
        const currentPost = posts.find(post => post.slug === slug)
        if (!currentPost) throw new Error('Post não encontrado')

        dispatch({ type: 'SET_TAGS', payload: currentPost.tags || [] })
      }
    } catch (error) {
      dispatch({
        type: 'SET_ERROR',
        payload: `Erro ao carregar post: ${error}`
      })
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false })
    }
  }, [slug])

  // 🔥 Buscar o conteúdo Markdown do post (memorizado para evitar re-fetch)
  const getMarkdownPostContent = useCallback(async (slug: string) => {
    if (hasFetchedContent.current) return

    hasFetchedContent.current = true
    dispatch({ type: 'SET_LOADING', payload: true })

    try {
      const res = await fetch(`/posts/${encodeURIComponent(slug)}.md`)
      if (!res.ok) throw new Error('Post não encontrado')

      const text = await res.text()
      dispatch({ type: 'SET_CONTENT', payload: text })
    } catch (error) {
      dispatch({
        type: 'SET_ERROR',
        payload: `Erro ao carregar post: ${error}`
      })
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false })
    }
  }, [])

  useEffect(() => {
    getPostsList()
  }, [getPostsList])

  useEffect(() => {
    if (slug && !state.content) {
      getMarkdownPostContent(slug)
    }
  }, [slug, state.content, getMarkdownPostContent])

  return { ...state, slug }
}
