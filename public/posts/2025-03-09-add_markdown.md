---
slug: 2025-03-09-add_markdown
title: 'Adicionando Markdown ao Blog'
description: 'Como adicionei suporte a Markdown no blog do meu portfólio, incluindo instalação, configuração, formatação e listagem de posts.'
date: '2025-03-09'
tags:
  - blog
  - webdev
  - markdown
---

# 📝 **Adicionando Suporte a Markdown no Blog do Meu Portfólio**

Ter um **blog dentro do portfólio** sempre foi um dos meus objetivos. Eu queria algo simples, prático e fácil de gerenciar sem precisar de um CMS robusto.

A solução? **Markdown + JSON**! Com essa abordagem, eu consigo escrever posts de forma rápida e manter a estrutura organizada. Neste post, vou mostrar como adicionei suporte a **Markdown no meu blog**, incluindo **instalação, configuração, formatação e listagem de posts**.

## **📌 1. Por que Markdown?**

O **Markdown** é uma linguagem de marcação leve e muito utilizada para escrever textos formatados de forma rápida e intuitiva. Ele é perfeito para blogs porque:  
✅ Permite escrever posts sem precisar de HTML.  
✅ Facilita a manutenção do conteúdo.  
✅ Pode ser convertido para HTML de forma simples.  
✅ Funciona bem com React e outras bibliotecas.

---

## **📦 2. Instalando o Suporte ao Markdown**

Para renderizar o conteúdo do Markdown no meu blog, utilizei a biblioteca [`react-markdown`](https://github.com/remarkjs/react-markdown).

```bash
npm install react-markdown
```

Essa biblioteca converte os arquivos `.md` em HTML dentro do React. Além disso, também instalei `remark-gfm` para suportar **tabelas, listas de tarefas e outras sintaxes úteis**:

```bash
npm install remark-gfm
```

---

## **📂 3. Estruturando os Arquivos**

Criei uma pasta dentro do projeto para armazenar os posts:

```
📂 public
 ├── 📂 posts
 │    ├── posts.json    // Lista de posts disponíveis
 │    ├── 2025-03-04-starting_my_portfolio.md
 │    ├── 2025-03-10-dark_mode.md
 │    ├── ...
```

O **arquivo JSON (`posts.json`)** contém informações como **título, data e descrição** para exibição na listagem:

```json
[
  {
    "slug": "2025-03-04-starting_my_portfolio",
    "title": "Criando Meu Portfólio - Parte 1: A Jornada Começa",
    "date": "04/03/2025",
    "description": "A ideia de ter um portfólio profissional sempre esteve na minha mente, mas eu queria algo mais do que um simples site estático..."
  }
]
```

Cada post é um **arquivo `.md`**, por exemplo, `2025-03-04-starting_my_portfolio.md`:

```md
# 🚀 Criando Meu Portfólio - Parte 1: A Jornada Começa

A ideia de ter um **portfólio profissional** sempre esteve na minha mente, mas eu queria algo mais do que um simples site estático...
```

---

## **📜 4. Criando o Hook `usePost.ts`**

Para carregar os posts, criei um **hook personalizado** que busca os dados do JSON e o conteúdo do Markdown.

```tsx
import { useEffect, useReducer } from 'react'
import { useParams } from 'react-router-dom'

import { Post } from '@/reducers/types/postTypes'
import { postInitialState } from '@/reducers/initialStates/postInitialState'
import { postReducer } from '@/reducers/reducer/postReducer'

export function usePost() {
  const { slug } = useParams<{ slug?: string }>()
  const [state, dispatch] = useReducer(postReducer, postInitialState)

  useEffect(() => {
    if (!slug) {
      dispatch({ type: 'SET_LOADING', payload: true })

      // 🔥 Buscar a lista de posts do JSON
      fetch('/posts/posts.json')
        .then(res => res.json())
        .then((data: Post[]) => {
          dispatch({ type: 'SET_POSTS', payload: data })
        })
        .catch(error => {
          console.error('Erro ao carregar posts:', error)
          dispatch({ type: 'SET_ERROR', payload: 'Erro ao carregar posts' })
        })
      return
    }

    dispatch({ type: 'SET_LOADING', payload: true })

    const postPath = `/posts/${slug}.md`
    fetch(postPath)
      .then(res => res.text())
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
```

---

## **🖥️ 5. Criando a Página do Blog**

O componente `Blog.tsx` usa o hook `usePost()` para exibir a **lista de posts ou o conteúdo do post selecionado**.

```tsx
import { CustomBreadcrumb, Header } from '@/components'
import { usePost } from '@/hooks/usePost'

import { ErrorMessage, Loading, PostContent, PostList } from './components'

export function Blog() {
  const { slug, posts, content, loading, error } = usePost()

  return (
    <div>
      <Header headerName="Blog" />

      {loading && <Loading />}
      {error && <ErrorMessage message={error} />}
      {!loading &&
        !error &&
        (slug ? <PostContent content={content} /> : <PostList posts={posts} />)}
    </div>
  )
}
```

O **componente `PostList.tsx`** exibe os posts formatados:

```tsx
import { Link } from 'react-router-dom'
import { Post } from '@/reducers/types/postTypes'

export const PostList = ({ posts }: { posts: Post[] }) => (
  <div className="mx-auto max-w-3xl p-6">
    <h2 className="mb-4 text-2xl font-semibold">Últimos posts</h2>

    {posts.length > 0 ? (
      <ul className="space-y-4">
        {posts.map(({ slug, title, date, description }, i) => (
          <li key={i} className="border-b pb-3">
            <Link
              to={`/blog/${slug}`}
              className="font-medium text-rose-600 hover:underline dark:text-rose-400"
            >
              {date} - {title}
            </Link>
            <p className="mt-1 text-sm text-gray-500">{description}</p>
          </li>
        ))}
      </ul>
    ) : (
      <p className="text-gray-500">Nenhum post encontrado.</p>
    )}
  </div>
)
```

---

## **🎨 6. Melhorando o Estilo do Markdown**

Para estilizar o conteúdo Markdown, criei um componente `MarkdownRenderer.tsx`:

```tsx
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

export function MarkdownRenderer({ content }: { content: string }) {
  return (
    <article className="prose dark:prose-invert mx-auto">
      <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
    </article>
  )
}
```

Usamos a classe `prose` do **Tailwind CSS** para melhorar a legibilidade.

---

## **🚀 Conclusão**

Agora, o blog suporta **Markdown**, carrega posts de um **JSON**, formata automaticamente a data e título e exibe a **lista de posts** dinamicamente.

Com isso, fica fácil **adicionar novos posts** apenas criando um arquivo `.md` e atualizando o `posts.json`!

📌 **Próximo post:** Melhorando o sistema de comentários e SEO do blog! 🚀
