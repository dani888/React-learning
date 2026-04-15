import { useState } from 'react'
import CodeBlock from '../components/CodeBlock'
import Callout from '../components/Callout'
import PageNav from '../components/PageNav'

// ── Live demo components ──────────────────────────────────────────────────────

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

// Demo: JSX expressions
function JSXExpressionsDemo() {
  const name = 'Alice'
  const age = 30
  const isAdult = age >= 18
  return (
    <div className="space-y-1 text-sm">
      <p className="text-white">Hello, <span className="text-indigo-300 font-semibold">{name}</span>!</p>
      <p className="text-slate-300">Age: <span className="text-violet-300 font-semibold">{age}</span></p>
      <p className="text-slate-300">Born: <span className="text-violet-300 font-semibold">{2024 - age}</span></p>
      <p className="text-slate-300">Status: <span className={`font-semibold ${isAdult ? 'text-emerald-400' : 'text-amber-400'}`}>{isAdult ? 'Adult' : 'Minor'}</span></p>
      <p className="text-xs text-slate-500 mt-2 pt-2 border-t border-slate-800">
        These values come from JavaScript variables embedded in JSX with {'{ }'}
      </p>
    </div>
  )
}

// Demo: Reusable components
function Greeting() {
  return (
    <div className="bg-slate-800 border border-slate-700 rounded-lg p-3">
      <h3 className="font-semibold text-white text-sm">Hello, React!</h3>
      <p className="text-xs text-slate-400">Welcome to the React Learning Hub.</p>
    </div>
  )
}

function GreetingDemo() {
  return (
    <div className="space-y-2">
      <p className="text-xs text-slate-500 mb-3">The same {'<Greeting />'} component used 3 times:</p>
      <Greeting />
      <Greeting />
      <Greeting />
    </div>
  )
}

// Demo: Component with logic (UserCard)
function UserCard({ name, role, online }) {
  const initials = name.split(' ').map(n => n[0]).join('')
  return (
    <div className="flex items-center gap-3 bg-slate-800 border border-slate-700 rounded-xl p-3">
      <div className="w-10 h-10 rounded-full bg-indigo-600 flex items-center justify-center font-bold text-white text-sm flex-shrink-0">
        {initials}
      </div>
      <div className="flex-1 min-w-0">
        <p className="font-semibold text-white text-sm">{name}</p>
        <p className="text-xs text-slate-400">{role}</p>
      </div>
      <span className={`text-xs font-semibold ${online ? 'text-emerald-400' : 'text-slate-500'}`}>
        {online ? '● Online' : '○ Offline'}
      </span>
    </div>
  )
}

function UserCardDemo() {
  return (
    <div className="space-y-2">
      <p className="text-xs text-slate-500 mb-3">Same {'<UserCard />'} component — different props each time:</p>
      <UserCard name="Alice Johnson" role="Senior Developer" online={true} />
      <UserCard name="Bob Smith" role="Designer" online={false} />
      <UserCard name="Carol White" role="Product Manager" online={true} />
    </div>
  )
}

// Demo: Rendering lists
function FruitListDemo() {
  const fruits = [
    { id: 1, name: 'Apple' },
    { id: 2, name: 'Banana' },
    { id: 3, name: 'Cherry' },
    { id: 4, name: 'Mango' },
  ]
  return (
    <div>
      <p className="text-xs text-slate-500 mb-3">Array rendered with <code className="text-indigo-400">.map()</code> — each item needs a unique <code className="text-amber-400">key</code>:</p>
      <ul className="space-y-1">
        {fruits.map((fruit) => (
          <li key={fruit.id} className="flex items-center gap-2 text-sm text-slate-200">
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 flex-shrink-0" />
            {fruit.name}
          </li>
        ))}
      </ul>
      <p className="text-xs text-slate-600 mt-3">4 items in array → 4 {'<li>'} elements rendered automatically</p>
    </div>
  )
}

// Demo: Conditional rendering
function ConditionalDemo() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const username = 'Alice'
  return (
    <div className="space-y-3">
      <button
        onClick={() => setIsLoggedIn(v => !v)}
        className={`px-3 py-1.5 text-sm rounded-lg font-semibold transition-colors ${
          isLoggedIn
            ? 'bg-red-800 hover:bg-red-700 text-white'
            : 'bg-emerald-700 hover:bg-emerald-600 text-white'
        }`}
      >
        {isLoggedIn ? 'Log Out' : 'Log In'}
      </button>

      <div className="bg-slate-800 rounded-lg p-4 min-h-[80px]">
        {/* Conditional rendering in action */}
        {!isLoggedIn ? (
          <p className="text-slate-400 text-sm">Please log in to continue.</p>
        ) : (
          <div className="space-y-2">
            <p className="text-white font-semibold text-sm">Welcome back, {username}!</p>
            {/* && short-circuit — only renders if true */}
            {username.length > 3 && (
              <p className="text-xs text-indigo-300">Nice long username!</p>
            )}
            <p className="text-xs text-slate-400">You have 3 new notifications.</p>
          </div>
        )}
      </div>
      <p className="text-xs text-slate-600">Toggle login state — the UI updates based on the condition</p>
    </div>
  )
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default function Components() {
  return (
    <div className="space-y-10">
      <div>
        <p className="text-xs font-semibold text-sky-400 uppercase tracking-wider mb-2">React Basics</p>
        <h1 className="text-3xl font-bold text-white mb-3">JSX & Components</h1>
        <p className="text-slate-400 leading-relaxed">
          JSX is the syntax that makes React so intuitive — it lets you write HTML-like code directly in JavaScript.
          Components are reusable building blocks of your UI.
        </p>
      </div>

      {/* JSX */}
      <section>
        <h2 className="text-xl font-bold text-white mb-3">What is JSX?</h2>
        <p className="text-slate-400 text-sm mb-3">
          JSX stands for <strong className="text-white">JavaScript XML</strong>. It's not HTML — it's syntactic sugar that compiles to <code className="text-indigo-400">React.createElement()</code> calls.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="text-xs text-slate-500 mb-1 font-semibold">You write JSX:</p>
            <CodeBlock code={`const element = (
  <h1 className="title">
    Hello, World!
  </h1>
)`} />
          </div>
          <div>
            <p className="text-xs text-slate-500 mb-1 font-semibold">Compiled to JavaScript:</p>
            <CodeBlock code={`const element = React.createElement(
  'h1',
  { className: 'title' },
  'Hello, World!'
)`} />
          </div>
        </div>
      </section>

      {/* JSX Rules */}
      <section>
        <h2 className="text-xl font-bold text-white mb-3">JSX Rules</h2>
        <div className="space-y-6">
          <div>
            <h3 className="font-semibold text-slate-200 mb-2">1. Return a single root element</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div>
                <p className="text-xs text-red-400 font-semibold mb-1">❌ Error — two sibling elements</p>
                <CodeBlock code={`// This will fail!
return (
  <h1>Title</h1>
  <p>Paragraph</p>
)`} />
              </div>
              <div>
                <p className="text-xs text-green-400 font-semibold mb-1">✅ Wrap in a parent or Fragment</p>
                <CodeBlock code={`// Use a div, or Fragment <>
return (
  <>
    <h1>Title</h1>
    <p>Paragraph</p>
  </>
)`} />
              </div>
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-slate-200 mb-2">2. Close all tags</h3>
            <CodeBlock code={`// Self-closing tags must have /
<img src="photo.png" alt="photo" />
<input type="text" />
<br />`} />
          </div>

          <div>
            <h3 className="font-semibold text-slate-200 mb-2">3. Use camelCase for attributes</h3>
            <CodeBlock code={`// HTML attributes become camelCase in JSX
<div className="card">       {/* class → className */}
<label htmlFor="email">      {/* for → htmlFor */}
<button onClick={handleClick} {/* onclick → onClick */}
<input tabIndex={1} />       {/* tabindex → tabIndex */}`} />
          </div>

          <div>
            <h3 className="font-semibold text-slate-200 mb-2">4. Embed JavaScript with curly braces {'{}'}</h3>
            <CodeBlock code={`const name = 'Alice'
const age = 30

return (
  <div>
    <h1>Hello, {name}!</h1>
    <p>Age: {age}</p>
    <p>Born: {2024 - age}</p>
    <p>{age >= 18 ? 'Adult' : 'Minor'}</p>
  </div>
)`} />
            <LiveDemo title="JSX Expressions — rendered output">
              <JSXExpressionsDemo />
            </LiveDemo>
          </div>
        </div>
      </section>

      {/* Components */}
      <section>
        <h2 className="text-xl font-bold text-white mb-3">Your First Component</h2>
        <p className="text-slate-400 text-sm mb-3">
          A React component is a JavaScript function that returns JSX. Component names <strong className="text-white">must start with a capital letter</strong>.
        </p>
        <CodeBlock filename="src/components/Greeting.jsx" code={`// A simple functional component
function Greeting() {
  return (
    <div>
      <h1>Hello, React!</h1>
      <p>Welcome to the React Learning Hub.</p>
    </div>
  )
}

export default Greeting`} />
        <CodeBlock filename="src/App.jsx" code={`import Greeting from './components/Greeting'

function App() {
  return (
    <div>
      <Greeting />
      <Greeting />  {/* Reuse it as many times as you want! */}
      <Greeting />
    </div>
  )
}

export default App`} />
        <LiveDemo title="Greeting component — rendered 3 times from one definition">
          <GreetingDemo />
        </LiveDemo>
        <Callout type="beginner" title="Rule: Capital Letters Matter">
          <code className="text-slate-200">&lt;greeting /&gt;</code> would be treated as an HTML element, while <code className="text-slate-200">&lt;Greeting /&gt;</code> is treated as a React component. Always capitalize component names.
        </Callout>
      </section>

      {/* Component with logic */}
      <section>
        <h2 className="text-xl font-bold text-white mb-3">Components with Logic & Props</h2>
        <p className="text-slate-400 text-sm mb-3">
          You can put any JavaScript logic before the return statement, and pass data in via props:
        </p>
        <CodeBlock code={`function UserCard({ name, role, online }) {
  // Logic before the return
  const initials = name.split(' ').map(n => n[0]).join('')

  return (
    <div className="card">
      <div className="avatar">{initials}</div>
      <p>{name}</p>
      <p>{role}</p>
      <span style={{ color: online ? 'green' : 'gray' }}>
        {online ? '● Online' : '○ Offline'}
      </span>
    </div>
  )
}

// Use it multiple times with different data:
<UserCard name="Alice Johnson" role="Developer" online={true} />
<UserCard name="Bob Smith"     role="Designer"  online={false} />`} />
        <LiveDemo title="UserCard component — same code, different props">
          <UserCardDemo />
        </LiveDemo>
      </section>

      {/* Rendering lists */}
      <section>
        <h2 className="text-xl font-bold text-white mb-3">Rendering Lists</h2>
        <p className="text-slate-400 text-sm mb-3">
          Use <code className="text-indigo-400">.map()</code> to render arrays of items. Always provide a unique <code className="text-indigo-400">key</code> prop.
        </p>
        <CodeBlock code={`function FruitList() {
  const fruits = [
    { id: 1, name: 'Apple' },
    { id: 2, name: 'Banana' },
    { id: 3, name: 'Cherry' },
    { id: 4, name: 'Mango' },
  ]

  return (
    <ul>
      {fruits.map((fruit) => (
        <li key={fruit.id}>{fruit.name}</li>
        //  ↑ key is required — use a unique ID, not the index
      ))}
    </ul>
  )
}`} />
        <LiveDemo title="Array → rendered list elements">
          <FruitListDemo />
        </LiveDemo>
        <Callout type="warning" title="Why keys matter">
          Keys help React identify which items changed, were added, or removed. Use stable, unique IDs (not array indexes) when items can reorder.
        </Callout>
      </section>

      {/* Conditional rendering */}
      <section>
        <h2 className="text-xl font-bold text-white mb-3">Conditional Rendering</h2>
        <p className="text-slate-400 text-sm mb-3">React renders different UI based on conditions — no special syntax, just JavaScript:</p>
        <CodeBlock code={`function Dashboard({ isLoggedIn, username }) {
  // Method 1: if/else before return
  if (!isLoggedIn) {
    return <p>Please log in.</p>
  }

  return (
    <div>
      {/* Method 2: Ternary operator */}
      <h1>{isLoggedIn ? \`Welcome, \${username}!\` : 'Guest'}</h1>

      {/* Method 3: && short-circuit (only renders if true) */}
      {username.length > 3 && <p>Nice long username!</p>}
    </div>
  )
}`} />
        <LiveDemo title="Conditional rendering — click Log In to see the UI change">
          <ConditionalDemo />
        </LiveDemo>
      </section>

      {/* Class-based components */}
      <section>
        <h2 className="text-xl font-bold text-white mb-3">Class Components <span className="text-sm font-normal text-slate-500">(Legacy)</span></h2>
        <p className="text-slate-400 text-sm mb-4">
          Before hooks were introduced in React 16.8 (2019), state and lifecycle methods could only be used inside <strong className="text-white">class components</strong>. You'll see them in older codebases, so it's good to recognise them — but <strong className="text-white">write function components for all new code</strong>.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <p className="text-xs text-slate-500 font-semibold mb-1">Class component (old way)</p>
            <CodeBlock code={`import { Component } from 'react'

class Counter extends Component {
  // State defined in constructor
  constructor(props) {
    super(props)
    this.state = { count: 0 }
  }

  // Lifecycle: runs after mount
  componentDidMount() {
    document.title = 'Counter'
  }

  // Lifecycle: runs before unmount
  componentWillUnmount() {
    document.title = 'App'
  }

  render() {
    return (
      <div>
        <p>{this.state.count}</p>
        <button onClick={() =>
          this.setState({ count: this.state.count + 1 })
        }>
          Increment
        </button>
      </div>
    )
  }
}

export default Counter`} />
          </div>
          <div>
            <p className="text-xs text-emerald-400 font-semibold mb-1">Function component (modern equivalent)</p>
            <CodeBlock code={`import { useState, useEffect } from 'react'

function Counter() {
  // useState replaces this.state
  const [count, setCount] = useState(0)

  // useEffect replaces lifecycle methods
  useEffect(() => {
    document.title = 'Counter'
    return () => { document.title = 'App' }
  }, [])

  return (
    <div>
      <p>{count}</p>
      <button onClick={() => setCount(c => c + 1)}>
        Increment
      </button>
    </div>
  )
}

export default Counter`} />
          </div>
        </div>

        <div className="overflow-hidden rounded-xl border border-slate-700/50 mb-4">
          <table className="w-full text-sm">
            <thead className="bg-slate-800">
              <tr>
                <th className="text-left px-4 py-3 text-slate-300 font-semibold"></th>
                <th className="text-left px-4 py-3 text-amber-300 font-semibold">Class Component</th>
                <th className="text-left px-4 py-3 text-emerald-300 font-semibold">Function Component</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 text-xs">
              {[
                ['State',          'this.state + this.setState()',   'useState()'],
                ['Side effects',   'componentDidMount / WillUnmount', 'useEffect()'],
                ['Props',          'this.props.name',               'function({ name })'],
                ['Refs',           'React.createRef()',             'useRef()'],
                ['Boilerplate',    'Lots (constructor, super, this)', 'Minimal'],
                ['Hooks support',  '✗ Cannot use hooks',            '✓ Full hook support'],
              ].map(([label, cls, fn]) => (
                <tr key={label} className="bg-slate-900/50">
                  <td className="px-4 py-2.5 text-slate-400 font-medium">{label}</td>
                  <td className="px-4 py-2.5 text-slate-300 font-mono">{cls}</td>
                  <td className="px-4 py-2.5 text-slate-300 font-mono">{fn}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <Callout type="info" title="Key things to know">
          <ul className="space-y-1 mt-1">
            <li>• Class components use <code className="text-slate-200">this.state</code> and <code className="text-slate-200">this.setState()</code> instead of <code className="text-slate-200">useState</code></li>
            <li>• Lifecycle methods (<code className="text-slate-200">componentDidMount</code>, <code className="text-slate-200">componentDidUpdate</code>, <code className="text-slate-200">componentWillUnmount</code>) replace <code className="text-slate-200">useEffect</code></li>
            <li>• They extend <code className="text-slate-200">React.Component</code> and must have a <code className="text-slate-200">render()</code> method</li>
            <li>• They cannot use hooks at all — that's the main reason function components won</li>
          </ul>
        </Callout>

        <div className="mt-4">
          <p className="text-xs font-semibold text-slate-400 mb-2">One place class components are still required — Error Boundaries:</p>
          <CodeBlock code={`// Error Boundaries can only be written as class components
class ErrorBoundary extends Component {
  state = { hasError: false }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  componentDidCatch(error, info) {
    console.error('Caught:', error, info)
  }

  render() {
    if (this.state.hasError) {
      return <h2>Something went wrong.</h2>
    }
    return this.props.children
  }
}

// Usage — wraps any subtree to catch render errors
<ErrorBoundary>
  <MyComponent />
</ErrorBoundary>`} />
          <Callout type="tip" title="Error Boundaries">
            This is the one case where you still need a class component today. Libraries like <code className="text-slate-200">react-error-boundary</code> wrap this pattern for you so you rarely write the class yourself.
          </Callout>
        </div>
      </section>

      <PageNav currentPath="/components" />
    </div>
  )
}
