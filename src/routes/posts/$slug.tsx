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
      <header className="flex flex-col items-start">
        <h1 className="text-4xl font-medium p-[6px] bg-[var(--fg)] text-[var(--bg)] w-fit">{post.title}</h1>
        <p className="text-sm px-1 py-[2px] bg-[var(--fg)] text-[var(--bg)] w-fit">{post.date}</p>
      </header>
      <article className="post-content" dangerouslySetInnerHTML={{ __html: post.html }} />
    </main>
  )
}
