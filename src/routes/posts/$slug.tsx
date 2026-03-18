import { createFileRoute, notFound } from '@tanstack/react-router'
import { getPostBySlug } from '../../lib/posts/posts'

export const Route = createFileRoute('/posts/$slug')({
  loader: async ({ params }) => {
    const post = await getPostBySlug(params.slug)

    if (!post) throw notFound()

    return post
  },

  component: PostPage,
})

function PostPage() {
  const post = Route.useLoaderData()

  return (
    <main className="max-w-[712px] mx-auto space-y-[56px]">
      <header className="flex flex-col items-start gap-2">
        <h1 className="text-4xl font-semibold text-[var(--fg)]">{post.title}</h1>
        <p className="text-base font-medium text-[var(--fg)] opacity-80">{post.date}</p>
      </header>
      <article className="post-content" dangerouslySetInnerHTML={{ __html: post.html }} />
    </main>
  )
}
