import { useState, useMemo, useCallback, memo } from 'react'
import CodeBlock from '../components/CodeBlock'
import Callout from '../components/Callout'
import PageNav from '../components/PageNav'

// Demo: expensive computation
function slowDouble(n) {
  let i = 0
  while (i < 200000000) i++
  return n * 2
}

function MemoDemo() {
  const [number, setNumber] = useState(5)
  const [dark, setDark] = useState(false)
  const [memo, setMemo] = useState(true)

  const doubled = useMemo(() => {
    if (!memo) return slowDouble(number) // simulated expensive
    return number * 2
  }, [number, memo])

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-3">
        <input type="number" value={number} onChange={e => setNumber(+e.target.value)}
          className="w-24 bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-indigo-500" />
        <span className="text-slate-400 text-sm">× 2 =</span>
        <span className="text-2xl font-bold text-indigo-300">{doubled}</span>
      </div>
      <div className="flex gap-2">
        <button onClick={() => setDark(d => !d)} className="px-3 py-1.5 text-xs bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition-colors">
          Toggle Theme (unrelated state)
        </button>
      </div>
      <p className="text-xs text-slate-500">Notice: changing theme doesn't recompute the doubled value.</p>
    </div>
  )
}

let callbackChildRenders = 0

const CallbackChild = memo(function CallbackChild({ onClick }) {
  callbackChildRenders++
  return (
    <button onClick={onClick} className="px-3 py-1.5 text-xs bg-slate-700 hover:bg-slate-600 rounded-lg text-white transition-colors">
      Child button (renders: {callbackChildRenders})
    </button>
  )
})

function CallbackDemo() {
  const [count, setCount] = useState(0)
  const [other, setOther] = useState(0)

  const handleClick = useCallback(() => {
    setCount(c => c + 1)
  }, []) // stable reference — child won't re-render when 'other' changes

  return (
    <div className="space-y-3">
      <div className="flex gap-3 items-center">
        <span className="text-white font-bold">Count: {count}</span>
        <CallbackChild onClick={handleClick} />
      </div>
      <div>
        <button onClick={() => setOther(o => o + 1)} className="px-3 py-1.5 text-xs bg-amber-700 hover:bg-amber-600 rounded-lg text-white transition-colors">
          Change other state ({other}) — child should NOT re-render
        </button>
      </div>
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

export default function UseMemo() {
  return (
    <div className="space-y-10">
      <div>
        <p className="text-xs font-semibold text-violet-400 uppercase tracking-wider mb-2">React Hooks</p>
        <h1 className="text-3xl font-bold text-white mb-3">useMemo & useCallback</h1>
        <p className="text-slate-400 leading-relaxed">
          These hooks let you <strong className="text-white">skip work that's already been done</strong> — by remembering (caching) a result so React doesn't have to recalculate it on every render.
        </p>
      </div>

      {/* Plain English */}
      <div className="bg-orange-500/10 border border-orange-500/30 rounded-xl p-5">
        <p className="text-xs font-bold text-orange-300 uppercase tracking-wider mb-3">Think of it like this</p>
        <p className="text-sm text-slate-300 mb-2">
          Imagine you're filtering 10,000 products by a search term. Every time <em>anything</em> re-renders — even unrelated state like a theme toggle — React would re-run that filter from scratch. That's wasteful.
        </p>
        <p className="text-sm text-slate-300">
          <code className="text-orange-300">useMemo</code> is like a sticky note: "Last time the search was 'boots' I got 42 results — just show those again until the search actually changes."
        </p>
      </div>

      <Callout type="warning" title="Beginner advice: skip this for now">
        <strong>You almost certainly don't need useMemo or useCallback when you're starting out.</strong> React is fast by default. Only reach for these when you notice a real, measurable slowdown. Learn useState and useEffect thoroughly first — come back to this when your app actually feels slow.
      </Callout>

      {/* useMemo */}
      <section>
        <h2 className="text-xl font-bold text-white mb-3">useMemo — Cache a Computed Value</h2>
        <p className="text-slate-400 text-sm mb-3">
          Recalculates the value only when the dependencies change. Perfect for expensive computations.
        </p>
        <CodeBlock code={`import { useMemo } from 'react'

const [items, setItems] = useState([...]) // 10,000 items
const [filter, setFilter] = useState('')
const [theme, setTheme] = useState('dark')

// Without useMemo: filters all 10k items on EVERY render (even theme changes!)
const filtered = items.filter(item => item.name.includes(filter))

// With useMemo: only re-filters when items or filter changes
const filteredMemo = useMemo(() => {
  return items.filter(item => item.name.includes(filter))
}, [items, filter])
//  ↑ only recalculate when these change`} />
        <LiveDemo title="useMemo — skip recalculation on unrelated renders">
          <MemoDemo />
        </LiveDemo>
      </section>

      {/* Real filtering example */}
      <section>
        <h2 className="text-xl font-bold text-white mb-3">Real Example: Search Filter</h2>
        <CodeBlock code={`function SearchableList() {
  const [query, setQuery] = useState('')
  const [sortAsc, setSortAsc] = useState(true)

  const data = useGetAllUsers() // imagine 10,000 users

  // This is expensive — only re-run when dependencies change
  const results = useMemo(() => {
    const filtered = data.filter(user =>
      user.name.toLowerCase().includes(query.toLowerCase())
    )
    return filtered.sort((a, b) =>
      sortAsc
        ? a.name.localeCompare(b.name)
        : b.name.localeCompare(a.name)
    )
  }, [data, query, sortAsc])

  return (
    <div>
      <input value={query} onChange={e => setQuery(e.target.value)} />
      <button onClick={() => setSortAsc(a => !a)}>Toggle Sort</button>
      <p>{results.length} results</p>
      {results.map(user => <UserRow key={user.id} user={user} />)}
    </div>
  )
}`} />
      </section>

      {/* useCallback */}
      <section>
        <h2 className="text-xl font-bold text-white mb-3">useCallback — Cache a Function Reference</h2>
        <p className="text-slate-400 text-sm mb-3">
          Every render creates a new function instance. <code className="text-violet-300">useCallback</code> keeps the same function reference unless dependencies change. This matters when passing functions to memoized child components.
        </p>
        <CodeBlock code={`import { useCallback, memo } from 'react'

// memo() — child only re-renders if props actually change
const ExpensiveChild = memo(function ExpensiveChild({ onSave }) {
  console.log('Child rendered')
  return <button onClick={onSave}>Save</button>
})

function Parent() {
  const [count, setCount] = useState(0)
  const [text, setText] = useState('')

  // Without useCallback: new function each render → child always re-renders
  const handleSave = () => saveToDatabase(text)

  // With useCallback: same reference unless 'text' changes
  const handleSaveMemo = useCallback(() => {
    saveToDatabase(text)
  }, [text])

  return (
    <div>
      <input value={text} onChange={e => setText(e.target.value)} />
      <button onClick={() => setCount(c => c + 1)}>Other: {count}</button>

      {/* This child won't re-render when count changes — onSave is stable! */}
      <ExpensiveChild onSave={handleSaveMemo} />
    </div>
  )
}`} />
        <LiveDemo title="useCallback — stable child re-renders">
          <CallbackDemo />
        </LiveDemo>
      </section>

      {/* memo */}
      <section>
        <h2 className="text-xl font-bold text-white mb-3">React.memo — Memoize a Component</h2>
        <p className="text-slate-400 text-sm mb-3">
          <code className="text-cyan-300">memo()</code> wraps a component so it only re-renders when its props change:
        </p>
        <CodeBlock code={`import { memo } from 'react'

// Without memo: re-renders every time parent renders
function UserCard({ user }) {
  return <div>{user.name}</div>
}

// With memo: only re-renders when 'user' prop changes
const UserCard = memo(function UserCard({ user }) {
  return <div>{user.name}</div>
})

// For custom comparison:
const UserCard = memo(function UserCard({ user }) {
  return <div>{user.name}</div>
}, (prevProps, nextProps) => {
  // Return true if props are equal (skip re-render)
  return prevProps.user.id === nextProps.user.id
})`} />
      </section>

      {/* When to use */}
      <section>
        <h2 className="text-xl font-bold text-white mb-3">When to Use Each</h2>
        <div className="overflow-hidden rounded-xl border border-slate-700/50">
          <table className="w-full text-sm">
            <thead className="bg-slate-800">
              <tr>
                <th className="text-left px-4 py-3 text-slate-300 font-semibold">Hook</th>
                <th className="text-left px-4 py-3 text-slate-300 font-semibold">Use When</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {[
                ['useMemo', 'You have an expensive calculation that depends on specific values (filtering large lists, complex math)'],
                ['useCallback', 'You pass a function to a memo() child component and want to prevent unnecessary re-renders'],
                ['memo()', 'A component re-renders frequently with the same props, and rendering is expensive'],
              ].map(([hook, desc]) => (
                <tr key={hook} className="bg-slate-900/50">
                  <td className="px-4 py-3 font-mono text-violet-300 text-xs font-semibold align-top pt-3.5">{hook}</td>
                  <td className="px-4 py-3 text-slate-400">{desc}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <PageNav currentPath="/use-memo" />
    </div>
  )
}
