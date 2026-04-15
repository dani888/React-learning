import { Link } from 'react-router-dom'

const steps = [
  {
    step: 1,
    emoji: '🚀',
    title: 'Setup & Installation',
    desc: 'Install Node.js and create your first React app with Vite.',
    path: '/getting-started',
    badge: 'Start Here',
    badgeColor: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
    priority: 'Essential',
    priorityColor: 'text-emerald-400',
  },
  {
    step: 2,
    emoji: '🧩',
    title: 'JSX & Components',
    desc: 'Learn JSX syntax and how to build reusable components — the core building block of every React app.',
    path: '/components',
    badge: 'Must Learn',
    badgeColor: 'bg-sky-500/20 text-sky-300 border-sky-500/30',
    priority: 'Essential',
    priorityColor: 'text-sky-400',
  },
  {
    step: 3,
    emoji: '📦',
    title: 'Props & State',
    desc: 'Understand how data flows through components. Props pass data in, state holds data that changes.',
    path: '/props-state',
    badge: 'Must Learn',
    badgeColor: 'bg-sky-500/20 text-sky-300 border-sky-500/30',
    priority: 'Essential',
    priorityColor: 'text-sky-400',
  },
  {
    step: 4,
    emoji: '🎣',
    title: 'useState',
    desc: 'The most important hook. Makes your UI interactive by letting components remember and update values.',
    path: '/use-state',
    badge: 'Core Hook #1',
    badgeColor: 'bg-violet-500/20 text-violet-300 border-violet-500/30',
    priority: 'Core',
    priorityColor: 'text-violet-400',
  },
  {
    step: 5,
    emoji: '⚡',
    title: 'useEffect',
    desc: 'Run code after render — fetch data from APIs, set up timers, sync with the browser.',
    path: '/use-effect',
    badge: 'Core Hook #2',
    badgeColor: 'bg-violet-500/20 text-violet-300 border-violet-500/30',
    priority: 'Core',
    priorityColor: 'text-violet-400',
  },
  {
    step: 6,
    emoji: '🌐',
    title: 'useContext',
    desc: 'Share data across many components without passing props through every level.',
    path: '/use-context',
    badge: 'Core Hook #3',
    badgeColor: 'bg-violet-500/20 text-violet-300 border-violet-500/30',
    priority: 'Core',
    priorityColor: 'text-violet-400',
  },
  {
    step: 7,
    emoji: '🔗',
    title: 'useRef',
    desc: 'Access real DOM elements (focus, scroll) and store values that don\'t trigger re-renders.',
    path: '/use-ref',
    badge: 'Useful Hook',
    badgeColor: 'bg-teal-500/20 text-teal-300 border-teal-500/30',
    priority: 'Important',
    priorityColor: 'text-teal-400',
  },
  {
    step: 8,
    emoji: '⚙️',
    title: 'useMemo & useCallback',
    desc: 'Optimize performance by caching expensive calculations and stable function references.',
    path: '/use-memo',
    badge: 'Performance',
    badgeColor: 'bg-orange-500/20 text-orange-300 border-orange-500/30',
    priority: 'Advanced',
    priorityColor: 'text-orange-400',
  },
  {
    step: 9,
    emoji: '🔄',
    title: 'useReducer',
    desc: 'Manage complex state with multiple values and transitions using the reducer pattern.',
    path: '/use-reducer',
    badge: 'Advanced',
    badgeColor: 'bg-orange-500/20 text-orange-300 border-orange-500/30',
    priority: 'Advanced',
    priorityColor: 'text-orange-400',
  },
  {
    step: 10,
    emoji: '🛠️',
    title: 'Custom Hooks',
    desc: 'Extract and reuse logic by building your own hooks — the key to clean, maintainable React.',
    path: '/custom-hooks',
    badge: 'Advanced',
    badgeColor: 'bg-orange-500/20 text-orange-300 border-orange-500/30',
    priority: 'Advanced',
    priorityColor: 'text-orange-400',
  },
  {
    step: 11,
    emoji: '🎨',
    title: 'Tailwind CSS',
    desc: 'Style your React app with utility classes — no custom CSS files needed.',
    path: '/tailwind',
    badge: 'Styling',
    badgeColor: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30',
    priority: 'Styling',
    priorityColor: 'text-cyan-400',
  },
  {
    step: 12,
    emoji: '🟢',
    title: 'Node.js Basics',
    desc: 'Run JavaScript on the server — foundation for building your own backend APIs.',
    path: '/nodejs',
    badge: 'Backend',
    badgeColor: 'bg-amber-500/20 text-amber-300 border-amber-500/30',
    priority: 'Backend',
    priorityColor: 'text-amber-400',
  },
  {
    step: 13,
    emoji: '🚂',
    title: 'Express.js',
    desc: 'Build REST APIs and web servers — connect your React frontend to a real backend.',
    path: '/express',
    badge: 'Backend',
    badgeColor: 'bg-amber-500/20 text-amber-300 border-amber-500/30',
    priority: 'Backend',
    priorityColor: 'text-amber-400',
  },
  {
    step: 14,
    emoji: '▲',
    title: 'Next.js',
    desc: 'The React framework for production — adds routing, SSR, static generation, API routes, and SEO in one package.',
    path: '/nextjs',
    badge: 'Full Stack',
    badgeColor: 'bg-indigo-500/20 text-indigo-300 border-indigo-500/30',
    priority: 'Full Stack',
    priorityColor: 'text-indigo-400',
  },
  {
    step: 15,
    emoji: '◈',
    title: 'GraphQL',
    desc: 'Query language for APIs — ask for exactly the data you need. Pairs perfectly with React and Apollo Client.',
    path: '/graphql',
    badge: 'Full Stack',
    badgeColor: 'bg-pink-500/20 text-pink-300 border-pink-500/30',
    priority: 'Full Stack',
    priorityColor: 'text-pink-400',
  },
]

const groups = [
  { label: 'The Foundation', color: 'text-emerald-400', borderColor: 'border-emerald-500/30', range: [1, 3] },
  { label: 'Core Hooks (Learn These First)', color: 'text-violet-400', borderColor: 'border-violet-500/30', range: [4, 6] },
  { label: 'Advanced Hooks', color: 'text-orange-400', borderColor: 'border-orange-500/30', range: [7, 10] },
  { label: 'Styling & Backend', color: 'text-cyan-400', borderColor: 'border-cyan-500/30', range: [11, 13] },
  { label: 'Full Stack', color: 'text-indigo-400', borderColor: 'border-indigo-500/30', range: [14, 15] },
]

export default function Home() {
  return (
    <div>
      {/* Hero */}
      <div className="mb-12 text-center lg:text-left">
        <div className="inline-flex items-center gap-2 bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 text-xs font-semibold px-3 py-1.5 rounded-full mb-5">
          <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse" />
          Free & Open Source Learning Resource
        </div>
        <h1 className="text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight">
          Learn React from
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400"> Zero to Hero</span>
        </h1>
        <p className="text-lg text-slate-400 max-w-2xl mb-8">
          A step-by-step guide to React, hooks, Tailwind CSS, Node.js, Next.js, and GraphQL — with live demos and copy-paste code in every section.
        </p>
        <div className="flex flex-wrap gap-3 justify-center lg:justify-start">
          <Link to="/getting-started" className="px-5 py-2.5 bg-indigo-500 hover:bg-indigo-400 text-white font-semibold rounded-lg transition-colors">
            Start at Step 1 →
          </Link>
          <Link to="/use-state" className="px-5 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold rounded-lg border border-slate-700 transition-colors">
            Jump to Hooks
          </Link>
        </div>
      </div>

      {/* Key concepts to keep in mind */}
      <div className="bg-slate-900 border border-indigo-500/20 rounded-2xl p-5 mb-10">
        <h2 className="text-base font-bold text-white mb-3">Keep These in Mind as You Learn</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {[
            { icon: '🔁', text: 'React re-renders a component whenever its state or props change.' },
            { icon: '🧩', text: 'Everything is a component — small, reusable functions that return JSX.' },
            { icon: '⬇️', text: 'Data flows down (parent → child via props). Events flow up (child → parent via callbacks).' },
            { icon: '🪝', text: 'Hooks (use...) can only be called at the top level of a function component — never inside loops or ifs.' },
          ].map((tip) => (
            <div key={tip.icon} className="flex items-start gap-2.5">
              <span className="text-lg flex-shrink-0">{tip.icon}</span>
              <p className="text-sm text-slate-400 leading-relaxed">{tip.text}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Step-by-step roadmap */}
      <div className="mb-3">
        <h2 className="text-xl font-bold text-white">Your Learning Roadmap</h2>
        <p className="text-sm text-slate-500 mt-1">Follow these steps in order — each one builds on the last.</p>
      </div>

      <div className="space-y-8">
        {groups.map((group) => {
          const groupSteps = steps.filter(s => s.step >= group.range[0] && s.step <= group.range[1])
          return (
            <div key={group.label}>
              <div className={`flex items-center gap-2 mb-3 pb-2 border-b ${group.borderColor}`}>
                <p className={`text-xs font-bold uppercase tracking-wider ${group.color}`}>{group.label}</p>
              </div>
              <div className="space-y-2">
                {groupSteps.map((s) => (
                  <Link
                    key={s.path}
                    to={s.path}
                    className="group flex items-center gap-4 bg-slate-900 border border-slate-800 hover:border-slate-700 rounded-xl p-4 transition-all hover:bg-slate-800/50"
                  >
                    {/* Step number */}
                    <div className="flex-shrink-0 w-9 h-9 rounded-lg bg-slate-800 border border-slate-700 group-hover:border-slate-600 flex items-center justify-center text-sm font-bold text-slate-400 group-hover:text-white transition-colors">
                      {s.step}
                    </div>

                    {/* Emoji */}
                    <span className="text-xl flex-shrink-0">{s.emoji}</span>

                    {/* Text */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-0.5 flex-wrap">
                        <span className="font-semibold text-white text-sm">{s.title}</span>
                        <span className={`text-[10px] border px-1.5 py-0.5 rounded-full font-semibold ${s.badgeColor}`}>{s.badge}</span>
                      </div>
                      <p className="text-xs text-slate-400 leading-relaxed">{s.desc}</p>
                    </div>

                    {/* Arrow */}
                    <svg className="w-4 h-4 text-slate-600 group-hover:text-slate-400 flex-shrink-0 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                ))}
              </div>
            </div>
          )
        })}
      </div>

      {/* What is React section */}
      <div className="mt-12 bg-slate-900 border border-slate-800 rounded-2xl p-6">
        <h2 className="text-xl font-bold text-white mb-3">What is React?</h2>
        <p className="text-slate-400 leading-relaxed mb-4">
          React is a <strong className="text-white">JavaScript library</strong> for building user interfaces, created by Meta (Facebook) in 2013.
          It lets you build complex UIs from small, isolated pieces of code called <strong className="text-white">components</strong>.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {[
            { icon: '🧩', title: 'Component-Based', desc: 'Build encapsulated components that manage their own state, then compose them into complex UIs.' },
            { icon: '⚡', title: 'Declarative', desc: 'Design simple views for each state. React efficiently updates the DOM when data changes.' },
            { icon: '📱', title: 'Learn Once, Write Anywhere', desc: 'Develop web apps, mobile apps (React Native), and even desktop apps with the same skills.' },
          ].map((f) => (
            <div key={f.title} className="bg-slate-800/50 rounded-xl p-4">
              <div className="text-xl mb-2">{f.icon}</div>
              <div className="font-semibold text-white text-sm mb-1">{f.title}</div>
              <p className="text-xs text-slate-400 leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
