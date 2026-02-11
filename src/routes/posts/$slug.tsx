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
    <main className="max-w-[768px] mx-auto space-y-8 md:space-y-10">
      <header className="space-y-3 md:space-y-4 flex flex-col gap-1 items-center">
        <h1 className="text-[48px] font-medium leading-[0.94] tracking-[-0.03em]">{post.title}</h1>
        <p className="text-base font-medium leading-none text-[var(--muted)]">{post.date}</p>
      </header>
      <article className="post-content" dangerouslySetInnerHTML={{ __html: post.html }} />
    </main>
  )
}
