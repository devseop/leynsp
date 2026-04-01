import { Link, createFileRoute } from '@tanstack/react-router'
import { WORKS } from '../../const'

export const Route = createFileRoute('/works/')({
  component: WorksPage,
})

function WorksPage() {
  return (
    <main>
      <ul className="grid-lists">
        {WORKS.map((work) => (
          <li key={work.title}>
            {work.href.startsWith('http') ? (
              <a href={work.href} target="_blank" rel="noreferrer" className="link">
                {work.title}
              </a>
            ) : (
              <Link to={work.href} className="link">
                {work.title}
              </Link>
            )}
          </li>
        ))}
      </ul>
    </main>
  )
}
