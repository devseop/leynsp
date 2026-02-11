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
    <main className="space-y-8 md:space-y-10">
      <header className="space-y-3 md:space-y-4">
        <h1 className="max-w-[980px] text-[80px] leading-[0.94] tracking-[-0.03em]">{post.title}</h1>
        <p className="text-[80px] leading-none text-[var(--muted)]">{post.date}</p>
      </header>
      <article className="post-content" dangerouslySetInnerHTML={{ __html: post.html }} />
    </main>
  )
}
