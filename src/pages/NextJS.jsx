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
    { path: '/', label: 'Home', file: 'app/page.jsx', content: 'This is the home page. You created it by making a file called page.jsx inside the app/ folder. That\'s it — Next.js automatically makes it available at the / URL.' },
    { path: '/about', label: 'About', file: 'app/about/page.jsx', content: 'The About page. You made a folder called "about" inside app/, then put a page.jsx file in it. Next.js saw that file and created the /about URL for you — no configuration needed.' },
    { path: '/blog', label: 'Blog List', file: 'app/blog/page.jsx', content: 'The blog list page. Same pattern — a folder named "blog" with a page.jsx inside. URL: /blog' },
    { path: '/blog/my-first-post', label: 'Blog Post', file: 'app/blog/[slug]/page.jsx', content: 'A dynamic page! The folder name [slug] with square brackets tells Next.js: "this part of the URL can be anything." So /blog/my-first-post, /blog/react-tips, /blog/anything all use this same file.' },
  ]
  const current = routes.find(r => r.path === activePage)
  return (
    <div className="space-y-3">
      <p className="text-xs text-slate-500">Click each page to see which file created it:</p>
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
      <div className="bg-slate-800 rounded-lg p-4 space-y-2">
        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-500">URL in browser:</span>
          <span className="text-sm font-mono text-indigo-300">localhost:3000{activePage}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-500">File you created:</span>
          <span className="text-sm font-mono text-emerald-300">{current?.file}</span>
        </div>
        <p className="text-xs text-slate-300 leading-relaxed pt-1 border-t border-slate-700">{current?.content}</p>
      </div>
    </div>
  )
}

// Demo: Server vs Client component
function ServerClientDemo() {
  const [clicked, setClicked] = useState(false)
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="bg-slate-800 border border-blue-500/30 rounded-xl p-4">
        <div className="flex items-center gap-2 mb-3">
          <span className="text-lg">🖥️</span>
          <span className="text-xs bg-blue-500/20 text-blue-300 px-2 py-0.5 rounded-full font-semibold">Server Component</span>
        </div>
        <p className="text-xs text-slate-400 mb-3 leading-relaxed">
          This component runs on <strong className="text-white">the computer that hosts your website</strong> — not in the visitor's browser. It builds the HTML and sends it ready-made. The visitor gets a fully built page immediately.
        </p>
        <div className="bg-slate-900 rounded-lg p-3 mb-2 text-xs font-mono space-y-0.5">
          <p className="text-emerald-400">// No "use client" = runs on server</p>
          <p className="text-slate-300">async function UserList() {'{'}</p>
          <p className="text-indigo-300 ml-4">const users = await getUsers()</p>
          <p className="text-slate-300 ml-4">return &lt;ul&gt;...&lt;/ul&gt;</p>
          <p className="text-slate-300">{'}'}</p>
        </div>
        <p className="text-xs text-blue-300">Good for: showing information, loading data</p>
        <p className="text-xs text-slate-500 mt-1">Cannot use useState, onClick, or anything interactive</p>
      </div>
      <div className="bg-slate-800 border border-violet-500/30 rounded-xl p-4">
        <div className="flex items-center gap-2 mb-3">
          <span className="text-lg">💻</span>
          <span className="text-xs bg-violet-500/20 text-violet-300 px-2 py-0.5 rounded-full font-semibold">Client Component</span>
        </div>
        <p className="text-xs text-slate-400 mb-3 leading-relaxed">
          This component runs in the <strong className="text-white">visitor's browser</strong> — just like regular React. It can respond to clicks, keep track of values with useState, and update itself. You must add <code className="text-violet-300">"use client"</code> at the very top.
        </p>
        <div className="bg-slate-900 rounded-lg p-3 mb-2 text-xs font-mono space-y-0.5">
          <p className="text-violet-300">"use client"  ← this line is the switch</p>
          <p className="text-slate-300 mt-1">function Counter() {'{'}</p>
          <p className="text-indigo-300 ml-4">const [n, setN] = useState(0)</p>
          <p className="text-slate-300 ml-4">return &lt;button onClick={'{...}'}&gt;{'{n}'}&lt;/button&gt;</p>
          <p className="text-slate-300">{'}'}</p>
        </div>
        <button
          onClick={() => setClicked(c => !c)}
          className={`w-full py-1.5 text-xs rounded-lg font-semibold transition-colors ${clicked ? 'bg-violet-600 text-white' : 'bg-slate-700 hover:bg-slate-600 text-slate-300'}`}
        >
          {clicked ? '✓ Clicked! Only a Client Component can do this' : 'Try clicking me →'}
        </button>
      </div>
    </div>
  )
}

// Demo: Data fetching strategies
function DataFetchingDemo() {
  const [mode, setMode] = useState('static')
  const modes = {
    static: {
      label: 'Static (built once)',
      color: 'bg-emerald-600',
      emoji: '📦',
      plain: 'Next.js fetches the data ONCE when you deploy your site and bakes it into the HTML files. Like printing a book — the content is fixed until you print a new edition.',
      when: 'When your data rarely changes (blog posts, docs, a product catalogue)',
      speed: 'Fastest possible — the page is already built, just served instantly',
      code: `// getStaticProps runs ONCE when you deploy
// The result is saved forever (until next deploy)
export async function getStaticProps() {
  const posts = await fetchBlogPosts()  // Called once at build time
  return { props: { posts } }
}

export default function Blog({ posts }) {
  // 'posts' was already fetched — no loading state needed
  return posts.map(p => <article key={p.id}>{p.title}</article>)
}`,
    },
    server: {
      label: 'Server (fresh every time)',
      color: 'bg-blue-600',
      emoji: '🔄',
      plain: 'Every time someone visits the page, Next.js fetches fresh data on the server and builds the HTML right then. Like a chef cooking your meal to order — always fresh, takes a little longer.',
      when: 'When your data changes often and must always be up to date (user profiles, dashboards, real-time prices)',
      speed: 'Slightly slower — data is fetched on every visit',
      code: `// getServerSideProps runs on EVERY page visit
// Always returns the latest data
export async function getServerSideProps({ req }) {
  // req.cookies.token = the logged-in user's identity
  const user = await getUserFromToken(req.cookies.token)
  const dashboard = await fetchDashboard(user.id)
  return { props: { dashboard } }
}

export default function Dashboard({ dashboard }) {
  return <div>Welcome back! Your score: {dashboard.score}</div>
}`,
    },
    isr: {
      label: 'Incremental (refresh on schedule)',
      color: 'bg-amber-600',
      emoji: '⏱️',
      plain: 'Like Static, but you set a timer. "Rebuild this page every 60 seconds." Visitors always get a fast pre-built page, and the content stays reasonably fresh. Best of both worlds.',
      when: 'When data changes occasionally (news articles, product prices, sports scores)',
      speed: 'Fast like static, but automatically refreshes in the background',
      code: `// Built statically like getStaticProps, BUT...
export async function getStaticProps() {
  const products = await fetchProducts()
  return {
    props: { products },
    revalidate: 60  // "Rebuild this page every 60 seconds"
  }
}

// Next.js serves the old version instantly while rebuilding
// Once rebuilt, all new visitors get the fresh version`,
    },
    client: {
      label: 'Client-side (browser fetches)',
      color: 'bg-violet-600',
      emoji: '🌐',
      plain: 'The page loads first (possibly with a skeleton/spinner), then the visitor\'s browser fetches the data. This is exactly how plain React (without Next.js) works.',
      when: 'When data is unique per user and changes constantly (live chat, notifications, real-time feeds)',
      speed: 'Slower first load — page shows, then data appears',
      code: `// This is plain React-style data fetching
// It runs in the visitor's browser AFTER the page loads
"use client"

export default function Feed() {
  const [posts, setPosts] = useState(null)

  useEffect(() => {
    // Browser fetches data after the page appears
    fetch('/api/posts').then(r => r.json()).then(setPosts)
  }, [])

  if (!posts) return <p>Loading...</p>  // Show while waiting
  return posts.map(p => <div key={p.id}>{p.title}</div>)
}`,
    },
  }
  const current = modes[mode]
  return (
    <div className="space-y-3">
      <p className="text-xs text-slate-500">Each strategy answers the question: "When does the data get fetched?"</p>
      <div className="flex flex-wrap gap-2">
        {Object.entries(modes).map(([key, m]) => (
          <button
            key={key}
            onClick={() => setMode(key)}
            className={`px-3 py-1.5 text-xs rounded-lg font-semibold transition-colors ${mode === key ? m.color + ' text-white' : 'bg-slate-700 hover:bg-slate-600 text-slate-300'}`}
          >
            {m.emoji} {m.label}
          </button>
        ))}
      </div>
      <div className="bg-slate-800 rounded-xl p-4 space-y-3">
        <div className="bg-slate-900/60 rounded-lg p-3">
          <p className="text-xs text-slate-400 leading-relaxed"><strong className="text-white">In plain English:</strong> {current.plain}</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
          <div><span className="text-slate-500">Best for:</span><br /><span className="text-white">{current.when}</span></div>
          <div><span className="text-slate-500">Speed:</span><br /><span className="text-white">{current.speed}</span></div>
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
          Next.js is a <strong className="text-white">framework built on top of React</strong>. Think of React as the engine and Next.js as the full car — it comes with everything you need to build a real website, already set up and working together.
        </p>
      </div>

      <Callout type="beginner" title="Learn plain React first — then come here">
        Next.js adds several new ideas on top of React. If you're still getting comfortable with components and hooks, finish those sections first. Come back here when you're ready to build something more complete — a real website with multiple pages.
      </Callout>

      {/* Key terms */}
      <div className="bg-slate-900 border border-slate-700/50 rounded-xl p-5">
        <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">Words you'll see on this page — explained simply</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {[
            { term: 'Framework', def: 'A set of tools and rules that come pre-built. Instead of figuring out routing, SEO, and image loading yourself, Next.js does it for you.' },
            { term: 'SEO', def: 'Search Engine Optimization — how well Google can find and rank your site. Plain React apps are hard for Google to read because the page starts empty and JavaScript fills it in later.' },
            { term: 'Server', def: 'The computer that hosts your website. When someone visits your site, the server sends them the page. It\'s different from the visitor\'s computer (the "client").' },
            { term: 'Routing', def: 'How your app knows what to show when someone visits /about, /blog, or /contact. In plain React you install React Router. In Next.js it\'s built-in and automatic.' },
            { term: 'Pre-rendering', def: 'Building the HTML before anyone visits. Instead of sending a blank page and filling it with JavaScript, Next.js sends a complete page immediately — faster and Google-friendly.' },
            { term: 'API route', def: 'A URL in your own app that returns data instead of a page — like /api/users returning a list of users. Next.js lets you build these without a separate backend project.' },
          ].map(({ term, def }) => (
            <div key={term} className="flex gap-3">
              <span className="text-indigo-400 font-bold text-sm flex-shrink-0 w-28">{term}</span>
              <p className="text-xs text-slate-400 leading-relaxed">{def}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Plain English analogy */}
      <div className="bg-indigo-500/10 border border-indigo-500/30 rounded-xl p-5">
        <p className="text-xs font-bold text-indigo-300 uppercase tracking-wider mb-3">React vs Next.js — the clearest analogy</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="bg-slate-900/60 rounded-xl p-4">
            <div className="text-2xl mb-2">🧱</div>
            <p className="font-semibold text-white text-sm mb-1">React = a box of Lego bricks</p>
            <p className="text-xs text-slate-400 leading-relaxed">
              React gives you the pieces: components, state, hooks. But it doesn't tell you how to handle the address bar (routing), where to get data, or how to make Google index your site. You have to figure all of that out yourself.
            </p>
          </div>
          <div className="bg-slate-900/60 rounded-xl p-4">
            <div className="text-2xl mb-2">🏠</div>
            <p className="font-semibold text-white text-sm mb-1">Next.js = Lego bricks + instructions + pre-built walls</p>
            <p className="text-xs text-slate-400 leading-relaxed">
              Next.js includes all the React bricks AND comes with routing, data fetching, a built-in backend, automatic image optimization, and SEO support — all pre-configured and working from day one.
            </p>
          </div>
        </div>
        <div className="mt-4 p-3 bg-slate-900/40 rounded-lg">
          <p className="text-xs text-slate-400"><strong className="text-white">When to pick which:</strong> Building a public website people will Google? → Use Next.js. Building an internal tool or just learning? → Plain React (Vite) is simpler to start with.</p>
        </div>
      </div>

      {/* React vs Next.js comparison */}
      <section>
        <h2 className="text-xl font-bold text-white mb-3">What Does Next.js Add?</h2>
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
                ['Routing (URLs)', 'You install React Router yourself and write route config', 'Automatic — create a file, the URL exists. No config.'],
                ['Data fetching', 'useEffect + fetch — data loads after page appears', 'Multiple options: before, during, or after the page renders'],
                ['SEO (Google ranking)', 'Poor — Google sees a blank page until JavaScript runs', 'Excellent — full HTML is sent to Google immediately'],
                ['Backend/API', 'You need a completely separate project (Node/Express)', 'Built-in — add route.js files inside your app folder'],
                ['Images', 'Plain <img> tags — you handle optimization yourself', 'next/image — automatically resizes and compresses for you'],
                ['Speed', 'Good for apps behind a login (SEO doesn\'t matter)', 'Faster for public pages — content is pre-built'],
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
        <p className="text-slate-400 text-sm mb-3">
          One command sets up everything — just like Vite does for plain React:
        </p>
        <CodeBlock language="bash" code={`# This creates a brand new Next.js project
npx create-next-app@latest my-app

# It will ask you a few questions — use these answers to start:
# ✔ Would you like to use TypeScript? → No  (keep it simple for now)
# ✔ Would you like to use ESLint? → Yes  (helps catch mistakes)
# ✔ Would you like to use Tailwind CSS? → Yes  (great for styling)
# ✔ Would you like to use the App Router? → Yes  (the modern way)
# ✔ Would you like to customize the default import alias? → No

cd my-app
npm run dev
# Open http://localhost:3000 — your Next.js app is running!`} />
      </section>

      {/* File structure */}
      <section>
        <h2 className="text-xl font-bold text-white mb-2">How the Folders Are Organized</h2>
        <p className="text-slate-400 text-sm mb-3">
          The most important folder is <code className="text-indigo-300">app/</code> — everything inside it becomes a URL in your site:
        </p>
        <CodeBlock language="bash" code={`my-app/
├── app/                        ← your pages and backend live here
│   ├── layout.jsx              ← the navbar/footer that wraps EVERY page
│   ├── page.jsx                ← the home page  →  /
│   ├── about/
│   │   └── page.jsx            ← the about page  →  /about
│   ├── blog/
│   │   ├── page.jsx            ← blog list page  →  /blog
│   │   └── [slug]/
│   │       └── page.jsx        ← individual posts  →  /blog/any-post-title
│   └── api/
│       └── users/
│           └── route.js        ← backend endpoint  →  /api/users
│
├── public/                     ← images and files anyone can access
├── components/                 ← your reusable components (you create this folder)
└── package.json`} />
      </section>

      {/* File-based routing */}
      <section>
        <h2 className="text-xl font-bold text-white mb-3">File-Based Routing — No Configuration Needed</h2>
        <p className="text-slate-400 text-sm mb-3">
          This is one of the best features of Next.js. In plain React, you install React Router and write a list of routes in code. In Next.js, you just <strong className="text-white">create a folder with a file</strong> — the URL appears automatically.
        </p>
        <LiveDemo title="How files become URLs">
          <RoutingDemo />
        </LiveDemo>
        <CodeBlock code={`// Want a page at /contact? Make this file:
// app/contact/page.jsx

export default function ContactPage() {
  return <h1>Contact Us</h1>
}
// Done! Visit /contact and this page appears.

// Want a page for each blog post (/blog/anything)?
// Use square brackets in the folder name:
// app/blog/[slug]/page.jsx

export default function BlogPost({ params }) {
  // params.slug is whatever appears in the URL after /blog/
  // Visit /blog/hello-world → params.slug = "hello-world"
  // Visit /blog/my-recipe  → params.slug = "my-recipe"
  return <h1>You are reading: {params.slug}</h1>
}`} />
      </section>

      {/* Layout */}
      <section>
        <h2 className="text-xl font-bold text-white mb-3">layout.jsx — The Shared Wrapper</h2>
        <p className="text-slate-400 text-sm mb-3">
          Imagine every page of your site needs a navbar at the top and a footer at the bottom. Instead of adding those to every single page file, you put them in <code className="text-indigo-300">layout.jsx</code> once. Every page is automatically wrapped in it.
        </p>
        <CodeBlock filename="app/layout.jsx" code={`// This file wraps EVERY page in your entire app.
// Put your navbar and footer here.

export default function RootLayout({ children }) {
  // 'children' is whatever page the visitor is currently on
  return (
    <html lang="en">
      <body>

        {/* Navbar — appears on every single page */}
        <nav>
          <a href="/">Home</a>
          <a href="/about">About</a>
          <a href="/blog">Blog</a>
        </nav>

        {/* This is where the current page's content appears */}
        <main>
          {children}
        </main>

        {/* Footer — also appears on every page */}
        <footer>© 2024 My Website</footer>

      </body>
    </html>
  )
}

// When someone visits /about:
// → layout.jsx renders with <AboutPage /> as {children}
// → They see: navbar + about page content + footer`} />
      </section>

      {/* Metadata / SEO */}
      <section>
        <h2 className="text-xl font-bold text-white mb-3">Metadata — What Google & Social Media See</h2>
        <p className="text-slate-400 text-sm mb-3">
          When Google crawls your site, or when someone shares a link on Twitter, they read your page's "metadata" — the title, description, and preview image. Next.js makes this easy to set from any page file:
        </p>
        <CodeBlock filename="app/about/page.jsx" code={`// Export 'metadata' from any page to set its title and description.
// This is what shows up in Google search results and link previews.

export const metadata = {
  title: 'About Us | My Company',
  description: 'Learn about our team and what we do.',

  // openGraph controls how the page looks when shared on social media
  openGraph: {
    title: 'About Us',
    description: 'Learn about our team.',
    images: ['/preview-image.jpg'],  // The preview image
  },
}

export default function AboutPage() {
  return <h1>About Us</h1>
}

// For pages where the title comes from your data (like blog posts):
export async function generateMetadata({ params }) {
  const post = await getPost(params.slug)   // Fetch the blog post
  return {
    title: post.title + ' | My Blog',       // e.g. "How to Cook Pasta | My Blog"
    description: post.summary,
  }
}`} />
      </section>

      {/* Server vs Client */}
      <section>
        <h2 className="text-xl font-bold text-white mb-3">Server Components vs Client Components</h2>
        <p className="text-slate-400 text-sm mb-2">
          This is the biggest new idea in Next.js. Every component is either a <strong className="text-white">Server Component</strong> or a <strong className="text-white">Client Component</strong>. The difference is <em>where</em> it runs.
        </p>
        <div className="bg-indigo-500/10 border border-indigo-500/30 rounded-xl p-4 mb-4">
          <p className="text-xs text-indigo-300 font-semibold mb-2">Simple way to think about it:</p>
          <p className="text-sm text-slate-300 leading-relaxed">
            When you visit a website, there are two computers involved: the <strong className="text-white">server</strong> (the computer that owns the website) and <strong className="text-white">your computer</strong> (the browser). A Server Component runs on their computer. A Client Component runs on your computer. By default, everything in Next.js is a Server Component — you opt into Client with the <code className="text-violet-300">"use client"</code> directive.
          </p>
        </div>
        <LiveDemo title="Server vs Client Components">
          <ServerClientDemo />
        </LiveDemo>
        <CodeBlock code={`// ─── SERVER COMPONENT ───────────────────────────────────────────
// No directive needed — Server is the default.
// Runs on the hosting computer, NOT in the visitor's browser.

async function ProductList() {
  // Can fetch data directly — no useEffect needed!
  // This database call never reaches the visitor's browser.
  const products = await database.getAll('products')

  return (
    <ul>
      {products.map(p => <li key={p.id}>{p.name} — \${p.price}</li>)}
    </ul>
  )
}
// ✅ Can: fetch data, query databases, read secret API keys
// ❌ Cannot: useState, useEffect, onClick, window, document


// ─── CLIENT COMPONENT ────────────────────────────────────────────
// Add "use client" as the VERY FIRST LINE of the file.
// Runs in the visitor's browser — just like regular React.

"use client"

import { useState } from 'react'

function AddToCartButton({ productId }) {
  const [added, setAdded] = useState(false)

  function handleClick() {
    // Send a request to your own backend API
    fetch('/api/cart', { method: 'POST', body: JSON.stringify({ productId }) })
    setAdded(true)
  }

  return (
    <button onClick={handleClick}>
      {added ? '✓ Added to Cart' : 'Add to Cart'}
    </button>
  )
}
// ✅ Can: useState, useEffect, onClick, window, document
// ❌ Cannot: access databases directly, use secret keys`} />
        <Callout type="tip" title="Practical rule: only use Client when you need interactivity">
          Start with Server Components for everything. Only add "use client" when the component needs to respond to clicks, use state, or access browser features. Server Components are faster because less code is sent to the visitor's browser.
        </Callout>
      </section>

      {/* Data fetching */}
      <section>
        <h2 className="text-xl font-bold text-white mb-3">When Does Your Data Get Fetched?</h2>
        <p className="text-slate-400 text-sm mb-3">
          "Data fetching" just means: when does your page actually go and get its content? Next.js gives you four different answers to that question. Each is best for different situations:
        </p>
        <LiveDemo title="Data fetching strategies — when does data load?">
          <DataFetchingDemo />
        </LiveDemo>
        <Callout type="info" title="Which one should you use?">
          Start with <strong>Static</strong> — it's the simplest and fastest. Only reach for Server-Side when your data changes every second or is unique per visitor. ISR is a great middle ground for content that changes a few times a day.
        </Callout>
      </section>

      {/* API Routes */}
      <section>
        <h2 className="text-xl font-bold text-white mb-3">API Routes — Your Built-In Backend</h2>
        <p className="text-slate-400 text-sm mb-3">
          In plain React, if you want a backend (somewhere to store data, run server code, or keep secret passwords safe), you'd need a completely separate project — like an Express server. In Next.js, you can build your backend <em>right inside</em> the same project by creating files inside <code className="text-indigo-300">app/api/</code>.
        </p>
        <div className="bg-amber-500/10 border border-amber-500/30 rounded-xl p-4 mb-4">
          <p className="text-xs font-bold text-amber-300 uppercase tracking-wider mb-2">What is an API route?</p>
          <p className="text-xs text-slate-300 leading-relaxed">
            An API route is a URL that <em>returns data</em> instead of a page. For example, visiting <code className="text-amber-300">/api/users</code> wouldn't show a web page — it would return a list of users as JSON data (plain text data that JavaScript can read). Your React components use <code className="text-amber-300">fetch()</code> to call these URLs and get the data back.
          </p>
        </div>
        <CodeBlock filename="app/api/users/route.js" code={`import { NextResponse } from 'next/server'

// This file creates the URL: /api/users
// When someone calls that URL with GET, this runs:
export async function GET(request) {
  const users = await database.getUsers()
  return NextResponse.json(users)  // Send data back as JSON
}

// When someone calls /api/users with POST (to create a user):
export async function POST(request) {
  const body = await request.json()  // Read what was sent

  // Validate the data before saving it
  if (!body.name || !body.email) {
    return NextResponse.json(
      { error: 'Name and email are required' },
      { status: 400 }  // 400 means "bad request"
    )
  }

  const newUser = await database.createUser(body)
  return NextResponse.json(newUser, { status: 201 })  // 201 means "created"
}`} />
        <CodeBlock filename="Calling your API from a component" code={`// In your React component, use fetch() to call your own API:
"use client"

function CreateUserForm() {
  async function handleSubmit(name, email) {
    // Sends a request to your own /api/users endpoint
    const response = await fetch('/api/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email }),
    })
    const newUser = await response.json()
    console.log('Created:', newUser)
  }
}`} />
      </section>

      {/* Link and Image */}
      <section>
        <h2 className="text-xl font-bold text-white mb-3">next/link and next/image — Always Use These</h2>
        <p className="text-slate-400 text-sm mb-3">
          Next.js has special versions of the HTML <code className="text-slate-300">&lt;a&gt;</code> link and <code className="text-slate-300">&lt;img&gt;</code> image tag. Always use these instead — they're much faster and smarter:
        </p>
        <CodeBlock code={`import Link from 'next/link'
import Image from 'next/image'

export default function Navbar() {
  return (
    <nav>
      {/* Use <Link> instead of <a> for links between your pages */}
      <Link href="/">Home</Link>
      <Link href="/about">About</Link>
      <Link href="/contact">Contact</Link>
      {/*
        Why? Plain <a href="/about"> reloads the ENTIRE page from scratch.
        <Link> only swaps out the part that changed — instant navigation,
        no white flash, and Next.js pre-loads the page before you even click.
      */}

      {/* Use <Image> instead of <img> for all your images */}
      <Image
        src="/logo.png"
        alt="Company logo"
        width={120}
        height={40}
      />
      {/*
        Why? Plain <img> loads the full-size image regardless of screen size.
        <Image> automatically: resizes for mobile, converts to a faster format,
        and only loads the image when it's about to scroll into view.
        This makes your site faster without any extra work.
      */}
    </nav>
  )
}`} />
      </section>

      {/* Loading and Error */}
      <section>
        <h2 className="text-xl font-bold text-white mb-3">Automatic Loading & Error Pages</h2>
        <p className="text-slate-400 text-sm mb-3">
          In plain React, you handle loading and errors manually in every component. Next.js has a smarter way — create special files next to your page and Next.js shows them automatically:
        </p>
        <CodeBlock code={`// app/blog/loading.jsx
// → Shown automatically while the blog page is loading its data.
// → You don't need to write any if (loading) return ... checks.

export default function Loading() {
  return (
    <div>
      {/* A "skeleton" is grey boxes that look like content loading */}
      <div style={{ background: '#374151', height: 32, borderRadius: 8 }} />
      <div style={{ background: '#374151', height: 16, borderRadius: 8, marginTop: 12 }} />
    </div>
  )
}


// app/blog/error.jsx
// → Shown automatically if the blog page crashes or throws an error.
// → Must have "use client" because it has an interactive "Try Again" button.
"use client"

export default function Error({ error, reset }) {
  return (
    <div>
      <h2>Something went wrong!</h2>
      <p>The error was: {error.message}</p>
      <button onClick={reset}>Try again</button>
      {/* reset() re-runs the page — often fixes temporary issues */}
    </div>
  )
}


// app/not-found.jsx
// → Shown whenever someone visits a URL that doesn't exist (404).
export default function NotFound() {
  return (
    <div>
      <h1>Page Not Found</h1>
      <p>The page you're looking for doesn't exist.</p>
      <a href="/">Go back home</a>
    </div>
  )
}`} />
      </section>

      {/* Middleware */}
      <section>
        <h2 className="text-xl font-bold text-white mb-3">Middleware — A Doorman for Your Pages</h2>
        <p className="text-slate-400 text-sm mb-3">
          Middleware runs before a visitor reaches a page. Think of it like a doorman at a building — it checks if you're allowed in before letting you through. The most common use is protecting pages that require a login.
        </p>
        <CodeBlock filename="middleware.js  (at the root of your project)" code={`import { NextResponse } from 'next/server'

// This function runs before EVERY page request.
// 'request' contains info about what URL the visitor is trying to reach.
export function middleware(request) {

  // Get the login token from the visitor's cookies
  // (a "cookie" is a small piece of data the browser saves for your site)
  const isLoggedIn = request.cookies.get('auth-token')

  // If they're trying to visit /dashboard (or anything under /dashboard)
  // AND they're not logged in → redirect them to the login page
  if (request.nextUrl.pathname.startsWith('/dashboard')) {
    if (!isLoggedIn) {
      return NextResponse.redirect(new URL('/login', request.url))
    }
  }

  // If all checks pass, let the visitor through to the page
  return NextResponse.next()
}

// Tell Next.js which URLs this middleware applies to.
// :path* means "this URL and everything under it"
export const config = {
  matcher: ['/dashboard/:path*'],
}`} />
        <Callout type="advanced" title="You won't need this right away">
          Middleware is an intermediate/advanced feature. Come back to it when you're building something that needs protected pages — for example, a dashboard that only logged-in users can see.
        </Callout>
      </section>

      {/* When to use */}
      <section>
        <h2 className="text-xl font-bold text-white mb-3">When Should You Use Next.js?</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-xl p-4">
            <p className="text-xs font-bold text-emerald-300 uppercase tracking-wider mb-3">Use Next.js when you're building...</p>
            <ul className="space-y-2 text-xs text-slate-300">
              {[
                'A website you want Google to find (blog, portfolio, shop)',
                'A site where the first page load needs to be fast',
                'Something that needs a simple backend (storing data, sending emails)',
                'A full product — landing page + app + backend, all in one project',
                'An e-commerce store, news site, or content platform',
              ].map(item => (
                <li key={item} className="flex gap-2"><span className="text-emerald-400 flex-shrink-0">✓</span>{item}</li>
              ))}
            </ul>
          </div>
          <div className="bg-sky-500/10 border border-sky-500/30 rounded-xl p-4">
            <p className="text-xs font-bold text-sky-300 uppercase tracking-wider mb-3">Stick with plain React when you're building...</p>
            <ul className="space-y-2 text-xs text-slate-300">
              {[
                'Something just for yourself — a tool, a side project, a practice app',
                'A dashboard that only shows after people log in (Google can\'t see it anyway)',
                'A project where you already have a separate backend',
                'Your first React project — keep it simple while you\'re learning',
                'A game, an animation, or something highly interactive',
              ].map(item => (
                <li key={item} className="flex gap-2"><span className="text-sky-400 flex-shrink-0">✓</span>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <PageNav currentPath="/nextjs" />
    </div>
  )
}
