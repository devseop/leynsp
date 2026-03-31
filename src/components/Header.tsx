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

function normalizePathname(pathname: string) {
  if (pathname !== '/' && pathname.endsWith('/')) {
    return pathname.slice(0, -1)
  }

  return pathname
}

export function Header() {
  const pathname = useRouterState({ select: (state) => normalizePathname(state.location.pathname) })
  const [theme, setTheme] = useState<Theme>('light')
  const [isThemeResolved, setIsThemeResolved] = useState(false)

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
    setIsThemeResolved(true)
  }, [])

  const toggleTheme = () => {
    const nextTheme: Theme = theme === 'light' ? 'dark' : 'light'
    setTheme(nextTheme)
    setDocumentTheme(nextTheme)
    localStorage.setItem('theme', nextTheme)
  }

  return (
    <header className="sticky top-0 z-50 w-full bg-[var(--bg)]/90 backdrop-blur supports-[backdrop-filter]:bg-[var(--bg)]/80 py-4">
      <nav className="flex flex-row items-center justify-between">
        <div className="flex flex-row items-center gap-8">
          {navItems.map((item) => {
            const normalizedItemPath = normalizePathname(item.to)
            const isActive =
              pathname === normalizedItemPath ||
              (normalizedItemPath !== '/' && pathname.startsWith(`${normalizedItemPath}/`))
            
            return (
              <Link
              key={item.to}
              to={item.to}
              className={`nav-item ${isActive ? 'bg-[var(--fg)] text-[var(--bg)]' : 'text-[var(--fg)]'}`}
              >
                {item.label}
              </Link>
            )
          })}
        </div>

        <button type="button" onClick={toggleTheme} className="nav-item text-right">
          {isThemeResolved && theme === 'dark' ? '밤' : '낮'}
        </button>
      </nav>
    </header>
  )
}
