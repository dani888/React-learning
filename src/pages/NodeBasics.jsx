import { useState } from 'react'
import CodeBlock from '../components/CodeBlock'
import Callout from '../components/Callout'
import PageNav from '../components/PageNav'

// ── Helpers ───────────────────────────────────────────────────────────────────

function LiveDemo({ title, children }) {
  return (
    <div className="bg-slate-900 border border-slate-700/50 rounded-xl overflow-hidden my-4">
      <div className="flex items-center gap-2 px-4 py-2 bg-slate-800 border-b border-slate-700/50">
        <div className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
        <span className="text-xs font-semibold text-slate-400">Live Preview — {title}</span>
      </div>
      <div className="p-5">{children}</div>
    </div>
  )
}

// Terminal-style output block
function Terminal({ filename, lines }) {
  return (
    <div className="rounded-xl overflow-hidden border border-slate-700/50 my-4">
      <div className="flex items-center gap-3 px-4 py-2 bg-slate-800 border-b border-slate-700/50">
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-red-500/70" />
          <div className="w-3 h-3 rounded-full bg-yellow-500/70" />
          <div className="w-3 h-3 rounded-full bg-green-500/70" />
        </div>
        <span className="text-xs text-slate-400 font-mono">{filename || 'Terminal'}</span>
      </div>
      <div className="bg-slate-950 px-4 py-3 space-y-1 font-mono text-sm">
        {lines.map((line, i) => (
          <div key={i} className={`${line.startsWith('$') ? 'text-slate-500' : line.startsWith('//') ? 'text-slate-600' : line.startsWith('Error') || line.startsWith('✗') ? 'text-red-400' : line.startsWith('✓') ? 'text-emerald-400' : 'text-slate-300'}`}>
            {line}
          </div>
        ))}
      </div>
    </div>
  )
}

// ── Demos ─────────────────────────────────────────────────────────────────────

// How Node works — visual diagram
function HowNodeWorksDemo() {
  const [step, setStep] = useState(0)
  const steps = [
    { label: 'Request arrives', color: 'bg-sky-500', desc: 'A client (browser, React app) sends an HTTP request to Node.js.' },
    { label: 'Event Loop picks it up', color: 'bg-violet-500', desc: 'Node\'s Event Loop receives the request. It\'s non-blocking — it doesn\'t wait.' },
    { label: 'Async work (file/DB)', color: 'bg-amber-500', desc: 'If it needs to read a file or query a database, it delegates to the OS and moves on.' },
    { label: 'Callback fires', color: 'bg-emerald-500', desc: 'When the async work finishes, the result comes back via a callback or Promise.' },
    { label: 'Response sent', color: 'bg-indigo-500', desc: 'Node sends the response back to the client. Done — and it handled other requests in between!' },
  ]

  return (
    <div className="space-y-4">
      <div className="flex gap-2 flex-wrap">
        {steps.map((s, i) => (
          <button
            key={i}
            onClick={() => setStep(i)}
            className={`text-xs px-2.5 py-1 rounded-lg font-semibold transition-colors ${step === i ? s.color + ' text-white' : 'bg-slate-800 text-slate-400 hover:text-white'}`}
          >
            Step {i + 1}
          </button>
        ))}
      </div>

      {/* Flow diagram */}
      <div className="relative flex items-center gap-1 overflow-x-auto py-2">
        {steps.map((s, i) => (
          <div key={i} className="flex items-center flex-shrink-0">
            <div className={`px-3 py-2 rounded-lg text-xs font-semibold text-white transition-all ${i === step ? s.color + ' ring-2 ring-white/30 scale-105' : i < step ? 'bg-slate-700 opacity-60' : 'bg-slate-800 opacity-40'}`}>
              {s.label}
            </div>
            {i < steps.length - 1 && (
              <div className={`mx-1 text-lg transition-colors ${i < step ? 'text-slate-400' : 'text-slate-700'}`}>→</div>
            )}
          </div>
        ))}
      </div>

      <div className={`rounded-lg px-4 py-3 text-sm text-white ${steps[step].color}/20 border border-current/20`} style={{ borderColor: 'currentColor' }}>
        <p className="text-xs text-slate-300">{steps[step].desc}</p>
      </div>
    </div>
  )
}

// process.env and process info sim
function ProcessDemo() {
  const info = {
    'process.version': 'v20.11.0',
    'process.platform': 'win32',
    'process.cwd()': 'C:\\Users\\danie\\my-app',
    'process.env.NODE_ENV': 'development',
    'process.env.PORT': '3000',
    'process.uptime()': '14.23 seconds',
    'process.memoryUsage().heapUsed': '~12 MB',
  }

  return (
    <div className="space-y-1">
      <p className="text-xs text-slate-500 mb-3">The <code className="text-amber-400">process</code> object gives you info about the running Node.js environment:</p>
      {Object.entries(info).map(([key, val]) => (
        <div key={key} className="flex items-center gap-3 py-1.5 border-b border-slate-800">
          <code className="text-amber-300 text-xs font-mono flex-shrink-0 w-52">{key}</code>
          <span className="text-slate-300 text-sm">{val}</span>
        </div>
      ))}
    </div>
  )
}

// Modules demo
function ModulesDemo() {
  const [mod, setMod] = useState('cjs')

  return (
    <div className="space-y-3">
      <div className="flex gap-2">
        {[['cjs', 'CommonJS (older)'], ['esm', 'ES Modules (modern)']].map(([key, label]) => (
          <button key={key} onClick={() => setMod(key)} className={`text-xs px-3 py-1.5 rounded-lg font-semibold transition-colors ${mod === key ? 'bg-amber-500 text-white' : 'bg-slate-800 text-slate-400 hover:text-white'}`}>
            {label}
          </button>
        ))}
      </div>
      {mod === 'cjs' ? (
        <>
          <CodeBlock filename="math.js" code={`// CommonJS — still used in many Node.js projects

// Named export
const add = (a, b) => a + b
const multiply = (a, b) => a * b

module.exports = { add, multiply }`} />
          <CodeBlock filename="app.js" code={`// CommonJS import
const { add, multiply } = require('./math')
const fs = require('fs')         // built-in
const path = require('path')     // built-in
const express = require('express') // npm package

console.log(add(2, 3))       // 5
console.log(multiply(4, 5))  // 20`} />
          <Terminal filename="node app.js" lines={['$ node app.js', '5', '20']} />
        </>
      ) : (
        <>
          <CodeBlock filename="math.js" code={`// ES Modules — add "type": "module" to package.json

// Named exports
export const add = (a, b) => a + b
export const multiply = (a, b) => a * b

// Default export
export default function subtract(a, b) {
  return a - b
}`} />
          <CodeBlock filename="app.js" code={`// ES Module import
import { add, multiply } from './math.js'   // named
import subtract from './math.js'            // default
import { readFile } from 'fs/promises'      // built-in
import express from 'express'              // npm package

console.log(add(2, 3))       // 5
console.log(subtract(10, 3)) // 7`} />
          <Terminal filename="node app.js" lines={['$ node app.js', '5', '7']} />
          <Callout type="tip" title="Enable ES Modules">
            Add <code className="text-slate-200">"type": "module"</code> to your <code className="text-slate-200">package.json</code>. Then use <code className="text-slate-200">.js</code> extensions on imports. This is the modern standard, same syntax as React uses.
          </Callout>
        </>
      )}
    </div>
  )
}

// fs demo
function FsDemo() {
  const [tab, setTab] = useState('read')
  return (
    <div className="space-y-3">
      <div className="flex gap-2 flex-wrap">
        {[['read', 'Read File'], ['write', 'Write File'], ['dir', 'List Directory']].map(([key, label]) => (
          <button key={key} onClick={() => setTab(key)} className={`text-xs px-3 py-1.5 rounded-lg font-semibold transition-colors ${tab === key ? 'bg-amber-500 text-white' : 'bg-slate-800 text-slate-400 hover:text-white'}`}>
            {label}
          </button>
        ))}
      </div>
      {tab === 'read' && (
        <>
          <CodeBlock filename="read.js" code={`import { readFile } from 'fs/promises'

// Read a text file
const text = await readFile('./notes.txt', 'utf-8')
console.log(text)

// Read and parse JSON
const raw = await readFile('./config.json', 'utf-8')
const config = JSON.parse(raw)
console.log(config.port)   // 3000
console.log(config.debug)  // true`} />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <Terminal filename="notes.txt" lines={['Hello, Node.js!', 'This is a text file.']} />
            <Terminal filename="config.json" lines={['{', '  "port": 3000,', '  "debug": true', '}']} />
          </div>
          <Terminal filename="node read.js" lines={['$ node read.js', 'Hello, Node.js!', 'This is a text file.', '3000', 'true']} />
        </>
      )}
      {tab === 'write' && (
        <>
          <CodeBlock filename="write.js" code={`import { writeFile, appendFile } from 'fs/promises'

// Write (overwrites if exists)
await writeFile('./output.txt', 'First line\n')
console.log('✓ File written')

// Append (adds to end)
await appendFile('./output.txt', 'Second line\n')
console.log('✓ Line appended')

// Write JSON
const data = { users: ['Alice', 'Bob'], count: 2 }
await writeFile('./data.json', JSON.stringify(data, null, 2))
console.log('✓ JSON saved')`} />
          <Terminal filename="node write.js" lines={['$ node write.js', '✓ File written', '✓ Line appended', '✓ JSON saved']} />
        </>
      )}
      {tab === 'dir' && (
        <>
          <CodeBlock filename="list.js" code={`import { readdir, stat } from 'fs/promises'

const files = await readdir('./src')
console.log('Files in src/:')
files.forEach(f => console.log(' ', f))

// Get file details
for (const file of files) {
  const info = await stat(\`./src/\${file}\`)
  const size = (info.size / 1024).toFixed(1) + 'KB'
  console.log(\`  \${file}: \${size}\`)
}`} />
          <Terminal filename="node list.js" lines={[
            '$ node list.js',
            'Files in src/:',
            '  App.jsx',
            '  main.jsx',
            '  index.css',
            '  App.jsx: 1.2KB',
            '  main.jsx: 0.3KB',
            '  index.css: 0.1KB',
          ]} />
        </>
      )}
    </div>
  )
}

// HTTP server demo
function HttpServerDemo() {
  const [route, setRoute] = useState('/')
  const routes = {
    '/': { status: 200, type: 'text/html', body: '<h1>Hello from Node.js!</h1>' },
    '/api/hello': { status: 200, type: 'application/json', body: '{ "message": "Hello, World!", "ok": true }' },
    '/api/users': { status: 200, type: 'application/json', body: '[\n  { "id": 1, "name": "Alice" },\n  { "id": 2, "name": "Bob" }\n]' },
    '/missing': { status: 404, type: 'text/plain', body: 'Not Found' },
  }
  const result = routes[route]

  return (
    <div className="space-y-4">
      <p className="text-xs text-slate-500">Simulate requests to a Node.js HTTP server:</p>
      <div className="flex flex-wrap gap-2">
        {Object.keys(routes).map(r => (
          <button key={r} onClick={() => setRoute(r)} className={`text-xs px-3 py-1.5 rounded-lg font-mono font-semibold transition-colors ${route === r ? 'bg-amber-500 text-white' : 'bg-slate-800 text-slate-400 hover:text-white'}`}>
            GET {r}
          </button>
        ))}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <div>
          <p className="text-xs text-slate-500 mb-1 font-semibold">Request</p>
          <div className="bg-slate-800 rounded-lg p-3 font-mono text-xs space-y-1">
            <p className="text-emerald-400">GET {route} HTTP/1.1</p>
            <p className="text-slate-500">Host: localhost:3000</p>
            <p className="text-slate-500">Accept: */*</p>
          </div>
        </div>
        <div>
          <p className="text-xs text-slate-500 mb-1 font-semibold">Response</p>
          <div className="bg-slate-800 rounded-lg p-3 font-mono text-xs space-y-1">
            <p className={result.status === 200 ? 'text-emerald-400' : 'text-red-400'}>
              HTTP/1.1 {result.status} {result.status === 200 ? 'OK' : 'Not Found'}
            </p>
            <p className="text-slate-500">Content-Type: {result.type}</p>
            <p className="text-slate-500">─────────────</p>
            <p className="text-slate-300 whitespace-pre">{result.body}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

// Async demo
function AsyncDemo() {
  const [mode, setMode] = useState('sequential')
  const sequential = [
    '⏱ Start — fetching 3 files sequentially',
    '↓ Read users.json    (200ms)',
    '↓ Read products.json (300ms)',
    '↓ Read config.json   (150ms)',
    '✓ Done in ~650ms total',
  ]
  const parallel = [
    '⏱ Start — fetching 3 files in parallel',
    '→ Read users.json    (starts)',
    '→ Read products.json (starts simultaneously)',
    '→ Read config.json   (starts simultaneously)',
    '✓ All 3 resolve together in ~300ms total',
  ]

  return (
    <div className="space-y-3">
      <div className="flex gap-2">
        {[['sequential', 'Sequential (slow)'], ['parallel', 'Parallel (fast)']].map(([key, label]) => (
          <button key={key} onClick={() => setMode(key)} className={`text-xs px-3 py-1.5 rounded-lg font-semibold transition-colors ${mode === key ? 'bg-amber-500 text-white' : 'bg-slate-800 text-slate-400 hover:text-white'}`}>
            {label}
          </button>
        ))}
      </div>
      {mode === 'sequential' ? (
        <>
          <CodeBlock code={`// ❌ Sequential — each waits for the previous
async function loadData() {
  const users    = await readFile('./users.json')    // wait 200ms
  const products = await readFile('./products.json') // wait 300ms
  const config   = await readFile('./config.json')   // wait 150ms
  // Total: ~650ms
}`} />
          <Terminal filename="output" lines={sequential} />
        </>
      ) : (
        <>
          <CodeBlock code={`// ✅ Parallel — all start at the same time
async function loadData() {
  const [users, products, config] = await Promise.all([
    readFile('./users.json'),    // ↗ starts
    readFile('./products.json'), // ↗ starts simultaneously
    readFile('./config.json'),   // ↗ starts simultaneously
  ])
  // Total: ~300ms (longest single task)
}`} />
          <Terminal filename="output" lines={parallel} />
        </>
      )}
    </div>
  )
}

// Error handling demo
function ErrorHandlingDemo() {
  const [pattern, setPattern] = useState('try-catch')

  return (
    <div className="space-y-3">
      <div className="flex gap-2 flex-wrap">
        {[['try-catch', 'try/catch'], ['no-catch', 'Without error handling'], ['global', 'Global handler']].map(([key, label]) => (
          <button key={key} onClick={() => setPattern(key)} className={`text-xs px-3 py-1.5 rounded-lg font-semibold transition-colors ${pattern === key ? 'bg-amber-500 text-white' : 'bg-slate-800 text-slate-400 hover:text-white'}`}>
            {label}
          </button>
        ))}
      </div>
      {pattern === 'no-catch' && (
        <>
          <CodeBlock code={`// ❌ No error handling — crashes if file doesn't exist
async function loadUser() {
  const data = await readFile('./user.json', 'utf-8')
  return JSON.parse(data)
}

loadUser()  // 💥 Unhandled rejection if file is missing`} />
          <Terminal filename="node app.js" lines={[
            '$ node app.js',
            "Error: ENOENT: no such file or directory, open './user.json'",
            '    at Object.open (node:internal/fs/promises:668:25)',
            'Node.js v20.11.0',
            '✗ Process crashed with exit code 1',
          ]} />
        </>
      )}
      {pattern === 'try-catch' && (
        <>
          <CodeBlock code={`// ✅ Proper async error handling with try/catch
async function loadUser() {
  try {
    const data = await readFile('./user.json', 'utf-8')
    return JSON.parse(data)
  } catch (error) {
    if (error.code === 'ENOENT') {
      console.log('File not found, using defaults')
      return { name: 'Guest', role: 'viewer' }
    }
    // Re-throw unexpected errors
    throw error
  }
}

const user = await loadUser()
console.log('User:', user.name)`} />
          <Terminal filename="node app.js" lines={[
            '$ node app.js',
            'File not found, using defaults',
            '✓ User: Guest',
          ]} />
        </>
      )}
      {pattern === 'global' && (
        <>
          <CodeBlock code={`// Catch unhandled errors globally — last resort
process.on('uncaughtException', (error) => {
  console.error('Uncaught exception:', error.message)
  process.exit(1)  // Always exit after uncaught errors
})

process.on('unhandledRejection', (reason) => {
  console.error('Unhandled rejection:', reason)
  process.exit(1)
})

// These catch anything that slips through your try/catch blocks
// Best to use this as a safety net, not a primary strategy`} />
          <Callout type="warning" title="Use this as a safety net only">
            Always prefer try/catch around async code. The global handler is a last resort — exit the process after catching, since the app may be in an unknown state.
          </Callout>
        </>
      )}
    </div>
  )
}

// npm workflow demo
function NpmDemo() {
  const [tab, setTab] = useState('init')
  return (
    <div className="space-y-3">
      <div className="flex gap-2 flex-wrap">
        {[['init', 'Start a project'], ['install', 'Install packages'], ['scripts', 'Run scripts'], ['package', 'package.json']].map(([key, label]) => (
          <button key={key} onClick={() => setTab(key)} className={`text-xs px-3 py-1.5 rounded-lg font-semibold transition-colors ${tab === key ? 'bg-amber-500 text-white' : 'bg-slate-800 text-slate-400 hover:text-white'}`}>
            {label}
          </button>
        ))}
      </div>
      {tab === 'init' && (
        <>
          <Terminal filename="Terminal" lines={[
            '$ mkdir my-api && cd my-api',
            '$ npm init -y',
            '✓ Wrote to package.json',
            '',
            '$ ls',
            '  package.json',
          ]} />
          <Callout type="tip" title="npm init -y">
            The <code className="text-slate-200">-y</code> flag accepts all defaults so you don't have to answer questions. Edit <code className="text-slate-200">package.json</code> manually afterward.
          </Callout>
        </>
      )}
      {tab === 'install' && (
        <Terminal filename="Terminal" lines={[
          '// Install as dependency (ships to production)',
          '$ npm install express',
          '$ npm install axios dotenv',
          '',
          '// Install as devDependency (dev only, not production)',
          '$ npm install -D nodemon',
          '$ npm install -D jest @types/node',
          '',
          '// Install globally (usable anywhere on your system)',
          '$ npm install -g typescript',
          '',
          '// Uninstall',
          '$ npm uninstall lodash',
          '',
          '// Update all packages',
          '$ npm update',
        ]} />
      )}
      {tab === 'scripts' && (
        <>
          <CodeBlock filename="package.json" code={`{
  "scripts": {
    "dev": "nodemon server.js",   // restart on file save
    "start": "node server.js",    // production
    "test": "jest",
    "build": "tsc"
  }
}`} />
          <Terminal filename="Terminal" lines={[
            '$ npm run dev',
            '[nodemon] starting node server.js',
            '✓ Server running on http://localhost:3000',
            '',
            '// File saved...',
            '[nodemon] restarting due to changes...',
            '✓ Server running on http://localhost:3000',
          ]} />
        </>
      )}
      {tab === 'package' && (
        <CodeBlock filename="package.json" code={`{
  "name": "my-api",
  "version": "1.0.0",
  "description": "My Node.js REST API",
  "type": "module",        // use ES Modules (import/export)
  "main": "server.js",
  "scripts": {
    "dev": "nodemon server.js",
    "start": "node server.js"
  },
  "dependencies": {
    "express": "^4.18.2",  // production code needs this
    "dotenv": "^16.3.1"
  },
  "devDependencies": {
    "nodemon": "^3.0.2"    // only needed during development
  }
}`} />
      )}
    </div>
  )
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default function NodeBasics() {
  return (
    <div className="space-y-10">
      <div>
        <p className="text-xs font-semibold text-amber-400 uppercase tracking-wider mb-2">Backend</p>
        <h1 className="text-3xl font-bold text-white mb-3">Node.js Basics</h1>
        <p className="text-slate-400 leading-relaxed">
          Node.js lets you run JavaScript on the server. Instead of learning PHP or Python for your backend, you use the same language you already know from React. It's fast, async, and has 2 million+ packages available via npm.
        </p>
      </div>

      {/* What is Node */}
      <section>
        <h2 className="text-xl font-bold text-white mb-3">What is Node.js?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-4">
          {[
            { icon: '⚡', title: 'V8 Engine', desc: "Built on Chrome's V8 engine — the same JS engine in your browser, but without the DOM." },
            { icon: '🔄', title: 'Non-blocking I/O', desc: 'Handles thousands of requests without waiting for slow tasks (files, databases, APIs).' },
            { icon: '📦', title: '2M+ npm Packages', desc: 'The world\'s largest software registry. Anything you need, there\'s already a package.' },
          ].map(f => (
            <div key={f.title} className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-4">
              <div className="text-xl mb-2">{f.icon}</div>
              <div className="font-semibold text-white text-sm mb-1">{f.title}</div>
              <p className="text-xs text-slate-400 leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>

        <div className="bg-slate-800/50 border border-amber-500/20 rounded-xl p-4 mb-4">
          <h3 className="font-semibold text-white text-sm mb-2">Browser JS vs Node.js</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-xs font-semibold text-sky-400 mb-2">Browser JavaScript has:</p>
              <ul className="space-y-1 text-xs text-slate-400">
                <li>✓ window, document, DOM</li>
                <li>✓ fetch, localStorage, cookies</li>
                <li>✓ alert(), prompt()</li>
                <li>✗ No file system access</li>
                <li>✗ No direct network sockets</li>
              </ul>
            </div>
            <div>
              <p className="text-xs font-semibold text-amber-400 mb-2">Node.js has:</p>
              <ul className="space-y-1 text-xs text-slate-400">
                <li>✓ process, __dirname</li>
                <li>✓ fs (file system), path, http</li>
                <li>✓ Full network access</li>
                <li>✗ No window or document</li>
                <li>✗ No browser APIs</li>
              </ul>
            </div>
          </div>
        </div>

        <CodeBlock language="bash" code={`# Check you have Node installed
node --version    # v20.x.x
npm --version     # 10.x.x

# Run a JavaScript file
node server.js

# Interactive REPL (test snippets)
node
> 2 + 2
4
> process.version
'v20.11.0'`} />
      </section>

      {/* How Node works */}
      <section>
        <h2 className="text-xl font-bold text-white mb-3">How Node.js Handles Requests</h2>
        <p className="text-slate-400 text-sm mb-3">
          Node.js uses a single-threaded <strong className="text-white">Event Loop</strong> that handles many requests without blocking. This is what makes it so fast for I/O-heavy apps.
        </p>
        <LiveDemo title="Request lifecycle — click each step">
          <HowNodeWorksDemo />
        </LiveDemo>
      </section>

      {/* First script */}
      <section>
        <h2 className="text-xl font-bold text-white mb-3">Your First Node.js Script</h2>
        <CodeBlock filename="hello.js" code={`// Node.js — no window or document here!
// But you have: process, require/import, and built-in modules

console.log('Hello from Node.js!')
console.log('Node version:', process.version)
console.log('Platform:', process.platform)
console.log('Working directory:', process.cwd())

// Access environment variables
const port = process.env.PORT || 3000
console.log('Port will be:', port)`} />
        <Terminal filename="node hello.js" lines={[
          '$ node hello.js',
          'Hello from Node.js!',
          'Node version: v20.11.0',
          'Platform: win32',
          'Working directory: C:\\Users\\danie\\my-app',
          'Port will be: 3000',
        ]} />
        <LiveDemo title="The process object — what's available at runtime">
          <ProcessDemo />
        </LiveDemo>
      </section>

      {/* Modules */}
      <section>
        <h2 className="text-xl font-bold text-white mb-3">Modules: Importing & Exporting Code</h2>
        <p className="text-slate-400 text-sm mb-3">
          Node.js uses a module system to split code across files. There are two syntaxes — CommonJS (older) and ES Modules (modern, same as React uses).
        </p>
        <LiveDemo title="CommonJS vs ES Modules — pick your syntax">
          <ModulesDemo />
        </LiveDemo>
      </section>

      {/* Built-in: fs */}
      <section>
        <h2 className="text-xl font-bold text-white mb-3">Built-in: fs — File System</h2>
        <p className="text-slate-400 text-sm mb-3">
          The <code className="text-amber-300">fs</code> module lets you read, write, and manage files. Always use the <code className="text-amber-300">fs/promises</code> version for async-friendly code.
        </p>
        <LiveDemo title="fs — read, write, list files">
          <FsDemo />
        </LiveDemo>
      </section>

      {/* Built-in: path */}
      <section>
        <h2 className="text-xl font-bold text-white mb-3">Built-in: path — File Paths</h2>
        <CodeBlock code={`import path from 'path'

// Join paths safely (handles Windows/Mac differences)
const file = path.join(__dirname, 'uploads', 'photo.png')
// → C:\\Users\\alice\\project\\uploads\\photo.png  (Windows)
// → /Users/alice/project/uploads/photo.png       (Mac/Linux)

path.extname('photo.jpg')            // → '.jpg'
path.basename('/path/to/file.txt')   // → 'file.txt'
path.dirname('/path/to/file.txt')    // → '/path/to'
path.resolve('./src/index.js')       // → absolute path`} />
        <Terminal filename="output" lines={[
          "path.join('uploads', 'photo.png')  → uploads/photo.png",
          "path.extname('photo.jpg')           → .jpg",
          "path.basename('/src/App.jsx')       → App.jsx",
          "path.dirname('/src/pages/Home.jsx') → /src/pages",
        ]} />
      </section>

      {/* HTTP server */}
      <section>
        <h2 className="text-xl font-bold text-white mb-3">Built-in: http — Create a Web Server</h2>
        <CodeBlock filename="server.js" code={`import http from 'http'

const server = http.createServer((req, res) => {
  const { url, method } = req

  if (url === '/' && method === 'GET') {
    res.writeHead(200, { 'Content-Type': 'text/html' })
    res.end('<h1>Hello from Node.js!</h1>')

  } else if (url === '/api/hello') {
    res.writeHead(200, { 'Content-Type': 'application/json' })
    res.end(JSON.stringify({ message: 'Hello!', ok: true }))

  } else if (url === '/api/users') {
    const users = [{ id: 1, name: 'Alice' }, { id: 2, name: 'Bob' }]
    res.writeHead(200, { 'Content-Type': 'application/json' })
    res.end(JSON.stringify(users))

  } else {
    res.writeHead(404)
    res.end('Not Found')
  }
})

server.listen(3000, () => {
  console.log('Server running at http://localhost:3000')
})`} />
        <LiveDemo title="HTTP server — simulate requests">
          <HttpServerDemo />
        </LiveDemo>
        <Callout type="tip" title="In practice, use Express.js">
          The raw <code className="text-slate-200">http</code> module is verbose. Express.js (next chapter) wraps it with clean routing, middleware, and JSON handling. But knowing how the raw server works helps you understand what Express is doing under the hood.
        </Callout>
      </section>

      {/* Async */}
      <section>
        <h2 className="text-xl font-bold text-white mb-3">Async/Await — The Right Way</h2>
        <p className="text-slate-400 text-sm mb-3">
          Node.js is async-first. Most operations (files, databases, network) are non-blocking. Use <code className="text-amber-300">async/await</code> to write clean async code:
        </p>
        <LiveDemo title="Sequential vs Parallel — pick the faster pattern">
          <AsyncDemo />
        </LiveDemo>
      </section>

      {/* Error handling */}
      <section>
        <h2 className="text-xl font-bold text-white mb-3">Error Handling</h2>
        <p className="text-slate-400 text-sm mb-3">
          Unhandled errors crash your Node.js process. Always wrap async code in try/catch:
        </p>
        <LiveDemo title="Error handling patterns — compare the approaches">
          <ErrorHandlingDemo />
        </LiveDemo>
      </section>

      {/* npm */}
      <section>
        <h2 className="text-xl font-bold text-white mb-3">npm — Managing Packages</h2>
        <p className="text-slate-400 text-sm mb-3">
          npm is Node's package manager. It installs third-party libraries and manages your project's <code className="text-amber-300">package.json</code>.
        </p>
        <LiveDemo title="npm workflow">
          <NpmDemo />
        </LiveDemo>
      </section>

      {/* Environment variables */}
      <section>
        <h2 className="text-xl font-bold text-white mb-3">Environment Variables (.env)</h2>
        <CodeBlock language="bash" filename=".env" code={`# Never commit this file to git!
PORT=3000
DATABASE_URL=mongodb://localhost:27017/mydb
JWT_SECRET=super-secret-key-here
API_KEY=abc123`} />
        <CodeBlock filename="server.js" code={`import 'dotenv/config'  // npm install dotenv

const port = process.env.PORT || 3000        // '3000'
const dbUrl = process.env.DATABASE_URL       // the mongo URL
const secret = process.env.JWT_SECRET        // secret key

// In production (Vercel, Railway, Fly.io), set env vars
// in their dashboard — never ship .env files`} />
        <Terminal filename="node server.js" lines={[
          '$ node server.js',
          '✓ Connected to database',
          '✓ Server running on http://localhost:3000',
        ]} />
        <Callout type="danger" title="Never commit .env files">
          Add <code className="text-slate-200">.env</code> to <code className="text-slate-200">.gitignore</code>. Never hardcode secrets (API keys, passwords, tokens) in source code — they'd be visible to anyone who reads the code.
        </Callout>
      </section>

      <PageNav currentPath="/nodejs" />
    </div>
  )
}
