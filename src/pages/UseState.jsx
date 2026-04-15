import { useState } from 'react'
import CodeBlock from '../components/CodeBlock'
import Callout from '../components/Callout'
import PageNav from '../components/PageNav'

// Live demos
function Counter() {
  const [count, setCount] = useState(0)
  return (
    <div className="flex items-center gap-4">
      <button onClick={() => setCount(c => c - 1)} className="w-9 h-9 rounded-lg bg-slate-700 hover:bg-slate-600 text-white font-bold transition-colors">-</button>
      <span className="text-2xl font-bold text-white w-10 text-center">{count}</span>
      <button onClick={() => setCount(c => c + 1)} className="w-9 h-9 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-bold transition-colors">+</button>
      <button onClick={() => setCount(0)} className="text-xs text-slate-500 hover:text-slate-300 ml-2">Reset</button>
    </div>
  )
}

function ToggleDemo() {
  const [isVisible, setIsVisible] = useState(true)
  const [theme, setTheme] = useState('dark')
  return (
    <div className="space-y-3">
      <div className="flex items-center gap-3">
        <button onClick={() => setIsVisible(v => !v)} className="px-3 py-1.5 text-sm bg-slate-700 hover:bg-slate-600 rounded-lg text-white transition-colors">
          {isVisible ? 'Hide' : 'Show'} Box
        </button>
        {isVisible && <div className="w-12 h-12 rounded-lg bg-indigo-500 flex items-center justify-center text-white font-bold">Hi!</div>}
      </div>
      <div className="flex items-center gap-3">
        <button onClick={() => setTheme(t => t === 'dark' ? 'light' : 'dark')} className="px-3 py-1.5 text-sm bg-slate-700 hover:bg-slate-600 rounded-lg text-white transition-colors">
          Toggle Theme
        </button>
        <div className={`px-3 py-1.5 rounded-lg text-sm font-medium ${theme === 'dark' ? 'bg-slate-800 text-white' : 'bg-white text-slate-900'}`}>
          {theme === 'dark' ? '🌙 Dark Mode' : '☀️ Light Mode'}
        </div>
      </div>
    </div>
  )
}

function FormDemo() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  return (
    <div className="space-y-3">
      <input
        type="text"
        placeholder="Your name..."
        value={name}
        onChange={e => setName(e.target.value)}
        className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
      />
      <input
        type="email"
        placeholder="Your email..."
        value={email}
        onChange={e => setEmail(e.target.value)}
        className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
      />
      {name && <p className="text-sm text-emerald-400">Hello, {name}! {email && `(${email})`}</p>}
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

export default function UseState() {
  return (
    <div className="space-y-10">
      <div>
        <p className="text-xs font-semibold text-violet-400 uppercase tracking-wider mb-2">React Hooks</p>
        <h1 className="text-3xl font-bold text-white mb-3">useState</h1>
        <p className="text-slate-400 leading-relaxed">
          <code className="text-violet-300 bg-violet-500/10 px-1.5 py-0.5 rounded">useState</code> is the most important hook you'll learn.
          It lets a component <strong className="text-white">remember a value</strong> — and whenever that value changes, React automatically updates the screen.
        </p>
      </div>

      {/* Plain English */}
      <div className="bg-violet-500/10 border border-violet-500/30 rounded-xl p-5">
        <p className="text-xs font-bold text-violet-300 uppercase tracking-wider mb-3">Think of it like this</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-white font-semibold mb-1">A regular variable — doesn't work</p>
            <CodeBlock code={`function Counter() {
  let count = 0  // ❌ just a normal variable

  return (
    <button onClick={() => count++}>
      Count: {count}
      {/* clicking does nothing visible —
          React doesn't know count changed */}
    </button>
  )
}`} />
            <p className="text-xs text-slate-400 mt-2">Changing a regular variable doesn't tell React to re-draw the screen.</p>
          </div>
          <div>
            <p className="text-sm text-white font-semibold mb-1">useState — works!</p>
            <CodeBlock code={`function Counter() {
  // ✅ useState gives React a "watched" variable
  const [count, setCount] = useState(0)

  return (
    <button onClick={() => setCount(count + 1)}>
      Count: {count}
      {/* clicking calls setCount → React
          re-renders with the new value */}
    </button>
  )
}`} />
            <p className="text-xs text-slate-400 mt-2">Calling <code className="text-violet-300">setCount</code> tells React "something changed — please update the screen."</p>
          </div>
        </div>
      </div>

      {/* Syntax */}
      <section>
        <h2 className="text-xl font-bold text-white mb-3">The Syntax — Broken Down</h2>
        <CodeBlock code={`import { useState } from 'react'
//        ↑ always import it from 'react'

const [count, setCount] = useState(0)
//     ↑        ↑                  ↑
//  the value  how you change it  starting value`} />
        <ul className="space-y-3 mt-4">
          {[
            ['count', 'The current value. Read it in your JSX like any variable.', 'violet'],
            ['setCount', 'The only way to update the value. Calling this triggers a re-render.', 'violet'],
            ['useState(0)', 'The starting value — only used on the very first render. Can be a number, string, boolean, array, or object.', 'violet'],
          ].map(([term, def]) => (
            <li key={term} className="flex gap-3 text-sm bg-slate-800/50 rounded-lg p-3">
              <code className="text-violet-300 bg-violet-500/10 px-1.5 py-0.5 rounded h-fit flex-shrink-0">{term}</code>
              <span className="text-slate-400">{def}</span>
            </li>
          ))}
        </ul>
        <Callout type="beginner" title="The naming convention">
          You can name these anything, but the convention is <code className="text-slate-200">[thing, setThing]</code>. So if the value is a username, you'd write <code className="text-slate-200">const [username, setUsername] = useState('')</code>. The <code className="text-slate-200">set</code> prefix is just a readable signal that this function updates the value.
        </Callout>
      </section>

      {/* Counter example */}
      <section>
        <h2 className="text-xl font-bold text-white mb-3">Example 1: Counter</h2>
        <CodeBlock filename="Counter.jsx" code={`import { useState } from 'react'

function Counter() {
  const [count, setCount] = useState(0)  // Start at 0

  return (
    <div>
      <button onClick={() => setCount(count - 1)}>-</button>
      <span>{count}</span>
      <button onClick={() => setCount(count + 1)}>+</button>
      <button onClick={() => setCount(0)}>Reset</button>
    </div>
  )
}`} />
        <LiveDemo title="Counter">
          <Counter />
        </LiveDemo>
        <Callout type="tip" title="Functional Updates">
          When the new state depends on the previous state, use a function: <code className="text-slate-200">setCount(c =&gt; c + 1)</code> instead of <code className="text-slate-200">setCount(count + 1)</code>. This avoids stale closure bugs.
        </Callout>
      </section>

      {/* Toggle */}
      <section>
        <h2 className="text-xl font-bold text-white mb-3">Example 2: Toggle & Boolean State</h2>
        <CodeBlock code={`function ToggleDemo() {
  const [isVisible, setIsVisible] = useState(true)
  const [theme, setTheme] = useState('dark')

  return (
    <div>
      <button onClick={() => setIsVisible(v => !v)}>
        {isVisible ? 'Hide' : 'Show'} Box
      </button>
      {isVisible && <div className="box">Hi!</div>}

      <button onClick={() => setTheme(t => t === 'dark' ? 'light' : 'dark')}>
        Toggle Theme
      </button>
      <div className={theme === 'dark' ? 'dark-box' : 'light-box'}>
        {theme}
      </div>
    </div>
  )
}`} />
        <LiveDemo title="Toggle">
          <ToggleDemo />
        </LiveDemo>
      </section>

      {/* Controlled inputs */}
      <section>
        <h2 className="text-xl font-bold text-white mb-3">Example 3: Controlled Form Inputs</h2>
        <p className="text-slate-400 text-sm mb-3">
          A controlled input has its value tied to state. React becomes the "single source of truth" for the input's value.
        </p>
        <CodeBlock code={`function ContactForm() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')

  return (
    <form>
      <input
        type="text"
        value={name}
        onChange={e => setName(e.target.value)}
        placeholder="Your name"
      />
      <input
        type="email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        placeholder="Your email"
      />
      {name && <p>Hello, {name}!</p>}
    </form>
  )
}`} />
        <LiveDemo title="Controlled Inputs">
          <FormDemo />
        </LiveDemo>
      </section>

      {/* Object state */}
      <section>
        <h2 className="text-xl font-bold text-white mb-3">Example 4: State with Objects</h2>
        <p className="text-slate-400 text-sm mb-3">When state is an object, always spread the old state to avoid losing other fields:</p>
        <CodeBlock code={`function ProfileForm() {
  const [user, setUser] = useState({
    name: '',
    email: '',
    age: 0,
  })

  function handleChange(field, value) {
    setUser(prev => ({
      ...prev,        // Keep all existing fields
      [field]: value  // Update only the changed field
    }))
  }

  return (
    <form>
      <input
        value={user.name}
        onChange={e => handleChange('name', e.target.value)}
      />
      <input
        value={user.email}
        onChange={e => handleChange('email', e.target.value)}
      />
    </form>
  )
}`} />
        <Callout type="warning" title="Never mutate state directly">
          <code className="text-slate-200">user.name = 'Alice'</code> will NOT trigger a re-render! Always create a new object with <code className="text-slate-200">setUser(&#123; ...user, name: 'Alice' &#125;)</code>.
        </Callout>
      </section>

      {/* Array state */}
      <section>
        <h2 className="text-xl font-bold text-white mb-3">Example 5: State with Arrays</h2>
        <CodeBlock code={`function TodoList() {
  const [todos, setTodos] = useState(['Buy milk', 'Walk dog'])
  const [input, setInput] = useState('')

  // Add item
  function addTodo() {
    setTodos(prev => [...prev, input])  // Spread + append
    setInput('')
  }

  // Remove item
  function removeTodo(index) {
    setTodos(prev => prev.filter((_, i) => i !== index))
  }

  // Update item
  function updateTodo(index, newText) {
    setTodos(prev =>
      prev.map((todo, i) => i === index ? newText : todo)
    )
  }

  return (
    <div>
      <input value={input} onChange={e => setInput(e.target.value)} />
      <button onClick={addTodo}>Add</button>
      <ul>
        {todos.map((todo, i) => (
          <li key={i}>
            {todo}
            <button onClick={() => removeTodo(i)}>✕</button>
          </li>
        ))}
      </ul>
    </div>
  )
}`} />
      </section>

      {/* Multiple state */}
      <section>
        <h2 className="text-xl font-bold text-white mb-3">Multiple State Variables</h2>
        <p className="text-slate-400 text-sm mb-3">You can call useState as many times as you need:</p>
        <CodeBlock code={`function App() {
  const [count, setCount] = useState(0)
  const [name, setName] = useState('Alice')
  const [isLoading, setIsLoading] = useState(false)
  const [items, setItems] = useState([])

  // Each state is independent — updating one doesn't affect others
}`} />
        <Callout type="advanced" title="When to use one vs many state variables">
          Use separate state variables for unrelated data. Group related state into an object (e.g., form fields). For very complex state with many sub-values and transitions, consider <code className="text-slate-200">useReducer</code>.
        </Callout>
      </section>

      <PageNav currentPath="/use-state" />
    </div>
  )
}
