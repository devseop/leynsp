import { createFileRoute } from '@tanstack/react-router'
import { CONTACTS } from '../lib/const'

export const Route = createFileRoute('/')({
  component: HomePage,
})

function HomePage() {

  return (
    <main className="space-y-4 md:space-y-4">
      <section className="w-full">
        <h1 className="font-medium text-[80px] leading-[93px] tracking-[-0.04em] flex flex-col gap-1">
          <span className="block">이윤섭</span>
          <span className="block">프로덕트 디자인과</span>
          <span className="block">프론트엔드 개발을</span>
          <span className="block">오가는 잡부</span>
        </h1>
      </section>

      <section>
        <ul className="max-w-[520px] space-y-4 md:space-y-5 flex flex-col gap-5">
          {CONTACTS.map((contact) => (
            <li key={contact.label} className="list-none mb-0">
              <a
                href={contact.href}
                target={contact.href.startsWith('http') || contact.href.startsWith('mailto:') ? '_blank' : undefined}
                rel={contact.href.startsWith('http') ? 'noreferrer' : undefined}
                className="brutal-link"
              >
                {contact.label}
              </a>
            </li>
          ))}
        </ul>
      </section>
    </main>
  )
}
