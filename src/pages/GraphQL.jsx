import { useState } from 'react'
import CodeBlock from '../components/CodeBlock'
import Callout from '../components/Callout'
import PageNav from '../components/PageNav'

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

// Fake data
const fakeUsers = [
  { id: 1, name: 'Alice Johnson', email: 'alice@dev.com', role: 'Admin', posts: 12, followers: 240 },
  { id: 2, name: 'Bob Smith', email: 'bob@dev.com', role: 'Editor', posts: 8, followers: 95 },
  { id: 3, name: 'Carol White', email: 'carol@dev.com', role: 'Viewer', posts: 3, followers: 42 },
]

// Demo: REST vs GraphQL field selection
function FieldSelectionDemo() {
  const [selectedFields, setSelectedFields] = useState(['name', 'email'])
  const allFields = ['name', 'email', 'role', 'posts', 'followers']

  const toggle = (field) => {
    setSelectedFields(prev =>
      prev.includes(field) ? prev.filter(f => f !== field) : [...prev, field]
    )
  }

  const restResponse = fakeUsers[0] // REST always returns everything
  const graphqlResponse = Object.fromEntries(
    Object.entries(fakeUsers[0]).filter(([k]) => selectedFields.includes(k) || k === 'id')
  )

  return (
    <div className="space-y-4">
      <p className="text-xs text-slate-500">Pick the fields you need — GraphQL only returns those, REST returns everything:</p>
      <div className="flex flex-wrap gap-2">
        {allFields.map(field => (
          <button
            key={field}
            onClick={() => toggle(field)}
            className={`px-3 py-1.5 text-xs rounded-lg font-semibold transition-colors ${selectedFields.includes(field) ? 'bg-pink-600 text-white' : 'bg-slate-700 text-slate-400 hover:bg-slate-600'}`}
          >
            {field}
          </button>
        ))}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <p className="text-xs text-red-400 font-semibold mb-1">REST — always returns all fields:</p>
          <div className="bg-slate-800 rounded-lg p-3 text-xs font-mono">
            <p className="text-slate-500">GET /api/users/1</p>
            <pre className="text-slate-300 mt-2 whitespace-pre-wrap">{JSON.stringify(restResponse, null, 2)}</pre>
          </div>
        </div>
        <div>
          <p className="text-xs text-emerald-400 font-semibold mb-1">GraphQL — only what you asked for:</p>
          <div className="bg-slate-800 rounded-lg p-3 text-xs font-mono">
            <p className="text-pink-300">{'{'} user(id: 1) {'{'}</p>
            {selectedFields.map(f => <p key={f} className="text-slate-300 ml-4">{f}</p>)}
            <p className="text-pink-300">{'}'} {'}'}</p>
            <pre className="text-slate-300 mt-2 whitespace-pre-wrap">{JSON.stringify(graphqlResponse, null, 2)}</pre>
          </div>
        </div>
      </div>
      <p className="text-xs text-slate-500">
        Bytes returned — REST: <strong className="text-red-400">{JSON.stringify(restResponse).length}</strong> chars /
        GraphQL: <strong className="text-emerald-400">{JSON.stringify(graphqlResponse).length}</strong> chars
        {JSON.stringify(graphqlResponse).length < JSON.stringify(restResponse).length && (
          <span className="text-emerald-400"> (saved {JSON.stringify(restResponse).length - JSON.stringify(graphqlResponse).length} chars)</span>
        )}
      </p>
    </div>
  )
}

// Demo: Simulate a query builder
function QueryBuilderDemo() {
  const [includeEmail, setIncludeEmail] = useState(true)
  const [includePosts, setIncludePosts] = useState(false)
  const [userCount, setUserCount] = useState(2)
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState(null)

  const query = `query GetUsers {
  users(first: ${userCount}) {
    id
    name${includeEmail ? '\n    email' : ''}${includePosts ? '\n    posts' : ''}
  }
}`

  const runQuery = () => {
    setLoading(true)
    setResult(null)
    setTimeout(() => {
      const data = fakeUsers.slice(0, userCount).map(u => {
        const obj = { id: u.id, name: u.name }
        if (includeEmail) obj.email = u.email
        if (includePosts) obj.posts = u.posts
        return obj
      })
      setResult({ data: { users: data } })
      setLoading(false)
    }, 600)
  }

  return (
    <div className="space-y-3">
      <p className="text-xs text-slate-500">Customize your query and run it:</p>
      <div className="flex flex-wrap gap-3 items-center">
        <label className="flex items-center gap-2 text-xs text-slate-300">
          <input type="checkbox" checked={includeEmail} onChange={e => setIncludeEmail(e.target.checked)} className="accent-pink-500" />
          Include email
        </label>
        <label className="flex items-center gap-2 text-xs text-slate-300">
          <input type="checkbox" checked={includePosts} onChange={e => setIncludePosts(e.target.checked)} className="accent-pink-500" />
          Include posts count
        </label>
        <label className="flex items-center gap-2 text-xs text-slate-300">
          Fetch
          <select value={userCount} onChange={e => setUserCount(+e.target.value)}
            className="bg-slate-800 border border-slate-700 rounded px-2 py-0.5 text-white text-xs">
            {[1, 2, 3].map(n => <option key={n}>{n}</option>)}
          </select>
          user(s)
        </label>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <div>
          <p className="text-xs text-slate-500 mb-1">Your query:</p>
          <div className="bg-slate-800 rounded-lg p-3 text-xs font-mono text-pink-300 whitespace-pre">{query}</div>
        </div>
        <div>
          <p className="text-xs text-slate-500 mb-1">Response:</p>
          <div className="bg-slate-800 rounded-lg p-3 text-xs font-mono text-emerald-300 min-h-[80px]">
            {loading && <p className="text-slate-500 italic">Fetching...</p>}
            {result && <pre className="whitespace-pre-wrap">{JSON.stringify(result, null, 2)}</pre>}
            {!loading && !result && <p className="text-slate-600 italic">Hit "Run Query" to see the response</p>}
          </div>
        </div>
      </div>
      <button onClick={runQuery} disabled={loading}
        className="px-4 py-2 text-xs bg-pink-600 hover:bg-pink-500 disabled:opacity-50 text-white rounded-lg font-semibold transition-colors">
        {loading ? 'Running...' : '▶ Run Query'}
      </button>
    </div>
  )
}

// Demo: Mutation simulator
function MutationDemo() {
  const [users, setUsers] = useState(fakeUsers.slice(0, 2))
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [lastMutation, setLastMutation] = useState(null)

  const handleCreate = () => {
    if (!name || !email) return
    setLoading(true)
    setTimeout(() => {
      const newUser = { id: users.length + 1, name, email, role: 'Viewer', posts: 0, followers: 0 }
      setUsers(prev => [...prev, newUser])
      setLastMutation(`createUser(name: "${name}", email: "${email}")`)
      setName('')
      setEmail('')
      setLoading(false)
    }, 500)
  }

  const handleDelete = (id) => {
    const user = users.find(u => u.id === id)
    setUsers(prev => prev.filter(u => u.id !== id))
    setLastMutation(`deleteUser(id: ${id}) → removed "${user.name}"`)
  }

  return (
    <div className="space-y-4">
      <div>
        <p className="text-xs text-slate-500 mb-2 font-semibold">Create a new user (mutation):</p>
        <div className="flex gap-2 flex-wrap">
          <input value={name} onChange={e => setName(e.target.value)} placeholder="Name"
            className="flex-1 min-w-[140px] bg-slate-800 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-pink-500" />
          <input value={email} onChange={e => setEmail(e.target.value)} placeholder="Email"
            className="flex-1 min-w-[140px] bg-slate-800 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-pink-500" />
          <button onClick={handleCreate} disabled={loading || !name || !email}
            className="px-3 py-1.5 text-xs bg-pink-600 hover:bg-pink-500 disabled:opacity-40 text-white rounded-lg font-semibold transition-colors">
            {loading ? 'Creating...' : '+ Create'}
          </button>
        </div>
      </div>
      {lastMutation && (
        <div className="bg-pink-500/10 border border-pink-500/30 rounded-lg px-3 py-2">
          <p className="text-xs text-pink-300 font-mono">mutation: {lastMutation}</p>
        </div>
      )}
      <div className="space-y-2">
        {users.map(user => (
          <div key={user.id} className="flex items-center justify-between bg-slate-800 rounded-lg px-3 py-2.5">
            <div>
              <p className="text-sm text-white font-semibold">{user.name}</p>
              <p className="text-xs text-slate-400">{user.email}</p>
            </div>
            <button onClick={() => handleDelete(user.id)}
              className="text-xs text-red-400 hover:text-red-300 px-2 py-1 rounded transition-colors">
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default function GraphQL() {
  return (
    <div className="space-y-10">
      <div>
        <p className="text-xs font-semibold text-pink-400 uppercase tracking-wider mb-2">Full Stack</p>
        <h1 className="text-3xl font-bold text-white mb-3">GraphQL</h1>
        <p className="text-slate-400 leading-relaxed">
          GraphQL is a <strong className="text-white">query language for APIs</strong> that lets you ask for exactly the data you need — nothing more, nothing less. It's an alternative to REST that gives the client full control over what the server returns.
        </p>
      </div>

      {/* Plain English */}
      <div className="bg-pink-500/10 border border-pink-500/30 rounded-xl p-5">
        <p className="text-xs font-bold text-pink-300 uppercase tracking-wider mb-4">Think of it like ordering food</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="bg-slate-900/60 rounded-xl p-4">
            <div className="text-2xl mb-2">🍽️</div>
            <p className="font-semibold text-white text-sm mb-1">REST = a set menu</p>
            <p className="text-xs text-slate-400 leading-relaxed">
              You order "the burger combo" and get a burger, fries, drink, and side salad — even if you only wanted the burger. Each dish (endpoint) returns a fixed set of things. You can't ask for half a combo.
            </p>
            <p className="text-xs text-amber-400 mt-2">Problem: you get too much data, or need multiple requests to get everything</p>
          </div>
          <div className="bg-slate-900/60 rounded-xl p-4">
            <div className="text-2xl mb-2">🛒</div>
            <p className="font-semibold text-white text-sm mb-1">GraphQL = build your own order</p>
            <p className="text-xs text-slate-400 leading-relaxed">
              "I want a burger and a drink, no fries." One request, you get exactly those two things. And if you also need dessert from another section of the menu? Still one request.
            </p>
            <p className="text-xs text-emerald-400 mt-2">Result: exactly the data you need, in one request, every time</p>
          </div>
        </div>
      </div>

      {/* REST vs GraphQL */}
      <section>
        <h2 className="text-xl font-bold text-white mb-3">REST vs GraphQL — Side by Side</h2>
        <div className="overflow-hidden rounded-xl border border-slate-700/50 mb-4">
          <table className="w-full text-sm">
            <thead className="bg-slate-800">
              <tr>
                <th className="text-left px-4 py-3 text-slate-300 font-semibold"></th>
                <th className="text-left px-4 py-3 text-amber-300 font-semibold">REST</th>
                <th className="text-left px-4 py-3 text-pink-300 font-semibold">GraphQL</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {[
                ['Endpoint structure', 'Many endpoints: /users, /posts, /comments', 'One endpoint: /graphql — everything goes through it'],
                ['Data returned', 'Fixed — server decides what you get', 'Flexible — you ask for exactly what you need'],
                ['Multiple resources', 'Multiple requests: /user/1 + /user/1/posts', 'One request: ask for user AND posts together'],
                ['Over-fetching', 'Common — endpoint returns extra unused fields', 'Never — only requested fields are returned'],
                ['Type system', 'None built in', 'Strongly typed schema — self-documenting'],
                ['Learning curve', 'Simple to start', 'Steeper — schema, resolvers, queries to learn'],
              ].map(([aspect, rest, gql]) => (
                <tr key={aspect} className="bg-slate-900/50">
                  <td className="px-4 py-2.5 text-slate-400 font-medium text-xs">{aspect}</td>
                  <td className="px-4 py-2.5 text-slate-300 text-xs">{rest}</td>
                  <td className="px-4 py-2.5 text-slate-300 text-xs">{gql}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <LiveDemo title="Field Selection — REST vs GraphQL">
          <FieldSelectionDemo />
        </LiveDemo>
      </section>

      {/* Core concepts */}
      <section>
        <h2 className="text-xl font-bold text-white mb-3">Core Concepts</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { icon: '🔍', name: 'Query', color: 'text-emerald-400', desc: 'Read data. Like a GET request. You define exactly what fields you want back.' },
            { icon: '✏️', name: 'Mutation', color: 'text-pink-400', desc: 'Write data. Create, update, or delete. Like POST/PUT/DELETE in REST.' },
            { icon: '📡', name: 'Subscription', color: 'text-indigo-400', desc: 'Real-time data. Server pushes updates to you when data changes. Like a WebSocket.' },
          ].map(c => (
            <div key={c.name} className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-4">
              <div className="text-2xl mb-2">{c.icon}</div>
              <p className={`font-semibold text-sm mb-1 ${c.color}`}>{c.name}</p>
              <p className="text-xs text-slate-400 leading-relaxed">{c.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Schema */}
      <section>
        <h2 className="text-xl font-bold text-white mb-3">The Schema — Your API Contract</h2>
        <p className="text-slate-400 text-sm mb-3">
          A GraphQL schema defines all the types of data your API can return and all the operations it supports. It's written in Schema Definition Language (SDL) — easy to read even without experience.
        </p>
        <CodeBlock filename="schema.graphql" code={`# Define your data types
type User {
  id: ID!           # ! means required (non-nullable)
  name: String!
  email: String!
  age: Int
  role: String
  posts: [Post!]!   # Array of posts (required, items also required)
}

type Post {
  id: ID!
  title: String!
  content: String!
  published: Boolean!
  author: User!     # Nested type — post knows its author
  createdAt: String!
}

# What can clients QUERY (read)?
type Query {
  user(id: ID!): User           # Get one user by ID
  users(first: Int): [User!]!   # Get a list of users
  post(id: ID!): Post           # Get one post
  posts: [Post!]!               # Get all posts
}

# What can clients MUTATE (write)?
type Mutation {
  createUser(name: String!, email: String!): User!
  updateUser(id: ID!, name: String): User!
  deleteUser(id: ID!): Boolean!
  createPost(title: String!, content: String!, authorId: ID!): Post!
}

# Real-time updates
type Subscription {
  messageAdded(roomId: ID!): Message!
}`} />
      </section>

      {/* Queries */}
      <section>
        <h2 className="text-xl font-bold text-white mb-3">Writing Queries</h2>
        <p className="text-slate-400 text-sm mb-3">
          A query mirrors the shape of the data you want back. You always get exactly what you ask for:
        </p>
        <CodeBlock code={`# Simple query — get one user's name and email
query GetUser {
  user(id: "1") {
    name
    email
  }
}
# Returns: { "data": { "user": { "name": "Alice", "email": "alice@dev.com" } } }

# Nested query — get user AND their posts in one request
query GetUserWithPosts {
  user(id: "1") {
    name
    email
    posts {
      title
      published
      createdAt
    }
  }
}

# Multiple queries at once — both resolved in one round trip
query GetDashboard {
  currentUser: user(id: "1") {
    name
    role
  }
  recentPosts: posts {
    title
    createdAt
  }
}

# Using variables (best practice — no string concatenation!)
query GetUser($userId: ID!) {
  user(id: $userId) {
    name
    email
  }
}
# Variables passed separately: { "userId": "1" }`} />
        <LiveDemo title="Interactive Query Builder">
          <QueryBuilderDemo />
        </LiveDemo>
      </section>

      {/* Mutations */}
      <section>
        <h2 className="text-xl font-bold text-white mb-3">Mutations — Writing Data</h2>
        <p className="text-slate-400 text-sm mb-3">
          Mutations change data on the server. You can ask for data back from the mutation — useful to update your UI immediately without a second request.
        </p>
        <CodeBlock code={`# Create a new user
mutation CreateUser($name: String!, $email: String!) {
  createUser(name: $name, email: $email) {
    id        # Ask for the new user's data back
    name
    email
  }
}
# Variables: { "name": "Alice", "email": "alice@dev.com" }

# Update a user
mutation UpdateUser($id: ID!, $name: String!) {
  updateUser(id: $id, name: $name) {
    id
    name
  }
}

# Delete and get confirmation
mutation DeleteUser($id: ID!) {
  deleteUser(id: $id)  # Returns Boolean
}

# Create a post and get back the new post + its author
mutation CreatePost($title: String!, $content: String!, $authorId: ID!) {
  createPost(title: $title, content: $content, authorId: $authorId) {
    id
    title
    author {
      name
    }
  }
}`} />
        <LiveDemo title="Mutations — Create and Delete Users">
          <MutationDemo />
        </LiveDemo>
      </section>

      {/* Apollo Client */}
      <section>
        <h2 className="text-xl font-bold text-white mb-3">Using GraphQL in React — Apollo Client</h2>
        <p className="text-slate-400 text-sm mb-3">
          Apollo Client is the most popular GraphQL client for React. It gives you hooks like <code className="text-pink-300">useQuery</code> and <code className="text-pink-300">useMutation</code> that fetch and cache data automatically.
        </p>
        <CodeBlock language="bash" code={`npm install @apollo/client graphql`} />
        <CodeBlock filename="src/main.jsx — Setup" code={`import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client'

// Create the client — point it at your GraphQL server
const client = new ApolloClient({
  uri: 'https://your-api.com/graphql',  // Your GraphQL endpoint
  cache: new InMemoryCache(),            // Cache results automatically
})

// Wrap your entire app — makes client available everywhere
ReactDOM.createRoot(document.getElementById('root')).render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
)`} />
      </section>

      {/* useQuery */}
      <section>
        <h2 className="text-xl font-bold text-white mb-3">useQuery — Fetching Data</h2>
        <p className="text-slate-400 text-sm mb-3">
          Replaces <code className="text-slate-300">useEffect + fetch</code> for GraphQL. Automatically handles loading, error, and caching:
        </p>
        <CodeBlock code={`import { useQuery, gql } from '@apollo/client'

// Define your query with gql tag
const GET_USERS = gql\`
  query GetUsers {
    users {
      id
      name
      email
      role
    }
  }
\`

function UserList() {
  const { loading, error, data } = useQuery(GET_USERS)

  if (loading) return <p>Loading users...</p>
  if (error) return <p>Error: {error.message}</p>

  return (
    <ul>
      {data.users.map(user => (
        <li key={user.id}>
          <strong>{user.name}</strong> — {user.email}
        </li>
      ))}
    </ul>
  )
}

// With variables — fetch a specific user
const GET_USER = gql\`
  query GetUser($id: ID!) {
    user(id: $id) {
      name
      email
      posts { title }
    }
  }
\`

function UserProfile({ userId }) {
  const { loading, error, data } = useQuery(GET_USER, {
    variables: { id: userId },  // Pass variables here
    skip: !userId,              // Skip query if no userId yet
  })

  if (loading) return <Spinner />
  if (error) return <ErrorMessage error={error} />

  return (
    <div>
      <h1>{data.user.name}</h1>
      <p>{data.user.email}</p>
      <h2>Posts:</h2>
      {data.user.posts.map(post => (
        <p key={post.title}>{post.title}</p>
      ))}
    </div>
  )
}`} />
      </section>

      {/* useMutation */}
      <section>
        <h2 className="text-xl font-bold text-white mb-3">useMutation — Writing Data</h2>
        <CodeBlock code={`import { useMutation, gql } from '@apollo/client'

const CREATE_USER = gql\`
  mutation CreateUser($name: String!, $email: String!) {
    createUser(name: $name, email: $email) {
      id
      name
      email
    }
  }
\`

function CreateUserForm() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')

  // createUser = function to trigger the mutation
  // loading, error, data = mutation state
  const [createUser, { loading, error, data }] = useMutation(CREATE_USER, {
    // Automatically update the cache after mutation
    update(cache, { data: { createUser } }) {
      cache.modify({
        fields: {
          users(existingUsers = []) {
            return [...existingUsers, createUser]
          }
        }
      })
    }
  })

  async function handleSubmit(e) {
    e.preventDefault()
    try {
      await createUser({ variables: { name, email } })
      setName('')
      setEmail('')
    } catch (err) {
      console.error('Mutation failed:', err)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <input value={name} onChange={e => setName(e.target.value)} placeholder="Name" />
      <input value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" />
      <button type="submit" disabled={loading}>
        {loading ? 'Creating...' : 'Create User'}
      </button>
      {error && <p>Error: {error.message}</p>}
      {data && <p>Created: {data.createUser.name}!</p>}
    </form>
  )
}`} />
      </section>

      {/* Fragments */}
      <section>
        <h2 className="text-xl font-bold text-white mb-3">Fragments — Reusable Field Sets</h2>
        <p className="text-slate-400 text-sm mb-3">
          Fragments let you define a set of fields once and reuse them across multiple queries — like a variable for field selections:
        </p>
        <CodeBlock code={`// Define a fragment — "these fields about a user"
const USER_FIELDS = gql\`
  fragment UserFields on User {
    id
    name
    email
    role
  }
\`

// Reuse it in multiple queries with the spread ...
const GET_USER = gql\`
  \${USER_FIELDS}
  query GetUser($id: ID!) {
    user(id: $id) {
      ...UserFields    # Expands to: id, name, email, role
      posts { title }  # Plus any extra fields
    }
  }
\`

const GET_USERS = gql\`
  \${USER_FIELDS}
  query GetUsers {
    users {
      ...UserFields    # Same fields, same fragment
    }
  }
\`

// Why? If you need to add a field to all user queries,
// you change it in ONE place (the fragment), not everywhere.`} />
      </section>

      {/* Subscriptions */}
      <section>
        <h2 className="text-xl font-bold text-white mb-3">Subscriptions — Real-Time Data</h2>
        <p className="text-slate-400 text-sm mb-3">
          Subscriptions keep an open connection to the server and receive updates as they happen — perfect for chat, live feeds, or notifications:
        </p>
        <CodeBlock code={`import { useSubscription, gql } from '@apollo/client'

const MESSAGE_ADDED = gql\`
  subscription OnMessageAdded($roomId: ID!) {
    messageAdded(roomId: $roomId) {
      id
      text
      author {
        name
      }
      createdAt
    }
  }
\`

function ChatRoom({ roomId }) {
  const [messages, setMessages] = useState([])

  // useSubscription — like useQuery but updates in real-time
  const { data } = useSubscription(MESSAGE_ADDED, {
    variables: { roomId },
    onData: ({ data }) => {
      // Called every time a new message arrives
      setMessages(prev => [...prev, data.data.messageAdded])
    }
  })

  return (
    <div>
      {messages.map(msg => (
        <div key={msg.id}>
          <strong>{msg.author.name}:</strong> {msg.text}
        </div>
      ))}
    </div>
  )
}

// Note: Subscriptions require a WebSocket link in your Apollo setup
// Most GraphQL servers support subscriptions out of the box`} />
        <Callout type="info" title="Subscriptions need extra setup">
          You need to configure a WebSocket link in Apollo Client for subscriptions to work. Most tutorials cover this — search "Apollo Client subscriptions setup" when you're ready for real-time features.
        </Callout>
      </section>

      {/* Building a GraphQL server */}
      <section>
        <h2 className="text-xl font-bold text-white mb-3">Building a GraphQL Server (Node.js)</h2>
        <p className="text-slate-400 text-sm mb-3">
          On the backend, you define <strong className="text-white">resolvers</strong> — functions that tell GraphQL how to actually fetch the data for each field in your schema:
        </p>
        <CodeBlock language="bash" code={`npm install @apollo/server graphql`} />
        <CodeBlock filename="server.js" code={`import { ApolloServer } from '@apollo/server'
import { startStandaloneServer } from '@apollo/server/standalone'

// 1. Your schema (same as before)
const typeDefs = \`
  type User {
    id: ID!
    name: String!
    email: String!
    posts: [Post!]!
  }

  type Post {
    id: ID!
    title: String!
    author: User!
  }

  type Query {
    users: [User!]!
    user(id: ID!): User
  }

  type Mutation {
    createUser(name: String!, email: String!): User!
  }
\`

// Fake database (replace with real DB in production)
const users = [
  { id: '1', name: 'Alice', email: 'alice@dev.com' },
  { id: '2', name: 'Bob', email: 'bob@dev.com' },
]
const posts = [
  { id: '1', title: 'Hello World', authorId: '1' },
  { id: '2', title: 'GraphQL is great', authorId: '1' },
]

// 2. Resolvers — tell GraphQL how to fetch each field
const resolvers = {
  Query: {
    // Called when someone queries: { users { ... } }
    users: () => users,

    // Called when someone queries: { user(id: "1") { ... } }
    user: (_, { id }) => users.find(u => u.id === id),
  },

  Mutation: {
    createUser: (_, { name, email }) => {
      const newUser = { id: String(users.length + 1), name, email }
      users.push(newUser)
      return newUser
    },
  },

  // Resolver for nested field: user.posts
  User: {
    posts: (user) => posts.filter(p => p.authorId === user.id),
  },

  // Resolver for nested field: post.author
  Post: {
    author: (post) => users.find(u => u.id === post.authorId),
  },
}

// 3. Start the server
const server = new ApolloServer({ typeDefs, resolvers })
const { url } = await startStandaloneServer(server, { listen: { port: 4000 } })
console.log('GraphQL server running at:', url)
// → Open http://localhost:4000 for the built-in Explorer UI`} />
      </section>

      {/* Error handling */}
      <section>
        <h2 className="text-xl font-bold text-white mb-3">Error Handling</h2>
        <p className="text-slate-400 text-sm mb-3">
          Unlike REST (which uses HTTP status codes), GraphQL always returns <code className="text-slate-300">200 OK</code> — errors are in the response body:
        </p>
        <CodeBlock code={`// GraphQL error response — status is always 200!
{
  "data": null,
  "errors": [
    {
      "message": "User not found",
      "locations": [{ "line": 2, "column": 3 }],
      "path": ["user"]
    }
  ]
}

// In Apollo Client, handle errors like this:
function UserProfile({ id }) {
  const { loading, error, data } = useQuery(GET_USER, {
    variables: { id },
  })

  if (loading) return <p>Loading...</p>

  if (error) {
    // GraphQL errors
    const isNotFound = error.graphQLErrors.some(e =>
      e.message === 'User not found'
    )
    if (isNotFound) return <p>User doesn't exist!</p>

    // Network errors
    if (error.networkError) return <p>Network problem — try again</p>

    return <p>Something went wrong: {error.message}</p>
  }

  return <div>{data.user.name}</div>
}`} />
      </section>

      {/* When to use */}
      <section>
        <h2 className="text-xl font-bold text-white mb-3">When to Use GraphQL vs REST</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-pink-500/10 border border-pink-500/30 rounded-xl p-4">
            <p className="text-xs font-bold text-pink-300 uppercase tracking-wider mb-3">GraphQL shines when...</p>
            <ul className="space-y-2 text-xs text-slate-300">
              {[
                'Multiple clients (web, mobile) need different data shapes',
                'You have complex, nested data relationships',
                'You want to avoid over-fetching on mobile (limited bandwidth)',
                'Your team wants a self-documenting, strongly-typed API',
                'You\'re building a product with many features evolving fast',
              ].map(item => (
                <li key={item} className="flex gap-2"><span className="text-pink-400 flex-shrink-0">✓</span>{item}</li>
              ))}
            </ul>
          </div>
          <div className="bg-amber-500/10 border border-amber-500/30 rounded-xl p-4">
            <p className="text-xs font-bold text-amber-300 uppercase tracking-wider mb-3">Stick with REST when...</p>
            <ul className="space-y-2 text-xs text-slate-300">
              {[
                'Your API is simple with few endpoints',
                'You\'re building a public API (REST is universally understood)',
                'You need HTTP caching (GraphQL POST requests aren\'t cached)',
                'Your team is small and REST gets the job done',
                'You\'re just starting out — REST is easier to learn first',
              ].map(item => (
                <li key={item} className="flex gap-2"><span className="text-amber-400 flex-shrink-0">✓</span>{item}</li>
              ))}
            </ul>
          </div>
        </div>
        <Callout type="warning" title="Don't feel pressured to use GraphQL">
          GraphQL is powerful but adds complexity — schema design, resolvers, caching strategy, and a steeper learning curve. Many successful apps use plain REST. Only reach for GraphQL when REST is actually causing you pain (too many requests, too much data, multiple client types).
        </Callout>
      </section>

      <PageNav currentPath="/graphql" />
    </div>
  )
}
