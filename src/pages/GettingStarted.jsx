import CodeBlock from '../components/CodeBlock'
import Callout from '../components/Callout'
import PageNav from '../components/PageNav'
import { Link } from 'react-router-dom'

export default function GettingStarted() {
  return (
    <div className="space-y-10">
      <div>
        <p className="text-xs font-semibold text-emerald-400 uppercase tracking-wider mb-2">Introduction</p>
        <h1 className="text-3xl font-bold text-white mb-3">Setup & Installation</h1>
        <p className="text-slate-400 leading-relaxed">
          Before writing any React code, you need to set up your computer. This page walks you through it step by step — even if you've never done this before.
        </p>
      </div>

      {/* Big picture */}
      <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-xl p-5">
        <p className="text-xs font-bold text-emerald-300 uppercase tracking-wider mb-3">What are we installing and why?</p>
        <div className="space-y-3">
          {[
            { name: 'Node.js', icon: '🟢', why: 'React is built with JavaScript. Node.js lets you run JavaScript outside the browser (on your computer), which is needed to run the dev tools that build your app.' },
            { name: 'npm', icon: '📦', why: 'Comes with Node.js automatically. npm is a package manager — it downloads ready-made code libraries (like React itself) so you don\'t have to write everything from scratch.' },
            { name: 'Vite', icon: '⚡', why: 'The tool that sets up your React project and runs a local web server so you can see your app in the browser while you\'re building it. Think of it as your workspace.' },
            { name: 'VS Code', icon: '🖊️', why: 'A free code editor with excellent React support, auto-complete, and error highlighting. Not required, but strongly recommended.' },
          ].map(({ name, icon, why }) => (
            <div key={name} className="flex gap-3">
              <span className="text-xl flex-shrink-0">{icon}</span>
              <div>
                <p className="text-sm font-semibold text-white">{name}</p>
                <p className="text-xs text-slate-400 leading-relaxed">{why}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Prerequisites */}
      <section>
        <h2 className="text-xl font-bold text-white mb-3">What you need installed</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {[
            { name: 'Node.js', version: 'v18+', desc: 'The JavaScript runtime. Download the LTS version from nodejs.org — npm installs automatically with it.', required: true },
            { name: 'VS Code', version: 'any', desc: 'Free code editor from Microsoft. Install the ES7+ React Snippets extension once it\'s open.', required: false },
          ].map((p) => (
            <div key={p.name} className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-1">
                <span className="font-semibold text-white text-sm">{p.name}</span>
                <span className="text-xs text-slate-500 bg-slate-700/50 px-2 py-0.5 rounded-full">{p.version}</span>
                {p.required && <span className="text-xs bg-red-500/20 text-red-300 px-1.5 py-0.5 rounded-full">Required</span>}
              </div>
              <p className="text-xs text-slate-400">{p.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Verify Node */}
      <section>
        <h2 className="text-xl font-bold text-white mb-2">1. Verify Node.js</h2>
        <p className="text-slate-400 text-sm mb-3">Open a terminal and check your Node version:</p>
        <CodeBlock language="bash" code={`node --version
# Should print v18.0.0 or higher

npm --version
# Should print 9.x or higher`} />
        <Callout type="tip" title="Not installed?">
          Download Node.js from <strong>nodejs.org</strong>. The LTS (Long Term Support) version is recommended. npm comes bundled with it automatically.
        </Callout>
      </section>

      {/* Create project */}
      <section>
        <h2 className="text-xl font-bold text-white mb-2">2. Create a React App with Vite</h2>
        <p className="text-slate-400 text-sm mb-3">Vite is faster than Create React App. Run this in your terminal:</p>
        <CodeBlock language="bash" code={`npm create vite@latest my-app -- --template react
cd my-app
npm install
npm run dev`} />
        <p className="text-slate-400 text-sm mt-3">Your app will be running at <code className="text-indigo-400 bg-slate-800 px-1.5 py-0.5 rounded">http://localhost:5173</code></p>
      </section>

      {/* Folder structure */}
      <section>
        <h2 className="text-xl font-bold text-white mb-2">3. Project Structure</h2>
        <p className="text-slate-400 text-sm mb-3">Here's what Vite creates for you:</p>
        <CodeBlock language="bash" code={`my-app/
├── public/          # Static files (images, favicon)
├── src/
│   ├── assets/      # Imported images, SVGs
│   ├── App.jsx      # Root component
│   ├── App.css      # App styles
│   ├── main.jsx     # Entry point (renders App)
│   └── index.css    # Global styles
├── index.html       # HTML template
├── package.json     # Dependencies & scripts
└── vite.config.js   # Vite configuration`} />
      </section>

      {/* Main entry point */}
      <section>
        <h2 className="text-xl font-bold text-white mb-2">Understanding main.jsx</h2>
        <p className="text-slate-400 text-sm mb-3">This is the entry point that mounts your React app into the HTML:</p>
        <CodeBlock filename="src/main.jsx" code={`import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

// Find the <div id="root"> in index.html and render App inside it
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)`} />
        <Callout type="info" title="React.StrictMode">
          StrictMode is a development tool that highlights potential problems. It renders components twice to detect side effects. It does <em>not</em> affect production builds.
        </Callout>
      </section>

      {/* npm scripts */}
      <section>
        <h2 className="text-xl font-bold text-white mb-3">Common npm Scripts</h2>
        <div className="overflow-hidden rounded-xl border border-slate-700/50">
          <table className="w-full text-sm">
            <thead className="bg-slate-800">
              <tr>
                <th className="text-left px-4 py-3 text-slate-300 font-semibold">Command</th>
                <th className="text-left px-4 py-3 text-slate-300 font-semibold">What it does</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {[
                { cmd: 'npm run dev', desc: 'Start the dev server with hot module replacement' },
                { cmd: 'npm run build', desc: 'Create an optimized production build in dist/' },
                { cmd: 'npm run preview', desc: 'Preview the production build locally' },
                { cmd: 'npm install pkg', desc: 'Install a new package (add to node_modules)' },
              ].map((r) => (
                <tr key={r.cmd} className="bg-slate-900/50">
                  <td className="px-4 py-3 font-mono text-indigo-300 text-xs">{r.cmd}</td>
                  <td className="px-4 py-3 text-slate-400">{r.desc}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Next steps */}
      <div className="bg-gradient-to-r from-indigo-500/10 to-violet-500/10 border border-indigo-500/30 rounded-xl p-5">
        <h3 className="font-bold text-white mb-2">You're set up! What's next?</h3>
        <p className="text-slate-400 text-sm mb-3">Now that your environment is ready, start learning the fundamentals:</p>
        <Link to="/components" className="inline-flex items-center gap-2 bg-indigo-500 hover:bg-indigo-400 text-white font-semibold text-sm px-4 py-2 rounded-lg transition-colors">
          Learn JSX & Components →
        </Link>
      </div>

      <PageNav currentPath="/getting-started" />
    </div>
  )
}
