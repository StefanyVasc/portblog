export type Post = {
  slug: string
  title: string
  date: string
  description: string
}

export type PostState = {
  posts: Post[]
  content: string | null
  loading: boolean
  error: string | null
}
