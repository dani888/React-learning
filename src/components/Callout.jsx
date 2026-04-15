const variants = {
  info: {
    bg: 'bg-sky-500/10 border-sky-500/30',
    icon: 'ℹ️',
    title: 'text-sky-300',
  },
  tip: {
    bg: 'bg-emerald-500/10 border-emerald-500/30',
    icon: '💡',
    title: 'text-emerald-300',
  },
  warning: {
    bg: 'bg-amber-500/10 border-amber-500/30',
    icon: '⚠️',
    title: 'text-amber-300',
  },
  danger: {
    bg: 'bg-red-500/10 border-red-500/30',
    icon: '🚫',
    title: 'text-red-300',
  },
  beginner: {
    bg: 'bg-violet-500/10 border-violet-500/30',
    icon: '🎓',
    title: 'text-violet-300',
  },
  advanced: {
    bg: 'bg-orange-500/10 border-orange-500/30',
    icon: '🔥',
    title: 'text-orange-300',
  },
}

export default function Callout({ type = 'info', title, children }) {
  const v = variants[type] || variants.info
  return (
    <div className={`rounded-lg border px-4 py-3 my-4 ${v.bg}`}>
      <div className="flex items-start gap-2">
        <span className="text-base mt-0.5 flex-shrink-0">{v.icon}</span>
        <div>
          {title && <p className={`text-sm font-semibold mb-1 ${v.title}`}>{title}</p>}
          <div className="text-sm text-slate-300 leading-relaxed">{children}</div>
        </div>
      </div>
    </div>
  )
}
