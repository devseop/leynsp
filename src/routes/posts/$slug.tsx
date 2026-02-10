import { createFileRoute, notFound } from '@tanstack/react-router'
import { createServerFn } from '@tanstack/react-start'
import { getPostBySlug } from '../../lib/posts/posts.server'


const getPost = createServerFn({ method: 'GET' })
  .inputValidator((slug: string) => slug)
  .handler(async ({ data }) => {
    return getPostBySlug(data)
  })

export const Route = createFileRoute('/posts/$slug')({
  loader: async ({ params }) => {
    const post = await getPost({ data: params.slug })
    
    if (!post) throw notFound()
    
      return post
  },

  component: PostPage,
})

function PostPage() {
  const post = Route.useLoaderData()

  return (
    <main>
      <h1>{post.title}</h1>
      <p>{post.date}</p>
      <article dangerouslySetInnerHTML={{ __html: post.html }} />
    </main>
  )
}