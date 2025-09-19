import { useEffect, useReducer } from 'react'
import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router-dom'

import { postInitialState } from '@/reducers/initialStates/postInitialState'
import { postReducer } from '@/reducers/reducer/postReducer'
import { Post, PostState } from '@/reducers/types/posts'

function getLocaleSuffix(language: string) {
  const normalized = language?.toLowerCase() ?? 'pt'
  return normalized.startsWith('en') ? '.en' : ''
}

async function fetchJsonWithFallback<T>(
  primaryPath: string,
  fallbackPath: string
): Promise<T> {
  const primaryResponse = await fetch(primaryPath)

  if (primaryResponse.ok) {
    return primaryResponse.json() as Promise<T>
  }

  if (primaryResponse.status === 404 && primaryPath !== fallbackPath) {
    const fallbackResponse = await fetch(fallbackPath)
    if (fallbackResponse.ok) {
      return fallbackResponse.json() as Promise<T>
    }
  }

  throw new Error(`Não foi possível carregar ${primaryPath}`)
}

async function fetchTextWithFallback(
  primaryPath: string,
  fallbackPath: string
): Promise<string> {
  const primaryResponse = await fetch(primaryPath)

  if (primaryResponse.ok) {
    return primaryResponse.text()
  }

  if (primaryResponse.status === 404 && primaryPath !== fallbackPath) {
    const fallbackResponse = await fetch(fallbackPath)
    if (fallbackResponse.ok) {
      return fallbackResponse.text()
    }
  }

  throw new Error(`Não foi possível carregar ${primaryPath}`)
}

export function usePost() {
  const { slug } = useParams<{ slug?: string }>()
  const { i18n } = useTranslation()
  const localeSuffix = getLocaleSuffix(i18n.resolvedLanguage || i18n.language)

  const [state, dispatch] = useReducer(
    postReducer,
    postInitialState as PostState
  )

  useEffect(() => {
    let cancelled = false

    async function loadPosts() {
      dispatch({ type: 'SET_LOADING', payload: true })

      try {
        const posts = await fetchJsonWithFallback<Post[]>(
          `/posts/posts${localeSuffix}.json`,
          '/posts/posts.json'
        )

        if (cancelled) return

        dispatch({ type: 'SET_POSTS', payload: posts })
      } catch (error) {
        if (cancelled) return
        dispatch({
          type: 'SET_ERROR',
          payload: `Erro ao carregar post: ${error}`
        })
      } finally {
        if (!cancelled) {
          dispatch({ type: 'SET_LOADING', payload: false })
        }
      }
    }

    loadPosts()

    return () => {
      cancelled = true
    }
  }, [localeSuffix])

  useEffect(() => {
    if (!slug) {
      dispatch({ type: 'SET_TAGS', payload: [] })
      return
    }

    const currentPost = state.posts.find(post => post.slug === slug)
    dispatch({ type: 'SET_TAGS', payload: currentPost?.tags || [] })
  }, [slug, state.posts])

  useEffect(() => {
    if (!slug) {
      dispatch({ type: 'SET_CONTENT', payload: null })
      return
    }

    let cancelled = false

    const currentSlug = slug

    async function loadContent() {
      dispatch({ type: 'SET_LOADING', payload: true })
      dispatch({ type: 'SET_CONTENT', payload: null })

      try {
        const content = await fetchTextWithFallback(
          `/posts/${encodeURIComponent(currentSlug)}${localeSuffix}.md`,
          `/posts/${encodeURIComponent(currentSlug)}.md`
        )

        if (cancelled) return

        dispatch({ type: 'SET_CONTENT', payload: content })
      } catch (error) {
        if (cancelled) return
        dispatch({
          type: 'SET_ERROR',
          payload: `Erro ao carregar post: ${error}`
        })
      } finally {
        if (!cancelled) {
          dispatch({ type: 'SET_LOADING', payload: false })
        }
      }
    }

    loadContent()

    return () => {
      cancelled = true
    }
  }, [slug, localeSuffix])

  return { ...state, slug }
}
