import { createFileRoute } from '@tanstack/react-router'

const works = [
  { title: 'LINKKU', href: 'https://example.com' },
  { title: "Someone's face", href: 'https://example.com' },
  { title: '데일리 아카이브', href: 'https://example.com' },
]

export const Route = createFileRoute('/works')({
  component: WorksPage,
})

function WorksPage() {
  return (
    <main>
      <h1>개인작업</h1>
      <ul>
        {works.map((work) => (
          <li key={work.title}>
            <a href={work.href} target="_blank" rel="noreferrer">
              {work.title} ↗
            </a>
          </li>
        ))}
      </ul>
    </main>
  )
}
