import React from 'react'
import { Navigation } from './navigation'

export default function Header() {
  const navItems = [
    { name: 'Home', url: '#' },
    { name: 'Features', url: '#' },
  ]
  const onToggle = () => {
    console.log(`onToggle`)
  }
  const triggerPush = async () => {
    await fetch('api/notifications/push')
  }
  return (
    <header>
      <nav className="navbar navbar-light bg-light">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">
            <img src="/logo.png" alt="" width="30" height="24" className="d-inline-block align-text-top" />
            Bootstrap
          </a>
          <Navigation items={navItems} onToggle={onToggle} />
          <button onClick={triggerPush}>Trigger push</button>
        </div>
      </nav>
    </header>
  )
}
