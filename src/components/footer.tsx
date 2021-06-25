import Link from 'next/link'
import packageJSON from '../../package.json'

export default function Footer() {
  return (
    <footer>
      <ul>
        <li>
          <Link href="/policy">
            <a>Policy</a>
          </Link>
        </li>
        <li>
          <em>next-auth@{packageJSON.dependencies['next-auth']}</em>
        </li>
      </ul>
    </footer>
  )
}
