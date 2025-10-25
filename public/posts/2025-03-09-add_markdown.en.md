---
slug: 2025-03-09-add_markdown
title: 'Adding Markdown Support to the Blog'
description: 'How I wired Markdown into the blog: folder structure, helper hooks, rendering setup and a styled reading experience.'
date: 'March 9, 2025'
tags:
  - blog
  - webdev
  - markdown
---

# 📝 Adding Markdown Support to the Portfolio Blog

Having a **blog inside the portfolio** was always one of my goals. I wanted something lightweight, easy to maintain, and that wouldn’t require standing up a CMS for every new post.

The solution? **Markdown + JSON**. With this combo I can write posts quickly, keep structure organized, and render everything with React. In this article I’ll walk through how I enabled **Markdown support** – from installation to formatting and post listing.

---

## 📌 1. Why Markdown?

Markdown is a lightweight markup language that makes formatted writing feel natural. It’s perfect for a dev blog because:

✅ You write without touching raw HTML.  
✅ Content is easy to maintain in version control.  
✅ Converting to HTML is straightforward.  
✅ It plays nicely with React and static hosting.

---

## 📦 2. Installing the Dependencies

To render Markdown in the blog I used [`react-markdown`](https://github.com/remarkjs/react-markdown).

```bash
npm install react-markdown
```

This library turns `.md` files into React elements. I also added `remark-gfm` to support **tables, task lists and other GitHub-flavored goodies**:

```bash
npm install remark-gfm
```

---

## 📂 3. Organizing Files

Inside `public/` I created a folder to store the posts:

```
📂 public
 └── 📂 posts
      ├── posts.json        # list of available posts
      ├── 2025-03-08-starting_my_portfolio.md
      ├── 2025-03-09-add_markdown.md
      └── ...
```

The **`posts.json`** file keeps metadata such as **title, date, description and tags** for the listing:

```json
[
  {
    "slug": "2025-03-08-starting_my_portfolio",
    "title": "Building My Portfolio – Part 1: The Journey Begins",
    "date": "March 8, 2025",
    "description": "Why I chose to build a living portfolio, the goals I set for it, and the stack that will power the journey."
  }
]
```

Each post lives in a **`.md` file** – for example `2025-03-08-starting_my_portfolio.md`:

```md
# 🚀 Building My Portfolio – Part 1: The Journey Begins

The idea of having a professional portfolio had been in my mind for a while, but I wanted something that went beyond a static résumé site...
```

---

## 📜 4. Building the `usePost` Hook

To fetch the metadata and the markdown content I created a **custom hook**:

```tsx
import { useEffect, useReducer } from 'react'
import { useParams } from 'react-router-dom'

import { Post } from '@/reducers/types/posts'
import { postInitialState } from '@/reducers/initialStates/postInitialState'
import { postReducer } from '@/reducers/reducer/postReducer'

export function usePost() {
  const { slug } = useParams<{ slug?: string }>()
  const [state, dispatch] = useReducer(postReducer, postInitialState)

  useEffect(() => {
    dispatch({ type: 'SET_LOADING', payload: true })

    fetch('/posts/posts.json')
      .then(res => res.json())
      .then((data: Post[]) => {
        dispatch({ type: 'SET_POSTS', payload: data })
      })
      .catch(error => {
        console.error('Error loading posts:', error)
        dispatch({ type: 'SET_ERROR', payload: 'Failed to load posts' })
      })
  }, [])

  useEffect(() => {
    if (!slug) return

    dispatch({ type: 'SET_LOADING', payload: true })

    fetch(`/posts/${slug}.md`)
      .then(res => res.text())
      .then(text => {
        dispatch({ type: 'SET_CONTENT', payload: text })
      })
      .catch(error => {
        console.error('Error loading post:', error)
        dispatch({ type: 'SET_ERROR', payload: 'Post not found' })
      })
  }, [slug])

  return { ...state, slug }
}
```

---

## 🖥️ 5. Wiring the Blog Page

The `Blog.tsx` component uses `usePost()` to display either the **list of posts** or the **selected article**:

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

And the **`PostList.tsx`** component renders the metadata nicely:

```tsx
import { Link } from 'react-router-dom'
import { Post } from '@/reducers/types/posts'

export const PostList = ({ posts }: { posts: Post[] }) => (
  <div className="mx-auto max-w-3xl p-6">
    <h2 className="mb-4 text-2xl font-semibold">Latest posts</h2>

    {posts.length > 0 ? (
      <ul className="space-y-4">
        {posts.map(({ slug, title, date, description }, i) => (
          <li key={i} className="border-b pb-3">
            <Link
              to={`/blog/${slug}`}
              className="font-medium text-rose-600 hover:underline dark:text-rose-400"
            >
              {date} – {title}
            </Link>
            <p className="mt-1 text-sm text-gray-500">{description}</p>
          </li>
        ))}
      </ul>
    ) : (
      <p className="text-gray-500">No posts found.</p>
    )}
  </div>
)
```

---

## 🎨 6. Styling Markdown

Finally, I added a `MarkdownRenderer.tsx` component to improve readability:

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

paired with some CSS tweaks for typography and code blocks.

---

## ✅ Result

- ✅ Posts live as plain markdown files.
- ✅ Metadata is easy to tweak in JSON.
- ✅ Rendering is flexible and themeable.

Next stop: syntax highlighting!
