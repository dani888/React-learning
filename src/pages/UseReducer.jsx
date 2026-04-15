import { useReducer } from 'react'
import CodeBlock from '../components/CodeBlock'
import Callout from '../components/Callout'
import PageNav from '../components/PageNav'

// Live demo — shopping cart with useReducer
const initialCart = { items: [], total: 0 }

function cartReducer(state, action) {
  switch (action.type) {
    case 'ADD': {
      const existing = state.items.find(i => i.id === action.item.id)
      if (existing) {
        return {
          ...state,
          items: state.items.map(i => i.id === action.item.id ? { ...i, qty: i.qty + 1 } : i),
          total: state.total + action.item.price,
        }
      }
      return {
        ...state,
        items: [...state.items, { ...action.item, qty: 1 }],
        total: state.total + action.item.price,
      }
    }
    case 'REMOVE': {
      const item = state.items.find(i => i.id === action.id)
      return {
        ...state,
        items: state.items.filter(i => i.id !== action.id),
        total: state.total - (item?.price * item?.qty || 0),
      }
    }
    case 'CLEAR':
      return initialCart
    default:
      return state
  }
}

const products = [
  { id: 1, name: 'React Book', price: 29 },
  { id: 2, name: 'Tailwind Course', price: 49 },
  { id: 3, name: 'Node.js Guide', price: 19 },
]

function CartDemo() {
  const [cart, dispatch] = useReducer(cartReducer, initialCart)

  return (
    <div className="space-y-4">
      <div>
        <p className="text-xs text-slate-500 mb-2 font-semibold">Products:</p>
        <div className="flex flex-wrap gap-2">
          {products.map(p => (
            <button key={p.id} onClick={() => dispatch({ type: 'ADD', item: p })}
              className="px-3 py-1.5 text-xs bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg transition-colors">
              + {p.name} (${p.price})
            </button>
          ))}
        </div>
      </div>
      <div>
        <p className="text-xs text-slate-500 mb-2 font-semibold">Cart ({cart.items.length} items):</p>
        {cart.items.length === 0 && <p className="text-xs text-slate-600 italic">Cart is empty</p>}
        <div className="space-y-1.5">
          {cart.items.map(item => (
            <div key={item.id} className="flex items-center justify-between bg-slate-800 rounded-lg px-3 py-2">
              <span className="text-sm text-white">{item.name} × {item.qty}</span>
              <div className="flex items-center gap-2">
                <span className="text-xs text-emerald-400">${item.price * item.qty}</span>
                <button onClick={() => dispatch({ type: 'REMOVE', id: item.id })}
                  className="text-xs text-red-400 hover:text-red-300">✕</button>
              </div>
            </div>
          ))}
        </div>
        {cart.items.length > 0 && (
          <div className="flex justify-between items-center mt-3 pt-3 border-t border-slate-700">
            <span className="text-sm font-bold text-white">Total: ${cart.total}</span>
            <button onClick={() => dispatch({ type: 'CLEAR' })}
              className="text-xs text-slate-400 hover:text-slate-200">Clear cart</button>
          </div>
        )}
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

export default function UseReducer() {
  return (
    <div className="space-y-10">
      <div>
        <p className="text-xs font-semibold text-violet-400 uppercase tracking-wider mb-2">React Hooks</p>
        <h1 className="text-3xl font-bold text-white mb-3">useReducer</h1>
        <p className="text-slate-400 leading-relaxed">
          <code className="text-violet-300 bg-violet-500/10 px-1.5 py-0.5 rounded">useReducer</code> is an alternative to <code className="text-violet-300 bg-violet-500/10 px-1.5 py-0.5 rounded">useState</code> for when your state has many pieces that change together, or you have multiple ways to update it.
        </p>
      </div>

      {/* Plain English */}
      <div className="bg-violet-500/10 border border-violet-500/30 rounded-xl p-5">
        <p className="text-xs font-bold text-violet-300 uppercase tracking-wider mb-3">Think of it like a vending machine</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center text-sm">
          <div className="bg-slate-900/60 rounded-xl p-4">
            <div className="text-3xl mb-2">🙋</div>
            <p className="font-semibold text-white mb-1">You press a button</p>
            <p className="text-xs text-slate-400">= dispatching an action like <code className="text-violet-300">{'{ type: "ADD" }'}</code></p>
          </div>
          <div className="bg-slate-900/60 rounded-xl p-4">
            <div className="text-3xl mb-2">⚙️</div>
            <p className="font-semibold text-white mb-1">Machine processes it</p>
            <p className="text-xs text-slate-400">= the reducer function reads the action and decides what new state to return</p>
          </div>
          <div className="bg-slate-900/60 rounded-xl p-4">
            <div className="text-3xl mb-2">🎁</div>
            <p className="font-semibold text-white mb-1">You get a result</p>
            <p className="text-xs text-slate-400">= new state is returned, component re-renders with the updated data</p>
          </div>
        </div>
        <div className="mt-4 p-3 bg-slate-900/40 rounded-lg">
          <p className="text-xs text-slate-400"><strong className="text-white">Key idea:</strong> Instead of many separate <code className="text-violet-300">setState</code> calls scattered through your code, all state logic lives in one place — the reducer function. This makes it easier to understand and test.</p>
        </div>
      </div>

      {/* useState vs useReducer */}
      <section>
        <h2 className="text-xl font-bold text-white mb-3">useState vs useReducer</h2>
        <div className="overflow-hidden rounded-xl border border-slate-700/50">
          <table className="w-full text-sm">
            <thead className="bg-slate-800">
              <tr>
                <th className="text-left px-4 py-3 text-slate-300 font-semibold"></th>
                <th className="text-left px-4 py-3 text-violet-300 font-semibold">useState</th>
                <th className="text-left px-4 py-3 text-cyan-300 font-semibold">useReducer</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {[
                ['Best for', 'Simple values (boolean, number, string)', 'Complex objects with multiple sub-values'],
                ['Update style', 'Direct: setValue(newVal)', 'Dispatch actions: dispatch({type: "ADD"})'],
                ['Logic location', 'Inline in event handlers', 'Centralized in reducer function'],
                ['Testing', 'Hard to test alone', 'Pure function — easy to test'],
              ].map(([label, s, r]) => (
                <tr key={label} className="bg-slate-900/50">
                  <td className="px-4 py-2.5 text-slate-400 font-medium text-xs">{label}</td>
                  <td className="px-4 py-2.5 text-slate-300 text-xs">{s}</td>
                  <td className="px-4 py-2.5 text-slate-300 text-xs">{r}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Syntax */}
      <section>
        <h2 className="text-xl font-bold text-white mb-3">Syntax</h2>
        <CodeBlock code={`import { useReducer } from 'react'

// 1. Define the reducer — a pure function
function reducer(state, action) {
  switch (action.type) {
    case 'INCREMENT':
      return { ...state, count: state.count + 1 }
    case 'DECREMENT':
      return { ...state, count: state.count - 1 }
    case 'RESET':
      return { count: 0 }
    default:
      return state  // Always return state for unknown actions
  }
}

// 2. Use the reducer in a component
function Counter() {
  const [state, dispatch] = useReducer(reducer, { count: 0 })
  //     ↑               ↑              ↑           ↑
  //  current state   dispatch fn    reducer fn   initial state

  return (
    <div>
      <p>{state.count}</p>
      <button onClick={() => dispatch({ type: 'INCREMENT' })}>+</button>
      <button onClick={() => dispatch({ type: 'DECREMENT' })}>-</button>
      <button onClick={() => dispatch({ type: 'RESET' })}>Reset</button>
    </div>
  )
}`} />
      </section>

      {/* Actions with payload */}
      <section>
        <h2 className="text-xl font-bold text-white mb-3">Actions with Payload</h2>
        <p className="text-slate-400 text-sm mb-3">Actions can carry data via a <code className="text-slate-300">payload</code> property:</p>
        <CodeBlock code={`function todoReducer(state, action) {
  switch (action.type) {
    case 'ADD_TODO':
      return {
        ...state,
        todos: [...state.todos, { id: Date.now(), text: action.payload, done: false }]
      }
    case 'TOGGLE_TODO':
      return {
        ...state,
        todos: state.todos.map(t =>
          t.id === action.payload ? { ...t, done: !t.done } : t
        )
      }
    case 'DELETE_TODO':
      return {
        ...state,
        todos: state.todos.filter(t => t.id !== action.payload)
      }
    case 'SET_FILTER':
      return { ...state, filter: action.payload }
    default:
      return state
  }
}

function TodoApp() {
  const [state, dispatch] = useReducer(todoReducer, {
    todos: [],
    filter: 'all'
  })

  return (
    <div>
      <button onClick={() => dispatch({ type: 'ADD_TODO', payload: 'Buy milk' })}>
        Add Todo
      </button>
      <button onClick={() => dispatch({ type: 'TOGGLE_TODO', payload: 1 })}>
        Toggle #1
      </button>
      <button onClick={() => dispatch({ type: 'SET_FILTER', payload: 'done' })}>
        Show Done
      </button>
    </div>
  )
}`} />
      </section>

      {/* Shopping cart demo */}
      <section>
        <h2 className="text-xl font-bold text-white mb-3">Real Example: Shopping Cart</h2>
        <LiveDemo title="Shopping Cart (useReducer)">
          <CartDemo />
        </LiveDemo>
        <CodeBlock code={`const initialCart = { items: [], total: 0 }

function cartReducer(state, action) {
  switch (action.type) {
    case 'ADD': {
      const existing = state.items.find(i => i.id === action.item.id)
      if (existing) {
        return {
          ...state,
          items: state.items.map(i =>
            i.id === action.item.id ? { ...i, qty: i.qty + 1 } : i
          ),
          total: state.total + action.item.price,
        }
      }
      return {
        ...state,
        items: [...state.items, { ...action.item, qty: 1 }],
        total: state.total + action.item.price,
      }
    }
    case 'REMOVE': {
      const item = state.items.find(i => i.id === action.id)
      return {
        ...state,
        items: state.items.filter(i => i.id !== action.id),
        total: state.total - (item.price * item.qty),
      }
    }
    case 'CLEAR':
      return initialCart
    default:
      return state
  }
}

function Cart() {
  const [cart, dispatch] = useReducer(cartReducer, initialCart)

  return (
    <div>
      <button onClick={() => dispatch({ type: 'ADD', item: { id: 1, name: 'Book', price: 29 } })}>
        Add Book
      </button>
      <button onClick={() => dispatch({ type: 'REMOVE', id: 1 })}>Remove</button>
      <button onClick={() => dispatch({ type: 'CLEAR' })}>Clear Cart</button>
      <p>Total: \${cart.total}</p>
    </div>
  )
}`} />
      </section>

      {/* useReducer + useContext */}
      <section>
        <h2 className="text-xl font-bold text-white mb-3">useReducer + useContext = Global State</h2>
        <p className="text-slate-400 text-sm mb-3">Combine them for a lightweight Redux-like global state solution:</p>
        <CodeBlock code={`// store.jsx
import { createContext, useContext, useReducer } from 'react'

const StoreContext = createContext(null)
const DispatchContext = createContext(null)

function reducer(state, action) {
  switch (action.type) {
    case 'SET_USER': return { ...state, user: action.payload }
    case 'TOGGLE_THEME': return { ...state, theme: state.theme === 'dark' ? 'light' : 'dark' }
    default: return state
  }
}

export function StoreProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, { user: null, theme: 'dark' })

  return (
    <StoreContext.Provider value={state}>
      <DispatchContext.Provider value={dispatch}>
        {children}
      </DispatchContext.Provider>
    </StoreContext.Provider>
  )
}

export const useStore = () => useContext(StoreContext)
export const useDispatch = () => useContext(DispatchContext)

// In any component:
function Profile() {
  const { user, theme } = useStore()
  const dispatch = useDispatch()

  return (
    <div>
      <p>{user?.name}</p>
      <button onClick={() => dispatch({ type: 'TOGGLE_THEME' })}>
        Toggle to {theme === 'dark' ? 'light' : 'dark'}
      </button>
    </div>
  )
}`} />
        <Callout type="tip" title="This pattern scales well">
          For small-to-medium apps this beats installing Redux or Zustand. For large apps with many slices of state, dedicated state managers are easier to maintain.
        </Callout>
      </section>

      <PageNav currentPath="/use-reducer" />
    </div>
  )
}
