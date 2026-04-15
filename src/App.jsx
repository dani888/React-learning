import { Routes, Route } from 'react-router-dom'
import Sidebar from './components/Sidebar'
import Home from './pages/Home'
import GettingStarted from './pages/GettingStarted'
import Components from './pages/Components'
import PropsState from './pages/PropsState'
import UseState from './pages/UseState'
import UseEffect from './pages/UseEffect'
import UseContext from './pages/UseContext'
import UseRef from './pages/UseRef'
import UseMemo from './pages/UseMemo'
import UseReducer from './pages/UseReducer'
import CustomHooks from './pages/CustomHooks'
import TailwindPage from './pages/TailwindPage'
import NodeBasics from './pages/NodeBasics'
import ExpressJS from './pages/ExpressJS'

export default function App() {
  return (
    <div className="flex min-h-screen bg-slate-950">
      <Sidebar />
      <main className="flex-1 lg:ml-72 min-w-0">
        <div className="max-w-4xl mx-auto px-6 py-10">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/getting-started" element={<GettingStarted />} />
            <Route path="/components" element={<Components />} />
            <Route path="/props-state" element={<PropsState />} />
            <Route path="/use-state" element={<UseState />} />
            <Route path="/use-effect" element={<UseEffect />} />
            <Route path="/use-context" element={<UseContext />} />
            <Route path="/use-ref" element={<UseRef />} />
            <Route path="/use-memo" element={<UseMemo />} />
            <Route path="/use-reducer" element={<UseReducer />} />
            <Route path="/custom-hooks" element={<CustomHooks />} />
            <Route path="/tailwind" element={<TailwindPage />} />
            <Route path="/nodejs" element={<NodeBasics />} />
            <Route path="/express" element={<ExpressJS />} />
          </Routes>
        </div>
      </main>
    </div>
  )
}
