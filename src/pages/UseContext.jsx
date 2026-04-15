import { useState, useContext, createContext } from 'react'
import CodeBlock from '../components/CodeBlock'
import Callout from '../components/Callout'
import PageNav from '../components/PageNav'

// Live demo — Theme context
const ThemeContext = createContext('dark')

function ThemeButton() {
  const theme = useContext(ThemeContext)
  return (
    <div className={`px-4 py-3 rounded-lg text-sm font-medium ${theme === 'dark' ? 'bg-slate-800 text-white border border-slate-600' : 'bg-white text-slate-900 border border-slate-300'}`}>
      Theme from context: <strong>{theme}</strong>
    </div>
  )
}

function ThemeCard() {
  const theme = useContext(ThemeContext)
  return (
    <div className={`p-4 rounded-xl ${theme === 'dark' ? 'bg-slate-900 text-slate-200' : 'bg-slate-100 text-slate-800'}`}>
      <p className="text-sm font-semibold mb-2">Card (deeply nested)</p>
      <ThemeButton />
    </div>
  )
}

function ThemeDemo() {
  const [theme, setTheme] = useState('dark')
  return (
    <div className="space-y-3">
      <div className="flex gap-2">
        <button onClick={() => setTheme('dark')} className={`px-3 py-1.5 text-xs rounded-lg font-semibold transition-colors ${theme === 'dark' ? 'bg-indigo-600 text-white' : 'bg-slate-700 text-slate-300 hover:bg-slate-600'}`}>Dark</button>
        <button onClick={() => setTheme('light')} className={`px-3 py-1.5 text-xs rounded-lg font-semibold transition-colors ${theme === 'light' ? 'bg-indigo-600 text-white' : 'bg-slate-700 text-slate-300 hover:bg-slate-600'}`}>Light</button>
      </div>
      <ThemeContext.Provider value={theme}>
        <p className="text-xs text-slate-500">Provider wraps these components:</p>
        <ThemeCard />
      </ThemeContext.Provider>
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

export default function UseContext() {
  return (
    <div className="space-y-10">
      <div>
        <p className="text-xs font-semibold text-violet-400 uppercase tracking-wider mb-2">React Hooks</p>
        <h1 className="text-3xl font-bold text-white mb-3">useContext</h1>
        <p className="text-slate-400 leading-relaxed">
          <code className="text-violet-300 bg-violet-500/10 px-1.5 py-0.5 rounded">useContext</code> lets any component in your app read a shared value — without passing it down manually through every component in between.
        </p>
      </div>

      {/* Plain English */}
      <div className="bg-violet-500/10 border border-violet-500/30 rounded-xl p-5">
        <p className="text-xs font-bold text-violet-300 uppercase tracking-wider mb-3">Think of it like this</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <p className="text-sm font-semibold text-red-300 mb-2">Without context — passing notes</p>
            <div className="space-y-1 text-xs font-mono">
              {['👩 App (has the theme)', '↓ passes theme', '📦 Layout (doesn\'t need it)', '↓ passes theme', '📦 Sidebar (doesn\'t need it)', '↓ passes theme', '✅ UserMenu (finally uses it!)'].map((line, i) => (
                <div key={i} className={`px-2 py-1 rounded ${line.startsWith('✅') ? 'bg-emerald-500/10 text-emerald-300' : line.startsWith('↓') ? 'text-slate-600' : 'bg-slate-800 text-slate-300'}`}>{line}</div>
              ))}
            </div>
            <p className="text-xs text-slate-500 mt-2">Every middle component must accept and forward the prop — even if it doesn't use it.</p>
          </div>
          <div>
            <p className="text-sm font-semibold text-emerald-300 mb-2">With context — school PA system</p>
            <div className="space-y-1 text-xs font-mono">
              {['👩 App (broadcasts theme via Provider)', '📢 Context broadcasts to whole tree', '📦 Layout — ignores the broadcast', '📦 Sidebar — ignores the broadcast', '✅ UserMenu — tunes in with useContext'].map((line, i) => (
                <div key={i} className={`px-2 py-1 rounded ${line.startsWith('✅') ? 'bg-emerald-500/10 text-emerald-300' : line.startsWith('📢') ? 'bg-sky-500/10 text-sky-300' : line.startsWith('📦') ? 'bg-slate-800 text-slate-500' : 'bg-slate-800 text-slate-300'}`}>{line}</div>
              ))}
            </div>
            <p className="text-xs text-slate-500 mt-2">Any component can tune in directly — no middlemen needed.</p>
          </div>
        </div>
      </div>

      {/* When to use */}
      <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-5">
        <p className="text-sm font-bold text-white mb-3">Good use cases for Context</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          {[
            ['🌙', 'Theme', 'Dark/light mode — used everywhere'],
            ['👤', 'Logged-in user', 'Needed in navbar, profile, dashboard...'],
            ['🌍', 'Language', 'App-wide translation'],
            ['🛒', 'Shopping cart', 'Item count shown in header + checkout'],
          ].map(([icon, title, desc]) => (
            <div key={title} className="flex gap-2 items-start">
              <span className="text-base">{icon}</span>
              <div>
                <p className="text-xs font-semibold text-white">{title}</p>
                <p className="text-xs text-slate-400">{desc}</p>
              </div>
            </div>
          ))}
        </div>
        <Callout type="warning" title="Don't use Context for everything">
          Context is not a replacement for props. Use it only for data that many components need — like theme or auth. For most data, plain props are simpler and clearer.
        </Callout>
      </div>

      {/* Problem */}
      <section>
        <h2 className="text-xl font-bold text-white mb-3">The Problem: Prop Drilling</h2>
        <CodeBlock code={`// Without context, you pass props through every level
function App() {
  const [theme, setTheme] = useState('dark')
  return <Layout theme={theme} setTheme={setTheme} />
}

function Layout({ theme, setTheme }) {
  return <Sidebar theme={theme} setTheme={setTheme} />  // Doesn't use theme
}

function Sidebar({ theme, setTheme }) {
  return <UserMenu theme={theme} setTheme={setTheme} />  // Doesn't use it either
}

function UserMenu({ theme, setTheme }) {
  return <div className={theme}>...</div>  // Finally uses it
}

// Solution: Context!`} />
      </section>

      {/* 3-step setup */}
      <section>
        <h2 className="text-xl font-bold text-white mb-3">3 Steps to Use Context</h2>
        <div className="space-y-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-6 h-6 rounded-full bg-indigo-500 flex items-center justify-center text-xs font-bold text-white">1</span>
              <h3 className="font-semibold text-slate-200">Create the context</h3>
            </div>
            <CodeBlock code={`import { createContext } from 'react'

// Creates a context with a default value of 'dark'
export const ThemeContext = createContext('dark')`} />
          </div>

          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-6 h-6 rounded-full bg-indigo-500 flex items-center justify-center text-xs font-bold text-white">2</span>
              <h3 className="font-semibold text-slate-200">Wrap components with a Provider</h3>
            </div>
            <CodeBlock code={`import { ThemeContext } from './ThemeContext'

function App() {
  const [theme, setTheme] = useState('dark')

  return (
    // All children can now access 'theme' via useContext
    <ThemeContext.Provider value={theme}>
      <Layout />
    </ThemeContext.Provider>
  )
}`} />
          </div>

          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-6 h-6 rounded-full bg-indigo-500 flex items-center justify-center text-xs font-bold text-white">3</span>
              <h3 className="font-semibold text-slate-200">Read with useContext</h3>
            </div>
            <CodeBlock code={`import { useContext } from 'react'
import { ThemeContext } from './ThemeContext'

// Any component, no matter how deeply nested!
function UserMenu() {
  const theme = useContext(ThemeContext)  // No props needed!

  return (
    <div className={theme === 'dark' ? 'bg-gray-900' : 'bg-white'}>
      Current theme: {theme}
    </div>
  )
}`} />
          </div>
        </div>
      </section>

      {/* Live demo */}
      <section>
        <h2 className="text-xl font-bold text-white mb-3">Live Demo</h2>
        <LiveDemo title="Theme Context">
          <ThemeDemo />
        </LiveDemo>
      </section>

      {/* Full auth example */}
      <section>
        <h2 className="text-xl font-bold text-white mb-3">Real-World Example: Auth Context</h2>
        <p className="text-slate-400 text-sm mb-3">A pattern used in nearly every real React app:</p>
        <CodeBlock filename="src/context/AuthContext.jsx" code={`import { createContext, useContext, useState } from 'react'

const AuthContext = createContext(null)

// Custom provider component
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)

  function login(credentials) {
    // Call your API, then:
    setUser({ name: credentials.username, role: 'admin' })
  }

  function logout() {
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

// Custom hook for easy access
export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) throw new Error('useAuth must be used within AuthProvider')
  return context
}`} />
        <CodeBlock filename="src/App.jsx" code={`import { AuthProvider } from './context/AuthContext'

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </Router>
    </AuthProvider>
  )
}`} />
        <CodeBlock filename="src/pages/Dashboard.jsx" code={`import { useAuth } from '../context/AuthContext'

function Dashboard() {
  const { user, logout } = useAuth()  // Access anywhere!

  return (
    <div>
      <h1>Welcome, {user?.name}</h1>
      <p>Role: {user?.role}</p>
      <button onClick={logout}>Log Out</button>
    </div>
  )
}`} />
      </section>

      {/* Combining state and context */}
      <section>
        <h2 className="text-xl font-bold text-white mb-3">Passing State + Setter</h2>
        <CodeBlock code={`const ThemeContext = createContext(null)

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('dark')

  // Pass both the value AND the setter
  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

function ToggleButton() {
  const { theme, setTheme } = useContext(ThemeContext)

  return (
    <button onClick={() => setTheme(t => t === 'dark' ? 'light' : 'dark')}>
      Switch to {theme === 'dark' ? 'Light' : 'Dark'}
    </button>
  )
}`} />
        <Callout type="advanced" title="Context performance">
          Every component that consumes a context re-renders when the context value changes. For large apps with frequent updates, consider splitting contexts (separate AuthContext, ThemeContext, etc.) or using a state manager like Zustand.
        </Callout>
      </section>

      <PageNav currentPath="/use-context" />
    </div>
  )
}
