import { Link } from 'react-router-dom'

const pages = [
  { step: 1, label: 'Setup & Installation', path: '/getting-started' },
  { step: 2, label: 'JSX & Components', path: '/components' },
  { step: 3, label: 'Props & State', path: '/props-state' },
  { step: 4, label: 'useState', path: '/use-state' },
  { step: 5, label: 'useEffect', path: '/use-effect' },
  { step: 6, label: 'useContext', path: '/use-context' },
  { step: 7, label: 'useRef', path: '/use-ref' },
  { step: 8, label: 'useMemo & useCallback', path: '/use-memo' },
  { step: 9, label: 'useReducer', path: '/use-reducer' },
  { step: 10, label: 'Custom Hooks', path: '/custom-hooks' },
  { step: 11, label: 'Tailwind CSS', path: '/tailwind' },
  { step: 12, label: 'Node.js Basics', path: '/nodejs' },
  { step: 13, label: 'Express.js', path: '/express' },
  { step: 14, label: 'Next.js', path: '/nextjs' },
  { step: 15, label: 'GraphQL', path: '/graphql' },
]

export default function PageNav({ currentPath }) {
  const index = pages.findIndex(p => p.path === currentPath)
  const prev = index > 0 ? pages[index - 1] : null
  const next = index < pages.length - 1 ? pages[index + 1] : null

  return (
    <div className="mt-12 pt-6 border-t border-slate-800 flex items-center justify-between gap-4">
      {prev ? (
        <Link
          to={prev.path}
          className="group flex items-center gap-3 bg-slate-900 hover:bg-slate-800 border border-slate-800 hover:border-slate-700 rounded-xl px-4 py-3 transition-all min-w-0 flex-1 max-w-[48%]"
        >
          <svg className="w-4 h-4 text-slate-500 group-hover:text-slate-300 flex-shrink-0 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          <div className="min-w-0">
            <div className="text-[10px] text-slate-600 font-semibold uppercase tracking-wider">Step {prev.step}</div>
            <div className="text-sm font-semibold text-slate-300 group-hover:text-white truncate transition-colors">{prev.label}</div>
          </div>
        </Link>
      ) : (
        <div className="flex-1" />
      )}

      {next ? (
        <Link
          to={next.path}
          className="group flex items-center justify-end gap-3 bg-indigo-500/10 hover:bg-indigo-500/20 border border-indigo-500/30 hover:border-indigo-500/50 rounded-xl px-4 py-3 transition-all min-w-0 flex-1 max-w-[48%]"
        >
          <div className="min-w-0 text-right">
            <div className="text-[10px] text-indigo-500 font-semibold uppercase tracking-wider">Step {next.step}</div>
            <div className="text-sm font-semibold text-indigo-300 group-hover:text-indigo-200 truncate transition-colors">{next.label}</div>
          </div>
          <svg className="w-4 h-4 text-indigo-500 group-hover:text-indigo-300 flex-shrink-0 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      ) : (
        <div className="flex-1" />
      )}
    </div>
  )
}
