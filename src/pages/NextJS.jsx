import { useState } from 'react'
import CodeBlock from '../components/CodeBlock'
import Callout from '../components/Callout'
import PageNav from '../components/PageNav'

function LiveDemo({ title, children }) {
  return (
    <div className="bg-slate-900 border border-slate-700/50 rounded-xl overflow-hidden my-4">
      <div className="flex items-center gap-2 px-4 py-2 bg-slate-800 border-b border-slate-700/50">
        <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
        <span className="text-xs font-semibold text-slate-400">Live Demo — {title}</span>
      </div>
      <div className="p-5">{children}</div>
    </div>
  )
}

// Demo: simulate file-based routing
function RoutingDemo() {
  const [activePage, setActivePage] = useState('/')
  const routes = [
    { path: '/', label: 'Home', content: 'Welcome to the homepage! This is pages/index.jsx (or app/page.jsx in the App Router).' },
    { path: '/about', label: 'About', content: 'The About page. File: pages/about.jsx → URL: /about. It\'s that simple!' },
    { path: '/blog', label: 'Blog', content: 'Blog index page. File: pages/blog/index.jsx → URL: /blog' },
    { path: '/blog/my-post', label: 'Blog Post', content: 'A dynamic page! File: pages/blog/[slug].jsx → handles /blog/any-post-name via params.slug' },
    { path: '/dashboard', label: 'Dashboard', content: 'Protected page example. File: pages/dashboard.jsx → could redirect if not logged in.' },
  ]
  const current = routes.find(r => r.path === activePage)
  return (
    <div className="space-y-3">
      <p className="text-xs text-slate-500">Click a route to simulate navigating — notice the URL changes and content updates:</p>
      <div className="flex flex-wrap gap-2">
        {routes.map(r => (
          <button
            key={r.path}
            onClick={() => setActivePage(r.path)}
            className={`px-3 py-1.5 text-xs rounded-lg font-semibold transition-colors ${activePage === r.path ? 'bg-indigo-600 text-white' : 'bg-slate-700 hover:bg-slate-600 text-slate-300'}`}
          >
            {r.label}
          </button>
        ))}
      </div>
      <div className="bg-slate-800 rounded-lg p-4">
        <p className="text-xs text-slate-500 mb-1">Current URL:</p>
        <p className="text-sm font-mono text-indigo-300 mb-3">{activePage}</p>
        <p className="text-xs text-slate-500 mb-1">Page content:</p>
        <p className="text-sm text-white">{current?.content}</p>
      </div>
    </div>
  )
}

// Demo: Server vs Client component
function ServerClientDemo() {
  const [clicked, setClicked] = useState(false)
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="bg-slate-800 border border-slate-600/50 rounded-xl p-4">
        <div className="flex items-center gap-2 mb-3">
          <span className="text-xs bg-blue-500/20 text-blue-300 px-2 py-0.5 rounded-full font-semibold">Server Component</span>
        </div>
        <p className="text-xs text-slate-400 mb-3">Renders on the server. No interactivity. Loads faster, good for SEO. Fetches data directly — no useEffect needed.</p>
        <div className="bg-slate-900 rounded-lg p-3">
          <p className="text-xs text-emerald-400 font-mono">// No useState, no useEffect</p>
          <p className="text-xs text-slate-300 font-mono mt-1">async function UserList() {'{'}</p>
          <p className="text-xs text-indigo-300 font-mono ml-4">const users = await getUsers()</p>
          <p className="text-xs text-slate-300 font-mono ml-4">return &lt;ul&gt;...&lt;/ul&gt;</p>
          <p className="text-xs text-slate-300 font-mono">{'}'}</p>
        </div>
        <p className="text-xs text-slate-500 mt-2">No "use client" at top → defaults to server</p>
      </div>
      <div className="bg-slate-800 border border-violet-500/30 rounded-xl p-4">
        <div className="flex items-center gap-2 mb-3">
          <span className="text-xs bg-violet-500/20 text-violet-300 px-2 py-0.5 rounded-full font-semibold">Client Component</span>
        </div>
        <p className="text-xs text-slate-400 mb-3">Runs in the browser. Can use useState, useEffect, onClick — anything interactive.</p>
        <div className="bg-slate-900 rounded-lg p-3 mb-2">
          <p className="text-xs text-violet-300 font-mono">"use client"</p>
          <p className="text-xs text-slate-300 font-mono mt-1">function Counter() {'{'}</p>
          <p className="text-xs text-indigo-300 font-mono ml-4">const [n, setN] = useState(0)</p>
          <p className="text-xs text-slate-300 font-mono ml-4">return &lt;button onClick={'{'}...{'}'}&gt;{'{'}n{'}'}&lt;/button&gt;</p>
          <p className="text-xs text-slate-300 font-mono">{'}'}</p>
        </div>
        <button
          onClick={() => setClicked(c => !c)}
          className={`w-full py-1.5 text-xs rounded-lg font-semibold transition-colors ${clicked ? 'bg-violet-600 text-white' : 'bg-slate-700 hover:bg-slate-600 text-slate-300'}`}
        >
          {clicked ? 'Clicked! (this is interactive = Client)' : 'Click me (Client Component)'}
        </button>
      </div>
    </div>
  )
}

// Demo: Data fetching strategies
function DataFetchingDemo() {
  const [mode, setMode] = useState('ssg')
  const modes = {
    ssg: {
      label: 'Static (SSG)',
      color: 'bg-emerald-600',
      when: 'Build time — once, ahead of deployment',
      good: 'Blog posts, marketing pages, docs',
      speed: '⚡⚡⚡ Fastest — pre-built HTML served from CDN',
      code: `// Runs at BUILD TIME — data baked into HTML
export async function getStaticProps() {
  const posts = await fetchAllBlogPosts()
  return { props: { posts } }
}

export default function Blog({ posts }) {
  return posts.map(p => <article>{p.title}</article>)
}`,
    },
    ssr: {
      label: 'Server-Side (SSR)',
      color: 'bg-blue-600',
      when: 'Every request — fresh data each time',
      good: 'Dashboards, user profiles, real-time data',
      speed: '⚡⚡ Fast — but data fetched per request',
      code: `// Runs on SERVER for every request
export async function getServerSideProps({ req }) {
  const user = await getUser(req.cookies.token)
  const data = await fetchUserDashboard(user.id)
  return { props: { data } }
}

export default function Dashboard({ data }) {
  return <div>{data.stats}</div>
}`,
    },
    isr: {
      label: 'Incremental (ISR)',
      color: 'bg-amber-600',
      when: 'Build time, then re-validates every N seconds',
      good: 'News, e-commerce, content that changes occasionally',
      speed: '⚡⚡⚡ Fast like SSG + stays fresh over time',
      code: `// Built statically, but refreshes every 60 seconds
export async function getStaticProps() {
  const products = await fetchProducts()
  return {
    props: { products },
    revalidate: 60  // Re-build this page every 60s
  }
}`,
    },
    client: {
      label: 'Client-Side',
      color: 'bg-violet-600',
      when: 'After the page loads, in the browser',
      good: 'User-specific data, data that changes constantly',
      speed: '⚡ Slower initial load — data fetched after render',
      code: `// Runs in the BROWSER after page loads
"use client"

export default function Profile() {
  const [user, setUser] = useState(null)

  useEffect(() => {
    fetch('/api/me').then(r => r.json()).then(setUser)
  }, [])

  if (!user) return <Spinner />
  return <div>{user.name}</div>
}`,
    },
  }
  const current = modes[mode]
  return (
    <div className="space-y-3">
      <div className="flex flex-wrap gap-2">
        {Object.entries(modes).map(([key, m]) => (
          <button
            key={key}
            onClick={() => setMode(key)}
            className={`px-3 py-1.5 text-xs rounded-lg font-semibold transition-colors ${mode === key ? m.color + ' text-white' : 'bg-slate-700 hover:bg-slate-600 text-slate-300'}`}
          >
            {m.label}
          </button>
        ))}
      </div>
      <div className="bg-slate-800 rounded-xl p-4 space-y-2">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs mb-3">
          <div><span className="text-slate-500">When it runs:</span><br /><span className="text-white font-semibold">{current.when}</span></div>
          <div><span className="text-slate-500">Best for:</span><br /><span className="text-white font-semibold">{current.good}</span></div>
          <div><span className="text-slate-500">Speed:</span><br /><span className="text-white font-semibold">{current.speed}</span></div>
        </div>
        <CodeBlock code={current.code} />
      </div>
    </div>
  )
}

export default function NextJS() {
  return (
    <div className="space-y-10">
      <div>
        <p className="text-xs font-semibold text-indigo-400 uppercase tracking-wider mb-2">Full Stack</p>
        <h1 className="text-3xl font-bold text-white mb-3">Next.js</h1>
        <p className="text-slate-400 leading-relaxed">
          Next.js is a <strong className="text-white">React framework</strong> that adds the things React doesn't include — routing, server-side rendering, API routes, image optimization, and more. It's what most professional React teams use.
        </p>
      </div>

      {/* Plain English */}
      <div className="bg-indigo-500/10 border border-indigo-500/30 rounded-xl p-5">
        <p className="text-xs font-bold text-indigo-300 uppercase tracking-wider mb-3">Think of it like this</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="bg-slate-900/60 rounded-xl p-4">
            <div className="text-2xl mb-2">🧱</div>
            <p className="font-semibold text-white text-sm mb-1">React = the building blocks</p>
            <p className="text-xs text-slate-400 leading-relaxed">
              React gives you components, hooks, and JSX. But it doesn't tell you how to handle URLs, where to fetch data, or how to run server code. You have to wire those up yourself.
            </p>
          </div>
          <div className="bg-slate-900/60 rounded-xl p-4">
            <div className="text-2xl mb-2">🏠</div>
            <p className="font-semibold text-white text-sm mb-1">Next.js = the complete house</p>
            <p className="text-xs text-slate-400 leading-relaxed">
              Next.js takes React and adds routing, data fetching, a built-in backend, SEO tools, image optimization — everything a real production app needs, pre-configured and ready to go.
            </p>
          </div>
        </div>
        <div className="mt-4 p-3 bg-slate-900/40 rounded-lg">
          <p className="text-xs text-slate-400"><strong className="text-white">Bottom line:</strong> If you're building a real website or app that needs SEO, performance, or a backend — use Next.js. If you're just building a dashboard or internal tool — plain React (Vite) is fine.</p>
        </div>
      </div>

      {/* React vs Next.js */}
      <section>
        <h2 className="text-xl font-bold text-white mb-3">React vs Next.js — What's Different?</h2>
        <div className="overflow-hidden rounded-xl border border-slate-700/50">
          <table className="w-full text-sm">
            <thead className="bg-slate-800">
              <tr>
                <th className="text-left px-4 py-3 text-slate-300 font-semibold"></th>
                <th className="text-left px-4 py-3 text-sky-300 font-semibold">Plain React (Vite)</th>
                <th className="text-left px-4 py-3 text-indigo-300 font-semibold">Next.js</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {[
                ['Routing', 'You install React Router yourself', 'Built-in — based on your file structure'],
                ['Data fetching', 'useEffect + fetch in the browser', 'Server-side, static, or client — your choice'],
                ['SEO', 'Poor (blank HTML until JS loads)', 'Excellent (HTML pre-rendered on server)'],
                ['Backend / API', 'Separate backend project needed', 'Built-in API routes in the same project'],
                ['Images', 'Plain <img> tag', 'next/image — auto resizes, lazy loads, optimizes'],
                ['Deployment', 'Static files — any CDN', 'Best on Vercel, but works anywhere'],
              ].map(([aspect, react, next]) => (
                <tr key={aspect} className="bg-slate-900/50">
                  <td className="px-4 py-2.5 text-slate-400 font-medium text-xs">{aspect}</td>
                  <td className="px-4 py-2.5 text-slate-300 text-xs">{react}</td>
                  <td className="px-4 py-2.5 text-slate-300 text-xs">{next}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Getting started */}
      <section>
        <h2 className="text-xl font-bold text-white mb-2">Creating a Next.js App</h2>
        <CodeBlock language="bash" code={`# Create a new Next.js project
npx create-next-app@latest my-app

# Answer the prompts:
# ✔ Would you like to use TypeScript? → No (for now)
# ✔ Would you like to use ESLint? → Yes
# ✔ Would you like to use Tailwind CSS? → Yes
# ✔ Would you like to use the App Router? → Yes (recommended)
# ✔ Would you like to customize the default import alias? → No

cd my-app
npm run dev
# → http://localhost:3000`} />
      </section>

      {/* File structure */}
      <section>
        <h2 className="text-xl font-bold text-white mb-2">Project Structure (App Router)</h2>
        <CodeBlock language="bash" code={`my-app/
├── app/                    # All your pages live here
│   ├── layout.jsx          # Root layout (wraps every page)
│   ├── page.jsx            # Home page → /
│   ├── about/
│   │   └── page.jsx        # About page → /about
│   ├── blog/
│   │   ├── page.jsx        # Blog list → /blog
│   │   └── [slug]/
│   │       └── page.jsx    # Blog post → /blog/any-slug
│   ├── api/
│   │   └── users/
│   │       └── route.js    # API endpoint → /api/users
│   └── globals.css
├── public/                 # Static files (images, fonts)
├── components/             # Reusable components
├── next.config.js          # Next.js configuration
└── package.json`} />
      </section>

      {/* File-based routing */}
      <section>
        <h2 className="text-xl font-bold text-white mb-3">File-Based Routing</h2>
        <p className="text-slate-400 text-sm mb-3">
          In Next.js, your <strong className="text-white">file structure = your URLs</strong>. No need to configure routes — just create a file and the route exists automatically.
        </p>
        <LiveDemo title="File-Based Routing">
          <RoutingDemo />
        </LiveDemo>
        <CodeBlock code={`// app/blog/[slug]/page.jsx
// Handles ANY URL like /blog/hello-world or /blog/react-tips

export default function BlogPost({ params }) {
  // params.slug = whatever is in the URL
  return <h1>Post: {params.slug}</h1>
}

// To get the slug from the URL:
// /blog/hello-world → params.slug = "hello-world"
// /blog/react-tips  → params.slug = "react-tips"`} />
        <Callout type="tip" title="Dynamic routes use square brackets">
          A file named <code>[slug].jsx</code> or a folder named <code>[id]</code> means "match anything here." The matched value becomes available in <code>params</code>.
        </Callout>
      </section>

      {/* Layout */}
      <section>
        <h2 className="text-xl font-bold text-white mb-3">Layouts — Shared UI Across Pages</h2>
        <p className="text-slate-400 text-sm mb-3">
          <code className="text-indigo-300">layout.jsx</code> wraps pages with shared UI like a navbar or footer. It stays mounted when you navigate between pages — only the page content swaps out.
        </p>
        <CodeBlock filename="app/layout.jsx" code={`// This wraps EVERY page in your app
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <nav>
          <a href="/">Home</a>
          <a href="/about">About</a>
          <a href="/blog">Blog</a>
        </nav>

        <main>
          {children}  {/* ← the current page renders here */}
        </main>

        <footer>
          <p>© 2024 My App</p>
        </footer>
      </body>
    </html>
  )
}

// You can also have nested layouts:
// app/dashboard/layout.jsx → wraps all /dashboard/* pages`} />
      </section>

      {/* Metadata / SEO */}
      <section>
        <h2 className="text-xl font-bold text-white mb-3">Metadata & SEO</h2>
        <p className="text-slate-400 text-sm mb-3">
          Add SEO metadata (title, description, Open Graph) by exporting a <code className="text-indigo-300">metadata</code> object from any page:
        </p>
        <CodeBlock filename="app/blog/page.jsx" code={`// Static metadata
export const metadata = {
  title: 'My Blog',
  description: 'Thoughts on React and web development',
  openGraph: {
    title: 'My Blog',
    description: 'Thoughts on React and web development',
    images: ['/og-image.jpg'],
  },
}

// Dynamic metadata (based on fetched data)
export async function generateMetadata({ params }) {
  const post = await getPost(params.slug)
  return {
    title: post.title,
    description: post.excerpt,
  }
}

export default function BlogPage() {
  return <div>...</div>
}`} />
      </section>

      {/* Server vs Client */}
      <section>
        <h2 className="text-xl font-bold text-white mb-3">Server vs Client Components</h2>
        <p className="text-slate-400 text-sm mb-3">
          This is the most important new concept in the App Router. By default, all components are <strong className="text-white">Server Components</strong> — they render on the server and send finished HTML to the browser. Add <code className="text-violet-300">"use client"</code> at the top to make a component interactive.
        </p>
        <LiveDemo title="Server vs Client Components">
          <ServerClientDemo />
        </LiveDemo>
        <CodeBlock code={`// SERVER COMPONENT (default — no directive needed)
// ✅ Can: fetch data, access databases, use env secrets
// ❌ Can't: useState, useEffect, onClick, browser APIs

async function ProductList() {
  const products = await db.query('SELECT * FROM products') // Direct DB!
  return (
    <ul>
      {products.map(p => <li key={p.id}>{p.name}</li>)}
    </ul>
  )
}

// CLIENT COMPONENT
// Add "use client" as the very first line
"use client"

import { useState } from 'react'

// ✅ Can: useState, useEffect, onClick, browser APIs
// ❌ Can't: fetch from DB directly, access server secrets

function AddToCart({ productId }) {
  const [added, setAdded] = useState(false)

  async function handleClick() {
    await fetch('/api/cart', { method: 'POST', body: JSON.stringify({ productId }) })
    setAdded(true)
  }

  return (
    <button onClick={handleClick}>
      {added ? 'Added!' : 'Add to Cart'}
    </button>
  )
}`} />
        <Callout type="tip" title="Best practice — keep most components Server, push Client down">
          Server Components are faster (less JavaScript sent to browser). Only switch to Client when you need interactivity. A common pattern: Server Component fetches data → passes it as props → Client Component handles clicks.
        </Callout>
      </section>

      {/* Data fetching */}
      <section>
        <h2 className="text-xl font-bold text-white mb-3">Data Fetching Strategies</h2>
        <p className="text-slate-400 text-sm mb-3">
          Next.js gives you multiple ways to fetch data. Each has different trade-offs between speed and freshness:
        </p>
        <LiveDemo title="Choose your data fetching strategy">
          <DataFetchingDemo />
        </LiveDemo>
      </section>

      {/* API Routes */}
      <section>
        <h2 className="text-xl font-bold text-white mb-3">API Routes — Your Built-In Backend</h2>
        <p className="text-slate-400 text-sm mb-3">
          Create files inside <code className="text-indigo-300">app/api/</code> named <code className="text-indigo-300">route.js</code> to build backend endpoints — no separate Express server needed.
        </p>
        <CodeBlock filename="app/api/users/route.js" code={`import { NextResponse } from 'next/server'

// GET /api/users
export async function GET(request) {
  const users = await db.getUsers()
  return NextResponse.json(users)
}

// POST /api/users
export async function POST(request) {
  const body = await request.json()

  if (!body.name || !body.email) {
    return NextResponse.json(
      { error: 'Name and email are required' },
      { status: 400 }
    )
  }

  const newUser = await db.createUser(body)
  return NextResponse.json(newUser, { status: 201 })
}

// You can also handle DELETE, PATCH, PUT the same way`} />
        <CodeBlock filename="Calling your API from a Client Component" code={`"use client"

async function createUser(data) {
  const res = await fetch('/api/users', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
  return res.json()
}`} />
      </section>

      {/* next/link and next/image */}
      <section>
        <h2 className="text-xl font-bold text-white mb-3">next/link and next/image</h2>
        <p className="text-slate-400 text-sm mb-3">Always use these instead of plain HTML <code className="text-slate-300">&lt;a&gt;</code> and <code className="text-slate-300">&lt;img&gt;</code> tags:</p>
        <CodeBlock code={`import Link from 'next/link'
import Image from 'next/image'

export default function Navbar() {
  return (
    <nav>
      {/* next/link — instant client-side navigation, prefetches in background */}
      <Link href="/">Home</Link>
      <Link href="/about">About</Link>
      <Link href="/blog/my-post">Blog</Link>

      {/* next/image — auto optimizes, resizes, lazy loads images */}
      <Image
        src="/avatar.jpg"
        alt="Profile photo"
        width={64}
        height={64}
        priority  // Load this image immediately (above the fold)
      />
    </nav>
  )
}

// Why not just use <a href="/about">?
// → Plain <a> reloads the ENTIRE page (full browser navigation)
// → <Link> only swaps the page component — instant, no flash`} />
      </section>

      {/* Loading and Error states */}
      <section>
        <h2 className="text-xl font-bold text-white mb-3">Loading & Error States (App Router)</h2>
        <p className="text-slate-400 text-sm mb-3">
          Create special files next to your pages to automatically handle loading and error states:
        </p>
        <CodeBlock code={`// app/blog/loading.jsx  — shown while page is loading
export default function Loading() {
  return (
    <div className="animate-pulse space-y-4">
      <div className="h-8 bg-slate-700 rounded w-3/4" />
      <div className="h-4 bg-slate-700 rounded w-full" />
      <div className="h-4 bg-slate-700 rounded w-2/3" />
    </div>
  )
}

// app/blog/error.jsx  — shown if the page throws an error
"use client"  // Error components must be Client Components

export default function Error({ error, reset }) {
  return (
    <div>
      <h2>Something went wrong!</h2>
      <p>{error.message}</p>
      <button onClick={reset}>Try again</button>
    </div>
  )
}

// app/not-found.jsx  — shown for 404s
export default function NotFound() {
  return <h1>404 — Page not found</h1>
}`} />
      </section>

      {/* Middleware */}
      <section>
        <h2 className="text-xl font-bold text-white mb-3">Middleware — Run Code Before Every Request</h2>
        <p className="text-slate-400 text-sm mb-3">
          <code className="text-indigo-300">middleware.js</code> at the project root runs before every page or API request. Perfect for authentication checks.
        </p>
        <CodeBlock filename="middleware.js" code={`import { NextResponse } from 'next/server'

export function middleware(request) {
  const token = request.cookies.get('auth-token')

  // Protect all /dashboard/* routes
  if (request.nextUrl.pathname.startsWith('/dashboard')) {
    if (!token) {
      // Redirect to login if not authenticated
      return NextResponse.redirect(new URL('/login', request.url))
    }
  }

  return NextResponse.next()  // Allow the request to continue
}

// Only run middleware on these paths:
export const config = {
  matcher: ['/dashboard/:path*', '/api/protected/:path*'],
}`} />
      </section>

      {/* When to use */}
      <section>
        <h2 className="text-xl font-bold text-white mb-3">When to Use Next.js vs Plain React</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-xl p-4">
            <p className="text-xs font-bold text-emerald-300 uppercase tracking-wider mb-3">Use Next.js when...</p>
            <ul className="space-y-2 text-xs text-slate-300">
              {[
                'You need SEO (blog, marketing site, e-commerce)',
                'You want server-side rendering or static generation',
                'You need a backend API in the same project',
                'You care about performance & Core Web Vitals',
                'You\'re building a full-stack production app',
              ].map(item => (
                <li key={item} className="flex gap-2"><span className="text-emerald-400 flex-shrink-0">✓</span>{item}</li>
              ))}
            </ul>
          </div>
          <div className="bg-sky-500/10 border border-sky-500/30 rounded-xl p-4">
            <p className="text-xs font-bold text-sky-300 uppercase tracking-wider mb-3">Stick with plain React when...</p>
            <ul className="space-y-2 text-xs text-slate-300">
              {[
                'Building an internal dashboard (SEO doesn\'t matter)',
                'Your app requires login to view anything',
                'You already have a separate backend API',
                'You\'re learning — Vite + React is simpler to start',
                'You\'re building a desktop-like SPA (single page app)',
              ].map(item => (
                <li key={item} className="flex gap-2"><span className="text-sky-400 flex-shrink-0">✓</span>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <Callout type="beginner" title="Start with plain React first">
        If you're still learning React, don't jump to Next.js yet. Master components, hooks, and data fetching in plain React first. Next.js adds many new concepts on top — you'll understand them much better once the React fundamentals are solid.
      </Callout>

      <PageNav currentPath="/nextjs" />
    </div>
  )
}
