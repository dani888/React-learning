import { useState, useEffect, useCallback, useRef } from 'react'
import CodeBlock from '../components/CodeBlock'
import Callout from '../components/Callout'
import PageNav from '../components/PageNav'

// Live demos of actual custom hooks
function useLocalStorage(key, initial) {
  const [value, setValue] = useState(() => {
    try { return JSON.parse(localStorage.getItem(key)) ?? initial } catch { return initial }
  })
  const set = useCallback(v => {
    setValue(v)
    localStorage.setItem(key, JSON.stringify(v))
  }, [key])
  return [value, set]
}

function useDebounce(value, delay) {
  const [debounced, setDebounced] = useState(value)
  useEffect(() => {
    const timer = setTimeout(() => setDebounced(value), delay)
    return () => clearTimeout(timer)
  }, [value, delay])
  return debounced
}

function useToggle(initial = false) {
  const [value, setValue] = useState(initial)
  const toggle = useCallback(() => setValue(v => !v), [])
  const setTrue = useCallback(() => setValue(true), [])
  const setFalse = useCallback(() => setValue(false), [])
  return [value, toggle, setTrue, setFalse]
}

function LocalStorageDemo() {
  const [name, setName] = useLocalStorage('demo-name', '')
  return (
    <div className="space-y-2">
      <input
        value={name}
        onChange={e => setName(e.target.value)}
        placeholder="Type something (it persists on refresh!)"
        className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
      />
      {name && <p className="text-xs text-emerald-400">Saved to localStorage: "{name}"</p>}
      {!name && <p className="text-xs text-slate-500">Refresh the page — the value will still be there</p>}
    </div>
  )
}

function DebounceDemo() {
  const [input, setInput] = useState('')
  const debounced = useDebounce(input, 500)
  const [searchCount, setSearchCount] = useState(0)

  useEffect(() => {
    if (debounced) setSearchCount(c => c + 1)
  }, [debounced])

  return (
    <div className="space-y-2">
      <input
        value={input}
        onChange={e => setInput(e.target.value)}
        placeholder="Type to search (debounced 500ms)"
        className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
      />
      <div className="flex gap-4 text-xs">
        <span className="text-slate-400">Instant: <strong className="text-white">"{input}"</strong></span>
        <span className="text-slate-400">Debounced: <strong className="text-indigo-300">"{debounced}"</strong></span>
      </div>
      <p className="text-xs text-slate-500">API calls that would have been made: <strong className="text-amber-400">{searchCount}</strong></p>
    </div>
  )
}

function ToggleDemo() {
  const [isOpen, toggle, open, close] = useToggle(false)
  return (
    <div className="space-y-3">
      <div className="flex gap-2">
        <button onClick={toggle} className="px-3 py-1.5 text-xs bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg transition-colors">Toggle</button>
        <button onClick={open} className="px-3 py-1.5 text-xs bg-emerald-700 hover:bg-emerald-600 text-white rounded-lg transition-colors">Open</button>
        <button onClick={close} className="px-3 py-1.5 text-xs bg-red-800 hover:bg-red-700 text-white rounded-lg transition-colors">Close</button>
      </div>
      {isOpen && (
        <div className="bg-slate-800 border border-slate-700 rounded-lg p-3">
          <p className="text-sm text-white">The modal/drawer is open!</p>
          <button onClick={close} className="mt-2 text-xs text-slate-400 hover:text-slate-200">Close ✕</button>
        </div>
      )}
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

export default function CustomHooks() {
  return (
    <div className="space-y-10">
      <div>
        <p className="text-xs font-semibold text-violet-400 uppercase tracking-wider mb-2">React Hooks</p>
        <h1 className="text-3xl font-bold text-white mb-3">Custom Hooks</h1>
        <p className="text-slate-400 leading-relaxed">
          A custom hook is just a <strong className="text-white">regular function that uses other hooks</strong>. Its name must start with <code className="text-violet-300 bg-violet-500/10 px-1.5 py-0.5 rounded">use</code>. You create them when you want to reuse the same logic in multiple components.
        </p>
      </div>

      {/* Plain English */}
      <div className="bg-violet-500/10 border border-violet-500/30 rounded-xl p-5">
        <p className="text-xs font-bold text-violet-300 uppercase tracking-wider mb-3">Think of it like building a custom tool</p>
        <p className="text-sm text-slate-300 mb-2">
          Imagine you need to fetch data in 5 different components. Each one would need the same 3 state variables (<code className="text-violet-300">data</code>, <code className="text-violet-300">loading</code>, <code className="text-violet-300">error</code>) and the same <code className="text-violet-300">useEffect</code> with fetch logic.
        </p>
        <p className="text-sm text-slate-300 mb-2">
          Instead of copy-pasting that every time, you build a <code className="text-violet-300">useFetch</code> hook once — and every component that needs data just calls <code className="text-violet-300">const {'{ data, loading, error }'} = useFetch(url)</code>.
        </p>
        <p className="text-sm font-semibold text-white">Signal to make a custom hook: you're copy-pasting the same hook code into multiple components.</p>
      </div>

      <Callout type="beginner" title="This is an advanced pattern — but a simple concept">
        You don't need custom hooks on day one. Learn useState, useEffect, and useContext first. Once you're comfortable, custom hooks will feel like a natural next step. They're just functions that happen to use hooks inside.
      </Callout>

      {/* Basic example */}
      <section>
        <h2 className="text-xl font-bold text-white mb-3">Your First Custom Hook</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="text-xs text-red-400 font-semibold mb-1">❌ Repetitive — copy-pasted in every component</p>
            <CodeBlock code={`// In ComponentA
const [isOpen, setIsOpen] = useState(false)
const toggle = () => setIsOpen(v => !v)

// In ComponentB — same thing!
const [isOpen, setIsOpen] = useState(false)
const toggle = () => setIsOpen(v => !v)

// In ComponentC — again!
const [isOpen, setIsOpen] = useState(false)
const toggle = () => setIsOpen(v => !v)`} />
          </div>
          <div>
            <p className="text-xs text-green-400 font-semibold mb-1">✅ Extract to a custom hook</p>
            <CodeBlock code={`// hooks/useToggle.js
function useToggle(initial = false) {
  const [value, setValue] = useState(initial)
  const toggle = useCallback(() => setValue(v => !v), [])
  return [value, toggle]
}

// Now use it anywhere:
const [isOpen, toggle] = useToggle()
const [isVisible, toggleVisible] = useToggle(true)
const [isDark, toggleTheme] = useToggle(false)`} />
          </div>
        </div>
      </section>

      {/* useLocalStorage */}
      <section>
        <h2 className="text-xl font-bold text-white mb-3">Hook 1: useLocalStorage</h2>
        <p className="text-slate-400 text-sm mb-3">Like useState, but the value persists across browser refreshes.</p>
        <CodeBlock filename="hooks/useLocalStorage.js" code={`import { useState, useCallback } from 'react'

function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = localStorage.getItem(key)
      return item ? JSON.parse(item) : initialValue
    } catch {
      return initialValue
    }
  })

  const setValue = useCallback((value) => {
    setStoredValue(value)
    localStorage.setItem(key, JSON.stringify(value))
  }, [key])

  return [storedValue, setValue]
}

export default useLocalStorage

// Usage:
const [theme, setTheme] = useLocalStorage('theme', 'dark')
const [todos, setTodos] = useLocalStorage('todos', [])`} />
        <LiveDemo title="useLocalStorage (try refreshing the page!)">
          <LocalStorageDemo />
        </LiveDemo>
      </section>

      {/* useDebounce */}
      <section>
        <h2 className="text-xl font-bold text-white mb-3">Hook 2: useDebounce</h2>
        <p className="text-slate-400 text-sm mb-3">Delay updating a value until the user stops typing — avoids hammering your API on every keystroke.</p>
        <CodeBlock filename="hooks/useDebounce.js" code={`import { useState, useEffect } from 'react'

function useDebounce(value, delay = 300) {
  const [debouncedValue, setDebouncedValue] = useState(value)

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)

    return () => clearTimeout(timer)  // Cancel if value changes again
  }, [value, delay])

  return debouncedValue
}

// Usage in a search component:
function SearchBar() {
  const [query, setQuery] = useState('')
  const debouncedQuery = useDebounce(query, 500)  // Wait 500ms

  useEffect(() => {
    if (debouncedQuery) {
      fetchResults(debouncedQuery)  // Only called after user stops typing
    }
  }, [debouncedQuery])

  return <input value={query} onChange={e => setQuery(e.target.value)} />
}`} />
        <LiveDemo title="useDebounce">
          <DebounceDemo />
        </LiveDemo>
      </section>

      {/* useFetch */}
      <section>
        <h2 className="text-xl font-bold text-white mb-3">Hook 3: useFetch</h2>
        <p className="text-slate-400 text-sm mb-3">Reusable data fetching with loading and error states:</p>
        <CodeBlock filename="hooks/useFetch.js" code={`import { useState, useEffect } from 'react'

function useFetch(url) {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!url) return
    let cancelled = false

    setLoading(true)
    setError(null)

    fetch(url)
      .then(res => {
        if (!res.ok) throw new Error(\`HTTP \${res.status}\`)
        return res.json()
      })
      .then(data => {
        if (!cancelled) {
          setData(data)
          setLoading(false)
        }
      })
      .catch(err => {
        if (!cancelled) {
          setError(err.message)
          setLoading(false)
        }
      })

    return () => { cancelled = true }  // Prevent state update after unmount
  }, [url])

  return { data, loading, error }
}

// Usage — clean and reusable:
function UserList() {
  const { data, loading, error } = useFetch('/api/users')

  if (loading) return <Spinner />
  if (error) return <p>Error: {error}</p>
  return <ul>{data.map(u => <li key={u.id}>{u.name}</li>)}</ul>
}`} />
      </section>

      {/* useToggle */}
      <section>
        <h2 className="text-xl font-bold text-white mb-3">Hook 4: useToggle</h2>
        <CodeBlock filename="hooks/useToggle.js" code={`import { useState, useCallback } from 'react'

function useToggle(initialValue = false) {
  const [value, setValue] = useState(initialValue)
  const toggle = useCallback(() => setValue(v => !v), [])
  const setTrue = useCallback(() => setValue(true), [])
  const setFalse = useCallback(() => setValue(false), [])
  return [value, toggle, setTrue, setFalse]
}

// Usage:
const [isOpen, toggle, open, close] = useToggle()
const [isVisible, toggleVisible] = useToggle(true)`} />
        <LiveDemo title="useToggle">
          <ToggleDemo />
        </LiveDemo>
      </section>

      {/* useWindowSize */}
      <section>
        <h2 className="text-xl font-bold text-white mb-3">Hook 5: useWindowSize</h2>
        <CodeBlock filename="hooks/useWindowSize.js" code={`import { useState, useEffect } from 'react'

function useWindowSize() {
  const [size, setSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  })

  useEffect(() => {
    const handler = () => setSize({
      width: window.innerWidth,
      height: window.innerHeight,
    })

    window.addEventListener('resize', handler)
    return () => window.removeEventListener('resize', handler)
  }, [])

  return size
}

// Usage:
function ResponsiveComponent() {
  const { width, height } = useWindowSize()
  return (
    <p>Window: {width} × {height}px
      {width < 768 ? ' (mobile)' : ' (desktop)'}
    </p>
  )
}`} />
      </section>

      {/* Rules of hooks */}
      <section>
        <h2 className="text-xl font-bold text-white mb-3">Rules of Hooks</h2>
        <div className="space-y-2">
          <Callout type="danger" title="Only call hooks at the top level">
            Never call hooks inside loops, conditions, or nested functions. React relies on the order of hook calls being stable across renders.
          </Callout>
          <Callout type="danger" title="Only call hooks from React functions">
            Call hooks from function components or other custom hooks. Not from regular JavaScript functions.
          </Callout>
          <Callout type="tip" title="Naming convention">
            Custom hooks MUST start with "use" (e.g., useFetch, useAuth). This lets React and linters identify them as hooks and enforce the rules above.
          </Callout>
        </div>
      </section>

      <PageNav currentPath="/custom-hooks" />
    </div>
  )
}
