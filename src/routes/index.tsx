import { createFileRoute } from '@tanstack/react-router'
import { CONTACTS } from '../lib/const'

export const Route = createFileRoute('/')({
  component: HomePage,
})

function HomePage() {

  return (
    <main className="space-y-4 md:space-y-4">
      <section className="w-full">
        <ul className="lists">
          <li>의도를 디자인으로  때로는 코드로 구현합니다.</li>
          <li className="mt-5">비휼적인 프로세스와 사용성을 개선하는 일을 즐기며</li>
          <li className='mb-5'>이를 통해 사용자 경험의 완성도가 높아지는 것에 집중합니다.</li>
          <li>디지털 프로덕트 뿐 아니라 인터랙티브 콘텐츠,</li>
          <li>시각적 표현 실험에도 관심이 많으며</li>
          <li>디자인과 개발 사이의 간극을 줄이는 역할을 지향합니다.</li>
        </ul>
      </section>

      <section>
        <ul className="lists flex flex-col gap-5">
          {CONTACTS.map((contact) => (
            <li key={contact.label}>
              <a
                href={contact.href}
                target={contact.href.startsWith('http') || contact.href.startsWith('mailto:') ? '_blank' : undefined}
                rel={contact.href.startsWith('http') ? 'noreferrer' : undefined}
                className='link'
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
