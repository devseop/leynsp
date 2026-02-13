import { Link, createFileRoute } from '@tanstack/react-router'
import { getAllPosts } from '../../lib/posts/posts'
import { PostMeta } from '../../lib/posts/postTypes'

export const Route = createFileRoute('/posts/')({
  loader: () => getAllPosts(),
  component: PostsIndexPage,
})

function PostsIndexPage() {
  const posts = Route.useLoaderData()

  //posts를 내림차순으로 년도별로 그루핑
  const groupedPosts: Record<string, PostMeta[]> = posts.reduce((acc, post) => {
    const year = post.date.split('-')[0]
    if (!acc[year]) {
      acc[year] = []
    }
    acc[year].push(post)
    return acc
  }, {} as Record<string, PostMeta[]>)

  const sortedGroupedPosts: [string, PostMeta[]][] = Object.entries(groupedPosts).sort((a, b) => Number(b[0]) - Number(a[0]))

  return (
    <main>
      <ul className="flex flex-col gap-5">
        {sortedGroupedPosts.map(([year, posts]) => (
          <li key={year}>
            <h2 className="text-2xl font-medium leading-none p-[6px] bg-[var(--fg)] text-[var(--bg)] w-fit">{year}</h2>
            <ul className="lists">
              {posts.map((post) => (
                <li key={post.slug}>
                  <Link
                    to="/posts/$slug"
                    params={{ slug: post.slug }}
                    className="link"
                  >
                    {post.title}
                  </Link>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </main>
  )
}
