import { HeadContent, Scripts, createRootRoute } from '@tanstack/react-router'
import { Header } from '../components/Header'
import appCss from '../styles.css?url'

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { title: '이윤섭' },
    ],
    links: [{ rel: 'stylesheet', href: appCss }],
  }),
  shellComponent: RootDocument,
})

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <head>
        <HeadContent />
        <script
          dangerouslySetInnerHTML={{
            __html:
              "(function(){try{var t=localStorage.getItem('theme');if(t==='dark'||(!t&&window.matchMedia('(prefers-color-scheme: dark)').matches)){document.documentElement.classList.add('dark')}}catch(e){}})();",
          }}
        />
      </head>
      <body className="bg-[var(--bg)] text-[var(--fg)]">
        <div className="mx-auto flex min-h-screen w-full max-w-[1080px] flex-col px-5 pb-[160px]">
          <Header />
          <div className="mt-[80px]">{children}</div>
        </div>
        <Scripts />
      </body>
    </html>
  )
}
