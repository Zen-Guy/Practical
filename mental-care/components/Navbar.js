'use client'
import Link from 'next/link'
import { useState, useEffect } from 'react'

export default function Navbar() {
  const [isDark, setIsDark] = useState(false)

  // Load theme from localStorage (optional)
  useEffect(() => {
    if (localStorage.theme === 'dark') {
      document.documentElement.classList.add('dark')
      setIsDark(true)
    }
  }, [])

  const toggleDarkMode = () => {
    const html = document.documentElement
    if (html.classList.contains('dark')) {
      html.classList.remove('dark')
      localStorage.theme = 'light'
      setIsDark(false)
    } else {
      html.classList.add('dark')
      localStorage.theme = 'dark'
      setIsDark(true)
    }
  }

  return (
    <div className="navbar bg-base-100 shadow-sm px-4">
      <div className="flex-1">
        <Link href="/" className="text-xl font-bold">
          Mental Care
        </Link>
      </div>

      <div className="flex items-center gap-3">
        <Link href="/register" className="btn btn-sm btn-outline">Register</Link>
        <Link href="/login" className="btn btn-sm btn-outline">Sign In</Link>

        <button className="btn btn-sm btn-ghost" onClick={toggleDarkMode}>
          {isDark ? '🌞' : '🌙'}
        </button>

        <Link href="/quiz">
          <button className="btn btn-sm btn-primary">Take Quiz</button>
        </Link>
      </div>
    </div>
  )
}
