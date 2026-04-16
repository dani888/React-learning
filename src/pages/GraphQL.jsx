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

  const restResponse = fakeUsers[0]
  const graphqlResponse = Object.fromEntries(
    Object.entries(fakeUsers[0]).filter(([k]) => selectedFields.includes(k) || k === 'id')
  )

  return (
    <div className="space-y-4">
      <p className="text-xs text-slate-400 leading-relaxed">
        Imagine you only need a user's name and email to show a profile card. Toggle the fields you want and see the difference in what each approach returns:
      </p>
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
          <p className="text-xs text-red-400 font-semibold mb-1">REST API — always returns ALL fields, no matter what:</p>
          <div className="bg-slate-800 rounded-lg p-3 text-xs font-mono">
            <p className="text-slate-500">GET /api/users/1</p>
            <pre className="text-slate-300 mt-2 whitespace-pre-wrap">{JSON.stringify(restResponse, null, 2)}</pre>
          </div>
          <p className="text-xs text-slate-500 mt-1">You receive all this even if you only need the name</p>
        </div>
        <div>
          <p className="text-xs text-emerald-400 font-semibold mb-1">GraphQL — only returns what you asked for:</p>
          <div className="bg-slate-800 rounded-lg p-3 text-xs font-mono">
            <p className="text-pink-300">{'{ user(id: 1) {'}</p>
            {selectedFields.map(f => <p key={f} className="text-slate-300 ml-4">{f}</p>)}
            <p className="text-pink-300">{'} }'}</p>
            <pre className="text-slate-300 mt-2 whitespace-pre-wrap">{JSON.stringify(graphqlResponse, null, 2)}</pre>
          </div>
          <p className="text-xs text-emerald-400 mt-1">
            Saved: {Math.max(0, JSON.stringify(restResponse).length - JSON.stringify(graphqlResponse).length)} characters of unused data
          </p>
        </div>
      </div>
    </div>
  )
}

// Demo: Query builder
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
      <p className="text-xs text-slate-400">Customize your query — notice how the query text updates as you change options. Then run it to see the response:</p>
      <div className="flex flex-wrap gap-4 items-center">
        <label className="flex items-center gap-2 text-xs text-slate-300">
          <input type="checkbox" checked={includeEmail} onChange={e => setIncludeEmail(e.target.checked)} className="accent-pink-500" />
          Include email field
        </label>
        <label className="flex items-center gap-2 text-xs text-slate-300">
          <input type="checkbox" checked={includePosts} onChange={e => setIncludePosts(e.target.checked)} className="accent-pink-500" />
          Include posts count
        </label>
        <label className="flex items-center gap-2 text-xs text-slate-300">
          How many users:
          <select value={userCount} onChange={e => setUserCount(+e.target.value)}
            className="bg-slate-800 border border-slate-700 rounded px-2 py-0.5 text-white text-xs">
            {[1, 2, 3].map(n => <option key={n}>{n}</option>)}
          </select>
        </label>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <div>
          <p className="text-xs text-slate-500 mb-1">Your query (what you send to the server):</p>
          <div className="bg-slate-800 rounded-lg p-3 text-xs font-mono text-pink-300 whitespace-pre">{query}</div>
        </div>
        <div>
          <p className="text-xs text-slate-500 mb-1">Server response (exactly what you asked for):</p>
          <div className="bg-slate-800 rounded-lg p-3 text-xs font-mono text-emerald-300 min-h-[80px]">
            {loading && <p className="text-slate-500 italic animate-pulse">Fetching from server...</p>}
            {result && <pre className="whitespace-pre-wrap">{JSON.stringify(result, null, 2)}</pre>}
            {!loading && !result && <p className="text-slate-600 italic">Click "Run Query" to see the result</p>}
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

// Demo: Mutation
function MutationDemo() {
  const [users, setUsers] = useState(fakeUsers.slice(0, 2))
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [lastAction, setLastAction] = useState(null)

  const handleCreate = () => {
    if (!name || !email) return
    setLoading(true)
    setTimeout(() => {
      const newUser = { id: users.length + 1, name, email, role: 'Viewer', posts: 0, followers: 0 }
      setUsers(prev => [...prev, newUser])
      setLastAction({ type: 'created', msg: `createUser(name: "${name}", email: "${email}") → returned the new user with id: ${newUser.id}` })
      setName('')
      setEmail('')
      setLoading(false)
    }, 500)
  }

  const handleDelete = (id) => {
    const user = users.find(u => u.id === id)
    setUsers(prev => prev.filter(u => u.id !== id))
    setLastAction({ type: 'deleted', msg: `deleteUser(id: ${id}) → "${user.name}" was removed` })
  }

  return (
    <div className="space-y-4">
      <div>
        <p className="text-xs text-slate-400 mb-2">Fill in the form to create a new user. This simulates a <strong className="text-white">createUser mutation</strong>:</p>
        <div className="flex gap-2 flex-wrap">
          <input value={name} onChange={e => setName(e.target.value)} placeholder="Name"
            className="flex-1 min-w-[140px] bg-slate-800 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-pink-500" />
          <input value={email} onChange={e => setEmail(e.target.value)} placeholder="Email"
            className="flex-1 min-w-[140px] bg-slate-800 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-pink-500" />
          <button onClick={handleCreate} disabled={loading || !name || !email}
            className="px-3 py-1.5 text-xs bg-pink-600 hover:bg-pink-500 disabled:opacity-40 text-white rounded-lg font-semibold transition-colors">
            {loading ? 'Creating...' : '+ Create User'}
          </button>
        </div>
      </div>

      {lastAction && (
        <div className={`rounded-lg px-3 py-2 text-xs font-mono ${lastAction.type === 'created' ? 'bg-emerald-500/10 border border-emerald-500/30 text-emerald-300' : 'bg-red-500/10 border border-red-500/30 text-red-300'}`}>
          mutation ran: {lastAction.msg}
        </div>
      )}

      <div>
        <p className="text-xs text-slate-500 mb-2">Current users (click ✕ to run a deleteUser mutation):</p>
        <div className="space-y-2">
          {users.map(user => (
            <div key={user.id} className="flex items-center justify-between bg-slate-800 rounded-lg px-3 py-2.5">
              <div>
                <p className="text-sm text-white font-semibold">{user.name}</p>
                <p className="text-xs text-slate-400">{user.email}</p>
              </div>
              <button onClick={() => handleDelete(user.id)}
                className="text-xs text-red-400 hover:text-red-300 px-2 py-1 rounded transition-colors">
                ✕ Delete
              </button>
            </div>
          ))}
        </div>
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
          GraphQL is a way to request data from a server where <strong className="text-white">you decide exactly what you get back</strong>. Instead of the server always sending a fixed response, you send a description of what you need and the server returns only that.
        </p>
      </div>

      <Callout type="beginner" title="You should know REST APIs first">
        GraphQL is an alternative to building REST APIs. If you haven't built a REST API yet (covered in the Express.js section), read that first. GraphQL will make much more sense once you understand the problem it's solving.
      </Callout>

      {/* Key terms */}
      <div className="bg-slate-900 border border-slate-700/50 rounded-xl p-5">
        <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">Key words — explained simply before we start</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {[
            { term: 'API', def: 'A way for one program to ask another for data. When your app needs user info from a server, it calls the server\'s API. Think of it as a phone number you dial to get information.' },
            { term: 'REST API', def: 'The traditional way to build an API. You create separate URLs for different things: /api/users for users, /api/posts for posts. Each URL returns a fixed set of data.' },
            { term: 'Endpoint', def: 'A specific URL in a REST API. /api/users is an endpoint. /api/users/1 is another endpoint. Each one does one specific thing.' },
            { term: 'Schema', def: 'A description of all the data types and operations your GraphQL API supports. Like a menu at a restaurant — it lists everything you can order.' },
            { term: 'Query', def: 'In GraphQL, a query is a request to read data. Like a GET request in REST, but you describe exactly which fields you want.' },
            { term: 'Mutation', def: 'In GraphQL, a mutation is a request to change data. Like POST/PUT/DELETE in REST — creating, updating, or deleting something.' },
            { term: 'Resolver', def: 'A function on the server that knows how to fetch one specific piece of data. Like a library staff member who knows exactly which shelf to find a particular book on.' },
            { term: 'Apollo Client', def: 'A popular library that handles GraphQL in React. It gives you hooks like useQuery and useMutation so you don\'t have to write fetch() calls manually.' },
          ].map(({ term, def }) => (
            <div key={term} className="flex gap-3">
              <span className="text-pink-400 font-bold text-sm flex-shrink-0 w-24">{term}</span>
              <p className="text-xs text-slate-400 leading-relaxed">{def}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Plain English */}
      <div className="bg-pink-500/10 border border-pink-500/30 rounded-xl p-5">
        <p className="text-xs font-bold text-pink-300 uppercase tracking-wider mb-4">The problem GraphQL solves — ordering food analogy</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="bg-slate-900/60 rounded-xl p-4">
            <div className="text-2xl mb-2">🍽️</div>
            <p className="font-semibold text-white text-sm mb-1">REST = fixed combo meals</p>
            <p className="text-xs text-slate-400 leading-relaxed mb-2">
              You order "the user combo" from a REST API and you <em>always</em> get back: name, email, age, address, phone, profile picture, subscription plan, last login... even if you only needed the name.
            </p>
            <p className="text-xs text-slate-400 leading-relaxed mb-2">
              And if you also need that user's posts AND their comments — that's three separate trips to the kitchen (/users/1, /users/1/posts, /users/1/comments).
            </p>
            <p className="text-xs text-amber-400 font-semibold">Problems: too much data, too many round trips</p>
          </div>
          <div className="bg-slate-900/60 rounded-xl p-4">
            <div className="text-2xl mb-2">🛒</div>
            <p className="font-semibold text-white text-sm mb-1">GraphQL = order exactly what you want</p>
            <p className="text-xs text-slate-400 leading-relaxed mb-2">
              "Give me the user's name, their last 3 posts (just title and date), and the comment count on each post." One request. You get exactly that, nothing more.
            </p>
            <p className="text-xs text-slate-400 leading-relaxed mb-2">
              There's only one URL the whole time: <code className="text-pink-300">/graphql</code>. Everything — users, posts, comments — goes through that one address.
            </p>
            <p className="text-xs text-emerald-400 font-semibold">Benefit: exactly the right data, in one trip</p>
          </div>
        </div>
      </div>

      {/* REST vs GraphQL demo */}
      <section>
        <h2 className="text-xl font-bold text-white mb-3">See the Difference — REST vs GraphQL</h2>
        <p className="text-slate-400 text-sm mb-1">
          Let's say you're building a profile card that only shows a user's name and email. Toggle which fields you actually need and see what each approach sends back:
        </p>
        <LiveDemo title="REST vs GraphQL — pick only the fields you need">
          <FieldSelectionDemo />
        </LiveDemo>
        <p className="text-slate-400 text-sm mt-2">
          On mobile networks this matters a lot. Sending unnecessary data slows down your app for users on slow connections.
        </p>
      </section>

      {/* Core operations */}
      <section>
        <h2 className="text-xl font-bold text-white mb-3">The Three Things You Can Do</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { icon: '🔍', name: 'Query', color: 'border-emerald-500/30 bg-emerald-500/10', titleColor: 'text-emerald-300', desc: 'Read data. Ask for users, posts, products — whatever your app needs to display. Like a SELECT in a database.' },
            { icon: '✏️', name: 'Mutation', color: 'border-pink-500/30 bg-pink-500/10', titleColor: 'text-pink-300', desc: 'Change data. Create a new user, update a post, delete a comment. Like INSERT, UPDATE, DELETE in a database.' },
            { icon: '📡', name: 'Subscription', color: 'border-indigo-500/30 bg-indigo-500/10', titleColor: 'text-indigo-300', desc: 'Listen for real-time updates. The server notifies you when something changes — perfect for live chat or notifications.' },
          ].map(c => (
            <div key={c.name} className={`border rounded-xl p-4 ${c.color}`}>
              <div className="text-2xl mb-2">{c.icon}</div>
              <p className={`font-semibold text-sm mb-1 ${c.titleColor}`}>{c.name}</p>
              <p className="text-xs text-slate-400 leading-relaxed">{c.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Schema */}
      <section>
        <h2 className="text-xl font-bold text-white mb-3">The Schema — Your API's Menu</h2>
        <p className="text-slate-400 text-sm mb-3">
          Before you can use a GraphQL API, someone has to define the <strong className="text-white">schema</strong>. The schema is a document that describes:
        </p>
        <ul className="text-sm text-slate-400 space-y-1 mb-4 ml-4">
          <li>• <strong className="text-white">What types of data exist</strong> (User, Post, Comment...)</li>
          <li>• <strong className="text-white">What fields each type has</strong> (a User has: id, name, email...)</li>
          <li>• <strong className="text-white">What you can ask for</strong> (get a single user, get all posts...)</li>
          <li>• <strong className="text-white">What you can change</strong> (create a user, delete a post...)</li>
        </ul>
        <CodeBlock filename="schema.graphql — describes your entire API" code={`# A "type" is like a blueprint for an object.
# The ! means the field is required (it will never be null/missing).

type User {
  id: ID!           # Every user has a unique ID (required)
  name: String!     # Name is required
  email: String!    # Email is required
  age: Int          # Age is optional (no !)
  posts: [Post!]!   # A list of their posts (the list itself is required)
}

type Post {
  id: ID!
  title: String!
  content: String!
  published: Boolean!   # true or false
  author: User!         # Each post knows who wrote it
}

# Query = everything clients can READ
type Query {
  user(id: ID!): User         # Get one specific user (by their ID)
  users: [User!]!             # Get ALL users
  post(id: ID!): Post         # Get one specific post
}

# Mutation = everything clients can CHANGE
type Mutation {
  createUser(name: String!, email: String!): User!   # Create and return a user
  updateUser(id: ID!, name: String): User!           # Update and return a user
  deleteUser(id: ID!): Boolean!                      # Delete, return true/false
}`} />
        <Callout type="info" title="You read the schema like a contract">
          The schema is written by the backend developer and shared with the frontend developer. Once you know the schema, you know exactly what data exists and how to ask for it — no guessing, no looking at old code.
        </Callout>
      </section>

      {/* Queries */}
      <section>
        <h2 className="text-xl font-bold text-white mb-3">Writing Queries — Asking for Data</h2>
        <p className="text-slate-400 text-sm mb-3">
          A query looks like a mirror of the data you want. You write the shape of what you need, and the server sends back data in exactly that shape:
        </p>
        <CodeBlock code={`# Ask for one user's name and email only
query GetUser {
  user(id: "1") {
    name
    email
    # Notice: we didn't ask for age or posts, so we won't get them
  }
}

# Response from server:
# {
#   "data": {
#     "user": {
#       "name": "Alice",
#       "email": "alice@dev.com"
#     }
#   }
# }


# Ask for a user AND their posts — all in ONE request
# (In REST you'd need two separate requests)
query GetUserWithPosts {
  user(id: "1") {
    name
    posts {
      title
      published
    }
  }
}


# Use variables instead of hardcoding the ID
# (This is the proper way — never put values directly in queries)
query GetUser($userId: ID!) {
  user(id: $userId) {
    name
    email
  }
}
# You pass the variable separately: { "userId": "1" }
# This prevents security issues and makes queries reusable`} />
        <LiveDemo title="Try building a query yourself">
          <QueryBuilderDemo />
        </LiveDemo>
      </section>

      {/* Mutations */}
      <section>
        <h2 className="text-xl font-bold text-white mb-3">Mutations — Changing Data</h2>
        <p className="text-slate-400 text-sm mb-3">
          A mutation is like a query, but it changes something on the server first. After it makes the change, it can return data — so you can update your UI immediately without making a second request.
        </p>
        <CodeBlock code={`# Create a new user
# After creating, we ask for the new user's id, name, and email
mutation CreateUser($name: String!, $email: String!) {
  createUser(name: $name, email: $email) {
    id       ← the server generated this, now we know it
    name
    email
  }
}
# Variables sent with this mutation: { "name": "Bob", "email": "bob@dev.com" }


# Update an existing user's name
mutation UpdateUser($id: ID!, $newName: String!) {
  updateUser(id: $id, name: $newName) {
    id
    name   ← we get the updated name back immediately
  }
}


# Delete a user — returns true if it worked, false if not
mutation DeleteUser($id: ID!) {
  deleteUser(id: $id)
}`} />
        <LiveDemo title="Mutations — create and delete users">
          <MutationDemo />
        </LiveDemo>
      </section>

      {/* Using in React with Apollo */}
      <section>
        <h2 className="text-xl font-bold text-white mb-3">Using GraphQL in React — Apollo Client</h2>
        <p className="text-slate-400 text-sm mb-3">
          You could write GraphQL queries using plain <code className="text-slate-300">fetch()</code>, but a library called <strong className="text-white">Apollo Client</strong> makes it much nicer. It gives you React hooks that handle loading, errors, and caching automatically.
        </p>
        <CodeBlock language="bash" code={`# Install Apollo Client in your React project
npm install @apollo/client graphql`} />
        <CodeBlock filename="src/main.jsx — connect Apollo to your app" code={`import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client'
import ReactDOM from 'react-dom/client'
import App from './App'

// 1. Create an Apollo client and tell it where your GraphQL server is
const client = new ApolloClient({
  uri: 'https://your-api.com/graphql',  // ← the URL of your GraphQL server
  cache: new InMemoryCache(),
  // InMemoryCache means "remember the results in memory so we don't
  // re-fetch the same data we already have"
})

// 2. Wrap your entire app with ApolloProvider
// This makes the client available in every component in your app
ReactDOM.createRoot(document.getElementById('root')).render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
)`} />
      </section>

      {/* useQuery */}
      <section>
        <h2 className="text-xl font-bold text-white mb-3">useQuery — Fetching Data in a Component</h2>
        <p className="text-slate-400 text-sm mb-3">
          <code className="text-pink-300">useQuery</code> replaces <code className="text-slate-300">useEffect + fetch</code> for GraphQL. It automatically handles the loading state, the error state, and caches the result:
        </p>
        <CodeBlock code={`import { useQuery, gql } from '@apollo/client'

// Step 1: Write your query using the gql tag
// gql just tells Apollo "this string is a GraphQL query"
const GET_USERS = gql\`
  query GetUsers {
    users {
      id
      name
      email
    }
  }
\`

function UserList() {
  // Step 2: Call useQuery with your query
  // Apollo automatically fetches the data when this component renders
  const { loading, error, data } = useQuery(GET_USERS)

  // Step 3: Handle each state
  if (loading) return <p>Loading users...</p>      // Still fetching
  if (error) return <p>Error: {error.message}</p>  // Something went wrong

  // data.users is your array of users
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


// Fetching a SPECIFIC user by ID using variables:
const GET_USER = gql\`
  query GetUser($id: ID!) {
    user(id: $id) {
      name
      email
    }
  }
\`

function UserProfile({ userId }) {
  const { loading, error, data } = useQuery(GET_USER, {
    variables: { id: userId },   // Pass the ID as a variable
    skip: !userId,               // Don't run the query if userId is empty
  })

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error!</p>

  return (
    <div>
      <h1>{data.user.name}</h1>
      <p>{data.user.email}</p>
    </div>
  )
}`} />
      </section>

      {/* useMutation */}
      <section>
        <h2 className="text-xl font-bold text-white mb-3">useMutation — Changing Data from a Component</h2>
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

  // useMutation returns a function to trigger the mutation, plus status info
  const [createUser, { loading, error, data }] = useMutation(CREATE_USER)

  async function handleSubmit(e) {
    e.preventDefault()

    // Call the function with your variables to run the mutation
    await createUser({
      variables: { name, email }
    })

    setName('')   // Clear the form
    setEmail('')
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        value={name}
        onChange={e => setName(e.target.value)}
        placeholder="Name"
      />
      <input
        value={email}
        onChange={e => setEmail(e.target.value)}
        placeholder="Email"
      />
      <button type="submit" disabled={loading}>
        {loading ? 'Creating...' : 'Create User'}
      </button>

      {error && <p style={{ color: 'red' }}>Error: {error.message}</p>}
      {data && <p style={{ color: 'green' }}>Created: {data.createUser.name}!</p>}
    </form>
  )
}`} />
      </section>

      {/* Resolvers */}
      <section>
        <h2 className="text-xl font-bold text-white mb-3">Resolvers — How the Server Finds the Data</h2>
        <p className="text-slate-400 text-sm mb-3">
          When your React app sends a query like <code className="text-pink-300">user(id: "1")</code>, the GraphQL server needs to know how to actually go and find that user. That's what <strong className="text-white">resolvers</strong> are for.
        </p>
        <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-4 mb-4">
          <p className="text-xs font-bold text-slate-300 mb-2">Library analogy:</p>
          <p className="text-xs text-slate-400 leading-relaxed">
            Imagine a library. The schema is the library catalogue — it lists every book available. A query is your request: "I'd like book #42." A <strong className="text-white">resolver is the librarian</strong> — they take your request, go to the right shelf (your database), and come back with the actual book.
          </p>
        </div>
        <CodeBlock filename="server.js — the backend (Node.js with Apollo Server)" code={`import { ApolloServer } from '@apollo/server'
import { startStandaloneServer } from '@apollo/server/standalone'

// The schema — copy of what we defined earlier
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

// Pretend database (in real life, use PostgreSQL, MongoDB, etc.)
const users = [
  { id: '1', name: 'Alice', email: 'alice@dev.com' },
  { id: '2', name: 'Bob', email: 'bob@dev.com' },
]
const posts = [
  { id: '1', title: 'Hello World', authorId: '1' },
  { id: '2', title: 'Learning GraphQL', authorId: '1' },
]

// Resolvers — for each thing in the schema, a function that fetches the data
const resolvers = {

  Query: {
    // When someone sends: { users { name } }
    // This function runs and returns all users
    users: () => users,

    // When someone sends: { user(id: "1") { name } }
    // The second argument has the arguments they passed (here: { id: "1" })
    user: (_, { id }) => users.find(u => u.id === id),
  },

  Mutation: {
    // When someone sends: mutation { createUser(name: "...", email: "...") }
    createUser: (_, { name, email }) => {
      const newUser = { id: String(users.length + 1), name, email }
      users.push(newUser)    // Save to our "database"
      return newUser         // Return the new user so the client can use it
    },
  },

  // How to get a user's posts:
  // When the query asks for user.posts, this function runs
  // 'user' is the user object we already found above
  User: {
    posts: (user) => posts.filter(p => p.authorId === user.id),
  },

  // How to get a post's author:
  Post: {
    author: (post) => users.find(u => u.id === post.authorId),
  },
}

// Start the server on port 4000
const server = new ApolloServer({ typeDefs, resolvers })
const { url } = await startStandaloneServer(server, { listen: { port: 4000 } })
console.log('GraphQL server running at', url)
// Open http://localhost:4000 in your browser for an interactive query editor!`} />
        <Callout type="advanced" title="This is the backend side — you don't always need to build it">
          If you're working on a frontend app and someone has already built the GraphQL API for you (or you're using a service like GitHub's API or Shopify's API), you don't need to write resolvers. You just write queries. Come back to this section when you're ready to build your own full GraphQL backend.
        </Callout>
      </section>

      {/* Fragments */}
      <section>
        <h2 className="text-xl font-bold text-white mb-3">Fragments — Reusable Field Groups</h2>
        <p className="text-slate-400 text-sm mb-3">
          If you find yourself writing the same list of fields in multiple queries, you can give that list a name (a "fragment") and reuse it — like a variable for fields:
        </p>
        <CodeBlock code={`// Define the fragment once:
// "UserBasicInfo is the combination of these 4 fields on a User"
const USER_BASIC_INFO = gql\`
  fragment UserBasicInfo on User {
    id
    name
    email
    role
  }
\`

// Reuse it with "..." (the spread operator, same concept as JavaScript)
const GET_USER = gql\`
  \${USER_BASIC_INFO}
  query GetUser($id: ID!) {
    user(id: $id) {
      ...UserBasicInfo   ← expands to: id, name, email, role
      posts { title }    ← plus any extra fields you need here
    }
  }
\`

const GET_ALL_USERS = gql\`
  \${USER_BASIC_INFO}
  query GetAllUsers {
    users {
      ...UserBasicInfo   ← same 4 fields, same fragment
    }
  }
\`

// Why this matters: if you want to add a "createdAt" field to every user query,
// you add it ONCE in the fragment and all queries get it automatically.`} />
      </section>

      {/* Errors */}
      <section>
        <h2 className="text-xl font-bold text-white mb-3">Error Handling</h2>
        <p className="text-slate-400 text-sm mb-3">
          One quirk of GraphQL: the server almost always responds with a <strong className="text-white">200 OK</strong> status, even when something went wrong. Errors are described inside the response body instead:
        </p>
        <CodeBlock code={`// What a GraphQL error response looks like:
{
  "data": null,
  "errors": [
    {
      "message": "User not found",   ← the error description
      "path": ["user"]               ← which field failed
    }
  ]
}
// Notice: the HTTP status is still 200 — unlike REST where you'd get a 404.
// This means you can't just check response.ok like with fetch().
// Apollo Client handles this for you automatically.


// In your component, Apollo gives you an 'error' object:
function UserProfile({ id }) {
  const { loading, error, data } = useQuery(GET_USER, {
    variables: { id }
  })

  if (loading) return <p>Loading...</p>

  if (error) {
    // Check if it's a "not found" error
    const notFound = error.graphQLErrors.some(e => e.message === 'User not found')
    if (notFound) return <p>This user doesn't exist.</p>

    // Generic error fallback
    return <p>Something went wrong. Please try again.</p>
  }

  return <h1>{data.user.name}</h1>
}`} />
      </section>

      {/* When to use */}
      <section>
        <h2 className="text-xl font-bold text-white mb-3">Should You Use GraphQL?</h2>
        <p className="text-slate-400 text-sm mb-3">
          GraphQL is powerful — but it also adds complexity. Here's an honest breakdown:
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-pink-500/10 border border-pink-500/30 rounded-xl p-4">
            <p className="text-xs font-bold text-pink-300 uppercase tracking-wider mb-3">GraphQL is a good fit when...</p>
            <ul className="space-y-2 text-xs text-slate-300">
              {[
                'Your app has a mobile version AND a web version that need different data shapes',
                'Your data has lots of relationships (users have posts, posts have comments, comments have likes...)',
                'You\'re making many API calls to build one screen — GraphQL collapses them into one',
                'Your team is growing and you want a self-documenting, strictly-typed API',
                'You\'re working with an existing GraphQL API (GitHub, Shopify, Contentful...)',
              ].map(item => (
                <li key={item} className="flex gap-2"><span className="text-pink-400 flex-shrink-0">✓</span>{item}</li>
              ))}
            </ul>
          </div>
          <div className="bg-amber-500/10 border border-amber-500/30 rounded-xl p-4">
            <p className="text-xs font-bold text-amber-300 uppercase tracking-wider mb-3">Stick with REST when...</p>
            <ul className="space-y-2 text-xs text-slate-300">
              {[
                'Your API is simple with just a handful of endpoints',
                'You\'re a solo developer or small team — REST is faster to build',
                'You\'re still learning — REST is much easier to understand and debug',
                'You\'re building a public API that anyone can use (REST is universally understood)',
                'Your data doesn\'t have complex relationships',
              ].map(item => (
                <li key={item} className="flex gap-2"><span className="text-amber-400 flex-shrink-0">✓</span>{item}</li>
              ))}
            </ul>
          </div>
        </div>
        <Callout type="warning" title="Don't feel pressured to use GraphQL just because it sounds advanced">
          Many successful apps — including some very large ones — use plain REST APIs. GraphQL solves specific problems. If those aren't your problems yet, REST is the right choice. Learn GraphQL when you run into a situation where REST is genuinely making your life harder.
        </Callout>
      </section>

      <PageNav currentPath="/graphql" />
    </div>
  )
}
