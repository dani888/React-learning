import { useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'

const navGroups = [
  {
    title: 'Introduction',
    color: 'text-emerald-400',
    items: [
      { step: null, label: 'Welcome', path: '/', badge: 'Home' },
      { step: 1, label: 'Setup & Installation', path: '/getting-started' },
    ],
  },
  {
    title: 'React Basics',
    color: 'text-sky-400',
    items: [
      { step: 2, label: 'JSX & Components', path: '/components' },
      { step: 3, label: 'Props & State', path: '/props-state' },
    ],
  },
  {
    title: 'React Hooks',
    color: 'text-violet-400',
    items: [
      { step: 4, label: 'useState', path: '/use-state' },
      { step: 5, label: 'useEffect', path: '/use-effect' },
      { step: 6, label: 'useContext', path: '/use-context' },
      { step: 7, label: 'useRef', path: '/use-ref' },
      { step: 8, label: 'useMemo & useCallback', path: '/use-memo' },
      { step: 9, label: 'useReducer', path: '/use-reducer' },
      { step: 10, label: 'Custom Hooks', path: '/custom-hooks' },
    ],
  },
  {
    title: 'Styling',
    color: 'text-cyan-400',
    items: [
      { step: 11, label: 'Tailwind CSS', path: '/tailwind' },
    ],
  },
  {
    title: 'Backend / Node.js',
    color: 'text-amber-400',
    items: [
      { step: 12, label: 'Node.js Basics', path: '/nodejs' },
      { step: 13, label: 'Express.js', path: '/express' },
    ],
  },
  {
    title: 'Full Stack',
    color: 'text-indigo-400',
    items: [
      { step: 14, label: 'Next.js', path: '/nextjs' },
      { step: 15, label: 'GraphQL', path: '/graphql' },
    ],
  },
]

export default function Sidebar() {
  const [open, setOpen] = useState(false)
  const location = useLocation()

  const SidebarContent = () => (
    <div className="flex flex-col h-full overflow-y-auto">
      {/* Logo */}
      <div className="px-5 py-5 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-indigo-500 flex items-center justify-center text-sm font-bold">
            ⚛
          </div>
          <div>
            <div className="font-semibold text-white text-sm">React Learning Hub</div>
            <div className="text-xs text-slate-500">Follow steps 1 → 15</div>
          </div>
        </div>
      </div>

      {/* Nav groups */}
      <nav className="flex-1 px-3 py-4 space-y-6">
        {navGroups.map((group) => (
          <div key={group.title}>
            <p className={`px-2 mb-1.5 text-xs font-semibold uppercase tracking-wider ${group.color}`}>
              {group.title}
            </p>
            <ul className="space-y-0.5">
              {group.items.map((item) => (
                <li key={item.path}>
                  <NavLink
                    to={item.path}
                    onClick={() => setOpen(false)}
                    className={({ isActive }) =>
                      `flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                        isActive
                          ? 'bg-indigo-500/20 text-indigo-300 border-l-2 border-indigo-500 pl-[10px]'
                          : 'text-slate-400 hover:text-slate-100 hover:bg-slate-800'
                      }`
                    }
                  >
                    {/* Step number badge */}
                    {item.step != null ? (
                      <span className="flex-shrink-0 w-5 h-5 rounded bg-slate-800 border border-slate-700 text-[10px] font-bold text-slate-500 flex items-center justify-center">
                        {item.step}
                      </span>
                    ) : (
                      <span className="flex-shrink-0 w-5 h-5" />
                    )}
                    <span className="flex-1 min-w-0 truncate">{item.label}</span>
                    {item.badge && (
                      <span className="text-[10px] bg-emerald-500/20 text-emerald-400 px-1.5 py-0.5 rounded-full font-semibold flex-shrink-0">
                        {item.badge}
                      </span>
                    )}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </nav>

      {/* Footer */}
      <div className="px-5 py-4 border-t border-slate-800">
        <p className="text-xs text-slate-600">Built with React + Tailwind CSS</p>
      </div>
    </div>
  )

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="hidden lg:flex flex-col fixed inset-y-0 left-0 w-72 bg-slate-900 border-r border-slate-800 z-30">
        <SidebarContent />
      </aside>

      {/* Mobile top bar */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-40 bg-slate-900 border-b border-slate-800 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-indigo-500 flex items-center justify-center text-xs font-bold">⚛</div>
          <span className="font-semibold text-white text-sm">React Learning Hub</span>
        </div>
        <button
          onClick={() => setOpen(!open)}
          className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
        >
          {open ? (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile overlay */}
      {open && (
        <div className="lg:hidden fixed inset-0 z-30" onClick={() => setOpen(false)}>
          <div className="absolute inset-0 bg-black/60" />
          <aside className="absolute top-0 left-0 bottom-0 w-72 bg-slate-900 border-r border-slate-800">
            <SidebarContent />
          </aside>
        </div>
      )}

      {/* Mobile top padding spacer */}
      <div className="lg:hidden h-14" />
    </>
  )
}
