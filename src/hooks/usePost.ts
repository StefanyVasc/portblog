import { useEffect, useReducer } from 'react'
import { useParams } from 'react-router-dom'

import { postInitialState } from '@/reducers/initialStates/postInitialState'
import { postReducer } from '@/reducers/reducer/postReducer'

// Hook personalizado para gerenciar posts e conteúdos do blog
export function usePost() {
  const { slug } = useParams<{ slug?: string }>()
  const [state, dispatch] = useReducer(postReducer, postInitialState)

  useEffect(() => {
    if (!slug) {
      dispatch({ type: 'SET_LOADING', payload: true })
      fetch('/posts/posts.json')
        .then(res => res.json())
        .then(data => {
          dispatch({ type: 'SET_POSTS', payload: data })
        })
        .catch(error => {
          console.error('Erro ao carregar lista de posts:', error)
          dispatch({ type: 'SET_ERROR', payload: 'Erro ao carregar posts' })
        })
      return
    }

    // 🔥 Resetar os estados antes de carregar um novo post
    dispatch({ type: 'SET_CONTENT', payload: null })
    dispatch({ type: 'SET_ERROR', payload: null })
    dispatch({ type: 'SET_LOADING', payload: true })

    const postPath = `/posts/${encodeURIComponent(slug)}.md`

    fetch(postPath)
      .then(res => {
        if (!res.ok) throw new Error('Post not found')
        return res.text()
      })
      .then(text => {
        dispatch({ type: 'SET_CONTENT', payload: text })
      })
      .catch(error => {
        console.error('Erro ao carregar post:', error)
        dispatch({ type: 'SET_ERROR', payload: 'Post não encontrado' })
      })
  }, [slug])

  return { ...state, slug }
}
