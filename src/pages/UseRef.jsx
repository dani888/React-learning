import { useState, useRef, useEffect } from 'react'
import CodeBlock from '../components/CodeBlock'
import Callout from '../components/Callout'
import PageNav from '../components/PageNav'

function FocusDemo() {
  const inputRef = useRef(null)
  return (
    <div className="flex gap-3">
      <input
        ref={inputRef}
        type="text"
        placeholder="Click the button to focus me"
        className="flex-1 bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
      />
      <button
        onClick={() => inputRef.current.focus()}
        className="px-3 py-2 text-sm bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg font-semibold transition-colors"
      >
        Focus Input
      </button>
    </div>
  )
}

function RenderCountDemo() {
  const [count, setCount] = useState(0)
  const renderCount = useRef(0)

  // This runs on every render but doesn't cause a new render
  renderCount.current += 1

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-3">
        <span className="text-white font-bold text-xl">{count}</span>
        <button onClick={() => setCount(c => c + 1)} className="px-3 py-1.5 text-sm bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg transition-colors">
          Increment
        </button>
      </div>
      <p className="text-sm text-slate-400">
        This component has rendered <strong className="text-amber-400">{renderCount.current} times</strong>
        <span className="text-xs text-slate-500 ml-2">(useRef tracks this without causing re-renders)</span>
      </p>
    </div>
  )
}

function PreviousValueDemo() {
  const [count, setCount] = useState(0)
  const prevCount = useRef(undefined)

  useEffect(() => {
    prevCount.current = count
  })

  return (
    <div className="flex items-center gap-4">
      <button onClick={() => setCount(c => c - 1)} className="w-9 h-9 rounded-lg bg-slate-700 hover:bg-slate-600 text-white font-bold transition-colors">-</button>
      <div className="text-center">
        <div className="text-2xl font-bold text-white">{count}</div>
        <div className="text-xs text-slate-500">Previous: {prevCount.current ?? 'none'}</div>
      </div>
      <button onClick={() => setCount(c => c + 1)} className="w-9 h-9 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-bold transition-colors">+</button>
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

export default function UseRef() {
  return (
    <div className="space-y-10">
      <div>
        <p className="text-xs font-semibold text-violet-400 uppercase tracking-wider mb-2">React Hooks</p>
        <h1 className="text-3xl font-bold text-white mb-3">useRef</h1>
        <p className="text-slate-400 leading-relaxed">
          <code className="text-violet-300 bg-violet-500/10 px-1.5 py-0.5 rounded">useRef</code> gives you a "box" that holds a value across renders — but changing it <strong className="text-white">does not cause a re-render</strong>. It has two practical uses.
        </p>
      </div>

      {/* Plain English */}
      <div className="bg-violet-500/10 border border-violet-500/30 rounded-xl p-5">
        <p className="text-xs font-bold text-violet-300 uppercase tracking-wider mb-4">Two use cases — pick the one that fits</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="bg-slate-900/60 rounded-xl p-4">
            <div className="text-2xl mb-2">🖱️</div>
            <p className="font-semibold text-white text-sm mb-1">Use 1: Touch a DOM element directly</p>
            <p className="text-xs text-slate-400 leading-relaxed mb-2">
              Sometimes React's declarative model isn't enough — you need to actually reach into the browser and do something to a real HTML element, like moving focus to an input or playing a video.
            </p>
            <p className="text-xs text-slate-500">Examples: auto-focus an input, scroll to a section, measure an element's size</p>
          </div>
          <div className="bg-slate-900/60 rounded-xl p-4">
            <div className="text-2xl mb-2">📌</div>
            <p className="font-semibold text-white text-sm mb-1">Use 2: Remember a value without re-rendering</p>
            <p className="text-xs text-slate-400 leading-relaxed mb-2">
              Unlike <code className="text-violet-300">useState</code>, changing a ref doesn't make the component re-draw. Use this for internal bookkeeping that doesn't need to show on screen.
            </p>
            <p className="text-xs text-slate-500">Examples: storing a timer ID, counting renders, previous value of a state</p>
          </div>
        </div>
        <div className="mt-4 p-3 bg-slate-900/40 rounded-lg">
          <p className="text-xs text-slate-400"><strong className="text-white">Quick rule:</strong> If the user needs to see the value on screen → use <code className="text-violet-300">useState</code>. If it's just internal bookkeeping → use <code className="text-cyan-300">useRef</code>.</p>
        </div>
      </div>

      {/* Two use cases */}
      <section>
        <h2 className="text-xl font-bold text-white mb-3">Two Main Use Cases</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-4">
            <div className="text-xl mb-2">🔗</div>
            <h3 className="font-semibold text-white mb-1">DOM Reference</h3>
            <p className="text-xs text-slate-400">Point to a real DOM element — useful for focus, scroll, or measuring elements.</p>
          </div>
          <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-4">
            <div className="text-xl mb-2">💾</div>
            <h3 className="font-semibold text-white mb-1">Mutable Value</h3>
            <p className="text-xs text-slate-400">Store a value that persists across renders but changing it does NOT cause a re-render.</p>
          </div>
        </div>
        <div className="overflow-hidden rounded-xl border border-slate-700/50 mt-4">
          <table className="w-full text-sm">
            <thead className="bg-slate-800">
              <tr>
                <th className="text-left px-4 py-2.5 text-slate-300 font-semibold"></th>
                <th className="text-left px-4 py-2.5 text-violet-300 font-semibold">useState</th>
                <th className="text-left px-4 py-2.5 text-cyan-300 font-semibold">useRef</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {[
                ['Triggers re-render?', 'Yes', 'No'],
                ['Value persists across renders?', 'Yes', 'Yes'],
                ['How to update?', 'setValue(newVal)', 'ref.current = newVal'],
                ['Use when...', 'UI needs to show the value', "You don't need to display it"],
              ].map(([label, state, ref]) => (
                <tr key={label} className="bg-slate-900/50">
                  <td className="px-4 py-2.5 text-slate-400 text-xs font-medium">{label}</td>
                  <td className="px-4 py-2.5 text-slate-300 text-xs">{state}</td>
                  <td className="px-4 py-2.5 text-slate-300 text-xs">{ref}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* DOM ref */}
      <section>
        <h2 className="text-xl font-bold text-white mb-3">Example 1: DOM Reference</h2>
        <CodeBlock code={`import { useRef } from 'react'

function AutoFocusInput() {
  const inputRef = useRef(null)  // Create ref, initially null

  return (
    <div>
      {/* Attach ref to the DOM element */}
      <input ref={inputRef} type="text" placeholder="I can be focused..." />

      {/* Access the real DOM element via .current */}
      <button onClick={() => inputRef.current.focus()}>
        Focus Input
      </button>
      <button onClick={() => inputRef.current.select()}>
        Select All Text
      </button>
      <button onClick={() => inputRef.current.value = ''}>
        Clear Input
      </button>
    </div>
  )
}`} />
        <LiveDemo title="DOM Focus">
          <FocusDemo />
        </LiveDemo>
      </section>

      {/* Mutable value */}
      <section>
        <h2 className="text-xl font-bold text-white mb-3">Example 2: Mutable Value (no re-render)</h2>
        <p className="text-slate-400 text-sm mb-3">
          Track how many times a component has rendered — without causing additional renders:
        </p>
        <CodeBlock code={`function RenderCounter() {
  const [count, setCount] = useState(0)
  const renderCount = useRef(0)

  // Increment on every render — does NOT cause another render
  renderCount.current += 1

  return (
    <div>
      <p>Count: {count}</p>
      <p>Renders: {renderCount.current}</p>
      <button onClick={() => setCount(c => c + 1)}>Increment</button>
    </div>
  )
  // If renderCount were useState, updating it would cause infinite renders!
}`} />
        <LiveDemo title="Render Counter (via useRef)">
          <RenderCountDemo />
        </LiveDemo>
      </section>

      {/* Previous value */}
      <section>
        <h2 className="text-xl font-bold text-white mb-3">Example 3: Remember Previous Value</h2>
        <CodeBlock code={`import { useState, useRef, useEffect } from 'react'

function Counter() {
  const [count, setCount] = useState(0)
  const prevCount = useRef(undefined)

  // After every render, save the current count as "previous"
  useEffect(() => {
    prevCount.current = count
  })
  // Note: no dependency array — runs after every render

  return (
    <div>
      <p>Current: {count}</p>
      <p>Previous: {prevCount.current ?? 'none'}</p>
      <button onClick={() => setCount(c => c + 1)}>+</button>
      <button onClick={() => setCount(c => c - 1)}>-</button>
    </div>
  )
}`} />
        <LiveDemo title="Previous Value Tracker">
          <PreviousValueDemo />
        </LiveDemo>
      </section>

      {/* Timeout/interval */}
      <section>
        <h2 className="text-xl font-bold text-white mb-3">Example 4: Storing a Timer ID</h2>
        <CodeBlock code={`function Notification() {
  const [visible, setVisible] = useState(false)
  const timerRef = useRef(null)  // Store the timer ID

  function show() {
    setVisible(true)
    // Clear any existing timer before creating a new one
    clearTimeout(timerRef.current)
    timerRef.current = setTimeout(() => {
      setVisible(false)
    }, 3000)
  }

  // Cleanup on unmount
  useEffect(() => {
    return () => clearTimeout(timerRef.current)
  }, [])

  return (
    <div>
      <button onClick={show}>Show Notification</button>
      {visible && <div className="toast">Saved successfully!</div>}
    </div>
  )
}`} />
        <Callout type="tip" title="Why not useState for the timer ID?">
          Storing the timer in state would cause a re-render every time you update it, which is unnecessary. useRef is perfect for values that are "internal implementation details."
        </Callout>
      </section>

      {/* Scroll */}
      <section>
        <h2 className="text-xl font-bold text-white mb-3">Example 5: Scroll to Element</h2>
        <CodeBlock code={`function LongPage() {
  const bottomRef = useRef(null)
  const topRef = useRef(null)

  function scrollToBottom() {
    bottomRef.current.scrollIntoView({ behavior: 'smooth' })
  }

  function scrollToTop() {
    topRef.current.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div>
      <div ref={topRef}>
        <button onClick={scrollToBottom}>Scroll to Bottom</button>
      </div>
      {/* ... lots of content ... */}
      <div ref={bottomRef}>
        <button onClick={scrollToTop}>Back to Top</button>
      </div>
    </div>
  )
}`} />
      </section>

      <PageNav currentPath="/use-ref" />
    </div>
  )
}
