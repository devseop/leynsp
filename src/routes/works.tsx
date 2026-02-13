import { createFileRoute } from '@tanstack/react-router'
import { WORKS } from '../lib/const'

export const Route = createFileRoute('/works')({
  component: WorksPage,
})

function WorksPage() {
  return (
    <main>
      <ul className="lists">
        {WORKS.map((work) => (
          <li key={work.title}>
            <a 
              href={work.href} 
              target={work.href.startsWith('http') ? '_blank' : undefined}
              rel={work.href.startsWith('http') ? 'noreferrer' : undefined} 
              className="link"
            >
              {work.title}
            </a>
          </li>
        ))}
      </ul>
    </main>
  )
}
