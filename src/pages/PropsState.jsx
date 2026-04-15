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

// Demo: Props — interactive button customizer
function Button({ label, color, size, disabled }) {
  const sizeClasses = { sm: 'text-xs px-2.5 py-1', md: 'text-sm px-4 py-2', lg: 'text-base px-5 py-2.5' }
  const colorClasses = {
    blue: 'bg-blue-600 hover:bg-blue-500',
    green: 'bg-emerald-600 hover:bg-emerald-500',
    red: 'bg-red-600 hover:bg-red-500',
    purple: 'bg-violet-600 hover:bg-violet-500',
  }
  return (
    <button
      disabled={disabled}
      className={`rounded-lg text-white font-semibold transition-colors ${sizeClasses[size] || sizeClasses.md} ${colorClasses[color] || colorClasses.blue} disabled:opacity-40 disabled:cursor-not-allowed`}
    >
      {label}
    </button>
  )
}

function PropsDemo() {
  const [color, setColor] = useState('blue')
  const [size, setSize] = useState('md')
  const [disabled, setDisabled] = useState(false)
  const [label, setLabel] = useState('Click Me')

  return (
    <div className="space-y-4">
      <p className="text-xs text-slate-500">Adjust the props below and watch the component update:</p>

      {/* Controls */}
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="text-xs text-slate-400 block mb-1">label prop</label>
          <input
            value={label}
            onChange={e => setLabel(e.target.value)}
            className="w-full bg-slate-800 border border-slate-700 rounded-lg px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-indigo-500"
          />
        </div>
        <div>
          <label className="text-xs text-slate-400 block mb-1">color prop</label>
          <select
            value={color}
            onChange={e => setColor(e.target.value)}
            className="w-full bg-slate-800 border border-slate-700 rounded-lg px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-indigo-500"
          >
            {['blue', 'green', 'red', 'purple'].map(c => <option key={c}>{c}</option>)}
          </select>
        </div>
        <div>
          <label className="text-xs text-slate-400 block mb-1">size prop</label>
          <select
            value={size}
            onChange={e => setSize(e.target.value)}
            className="w-full bg-slate-800 border border-slate-700 rounded-lg px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-indigo-500"
          >
            {['sm', 'md', 'lg'].map(s => <option key={s}>{s}</option>)}
          </select>
        </div>
        <div>
          <label className="text-xs text-slate-400 block mb-1">disabled prop</label>
          <button
            onClick={() => setDisabled(d => !d)}
            className={`w-full rounded-lg px-2.5 py-1.5 text-xs font-semibold transition-colors ${disabled ? 'bg-red-800 text-red-200' : 'bg-slate-700 text-slate-300'}`}
          >
            {disabled ? 'true' : 'false'}
          </button>
        </div>
      </div>

      {/* Result */}
      <div className="bg-slate-800 rounded-lg p-4 flex items-center gap-4">
        <Button label={label} color={color} size={size} disabled={disabled} />
        <code className="text-xs text-slate-400 flex-1">
          {'<Button'}<br />
          {'  label="'}{label}{'"'}<br />
          {'  color="'}{color}{'"'}<br />
          {'  size="'}{size}{'"'}<br />
          {'  disabled={'}{'{' + disabled + '}'}<br />
          {'/>'}
        </code>
      </div>
    </div>
  )
}

// Demo: children prop
function Card({ title, children }) {
  return (
    <div className="bg-slate-800 border border-slate-700 rounded-xl overflow-hidden">
      <div className="px-4 py-2.5 bg-slate-750 border-b border-slate-700">
        <h3 className="text-sm font-semibold text-white">{title}</h3>
      </div>
      <div className="p-4">{children}</div>
    </div>
  )
}

function ChildrenDemo() {
  return (
    <div className="space-y-3">
      <p className="text-xs text-slate-500">Same {'<Card />'} component — different children each time:</p>
      <Card title="User Profile">
        <p className="text-sm text-slate-300">Name: Alice Johnson</p>
        <p className="text-sm text-slate-300">Role: Developer</p>
        <button className="mt-2 text-xs bg-indigo-600 hover:bg-indigo-500 text-white px-3 py-1.5 rounded-lg transition-colors">Edit Profile</button>
      </Card>
      <Card title="Stats">
        <div className="flex gap-4">
          <div className="text-center"><div className="text-xl font-bold text-indigo-300">142</div><div className="text-xs text-slate-500">Commits</div></div>
          <div className="text-center"><div className="text-xl font-bold text-emerald-300">38</div><div className="text-xs text-slate-500">PRs</div></div>
          <div className="text-center"><div className="text-xl font-bold text-amber-300">12</div><div className="text-xs text-slate-500">Issues</div></div>
        </div>
      </Card>
    </div>
  )
}

// Demo: State vs Props side by side
function StateVsPropsDemo() {
  const [stateCount, setStateCount] = useState(0)
  const propValue = 42  // fixed — can't change

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {/* Props side */}
      <div className="bg-slate-800 border border-sky-500/30 rounded-xl p-4">
        <div className="text-xs font-bold text-sky-400 uppercase tracking-wider mb-3">Props</div>
        <div className="text-3xl font-bold text-white mb-2">{propValue}</div>
        <p className="text-xs text-slate-400 mb-3">This value comes from outside. It cannot be changed here.</p>
        <div className="flex gap-2">
          <button disabled className="px-3 py-1.5 text-xs bg-slate-700 text-slate-500 rounded-lg cursor-not-allowed">
            Can't change props ✕
          </button>
        </div>
      </div>

      {/* State side */}
      <div className="bg-slate-800 border border-violet-500/30 rounded-xl p-4">
        <div className="text-xs font-bold text-violet-400 uppercase tracking-wider mb-3">State</div>
        <div className="text-3xl font-bold text-white mb-2">{stateCount}</div>
        <p className="text-xs text-slate-400 mb-3">This value lives inside the component. It can change.</p>
        <div className="flex gap-2">
          <button onClick={() => setStateCount(c => c - 1)} className="px-3 py-1.5 text-xs bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition-colors">−</button>
          <button onClick={() => setStateCount(c => c + 1)} className="px-3 py-1.5 text-xs bg-violet-600 hover:bg-violet-500 text-white rounded-lg transition-colors">+</button>
          <button onClick={() => setStateCount(0)} className="px-3 py-1.5 text-xs text-slate-500 hover:text-slate-300 transition-colors">Reset</button>
        </div>
      </div>
    </div>
  )
}

// Demo: Lifting state up
function ChildA({ count, onIncrement }) {
  return (
    <div className="bg-slate-800 border border-slate-700 rounded-lg p-3">
      <p className="text-xs text-slate-500 mb-1">Child A</p>
      <p className="text-sm text-white mb-2">Count: <strong className="text-indigo-300">{count}</strong></p>
      <button onClick={onIncrement} className="text-xs bg-indigo-600 hover:bg-indigo-500 text-white px-2.5 py-1 rounded-lg transition-colors">
        Increment from A
      </button>
    </div>
  )
}

function ChildB({ count }) {
  return (
    <div className="bg-slate-800 border border-slate-700 rounded-lg p-3">
      <p className="text-xs text-slate-500 mb-1">Child B</p>
      <p className="text-sm text-white">I see it too: <strong className="text-emerald-300">{count}</strong></p>
      <p className="text-xs text-slate-500 mt-1">Shared via parent state</p>
    </div>
  )
}

function LiftingStateDemo() {
  const [count, setCount] = useState(0)  // state lives in the parent

  return (
    <div className="space-y-3">
      <div className="bg-slate-900 border border-amber-500/20 rounded-xl p-3">
        <p className="text-xs font-semibold text-amber-400 mb-1">Parent Component (holds the state)</p>
        <p className="text-xs text-slate-500">count = <strong className="text-white">{count}</strong> — shared down to both children as a prop</p>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <ChildA count={count} onIncrement={() => setCount(c => c + 1)} />
        <ChildB count={count} />
      </div>
      <p className="text-xs text-slate-600">When Child A increments, both A and B see the new count — because state lives in the parent.</p>
    </div>
  )
}

// Demo: Passing functions as props
function ParentChildDemo() {
  const [message, setMessage] = useState('(nothing yet)')

  return (
    <div className="space-y-3">
      <div className="bg-slate-800 rounded-lg p-3">
        <p className="text-xs text-slate-500">Parent received:</p>
        <p className="text-sm font-semibold text-indigo-300 mt-1">{message}</p>
      </div>
      <div className="bg-slate-800/50 border border-slate-700/50 rounded-lg p-3">
        <p className="text-xs text-slate-500 mb-2">Child component (click a button):</p>
        <div className="flex flex-wrap gap-2">
          {['Hello from child!', 'Button A clicked', 'Button B clicked', 'SOS!'].map(msg => (
            <button
              key={msg}
              onClick={() => setMessage(msg)}
              className="text-xs bg-slate-700 hover:bg-slate-600 text-white px-2.5 py-1.5 rounded-lg transition-colors"
            >
              "{msg}"
            </button>
          ))}
        </div>
      </div>
      <p className="text-xs text-slate-600">The child calls the function passed down as a prop — the parent's state updates.</p>
    </div>
  )
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default function PropsState() {
  return (
    <div className="space-y-10">
      <div>
        <p className="text-xs font-semibold text-sky-400 uppercase tracking-wider mb-2">React Basics</p>
        <h1 className="text-3xl font-bold text-white mb-3">Props & State</h1>
        <p className="text-slate-400 leading-relaxed">
          Props and state are the two ways data flows in React. Every React app uses both — understanding the difference unlocks how components talk to each other.
        </p>
      </div>

      {/* Plain English analogy */}
      <div className="bg-sky-500/10 border border-sky-500/30 rounded-xl p-5">
        <p className="text-xs font-bold text-sky-300 uppercase tracking-wider mb-4">Think of it like this</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="bg-slate-900/60 rounded-xl p-4">
            <div className="text-2xl mb-2">📬</div>
            <p className="font-semibold text-white text-sm mb-1">Props = a letter from your parent</p>
            <p className="text-xs text-slate-400 leading-relaxed mb-2">
              A parent component sends data down to a child — just like passing arguments into a function. The child can <em>read</em> that data, but it cannot change it. Props always flow <strong className="text-white">one direction: down</strong>.
            </p>
            <p className="text-xs text-slate-500">Example: <code className="text-sky-300">{'<Button color="blue" />'}</code> — the Button receives the color but can't change it</p>
          </div>
          <div className="bg-slate-900/60 rounded-xl p-4">
            <div className="text-2xl mb-2">🧠</div>
            <p className="font-semibold text-white text-sm mb-1">State = the component's own memory</p>
            <p className="text-xs text-slate-400 leading-relaxed mb-2">
              State is data that <em>lives inside</em> a component and can change over time. When state changes, React re-draws the component with the new value. Think of it as a sticky note the component writes to itself.
            </p>
            <p className="text-xs text-slate-500">Example: a counter tracks its own count — nobody gives it the number, it owns it</p>
          </div>
        </div>
        <div className="mt-4 p-3 bg-slate-900/40 rounded-lg">
          <p className="text-xs text-slate-400"><strong className="text-white">One-line rule:</strong> If the data comes from <em>outside</em> → it's a <strong className="text-sky-300">prop</strong>. If the component <em>owns and changes</em> it → it's <strong className="text-violet-300">state</strong>.</p>
        </div>
      </div>

      {/* Props */}
      <section>
        <h2 className="text-xl font-bold text-white mb-3">Props (Properties)</h2>
        <p className="text-slate-400 text-sm mb-3">
          Props are <strong className="text-white">read-only inputs</strong> passed from a parent component to a child. Think of them like function arguments — you receive them, but you don't own them.
        </p>
        <Callout type="beginner" title="Why can't a child change its props?">
          Imagine if you ordered a pizza and the delivery driver changed your order on the way. Chaos! Props work the same way — the parent decides what gets sent, and the child just uses it. This rule keeps data flow predictable: you always know where data came from by looking one level up.
        </Callout>
        <CodeBlock code={`// Parent component passes props
function App() {
  return (
    <div>
      <Button label="Click Me" color="blue" size="md" />
      <Button label="Submit" color="green" size="lg" disabled={true} />
    </div>
  )
}

// Child receives props as the first argument
function Button({ label, color, size, disabled }) {
  return (
    <button disabled={disabled} className={\`btn btn-\${color} btn-\${size}\`}>
      {label}
    </button>
  )
}`} />
        <LiveDemo title="Props — change the props and watch the component update">
          <PropsDemo />
        </LiveDemo>
      </section>

      {/* Destructuring */}
      <section>
        <h2 className="text-xl font-bold text-white mb-3">Destructuring Props</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="text-xs text-slate-500 mb-1 font-semibold">Without destructuring:</p>
            <CodeBlock code={`function Card(props) {
  return (
    <div>
      <h2>{props.title}</h2>
      <p>{props.description}</p>
      <span>{props.author}</span>
    </div>
  )
}`} />
          </div>
          <div>
            <p className="text-xs text-slate-500 mb-1 font-semibold">With destructuring (preferred):</p>
            <CodeBlock code={`function Card({ title, description, author }) {
  return (
    <div>
      <h2>{title}</h2>
      <p>{description}</p>
      <span>{author}</span>
    </div>
  )
}`} />
          </div>
        </div>
      </section>

      {/* Default props */}
      <section>
        <h2 className="text-xl font-bold text-white mb-3">Default Props</h2>
        <CodeBlock code={`function Avatar({ name, size = 40, shape = 'circle' }) {
  //            ↑ default values using destructuring

  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: shape === 'circle' ? '50%' : '8px',
        background: '#6366f1',
      }}
    >
      {name[0].toUpperCase()}
    </div>
  )
}

// Usage:
<Avatar name="Alice" />               // size=40, shape=circle
<Avatar name="Bob" size={60} />       // size=60, shape=circle
<Avatar name="Carol" shape="square" /> // size=40, shape=square`} />
      </section>

      {/* Children prop */}
      <section>
        <h2 className="text-xl font-bold text-white mb-3">The children Prop</h2>
        <p className="text-slate-400 text-sm mb-3">
          <code className="text-indigo-400">children</code> is a special prop that represents whatever is nested between your component's opening and closing tags.
        </p>
        <CodeBlock code={`// Layout component that wraps content
function Card({ title, children }) {
  return (
    <div className="card">
      <h2 className="card-title">{title}</h2>
      <div className="card-body">
        {children}   {/* Anything between <Card> and </Card> */}
      </div>
    </div>
  )
}

// Usage:
<Card title="User Profile">
  <p>Name: Alice</p>
  <p>Role: Developer</p>
  <button>Edit Profile</button>
</Card>

<Card title="Stats">
  <div>142 Commits · 38 PRs</div>
</Card>`} />
        <LiveDemo title="children prop — same Card wrapper, different content inside">
          <ChildrenDemo />
        </LiveDemo>
      </section>

      {/* State vs Props */}
      <section>
        <h2 className="text-xl font-bold text-white mb-3">State vs Props</h2>
        <div className="overflow-hidden rounded-xl border border-slate-700/50 mb-4">
          <table className="w-full text-sm">
            <thead className="bg-slate-800">
              <tr>
                <th className="text-left px-4 py-3 text-slate-300 font-semibold"></th>
                <th className="text-left px-4 py-3 text-sky-300 font-semibold">Props</th>
                <th className="text-left px-4 py-3 text-violet-300 font-semibold">State</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {[
                ['Where it comes from', 'Passed from parent', 'Defined inside component'],
                ['Can change?', 'No (read-only)', 'Yes (via setState)'],
                ['Who controls it?', 'Parent component', 'The component itself'],
                ['Re-renders when changed?', 'Yes (parent re-renders)', 'Yes (component re-renders)'],
              ].map(([aspect, props, state]) => (
                <tr key={aspect} className="bg-slate-900/50">
                  <td className="px-4 py-2.5 text-slate-400 font-medium">{aspect}</td>
                  <td className="px-4 py-2.5 text-slate-300">{props}</td>
                  <td className="px-4 py-2.5 text-slate-300">{state}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <LiveDemo title="Props vs State — side by side">
          <StateVsPropsDemo />
        </LiveDemo>
        <Callout type="info" title="Simple Rule">
          If a value can change over time and needs to cause a re-render, it's <strong>state</strong>. If it's passed in from outside and doesn't change, it's a <strong>prop</strong>.
        </Callout>
      </section>

      {/* Lifting state */}
      <section>
        <h2 className="text-xl font-bold text-white mb-3">Lifting State Up</h2>
        <p className="text-slate-400 text-sm mb-3">
          When two sibling components need to share the same data, move that state up to their common parent and pass it down as props to both.
        </p>
        <div className="bg-amber-500/10 border border-amber-500/30 rounded-xl p-4 mb-4">
          <p className="text-xs font-bold text-amber-300 uppercase tracking-wider mb-2">Plain English — why "lift" state?</p>
          <p className="text-sm text-slate-300">
            Imagine two siblings sharing a TV remote. Neither sibling <em>owns</em> the remote — it lives in the living room (the parent) and both can use it. In React, when two components need to share data, put that data in their <strong className="text-white">nearest common parent</strong> and pass it down to each. That parent becomes the single source of truth.
          </p>
        </div>
        <CodeBlock code={`function Parent() {
  const [count, setCount] = useState(0)  // ← state lives here

  return (
    <div>
      <ChildA count={count} onIncrement={() => setCount(c => c + 1)} />
      <ChildB count={count} />  {/* Both children share the same count */}
    </div>
  )
}

function ChildA({ count, onIncrement }) {
  return <button onClick={onIncrement}>Count: {count}</button>
}

function ChildB({ count }) {
  return <p>I also see: {count}</p>
}`} />
        <LiveDemo title="Lifting state — shared count between two sibling components">
          <LiftingStateDemo />
        </LiveDemo>
      </section>

      {/* Prop drilling */}
      <section>
        <h2 className="text-xl font-bold text-white mb-3">Prop Drilling (and why to avoid it)</h2>
        <p className="text-slate-400 text-sm mb-3">
          Passing props through many layers is called "prop drilling." It becomes painful when the chain is deep — imagine passing a baton through 6 runners just so the last one can use it.
        </p>
        <CodeBlock code={`// Prop drilling problem — user passed through every level
function App() {
  const user = { name: 'Alice' }
  return <Dashboard user={user} />
}

function Dashboard({ user }) {
  return <Sidebar user={user} />   // Dashboard doesn't use user, just passes it
}

function Sidebar({ user }) {
  return <UserMenu user={user} />  // Same here
}

function UserMenu({ user }) {
  return <span>{user.name}</span>  // Finally used here!
}

// Solution: useContext (covered in the useContext chapter)`} />
      </section>

      {/* Passing functions as props */}
      <section>
        <h2 className="text-xl font-bold text-white mb-3">Passing Functions as Props</h2>
        <p className="text-slate-400 text-sm mb-3">
          Pass functions as props to let child components communicate back to parents:
        </p>
        <CodeBlock code={`function App() {
  const [message, setMessage] = useState('')

  function handleChildClick(text) {
    setMessage(text)
  }

  return (
    <div>
      <p>Message from child: {message}</p>
      <ChildButton onClick={handleChildClick} />
    </div>
  )
}

function ChildButton({ onClick }) {
  return (
    <button onClick={() => onClick('Hello from child!')}>
      Send message to parent
    </button>
  )
}`} />
        <LiveDemo title="Functions as props — child sends data up to parent">
          <ParentChildDemo />
        </LiveDemo>
      </section>

      <PageNav currentPath="/props-state" />
    </div>
  )
}
