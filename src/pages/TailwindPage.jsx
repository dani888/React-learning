import CodeBlock from '../components/CodeBlock'
import Callout from '../components/Callout'
import PageNav from '../components/PageNav'
import { useState } from 'react'

// ── Helpers ───────────────────────────────────────────────────────────────────

function LiveDemo({ title, children }) {
  return (
    <div className="bg-slate-900 border border-slate-700/50 rounded-xl overflow-hidden my-4">
      <div className="flex items-center gap-2 px-4 py-2 bg-slate-800 border-b border-slate-700/50">
        <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
        <span className="text-xs font-semibold text-slate-400">Live Preview — {title}</span>
      </div>
      <div className="p-5">{children}</div>
    </div>
  )
}

// ── Live demos ────────────────────────────────────────────────────────────────

// Core concept: CSS vs Tailwind rendered output
function CoreConceptDemo() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div>
        <p className="text-xs text-slate-500 font-semibold mb-3">Traditional CSS result:</p>
        <button style={{
          backgroundColor: '#6366f1', color: 'white',
          padding: '8px 16px', borderRadius: '8px',
          fontWeight: 600, border: 'none', cursor: 'pointer',
        }}>
          Click Me
        </button>
        <p className="text-xs text-slate-600 mt-2">Requires a separate .css file with a class name</p>
      </div>
      <div>
        <p className="text-xs text-slate-500 font-semibold mb-3">Tailwind CSS result:</p>
        <button className="bg-indigo-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-indigo-400 transition-colors">
          Click Me
        </button>
        <p className="text-xs text-slate-600 mt-2">Everything inline — no separate CSS file needed</p>
      </div>
    </div>
  )
}

// Interactive button builder
function ButtonBuilder() {
  const [bg, setBg] = useState('indigo')
  const [size, setSize] = useState('md')
  const [rounded, setRounded] = useState('lg')
  const [variant, setVariant] = useState('solid')
  const [label, setLabel] = useState('Click me')

  const bgMap = { indigo: 'bg-indigo-500 hover:bg-indigo-400', emerald: 'bg-emerald-600 hover:bg-emerald-500', rose: 'bg-rose-600 hover:bg-rose-500', amber: 'bg-amber-500 hover:bg-amber-400', violet: 'bg-violet-600 hover:bg-violet-500' }
  const sizeMap = { sm: 'text-xs px-2.5 py-1', md: 'text-sm px-4 py-2', lg: 'text-base px-6 py-3' }
  const roundedMap = { none: 'rounded-none', md: 'rounded-md', lg: 'rounded-lg', full: 'rounded-full' }
  const outlineMap = { indigo: 'border-2 border-indigo-500 text-indigo-400 hover:bg-indigo-500 hover:text-white', emerald: 'border-2 border-emerald-500 text-emerald-400 hover:bg-emerald-500 hover:text-white', rose: 'border-2 border-rose-500 text-rose-400 hover:bg-rose-500 hover:text-white', amber: 'border-2 border-amber-500 text-amber-400 hover:bg-amber-500 hover:text-white', violet: 'border-2 border-violet-500 text-violet-400 hover:bg-violet-500 hover:text-white' }

  const classes = variant === 'solid'
    ? `${bgMap[bg]} text-white font-semibold transition-colors ${sizeMap[size]} ${roundedMap[rounded]}`
    : `${outlineMap[bg]} font-semibold bg-transparent transition-colors ${sizeMap[size]} ${roundedMap[rounded]}`

  const classDisplay = variant === 'solid'
    ? `bg-${bg}-500 hover:bg-${bg}-400\ntext-white font-semibold\n${sizeMap[size].split(' ').join(' ')}\n${roundedMap[rounded]}\ntransition-colors`
    : `border-2 border-${bg}-500\ntext-${bg}-400\nhover:bg-${bg}-500 hover:text-white\n${sizeMap[size].split(' ').join(' ')}\n${roundedMap[rounded]}\nbg-transparent transition-colors`

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <div>
          <label className="text-xs text-slate-400 block mb-1">Color</label>
          <select value={bg} onChange={e => setBg(e.target.value)} className="w-full bg-slate-800 border border-slate-700 rounded-lg px-2 py-1.5 text-xs text-white focus:outline-none focus:border-cyan-500">
            {['indigo', 'emerald', 'rose', 'amber', 'violet'].map(c => <option key={c}>{c}</option>)}
          </select>
        </div>
        <div>
          <label className="text-xs text-slate-400 block mb-1">Size</label>
          <select value={size} onChange={e => setSize(e.target.value)} className="w-full bg-slate-800 border border-slate-700 rounded-lg px-2 py-1.5 text-xs text-white focus:outline-none focus:border-cyan-500">
            {['sm', 'md', 'lg'].map(s => <option key={s}>{s}</option>)}
          </select>
        </div>
        <div>
          <label className="text-xs text-slate-400 block mb-1">Corners</label>
          <select value={rounded} onChange={e => setRounded(e.target.value)} className="w-full bg-slate-800 border border-slate-700 rounded-lg px-2 py-1.5 text-xs text-white focus:outline-none focus:border-cyan-500">
            {['none', 'md', 'lg', 'full'].map(r => <option key={r}>{r}</option>)}
          </select>
        </div>
        <div>
          <label className="text-xs text-slate-400 block mb-1">Style</label>
          <select value={variant} onChange={e => setVariant(e.target.value)} className="w-full bg-slate-800 border border-slate-700 rounded-lg px-2 py-1.5 text-xs text-white focus:outline-none focus:border-cyan-500">
            {['solid', 'outline'].map(v => <option key={v}>{v}</option>)}
          </select>
        </div>
      </div>
      <div>
        <label className="text-xs text-slate-400 block mb-1">Label</label>
        <input value={label} onChange={e => setLabel(e.target.value)} className="w-full md:w-64 bg-slate-800 border border-slate-700 rounded-lg px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-cyan-500" />
      </div>
      <div className="flex items-center gap-6 flex-wrap">
        <button className={classes}>{label}</button>
        <div className="flex-1 min-w-0">
          <p className="text-xs text-slate-500 mb-1">Generated classes:</p>
          <pre className="text-xs text-cyan-300 font-mono whitespace-pre-wrap">{classDisplay}</pre>
        </div>
      </div>
    </div>
  )
}

// Spacing visual demo
function SpacingDemo() {
  const [pad, setPad] = useState(4)
  const [margin, setMargin] = useState(4)
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4 flex-wrap">
        <label className="text-xs text-slate-400">padding: p-{pad}
          <input type="range" min={0} max={16} value={pad} onChange={e => setPad(+e.target.value)} className="ml-2 w-24 accent-cyan-500" />
        </label>
        <label className="text-xs text-slate-400">margin: m-{margin}
          <input type="range" min={0} max={8} value={margin} onChange={e => setMargin(+e.target.value)} className="ml-2 w-24 accent-cyan-500" />
        </label>
      </div>
      <div className="bg-amber-500/10 border border-amber-500/30 rounded-lg inline-block">
        <div style={{ margin: `${margin * 4}px` }} className={`bg-cyan-500/20 border-2 border-cyan-500/50 border-dashed rounded`}>
          <div style={{ padding: `${pad * 4}px` }} className="bg-slate-800 rounded text-sm text-white font-mono">
            Your content
          </div>
        </div>
      </div>
      <div className="flex gap-4 text-xs">
        <span className="text-amber-400">Amber = margin (m-{margin})</span>
        <span className="text-cyan-400">Cyan dashed = padding (p-{pad})</span>
        <span className="text-slate-400">Dark = content</span>
      </div>
    </div>
  )
}

// Color palette demo
function ColorPaletteDemo() {
  const colors = ['slate', 'red', 'orange', 'amber', 'yellow', 'lime', 'green', 'emerald', 'teal', 'cyan', 'sky', 'blue', 'indigo', 'violet', 'purple', 'pink', 'rose']
  const shades = [100, 300, 500, 700, 900]

  // Use inline styles — Tailwind purges dynamic class names
  const colorHex = {
    slate: { 100: '#f1f5f9', 300: '#94a3b8', 500: '#64748b', 700: '#334155', 900: '#0f172a' },
    red: { 100: '#fee2e2', 300: '#fca5a5', 500: '#ef4444', 700: '#b91c1c', 900: '#7f1d1d' },
    orange: { 100: '#ffedd5', 300: '#fdba74', 500: '#f97316', 700: '#c2410c', 900: '#7c2d12' },
    amber: { 100: '#fef3c7', 300: '#fcd34d', 500: '#f59e0b', 700: '#b45309', 900: '#78350f' },
    yellow: { 100: '#fef9c3', 300: '#fde047', 500: '#eab308', 700: '#a16207', 900: '#713f12' },
    lime: { 100: '#f7fee7', 300: '#bef264', 500: '#84cc16', 700: '#4d7c0f', 900: '#1a2e05' },
    green: { 100: '#dcfce7', 300: '#86efac', 500: '#22c55e', 700: '#15803d', 900: '#14532d' },
    emerald: { 100: '#d1fae5', 300: '#6ee7b7', 500: '#10b981', 700: '#047857', 900: '#064e3b' },
    teal: { 100: '#ccfbf1', 300: '#5eead4', 500: '#14b8a6', 700: '#0f766e', 900: '#134e4a' },
    cyan: { 100: '#cffafe', 300: '#67e8f9', 500: '#06b6d4', 700: '#0e7490', 900: '#164e63' },
    sky: { 100: '#e0f2fe', 300: '#7dd3fc', 500: '#0ea5e9', 700: '#0369a1', 900: '#0c4a6e' },
    blue: { 100: '#dbeafe', 300: '#93c5fd', 500: '#3b82f6', 700: '#1d4ed8', 900: '#1e3a8a' },
    indigo: { 100: '#e0e7ff', 300: '#a5b4fc', 500: '#6366f1', 700: '#4338ca', 900: '#312e81' },
    violet: { 100: '#ede9fe', 300: '#c4b5fd', 500: '#8b5cf6', 700: '#6d28d9', 900: '#4c1d95' },
    purple: { 100: '#f3e8ff', 300: '#d8b4fe', 500: '#a855f7', 700: '#7e22ce', 900: '#581c87' },
    pink: { 100: '#fce7f3', 300: '#f9a8d4', 500: '#ec4899', 700: '#be185d', 900: '#831843' },
    rose: { 100: '#ffe4e6', 300: '#fda4af', 500: '#f43f5e', 700: '#be123c', 900: '#881337' },
  }

  return (
    <div className="space-y-1 overflow-x-auto">
      <div className="flex gap-1 min-w-max">
        {shades.map(s => (
          <div key={s} className="w-14 text-center text-[10px] text-slate-500 font-mono mb-1">{s}</div>
        ))}
      </div>
      {colors.map(color => (
        <div key={color} className="flex items-center gap-1">
          {shades.map(shade => (
            <div
              key={shade}
              className="w-14 h-8 rounded flex items-center justify-center"
              style={{ backgroundColor: colorHex[color]?.[shade] }}
              title={`${color}-${shade}`}
            />
          ))}
          <span className="text-[11px] text-slate-500 ml-2 font-mono">{color}</span>
        </div>
      ))}
      <p className="text-xs text-slate-600 mt-2">Use as: <code className="text-cyan-400">text-indigo-500</code>, <code className="text-cyan-400">bg-emerald-700</code>, <code className="text-cyan-400">border-rose-300</code></p>
    </div>
  )
}

// Flexbox visual demo
function FlexboxDemo() {
  const [justify, setJustify] = useState('justify-start')
  const [align, setAlign] = useState('items-center')
  const [direction, setDirection] = useState('flex-row')
  const [gap, setGap] = useState('gap-3')

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {[
          { label: 'justify', value: justify, set: setJustify, options: ['justify-start', 'justify-center', 'justify-end', 'justify-between', 'justify-around'] },
          { label: 'align', value: align, set: setAlign, options: ['items-start', 'items-center', 'items-end', 'items-stretch'] },
          { label: 'direction', value: direction, set: setDirection, options: ['flex-row', 'flex-col'] },
          { label: 'gap', value: gap, set: setGap, options: ['gap-1', 'gap-3', 'gap-6', 'gap-10'] },
        ].map(({ label, value, set, options }) => (
          <div key={label}>
            <label className="text-xs text-slate-400 block mb-1">{label}</label>
            <select value={value} onChange={e => set(e.target.value)} className="w-full bg-slate-800 border border-slate-700 rounded-lg px-2 py-1.5 text-xs text-white focus:outline-none focus:border-cyan-500">
              {options.map(o => <option key={o} value={o}>{o}</option>)}
            </select>
          </div>
        ))}
      </div>
      <div className={`flex ${direction} ${justify} ${align} ${gap} bg-slate-800 border border-slate-700 rounded-xl p-4 min-h-[100px]`}>
        {['A', 'B', 'C'].map((l, i) => (
          <div key={l} className={`${i === 0 ? 'w-12 h-12' : i === 1 ? 'w-10 h-16' : 'w-14 h-8'} bg-indigo-500 rounded-lg flex items-center justify-center text-white text-xs font-bold flex-shrink-0`}>
            {l}
          </div>
        ))}
      </div>
      <p className="text-xs text-slate-500 font-mono">
        {`<div className="flex ${direction} ${justify} ${align} ${gap}">`}
      </p>
    </div>
  )
}

// Grid visual demo
function GridDemo() {
  const [cols, setCols] = useState(3)
  const [gap, setGap] = useState(3)
  const items = ['Header', 'Nav', 'Main', 'Sidebar', 'Footer', 'Extra']

  return (
    <div className="space-y-4">
      <div className="flex gap-4 flex-wrap">
        <label className="text-xs text-slate-400">Columns: <strong className="text-white">{cols}</strong>
          <input type="range" min={1} max={4} value={cols} onChange={e => setCols(+e.target.value)} className="ml-2 w-24 accent-cyan-500" />
        </label>
        <label className="text-xs text-slate-400">Gap: <strong className="text-white">{gap}</strong>
          <input type="range" min={1} max={8} value={gap} onChange={e => setGap(+e.target.value)} className="ml-2 w-24 accent-cyan-500" />
        </label>
      </div>
      <div className={`grid gap-${gap}`} style={{ gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))` }}>
        {items.map((item, i) => (
          <div key={item} className={`bg-indigo-500/20 border border-indigo-500/30 rounded-lg p-3 text-center text-xs text-indigo-300 font-semibold ${i === 0 ? '' : ''}`}>
            {item}
          </div>
        ))}
      </div>
      <p className="text-xs text-slate-500 font-mono">{`<div className="grid grid-cols-${cols} gap-${gap}">`}</p>
    </div>
  )
}

// Responsive demo
function ResponsiveDemo() {
  return (
    <div className="space-y-4">
      <Callout type="info" title="Resize your browser window to see these change">
        The boxes below show their active breakpoint. Tailwind is mobile-first — smaller classes apply unless overridden by a breakpoint prefix.
      </Callout>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
        {['React', 'Node.js', 'Tailwind', 'Express'].map((item, i) => (
          <div key={item} className="bg-slate-800 border border-slate-700 rounded-xl p-4 text-center">
            <div className="text-2xl mb-1">{['⚛️', '🟢', '🎨', '🚂'][i]}</div>
            <p className="text-sm font-semibold text-white">{item}</p>
            <p className="text-[10px] text-slate-500 mt-1 block sm:hidden">mobile (1 col)</p>
            <p className="text-[10px] text-slate-500 mt-1 hidden sm:block md:hidden">sm (still 1 col)</p>
            <p className="text-[10px] text-slate-500 mt-1 hidden md:block lg:hidden">md (2 cols)</p>
            <p className="text-[10px] text-slate-500 mt-1 hidden lg:block">lg (4 cols)</p>
          </div>
        ))}
      </div>
      <p className="text-xs text-slate-500 font-mono">grid-cols-1 md:grid-cols-2 lg:grid-cols-4</p>
    </div>
  )
}

// Animation demo
function AnimationsDemo() {
  const [hovered, setHovered] = useState(null)
  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-3">
        <button
          onMouseEnter={() => setHovered('scale')}
          onMouseLeave={() => setHovered(null)}
          className="bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-semibold px-4 py-2 rounded-lg transition-all duration-200 hover:scale-110 active:scale-95"
        >
          {hovered === 'scale' ? 'hover:scale-110 ✓' : 'Hover → Scale'}
        </button>
        <button
          onMouseEnter={() => setHovered('lift')}
          onMouseLeave={() => setHovered(null)}
          className="bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-semibold px-4 py-2 rounded-lg transition-all duration-300 hover:-translate-y-2 shadow-lg hover:shadow-emerald-500/30"
        >
          {hovered === 'lift' ? 'hover:-translate-y-2 ✓' : 'Hover → Lift'}
        </button>
        <button
          onMouseEnter={() => setHovered('rotate')}
          onMouseLeave={() => setHovered(null)}
          className="bg-violet-600 hover:bg-violet-500 text-white text-sm font-semibold px-4 py-2 rounded-lg transition-all duration-300 hover:rotate-3"
        >
          {hovered === 'rotate' ? 'hover:rotate-3 ✓' : 'Hover → Rotate'}
        </button>
      </div>
      <div className="flex flex-wrap gap-4">
        <div className="flex items-center gap-2 bg-slate-800 px-3 py-2 rounded-lg">
          <div className="w-3 h-3 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-xs text-slate-300">animate-pulse</span>
        </div>
        <div className="flex items-center gap-2 bg-slate-800 px-3 py-2 rounded-lg">
          <div className="w-4 h-4 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin" />
          <span className="text-xs text-slate-300">animate-spin</span>
        </div>
        <div className="flex items-center gap-2 bg-slate-800 px-3 py-2 rounded-lg">
          <div className="w-3 h-3 rounded-full bg-indigo-400 animate-bounce" />
          <span className="text-xs text-slate-300">animate-bounce</span>
        </div>
        <div className="flex items-center gap-2 bg-slate-800 px-3 py-2 rounded-lg">
          <div className="relative w-4 h-4">
            <div className="w-4 h-4 rounded-full bg-rose-400 animate-ping absolute" />
            <div className="w-4 h-4 rounded-full bg-rose-500" />
          </div>
          <span className="text-xs text-slate-300">animate-ping</span>
        </div>
      </div>
    </div>
  )
}

// Real-world profile card demo
function ProfileCardDemo() {
  const [liked, setLiked] = useState(false)
  const [following, setFollowing] = useState(false)

  return (
    <div className="max-w-sm">
      <div className="bg-slate-800 border border-slate-700 rounded-2xl overflow-hidden">
        {/* Cover */}
        <div className="h-24 bg-gradient-to-br from-indigo-500 via-violet-500 to-cyan-500" />
        {/* Avatar */}
        <div className="px-5 pb-5">
          <div className="flex items-end justify-between -mt-8 mb-3">
            <div className="w-16 h-16 rounded-2xl bg-slate-900 border-4 border-slate-800 flex items-center justify-center text-2xl">
              👩‍💻
            </div>
            <div className="flex gap-2 mt-2">
              <button
                onClick={() => setLiked(v => !v)}
                className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm transition-colors ${liked ? 'bg-rose-500/20 text-rose-400' : 'bg-slate-700 text-slate-400 hover:text-slate-200'}`}
              >
                {liked ? '♥' : '♡'}
              </button>
              <button
                onClick={() => setFollowing(v => !v)}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors ${following ? 'bg-slate-700 text-slate-300' : 'bg-indigo-600 hover:bg-indigo-500 text-white'}`}
              >
                {following ? 'Following' : 'Follow'}
              </button>
            </div>
          </div>
          <h3 className="font-bold text-white">Alice Johnson</h3>
          <p className="text-xs text-slate-400 mb-3">Senior React Developer · San Francisco</p>
          <div className="flex gap-4 text-center">
            {[['142', 'Repos'], ['3.2k', 'Followers'], ['89', 'Following']].map(([n, l]) => (
              <div key={l}>
                <div className="text-sm font-bold text-white">{n}</div>
                <div className="text-[10px] text-slate-500">{l}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <p className="text-xs text-slate-600 mt-2 text-center">Built entirely with Tailwind — no custom CSS</p>
    </div>
  )
}

// Dark mode preview demo
function DarkModeDemo() {
  const [dark, setDark] = useState(false)

  return (
    <div className="space-y-3">
      <button
        onClick={() => setDark(d => !d)}
        className="px-3 py-1.5 text-xs rounded-lg font-semibold bg-slate-700 hover:bg-slate-600 text-white transition-colors"
      >
        {dark ? '☀️ Switch to Light' : '🌙 Switch to Dark'}
      </button>

      {/* Simulated card with dark/light variants */}
      <div className={`rounded-xl border p-5 transition-colors duration-300 ${dark ? 'bg-slate-900 border-slate-700' : 'bg-white border-slate-200'}`}>
        <h3 className={`font-bold mb-1 text-sm transition-colors ${dark ? 'text-white' : 'text-slate-900'}`}>
          Product Card
        </h3>
        <p className={`text-xs mb-3 transition-colors ${dark ? 'text-slate-400' : 'text-slate-600'}`}>
          This card adapts to the current theme using Tailwind's dark: prefix.
        </p>
        <div className="flex gap-2">
          <button className={`text-xs px-3 py-1.5 rounded-lg font-semibold transition-colors ${dark ? 'bg-indigo-600 hover:bg-indigo-500 text-white' : 'bg-indigo-500 hover:bg-indigo-600 text-white'}`}>
            Buy Now
          </button>
          <button className={`text-xs px-3 py-1.5 rounded-lg font-semibold transition-colors ${dark ? 'bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700' : 'bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200'}`}>
            Learn More
          </button>
        </div>
      </div>

      <CodeBlock code={`<div className="bg-white dark:bg-slate-900
           border-slate-200 dark:border-slate-700">
  <h3 className="text-slate-900 dark:text-white">...</h3>
  <p className="text-slate-600 dark:text-slate-400">...</p>
</div>`} />
    </div>
  )
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default function TailwindPage() {
  return (
    <div className="space-y-10">
      <div>
        <p className="text-xs font-semibold text-cyan-400 uppercase tracking-wider mb-2">Styling</p>
        <h1 className="text-3xl font-bold text-white mb-3">Tailwind CSS</h1>
        <p className="text-slate-400 leading-relaxed">
          Tailwind CSS is a way to style your web pages. Instead of writing a separate CSS file, you put small style instructions directly on your HTML elements. No switching between files — everything is in one place.
        </p>
      </div>

      {/* Plain-English intro */}
      <div className="bg-cyan-500/10 border border-cyan-500/30 rounded-xl p-5">
        <p className="text-xs font-bold text-cyan-300 uppercase tracking-wider mb-3">Think of it like this</p>
        <p className="text-sm text-slate-300 leading-relaxed mb-3">
          Normal CSS is like buying furniture and then having to paint and assemble each piece yourself. You name your own pieces (<code className="text-cyan-300">.my-button</code>), write what each piece should look like in a separate file, then reference it from your HTML. Two files to manage, lots of naming things.
        </p>
        <p className="text-sm text-slate-300 leading-relaxed mb-3">
          <strong className="text-white">Tailwind is like IKEA with pre-labeled parts.</strong> Instead of inventing names and writing styles, you pick from a set of ready-made pieces: <code className="text-cyan-300">bg-blue-500</code> means "blue background", <code className="text-cyan-300">text-white</code> means "white text", <code className="text-cyan-300">rounded-lg</code> means "rounded corners". You just combine them.
        </p>
        <p className="text-sm text-slate-300 leading-relaxed">
          The result? You never leave your JSX file. Everything you need — colors, sizes, spacing, animations — is built in.
        </p>
      </div>

      {/* Key terms */}
      <div className="bg-slate-800/60 border border-slate-700/50 rounded-xl p-5">
        <p className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-3">Key Terms — Plain English</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {[
            { term: 'CSS', def: 'Cascading Style Sheets — the language that controls how web pages look: colors, fonts, spacing, layout.' },
            { term: 'Utility class', def: 'A tiny, single-purpose style. bg-blue-500 does exactly one thing: makes the background blue. You combine many utilities instead of writing one big custom class.' },
            { term: 'Responsive', def: 'The page looks different on different screen sizes. On mobile it might be 1 column; on desktop it might be 4 columns.' },
            { term: 'Breakpoint', def: 'A screen width where the layout changes. sm: kicks in at 640px, md: at 768px, lg: at 1024px. Below that, mobile styles apply.' },
            { term: 'Mobile-first', def: 'You design for small screens first, then add changes for bigger screens. The base styles work on mobile; prefixes like md: override them on larger screens.' },
            { term: 'Flexbox', def: 'A layout tool for arranging items in a row or column. Great for navbars, buttons in a row, or centering something on screen.' },
            { term: 'Grid', def: 'A layout tool for arranging items in rows AND columns — like a table but much more flexible. Great for card grids and page layouts.' },
            { term: 'Padding vs Margin', def: 'Padding is the space inside an element (between its content and its border). Margin is the space outside (between elements).' },
          ].map(({ term, def }) => (
            <div key={term} className="flex gap-3">
              <span className="text-cyan-300 font-mono text-xs font-bold flex-shrink-0 w-32">{term}</span>
              <span className="text-slate-400 text-xs leading-relaxed">{def}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Setup */}
      <section>
        <h2 className="text-xl font-bold text-white mb-3">Setup with Vite</h2>
        <p className="text-slate-400 text-sm mb-3">
          If you created your project with Vite, adding Tailwind takes 3 steps: install it, create a config file, and add 3 lines to your CSS. After that, all Tailwind classes are available everywhere in your project.
        </p>
        <CodeBlock language="bash" code={`npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p`} />
        <CodeBlock filename="tailwind.config.js" code={`export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: { extend: {} },
  plugins: [],
}`} />
        <CodeBlock filename="src/index.css" code={`@tailwind base;
@tailwind components;
@tailwind utilities;`} />
      </section>

      {/* Core concept */}
      <section>
        <h2 className="text-xl font-bold text-white mb-3">The Core Idea: Utilities instead of Classes</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <p className="text-xs text-red-400 font-semibold mb-1">Traditional CSS — two files to maintain</p>
            <CodeBlock language="html" code={`<!-- index.html -->
<button class="btn-primary">Click Me</button>

/* styles.css */
.btn-primary {
  background-color: #6366f1;
  color: white;
  padding: 8px 16px;
  border-radius: 8px;
  font-weight: 600;
}`} />
          </div>
          <div>
            <p className="text-xs text-green-400 font-semibold mb-1">Tailwind — one place, no context switching</p>
            <CodeBlock language="html" code={`<!-- No CSS file needed! -->
<button className="
  bg-indigo-500
  text-white
  px-4 py-2
  rounded-lg
  font-semibold
  hover:bg-indigo-400
  transition-colors
">
  Click Me
</button>`} />
          </div>
        </div>
        <LiveDemo title="Both buttons — identical visual result">
          <CoreConceptDemo />
        </LiveDemo>
      </section>

      {/* Interactive button builder */}
      <section>
        <h2 className="text-xl font-bold text-white mb-3">Interactive: Build a Button</h2>
        <p className="text-slate-400 text-sm mb-3">Change the options and see how Tailwind classes compose together:</p>
        <LiveDemo title="Button Builder — live class generator">
          <ButtonBuilder />
        </LiveDemo>
      </section>

      {/* Spacing */}
      <section>
        <h2 className="text-xl font-bold text-white mb-3">Spacing: Padding & Margin</h2>
        <p className="text-slate-400 text-sm mb-2">
          <strong className="text-white">Padding</strong> = space inside an element, between its content and its edge. <strong className="text-white">Margin</strong> = space outside an element, pushing other elements away.
        </p>
        <p className="text-slate-400 text-sm mb-3">
          Tailwind uses a scale where each number = 4px. So <code className="text-cyan-300">p-4</code> = 16px of padding on all sides, <code className="text-cyan-300">px-6</code> = 24px on left and right only, <code className="text-cyan-300">mt-2</code> = 8px margin on top only.
        </p>
        <CodeBlock code={`{/* Padding */}
<div className="p-4">     {/* all sides: 16px */}
<div className="px-4 py-2"> {/* horizontal/vertical */}
<div className="pt-2 pr-4 pb-6 pl-3"> {/* individual sides */}

{/* Margin */}
<div className="m-4">     {/* all sides */}
<div className="mx-auto">  {/* center horizontally */}
<div className="mt-8 mb-4"> {/* top/bottom only */}

{/* Gap between flex/grid children */}
<div className="flex gap-4">
<div className="grid grid-cols-3 gap-x-6 gap-y-2">`} />
        <LiveDemo title="Padding vs Margin — drag sliders to see the difference">
          <SpacingDemo />
        </LiveDemo>
      </section>

      {/* Colors */}
      <section>
        <h2 className="text-xl font-bold text-white mb-3">Color System</h2>
        <p className="text-slate-400 text-sm mb-3">
          Tailwind ships 22 color palettes, each with shades from <code className="text-cyan-300">50</code> (lightest) to <code className="text-cyan-300">950</code> (darkest). Apply them to text, backgrounds, borders, and more.
        </p>
        <CodeBlock code={`{/* Text */}
<p className="text-indigo-500">Indigo text</p>
<p className="text-slate-400">Muted gray text</p>

{/* Background */}
<div className="bg-emerald-500">Solid background</div>
<div className="bg-indigo-500/20">20% opacity background</div>

{/* Border */}
<div className="border border-rose-500">Rose border</div>
<div className="border border-slate-700/50">50% opacity border</div>

{/* Gradient */}
<div className="bg-gradient-to-r from-indigo-500 to-cyan-500">`} />
        <LiveDemo title="Color palette — all 17 colors × 5 shades">
          <ColorPaletteDemo />
        </LiveDemo>
      </section>

      {/* Flexbox */}
      <section>
        <h2 className="text-xl font-bold text-white mb-3">Flexbox</h2>

        <div className="bg-cyan-500/10 border border-cyan-500/30 rounded-xl p-4 mb-4">
          <p className="text-xs font-bold text-cyan-300 uppercase tracking-wider mb-2">What is Flexbox?</p>
          <p className="text-sm text-slate-300 leading-relaxed mb-2">
            Flexbox is a layout mode that arranges items in a <strong className="text-white">single line</strong> — either a row (left to right) or a column (top to bottom). It's perfect for navbars, button groups, centering content, or any situation where you want items side by side.
          </p>
          <p className="text-sm text-slate-300 leading-relaxed">
            Add <code className="text-cyan-300">flex</code> to a container and its direct children automatically line up. Then use <code className="text-cyan-300">justify-</code> to control horizontal position and <code className="text-cyan-300">items-</code> to control vertical alignment.
          </p>
        </div>

        <CodeBlock code={`<div className="flex">             {/* display: flex */}
<div className="flex flex-col">  {/* column direction */}
<div className="flex flex-wrap"> {/* wrap items */}

{/* Main axis (horizontal by default) */}
<div className="flex justify-start">   {/* left */}
<div className="flex justify-center">  {/* center */}
<div className="flex justify-end">     {/* right */}
<div className="flex justify-between"> {/* space between */}

{/* Cross axis (vertical by default) */}
<div className="flex items-start">   {/* top */}
<div className="flex items-center">  {/* middle */}
<div className="flex items-end">     {/* bottom */}

{/* Children */}
<div className="flex-1">       {/* grow to fill space */}
<div className="flex-shrink-0"> {/* don't shrink */}`} />
        <LiveDemo title="Flexbox — adjust justify, align, direction, and gap">
          <FlexboxDemo />
        </LiveDemo>
      </section>

      {/* Grid */}
      <section>
        <h2 className="text-xl font-bold text-white mb-3">Grid</h2>

        <div className="bg-cyan-500/10 border border-cyan-500/30 rounded-xl p-4 mb-4">
          <p className="text-xs font-bold text-cyan-300 uppercase tracking-wider mb-2">Flexbox vs Grid — which to use?</p>
          <p className="text-sm text-slate-300 leading-relaxed mb-2">
            <strong className="text-white">Flexbox</strong> — for laying items out in <em>one direction</em> (a row OR a column). Think: navigation menu, a row of buttons, centering something.
          </p>
          <p className="text-sm text-slate-300 leading-relaxed">
            <strong className="text-white">Grid</strong> — for layouts with rows AND columns at the same time. Think: a 3-column card gallery, a page with a sidebar, any repeating tile layout. Add <code className="text-cyan-300">grid</code> to the container and <code className="text-cyan-300">grid-cols-3</code> to say "3 equal columns".
          </p>
        </div>

        <CodeBlock code={`<div className="grid grid-cols-3 gap-4">  {/* 3 equal columns */}
<div className="grid grid-cols-12 gap-2"> {/* 12-col layout */}

{/* Responsive grid — most common pattern */}
<div className="grid
  grid-cols-1      {/* mobile: 1 column */}
  md:grid-cols-2   {/* tablet: 2 columns */}
  lg:grid-cols-3   {/* desktop: 3 columns */}
  gap-4
">

{/* Spanning */}
<div className="col-span-2">    {/* span 2 columns */}
<div className="col-span-full"> {/* full width */}`} />
        <LiveDemo title="Grid — adjust columns and gap interactively">
          <GridDemo />
        </LiveDemo>
      </section>

      {/* Typography */}
      <section>
        <h2 className="text-xl font-bold text-white mb-3">Typography</h2>
        <CodeBlock code={`{/* Size */}
text-xs   → 12px    text-sm  → 14px
text-base → 16px    text-lg  → 18px
text-xl   → 20px    text-2xl → 24px
text-4xl  → 36px    text-6xl → 60px

{/* Weight */}
font-light → 300    font-normal  → 400
font-medium → 500   font-semibold → 600
font-bold  → 700    font-black   → 900

{/* Style */}
italic          line-through     underline
uppercase       capitalize       lowercase
tracking-tight  tracking-wide    tracking-widest
leading-tight   leading-normal   leading-relaxed
text-center     text-right       truncate`} />
        <LiveDemo title="Typography in action">
          <div className="space-y-2">
            <p className="text-xs text-slate-500">text-xs text-slate-500 — captions, labels</p>
            <p className="text-sm text-slate-400">text-sm text-slate-400 — body secondary</p>
            <p className="text-base text-slate-200">text-base text-slate-200 — body primary</p>
            <p className="text-lg font-semibold text-white">text-lg font-semibold — subheadings</p>
            <p className="text-2xl font-bold text-white">text-2xl font-bold — headings</p>
            <p className="text-3xl font-black tracking-tight bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">
              text-3xl font-black + gradient
            </p>
            <p className="text-xs font-semibold uppercase tracking-widest text-indigo-400">uppercase tracking-widest — section labels</p>
          </div>
        </LiveDemo>
      </section>

      {/* Responsive */}
      <section>
        <h2 className="text-xl font-bold text-white mb-3">Responsive Design</h2>

        <div className="bg-cyan-500/10 border border-cyan-500/30 rounded-xl p-4 mb-4">
          <p className="text-xs font-bold text-cyan-300 uppercase tracking-wider mb-2">What does "mobile-first" mean?</p>
          <p className="text-sm text-slate-300 leading-relaxed mb-2">
            Tailwind is "mobile-first" — the base styles (no prefix) apply to the smallest screen size (phones). Then, as the screen gets wider, you layer on changes using prefixes.
          </p>
          <p className="text-sm text-slate-300 leading-relaxed mb-2">
            <code className="text-cyan-300">grid-cols-1</code> → on all screens, 1 column<br />
            <code className="text-cyan-300">md:grid-cols-2</code> → on screens 768px+ wide, switch to 2 columns<br />
            <code className="text-cyan-300">lg:grid-cols-4</code> → on screens 1024px+ wide, switch to 4 columns
          </p>
          <p className="text-sm text-slate-300 leading-relaxed">
            A <strong className="text-white">breakpoint</strong> is just the screen width where a layout change happens. Think of it like: "below 768px = phone layout, above 768px = tablet layout, above 1024px = desktop layout."
          </p>
        </div>

        <Callout type="info" title="Breakpoints quick reference">
          <code className="text-slate-200">sm:</code> ≥640px &nbsp;|&nbsp; <code className="text-slate-200">md:</code> ≥768px &nbsp;|&nbsp; <code className="text-slate-200">lg:</code> ≥1024px &nbsp;|&nbsp; <code className="text-slate-200">xl:</code> ≥1280px. Unprefixed classes apply to all sizes. Prefixed classes override at that size and above.
        </Callout>
        <CodeBlock code={`{/* Breakpoints */}
sm:  ≥ 640px   md:  ≥ 768px
lg:  ≥ 1024px  xl:  ≥ 1280px  2xl: ≥ 1536px

{/* Example: responsive grid */}
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">

{/* Example: responsive text */}
<h1 className="text-2xl md:text-4xl lg:text-6xl font-bold">

{/* Example: show/hide */}
<nav className="hidden md:flex">  {/* desktop only */}
<button className="md:hidden">   {/* mobile only — hamburger menu */}

{/* Example: responsive padding */}
<div className="p-4 md:p-8 lg:p-12">`} />
        <LiveDemo title="Responsive grid — resize your browser window">
          <ResponsiveDemo />
        </LiveDemo>
      </section>

      {/* Dark mode */}
      <section>
        <h2 className="text-xl font-bold text-white mb-3">Dark Mode</h2>
        <CodeBlock code={`{/* Enable in tailwind.config.js */}
export default {
  darkMode: 'class', // toggle by adding 'dark' class to <html>
}

{/* Add dark: variants to any class */}
<div className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white">

{/* Toggle in React */}
function ThemeToggle() {
  const [dark, setDark] = useState(false)
  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark)
  }, [dark])
  return <button onClick={() => setDark(d => !d)}>Toggle</button>
}`} />
        <LiveDemo title="Dark mode toggle — simulated">
          <DarkModeDemo />
        </LiveDemo>
      </section>

      {/* Animations */}
      <section>
        <h2 className="text-xl font-bold text-white mb-3">Transitions & Animations</h2>
        <CodeBlock code={`{/* Transitions — smooth changes on hover */}
<button className="transition-colors duration-200 hover:bg-indigo-400">
<div className="transition-all duration-300 hover:scale-105">
<div className="transition-transform duration-500 hover:-translate-y-2">

{/* Transform on hover */}
hover:scale-105    hover:scale-110   hover:-translate-y-1
hover:rotate-3     hover:rotate-6    active:scale-95

{/* Built-in animations */}
animate-spin    {/* loading spinner */}
animate-pulse   {/* breathing effect */}
animate-bounce  {/* up-and-down */}
animate-ping    {/* radar / notification dot */}`} />
        <LiveDemo title="Hover effects and animations">
          <AnimationsDemo />
        </LiveDemo>
      </section>

      {/* Real-world example */}
      <section>
        <h2 className="text-xl font-bold text-white mb-3">Real-World Example: Profile Card</h2>
        <p className="text-slate-400 text-sm mb-3">A complete interactive UI component built entirely with Tailwind — zero custom CSS:</p>
        <LiveDemo title="Profile Card — interactive">
          <ProfileCardDemo />
        </LiveDemo>
        <CodeBlock code={`function ProfileCard() {
  const [following, setFollowing] = useState(false)

  return (
    <div className="bg-slate-800 border border-slate-700 rounded-2xl overflow-hidden">
      {/* Gradient cover */}
      <div className="h-24 bg-gradient-to-br from-indigo-500 via-violet-500 to-cyan-500" />

      <div className="px-5 pb-5">
        {/* Avatar + actions */}
        <div className="flex items-end justify-between -mt-8 mb-3">
          <div className="w-16 h-16 rounded-2xl bg-slate-900 border-4 border-slate-800 flex items-center justify-center text-2xl">
            👩‍💻
          </div>
          <button
            onClick={() => setFollowing(v => !v)}
            className={\`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors \${
              following
                ? 'bg-slate-700 text-slate-300'
                : 'bg-indigo-600 hover:bg-indigo-500 text-white'
            }\`}
          >
            {following ? 'Following' : 'Follow'}
          </button>
        </div>

        <h3 className="font-bold text-white">Alice Johnson</h3>
        <p className="text-xs text-slate-400 mb-3">Senior React Developer</p>

        <div className="flex gap-4 text-center">
          <div><div className="text-sm font-bold text-white">142</div><div className="text-[10px] text-slate-500">Repos</div></div>
          <div><div className="text-sm font-bold text-white">3.2k</div><div className="text-[10px] text-slate-500">Followers</div></div>
        </div>
      </div>
    </div>
  )
}`} />
      </section>

      <PageNav currentPath="/tailwind" />
    </div>
  )
}
