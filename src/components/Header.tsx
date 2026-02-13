import { Link, useRouterState } from '@tanstack/react-router'
import { useEffect, useState } from 'react'

type Theme = 'light' | 'dark'

const navItems = [
  { label: '집', to: '/' },
  { label: '글', to: '/posts' },
  { label: '짓', to: '/works' },
] as const

function setDocumentTheme(theme: Theme) {
  const root = document.documentElement
  if (theme === 'dark') {
    root.classList.add('dark')
  } else {
    root.classList.remove('dark')
  }
}

export function Header() {
  const pathname = useRouterState({ select: (state) => state.location.pathname })
  const [theme, setTheme] = useState<Theme>('light')

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme')
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    const resolvedTheme: Theme =
      savedTheme === 'dark' || savedTheme === 'light'
        ? (savedTheme as Theme)
        : prefersDark
          ? 'dark'
          : 'light'

    setTheme(resolvedTheme)
    setDocumentTheme(resolvedTheme)
  }, [])

  const toggleTheme = () => {
    const nextTheme: Theme = theme === 'light' ? 'dark' : 'light'
    setTheme(nextTheme)
    setDocumentTheme(nextTheme)
    localStorage.setItem('theme', nextTheme)
  }

  return (
    <header className="w-full ">
      <nav className="flex flex-row items-center justify-between">
        {navItems.map((item) => {
          const isActive =
            pathname === item.to ||
            (item.to !== '/' && pathname.startsWith(`${item.to}/`))

          return (
            <Link
              key={item.to}
              to={item.to}
              className={`nav-item ${isActive ? 'p-[6px] bg-[var(--fg)] text-[var(--bg)]' : 'text-[var(--fg)]'}`}
            >
              {item.label}
            </Link>
          )
        })}

        <button type="button" onClick={toggleTheme} className="nav-item text-right">
          {theme === 'dark' ? '밤' : '낮'}
        </button>
      </nav>
    </header>
  )
}
