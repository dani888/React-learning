import { useState, useEffect } from 'react'
import CodeBlock from '../components/CodeBlock'
import Callout from '../components/Callout'
import PageNav from '../components/PageNav'

function TimerDemo() {
  const [seconds, setSeconds] = useState(0)
  const [running, setRunning] = useState(false)

  useEffect(() => {
    if (!running) return
    const interval = setInterval(() => setSeconds(s => s + 1), 1000)
    return () => clearInterval(interval) // cleanup!
  }, [running])

  return (
    <div className="flex items-center gap-4">
      <span className="text-3xl font-mono font-bold text-white">{String(seconds).padStart(2, '0')}s</span>
      <button onClick={() => setRunning(r => !r)} className={`px-3 py-1.5 text-sm rounded-lg font-semibold transition-colors ${running ? 'bg-red-600 hover:bg-red-500 text-white' : 'bg-emerald-600 hover:bg-emerald-500 text-white'}`}>
        {running ? 'Stop' : 'Start'}
      </button>
      <button onClick={() => { setRunning(false); setSeconds(0) }} className="px-3 py-1.5 text-sm rounded-lg bg-slate-700 hover:bg-slate-600 text-white transition-colors">
        Reset
      </button>
    </div>
  )
}

function FetchDemo() {
  const [joke, setJoke] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  async function fetchJoke() {
    setLoading(true)
    setError(null)
    try {
      const res = await fetch('https://official-joke-api.appspot.com/random_joke')
      const data = await res.json()
      setJoke(data)
    } catch (e) {
      setError('Failed to fetch. Check your connection.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { fetchJoke() }, [])

  return (
    <div className="space-y-3">
      <div className="bg-slate-800 rounded-lg p-4 min-h-[80px] flex items-center">
        {loading && <p className="text-slate-400 text-sm animate-pulse">Fetching joke...</p>}
        {error && <p className="text-red-400 text-sm">{error}</p>}
        {joke && !loading && (
          <div>
            <p className="text-white text-sm font-medium mb-1">{joke.setup}</p>
            <p className="text-indigo-300 text-sm">{joke.punchline}</p>
          </div>
        )}
      </div>
      <button onClick={fetchJoke} className="px-3 py-1.5 text-sm rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-semibold transition-colors">
        Get New Joke
      </button>
    </div>
  )
}

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

export default function UseEffect() {
  return (
    <div className="space-y-10">
      <div>
        <p className="text-xs font-semibold text-violet-400 uppercase tracking-wider mb-2">React Hooks</p>
        <h1 className="text-3xl font-bold text-white mb-3">useEffect</h1>
        <p className="text-slate-400 leading-relaxed">
          <code className="text-violet-300 bg-violet-500/10 px-1.5 py-0.5 rounded">useEffect</code> lets you run code <strong className="text-white">after the component renders</strong> — things like fetching data from an API, starting a timer, or syncing with something outside React.
        </p>
      </div>

      {/* Plain English */}
      <div className="bg-violet-500/10 border border-violet-500/30 rounded-xl p-5">
        <p className="text-xs font-bold text-violet-300 uppercase tracking-wider mb-3">Think of it like this</p>
        <p className="text-sm text-slate-300 mb-3">
          Imagine you move into a new house (<strong className="text-white">component mounts</strong>). You'd want to do some things after you've settled in — connect the internet, set up your TV. That's <code className="text-violet-300">useEffect</code> with <code className="text-violet-300">[]</code> — it runs once after first render.
        </p>
        <p className="text-sm text-slate-300 mb-3">
          Later, when your address changes (<strong className="text-white">a value in the dependency array changes</strong>), you'd need to update your mail forwarding again. That's <code className="text-violet-300">useEffect</code> with a dependency — it re-runs whenever that value changes.
        </p>
        <p className="text-sm text-slate-300">
          When you move out (<strong className="text-white">component unmounts</strong>), you cancel subscriptions, stop services. That's the <strong className="text-white">cleanup function</strong> — the <code className="text-violet-300">return () =&gt; {'{}'}</code> inside useEffect.
        </p>
      </div>

      {/* When to use */}
      <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-5">
        <p className="text-sm font-bold text-white mb-3">When do you actually use useEffect?</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {[
            { icon: '🌐', label: 'Fetch data from an API', eg: 'Load users when the page opens' },
            { icon: '⏱', label: 'Start a timer or interval', eg: 'Update a clock every second' },
            { icon: '🎧', label: 'Subscribe to something', eg: 'Listen to window resize events' },
            { icon: '📄', label: 'Sync with the browser', eg: 'Update the page title, localStorage' },
          ].map(({ icon, label, eg }) => (
            <div key={label} className="flex gap-3">
              <span className="text-xl flex-shrink-0">{icon}</span>
              <div>
                <p className="text-sm font-semibold text-white">{label}</p>
                <p className="text-xs text-slate-400">{eg}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Syntax */}
      <section>
        <h2 className="text-xl font-bold text-white mb-3">The Syntax — Broken Down</h2>
        <CodeBlock code={`import { useEffect } from 'react'

useEffect(() => {
  // 1. Your code runs here after the component renders

  return () => {
    // 2. OPTIONAL cleanup — runs when the component is removed
    //    or just before this effect runs again
  }

}, [dependency1, dependency2])
// 3. ↑ The "watch list" — re-run whenever these values change`} />
      </section>

      {/* Dependency array */}
      <section>
        <h2 className="text-xl font-bold text-white mb-3">The Dependency Array — The Tricky Part</h2>
        <p className="text-slate-400 text-sm mb-4">This second argument controls <em>when</em> your effect runs. It's the thing that confuses beginners the most — so read carefully:</p>
        <div className="space-y-3">
          {[
            {
              label: 'No array at all',
              code: 'useEffect(() => { ... })',
              desc: 'Runs after EVERY render. Almost never what you want — will run constantly.',
              color: 'border-red-500/30 bg-red-500/5',
              badge: 'bg-red-500/20 text-red-300',
            },
            {
              label: 'Empty array []',
              code: 'useEffect(() => { ... }, [])',
              desc: 'Runs ONCE — right after the component first appears on screen. Perfect for fetching initial data.',
              color: 'border-emerald-500/30 bg-emerald-500/5',
              badge: 'bg-emerald-500/20 text-emerald-300',
            },
            {
              label: 'Array with values',
              code: 'useEffect(() => { ... }, [userId, filter])',
              desc: 'Runs once on mount, then again whenever userId or filter changes. Use this when your effect depends on a prop or state value.',
              color: 'border-sky-500/30 bg-sky-500/5',
              badge: 'bg-sky-500/20 text-sky-300',
            },
          ].map((item) => (
            <div key={item.label} className={`border rounded-xl p-4 ${item.color}`}>
              <div className="flex items-start gap-3">
                <span className={`text-xs px-2 py-0.5 rounded-full font-semibold flex-shrink-0 mt-0.5 ${item.badge}`}>{item.label}</span>
                <div>
                  <code className="text-slate-300 text-xs block mb-1">{item.code}</code>
                  <p className="text-slate-300 text-sm">{item.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        <Callout type="beginner" title="The rule of thumb">
          Start with <code className="text-slate-200">[]</code> (empty array). Only add values to it if your effect <em>uses</em> those values and needs to re-run when they change. If you're not sure, empty array is the safe default for "run once on load."
        </Callout>
      </section>

      {/* Fetch data */}
      <section>
        <h2 className="text-xl font-bold text-white mb-3">Example 1: Fetching Data</h2>
        <CodeBlock code={`import { useState, useEffect } from 'react'

function UserProfile({ userId }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    // Reset state when userId changes
    setLoading(true)
    setError(null)

    fetch(\`https://api.example.com/users/\${userId}\`)
      .then(res => res.json())
      .then(data => {
        setUser(data)
        setLoading(false)
      })
      .catch(err => {
        setError('Failed to load user')
        setLoading(false)
      })
  }, [userId])  // Re-fetch whenever userId changes

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error: {error}</p>
  return <h1>{user.name}</h1>
}`} />
        <LiveDemo title="Real API Fetch (Random Jokes)">
          <FetchDemo />
        </LiveDemo>
      </section>

      {/* Timer with cleanup */}
      <section>
        <h2 className="text-xl font-bold text-white mb-3">Example 2: Timer with Cleanup</h2>
        <p className="text-slate-400 text-sm mb-3">
          The cleanup function prevents memory leaks by canceling timers/subscriptions when the component unmounts or before the effect re-runs.
        </p>
        <CodeBlock code={`function Timer() {
  const [seconds, setSeconds] = useState(0)
  const [running, setRunning] = useState(false)

  useEffect(() => {
    if (!running) return  // Don't start timer if not running

    const interval = setInterval(() => {
      setSeconds(s => s + 1)
    }, 1000)

    // Cleanup: clear the interval when:
    // 1. Component unmounts
    // 2. 'running' changes (effect re-runs)
    return () => clearInterval(interval)
  }, [running])

  return (
    <div>
      <span>{seconds}s</span>
      <button onClick={() => setRunning(r => !r)}>
        {running ? 'Stop' : 'Start'}
      </button>
    </div>
  )
}`} />
        <LiveDemo title="Stopwatch with Cleanup">
          <TimerDemo />
        </LiveDemo>
      </section>

      {/* Document title */}
      <section>
        <h2 className="text-xl font-bold text-white mb-3">Example 3: Sync with Browser APIs</h2>
        <CodeBlock code={`function PageTitle({ title }) {
  // Update the browser tab title when title prop changes
  useEffect(() => {
    document.title = title
    // Cleanup: restore original title when component unmounts
    return () => { document.title = 'My App' }
  }, [title])

  return <h1>{title}</h1>
}

function WindowSize() {
  const [size, setSize] = useState({ w: window.innerWidth, h: window.innerHeight })

  useEffect(() => {
    const handler = () => setSize({ w: window.innerWidth, h: window.innerHeight })
    window.addEventListener('resize', handler)
    return () => window.removeEventListener('resize', handler)
  }, [])  // Only attach/detach once

  return <p>{size.w} × {size.h}</p>
}`} />
      </section>

      {/* async */}
      <section>
        <h2 className="text-xl font-bold text-white mb-3">Async/Await in useEffect</h2>
        <p className="text-slate-400 text-sm mb-3">
          You can't make the effect callback itself async. Instead, define an async function inside and call it:
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="text-xs text-red-400 font-semibold mb-1">❌ Won't work</p>
            <CodeBlock code={`useEffect(async () => {
  const data = await fetch(url)
  // This causes issues!
}, [])`} />
          </div>
          <div>
            <p className="text-xs text-green-400 font-semibold mb-1">✅ Correct pattern</p>
            <CodeBlock code={`useEffect(() => {
  async function load() {
    const res = await fetch(url)
    const data = await res.json()
    setData(data)
  }
  load()
}, [])`} />
          </div>
        </div>
      </section>

      {/* Common mistakes */}
      <section>
        <h2 className="text-xl font-bold text-white mb-3">Common Mistakes</h2>
        <div className="space-y-3">
          <Callout type="warning" title="Infinite loops">
            Setting state inside useEffect without proper dependencies creates an infinite loop: state changes → re-render → effect runs → state changes → ...
          </Callout>
          <Callout type="warning" title="Missing dependencies">
            If you use a variable inside useEffect but don't include it in the dependency array, you may get stale values. The ESLint plugin <code className="text-slate-200">eslint-plugin-react-hooks</code> catches this automatically.
          </Callout>
        </div>
      </section>

      <PageNav currentPath="/use-effect" />
    </div>
  )
}
