import Link from 'next/link'

export default function Header() {
  return (
    <header>
      <div>
        <p>login or Username</p>
      </div>
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
    </header>
  )
}
