import { useEffect, useRef, useState } from 'react'
import hljs from 'highlight.js/lib/core'
import javascript from 'highlight.js/lib/languages/javascript'
import bash from 'highlight.js/lib/languages/bash'
import json from 'highlight.js/lib/languages/json'
import xml from 'highlight.js/lib/languages/xml'
import 'highlight.js/styles/atom-one-dark.css'

hljs.registerLanguage('javascript', javascript)
hljs.registerLanguage('jsx', javascript)
hljs.registerLanguage('bash', bash)
hljs.registerLanguage('json', json)
hljs.registerLanguage('html', xml)

export default function CodeBlock({ code, language = 'jsx', filename }) {
  const codeRef = useRef(null)
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    if (codeRef.current) {
      delete codeRef.current.dataset.highlighted
      hljs.highlightElement(codeRef.current)
    }
  }, [code, language])

  const handleCopy = () => {
    navigator.clipboard.writeText(code.trim())
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const langLabel = {
    jsx: 'JSX',
    javascript: 'JavaScript',
    bash: 'Terminal',
    json: 'JSON',
    html: 'HTML',
  }[language] || language.toUpperCase()

  return (
    <div className="rounded-lg overflow-hidden border border-slate-700/50 my-4">
      {/* Header bar */}
      <div className="flex items-center justify-between px-4 py-2 bg-slate-800 border-b border-slate-700/50">
        <div className="flex items-center gap-3">
          {/* Traffic lights */}
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-500/70" />
            <div className="w-3 h-3 rounded-full bg-yellow-500/70" />
            <div className="w-3 h-3 rounded-full bg-green-500/70" />
          </div>
          {filename && <span className="text-xs text-slate-400 font-mono">{filename}</span>}
          {!filename && <span className="text-xs text-slate-500 font-semibold">{langLabel}</span>}
        </div>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-white px-2 py-1 rounded hover:bg-slate-700 transition-colors"
        >
          {copied ? (
            <>
              <svg className="w-3.5 h-3.5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span className="text-green-400">Copied!</span>
            </>
          ) : (
            <>
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
              Copy
            </>
          )}
        </button>
      </div>
      <pre className="m-0 overflow-x-auto" style={{ background: '#020617' }}>
        <code ref={codeRef} className={`language-${language}`} style={{ background: 'transparent' }}>
          {code.trim()}
        </code>
      </pre>
    </div>
  )
}
