import { createFileRoute, Link } from '@tanstack/react-router'
import { createServerFn } from '@tanstack/react-start'
import { getAllPosts } from '../lib/posts/posts.server'

const getPosts = createServerFn({ method: 'GET' }).handler(async () => {
  return getAllPosts()
})

export const Route = createFileRoute('/posts')({
  loader: () => getPosts(),
  component: PostsPage,
})

function PostsPage() {
  const posts = Route.useLoaderData()

  return (
    <main>
      <ul className="space-y-3 md:space-y-4">
        {posts.map((post) => (
          <li key={post.slug}>
            <Link
              to="/posts/$slug"
              params={{ slug: post.slug }}
              className="brutal-link block pb-1"
            >
              {post.title}
            </Link>
          </li>
        ))}
      </ul>
    </main>
  )
}
