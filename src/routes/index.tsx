
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/')({
  component: HomePage,
})

function HomePage() {

  return (
    <main>
      <h1>블로그 마이그레이션 중입니다.</h1>
      
    </main>
  )
}