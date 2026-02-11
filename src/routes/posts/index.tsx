import { Link, createFileRoute } from '@tanstack/react-router'
import { getAllPosts } from '../../lib/posts/posts'

export const Route = createFileRoute('/posts/')({
  loader: () => getAllPosts(),
  component: PostsIndexPage,
})

function PostsIndexPage() {
  const posts = Route.useLoaderData()

  return (
    <main>
      <ul className="space-y-3 md:space-y-4 flex flex-col gap-4">
        {posts.map((post) => (
          <li key={post.slug}>
            <Link
              to="/posts/$slug"
              params={{ slug: post.slug }}
              className="brutal-link"
            >
              {post.title}
            </Link>
          </li>
        ))}
      </ul>
    </main>
  )
}
