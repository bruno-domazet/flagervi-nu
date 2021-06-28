import Link from 'next/link'
import React from 'react'
import LoginForm from '../components/loginForm'

export default function Header() {
  return (
    <header>
      <div>
        <p>logo</p>
      </div>
      <div>
        <nav>
          <ul>
            <li>
              <Link href="/">
                <a>Home</a>
              </Link>
            </li>
            <li>
              <Link href="/create">
                <a>opret</a>
              </Link>
            </li>
          </ul>
        </nav>
      </div>
      <div>
        <LoginForm />
      </div>
    </header>
  )
}
