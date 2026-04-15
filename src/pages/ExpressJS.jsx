import CodeBlock from '../components/CodeBlock'
import Callout from '../components/Callout'
import PageNav from '../components/PageNav'

export default function ExpressJS() {
  return (
    <div className="space-y-10">
      <div>
        <p className="text-xs font-semibold text-amber-400 uppercase tracking-wider mb-2">Backend</p>
        <h1 className="text-3xl font-bold text-white mb-3">Express.js</h1>
        <p className="text-slate-400 leading-relaxed">
          Express is the most popular Node.js web framework. It makes building REST APIs and web servers straightforward with a minimal, flexible design.
        </p>
      </div>

      {/* Setup */}
      <section>
        <h2 className="text-xl font-bold text-white mb-3">Setup</h2>
        <CodeBlock language="bash" code={`mkdir my-api && cd my-api
npm init -y
npm install express
npm install -D nodemon   # auto-restart on file changes`} />
        <CodeBlock filename="package.json" code={`{
  "type": "module",
  "scripts": {
    "dev": "nodemon server.js",
    "start": "node server.js"
  }
}`} />
      </section>

      {/* Minimal server */}
      <section>
        <h2 className="text-xl font-bold text-white mb-3">Your First Express Server</h2>
        <CodeBlock filename="server.js" code={`import express from 'express'

const app = express()
const PORT = process.env.PORT || 3000

// Middleware to parse JSON request bodies
app.use(express.json())

// Routes
app.get('/', (req, res) => {
  res.send('Hello from Express!')
})

app.get('/api/hello', (req, res) => {
  res.json({ message: 'Hello, World!', timestamp: Date.now() })
})

// Start the server
app.listen(PORT, () => {
  console.log(\`Server running on http://localhost:\${PORT}\`)
})`} />
        <CodeBlock language="bash" code={`npm run dev
# Server running on http://localhost:3000

# Test with curl:
curl http://localhost:3000/api/hello
# { "message": "Hello, World!", "timestamp": 1234567890 }`} />
      </section>

      {/* HTTP Methods + routing */}
      <section>
        <h2 className="text-xl font-bold text-white mb-3">HTTP Methods & Routes</h2>
        <p className="text-slate-400 text-sm mb-3">REST APIs use HTTP methods to indicate the operation:</p>
        <div className="overflow-hidden rounded-xl border border-slate-700/50 mb-4">
          <table className="w-full text-sm">
            <thead className="bg-slate-800">
              <tr>
                <th className="text-left px-4 py-2.5 text-slate-300 font-semibold">Method</th>
                <th className="text-left px-4 py-2.5 text-slate-300 font-semibold">Purpose</th>
                <th className="text-left px-4 py-2.5 text-slate-300 font-semibold">Example</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {[
                ['GET', 'Read/fetch data', 'GET /api/users'],
                ['POST', 'Create new resource', 'POST /api/users'],
                ['PUT', 'Replace entire resource', 'PUT /api/users/1'],
                ['PATCH', 'Update part of resource', 'PATCH /api/users/1'],
                ['DELETE', 'Delete resource', 'DELETE /api/users/1'],
              ].map(([method, purpose, example]) => (
                <tr key={method} className="bg-slate-900/50">
                  <td className="px-4 py-2.5">
                    <span className={`text-xs font-bold px-2 py-0.5 rounded ${
                      method === 'GET' ? 'bg-sky-500/20 text-sky-300' :
                      method === 'POST' ? 'bg-emerald-500/20 text-emerald-300' :
                      method === 'PUT' ? 'bg-amber-500/20 text-amber-300' :
                      method === 'PATCH' ? 'bg-violet-500/20 text-violet-300' :
                      'bg-red-500/20 text-red-300'
                    }`}>{method}</span>
                  </td>
                  <td className="px-4 py-2.5 text-slate-400">{purpose}</td>
                  <td className="px-4 py-2.5 font-mono text-indigo-300 text-xs">{example}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <CodeBlock code={`// In-memory "database" for demo
let users = [
  { id: 1, name: 'Alice', email: 'alice@example.com' },
  { id: 2, name: 'Bob', email: 'bob@example.com' },
]

// GET /api/users — get all users
app.get('/api/users', (req, res) => {
  res.json(users)
})

// GET /api/users/:id — get one user
app.get('/api/users/:id', (req, res) => {
  const user = users.find(u => u.id === Number(req.params.id))
  if (!user) return res.status(404).json({ error: 'User not found' })
  res.json(user)
})

// POST /api/users — create user
app.post('/api/users', (req, res) => {
  const { name, email } = req.body
  if (!name || !email) {
    return res.status(400).json({ error: 'name and email are required' })
  }
  const newUser = { id: users.length + 1, name, email }
  users.push(newUser)
  res.status(201).json(newUser)
})

// PATCH /api/users/:id — update user
app.patch('/api/users/:id', (req, res) => {
  const index = users.findIndex(u => u.id === Number(req.params.id))
  if (index === -1) return res.status(404).json({ error: 'User not found' })
  users[index] = { ...users[index], ...req.body }
  res.json(users[index])
})

// DELETE /api/users/:id — delete user
app.delete('/api/users/:id', (req, res) => {
  const id = Number(req.params.id)
  users = users.filter(u => u.id !== id)
  res.status(204).send()  // 204 No Content
})`} />
      </section>

      {/* Route params, query */}
      <section>
        <h2 className="text-xl font-bold text-white mb-3">Route Params & Query Strings</h2>
        <CodeBlock code={`// Route parameters — :param in the URL path
// GET /api/posts/42/comments/7
app.get('/api/posts/:postId/comments/:commentId', (req, res) => {
  const { postId, commentId } = req.params
  // postId = '42', commentId = '7' (always strings!)
  res.json({ postId: Number(postId), commentId: Number(commentId) })
})

// Query string parameters — ?key=value in the URL
// GET /api/users?role=admin&page=2&limit=10
app.get('/api/users', (req, res) => {
  const { role, page = 1, limit = 20 } = req.query
  // role = 'admin', page = '2', limit = '10'

  let result = users
  if (role) result = result.filter(u => u.role === role)

  const start = (page - 1) * limit
  const paginated = result.slice(start, start + Number(limit))

  res.json({
    data: paginated,
    total: result.length,
    page: Number(page),
    limit: Number(limit),
  })
})`} />
      </section>

      {/* Middleware */}
      <section>
        <h2 className="text-xl font-bold text-white mb-3">Middleware</h2>
        <p className="text-slate-400 text-sm mb-3">
          Middleware functions run before your route handler. They can log, authenticate, parse bodies, handle errors, etc.
        </p>
        <CodeBlock code={`// app.use() registers middleware that runs for ALL routes
app.use(express.json())          // Parse JSON bodies
app.use(express.urlencoded())    // Parse form data
app.use(express.static('public')) // Serve static files

// Custom logging middleware
app.use((req, res, next) => {
  const start = Date.now()
  console.log(\`\${req.method} \${req.url}\`)

  res.on('finish', () => {
    const duration = Date.now() - start
    console.log(\`→ \${res.statusCode} (\${duration}ms)\`)
  })

  next()  // ← IMPORTANT: call next() to continue to the next middleware/route
})

// Authentication middleware
function requireAuth(req, res, next) {
  const token = req.headers.authorization?.replace('Bearer ', '')

  if (!token) {
    return res.status(401).json({ error: 'No token provided' })
  }

  try {
    const user = verifyToken(token)  // Your JWT verification
    req.user = user                  // Attach user to request
    next()                           // Continue to route handler
  } catch {
    res.status(401).json({ error: 'Invalid token' })
  }
}

// Apply middleware only to specific routes
app.get('/api/profile', requireAuth, (req, res) => {
  res.json(req.user)  // req.user was set by requireAuth middleware
})`} />
      </section>

      {/* Router */}
      <section>
        <h2 className="text-xl font-bold text-white mb-3">Express Router (Organize Routes)</h2>
        <CodeBlock filename="routes/users.js" code={`import { Router } from 'express'

const router = Router()

router.get('/', (req, res) => {
  res.json(users)
})

router.get('/:id', (req, res) => {
  // ...
})

router.post('/', (req, res) => {
  // ...
})

export default router`} />
        <CodeBlock filename="server.js" code={`import usersRouter from './routes/users.js'
import postsRouter from './routes/posts.js'

// Mount routers at a path prefix
app.use('/api/users', usersRouter)   // → /api/users, /api/users/:id
app.use('/api/posts', postsRouter)   // → /api/posts, /api/posts/:id`} />
      </section>

      {/* Error handling */}
      <section>
        <h2 className="text-xl font-bold text-white mb-3">Error Handling</h2>
        <CodeBlock code={`// Async wrapper to avoid try/catch in every route
const asyncHandler = (fn) => (req, res, next) =>
  Promise.resolve(fn(req, res, next)).catch(next)

// Use it:
app.get('/api/users', asyncHandler(async (req, res) => {
  const users = await db.users.findAll()  // If this throws, error is caught
  res.json(users)
}))

// Global error handler (4 parameters — Express detects this)
app.use((err, req, res, next) => {
  console.error(err.stack)

  const status = err.status || 500
  const message = err.message || 'Internal Server Error'

  res.status(status).json({
    error: message,
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
  })
})

// 404 handler (put after all routes)
app.use((req, res) => {
  res.status(404).json({ error: \`Route \${req.method} \${req.url} not found\` })
})`} />
      </section>

      {/* CORS */}
      <section>
        <h2 className="text-xl font-bold text-white mb-3">CORS — Connecting React to Express</h2>
        <p className="text-slate-400 text-sm mb-3">
          When your React app (port 5173) calls your Express API (port 3000), the browser blocks it unless your API allows it via CORS headers:
        </p>
        <CodeBlock language="bash" code={`npm install cors`} />
        <CodeBlock code={`import cors from 'cors'

// Allow all origins (development only!)
app.use(cors())

// Production: restrict to your frontend origin
app.use(cors({
  origin: 'https://my-react-app.com',
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}))`} />
        <h3 className="font-semibold text-slate-200 mt-5 mb-2">Calling Express from React</h3>
        <CodeBlock filename="src/hooks/useUsers.js" code={`import { useState, useEffect } from 'react'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000'

export function useUsers() {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch(\`\${API_URL}/api/users\`)
      .then(res => res.json())
      .then(data => {
        setUsers(data)
        setLoading(false)
      })
  }, [])

  async function createUser(userData) {
    const res = await fetch(\`\${API_URL}/api/users\`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData),
    })
    const newUser = await res.json()
    setUsers(prev => [...prev, newUser])
    return newUser
  }

  return { users, loading, createUser }
}`} />
        <Callout type="tip" title="Full-stack project structure">
          For a full-stack app, create two separate folders: <code className="text-slate-200">client/</code> for your React Vite app and <code className="text-slate-200">server/</code> for your Express API. Run them independently, both on different ports, connected via API calls.
        </Callout>
      </section>

      <PageNav currentPath="/express" />
    </div>
  )
}
