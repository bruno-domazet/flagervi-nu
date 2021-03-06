import React from 'react'
import useUser from '../lib/useAuth'

export const Navigation: React.FunctionComponent<{ items: { name: string; url: string }[]; onToggle?: () => void }> =
  props => {
    const { user } = useUser()
    const [expand, setExpand] = React.useState(false)

    const onClick = () => {
      setExpand(!expand)

      if (props.onToggle) {
        props.onToggle()
      }
    }

    const loginItem = {
      name: (user && 'Logout') || 'Login',
      url: '#',
    }

    const menuItems = [...props.items, loginItem]

    return (
      <>
        <button
          onClick={onClick}
          className="navbar-toggler"
          type="button"
          aria-controls="navbarNav"
          aria-expanded={(!!expand && 'true') || 'false'}
          aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className={`navbar-collapse collapse${(expand && ' show') || ''}`} id="navbarNav">
          <ul className="navbar-nav">
            {props.items &&
              props.items.map((el, i) => {
                return (
                  <li key={i} className="nav-item">
                    <a className="nav-link" href={el.url}>
                      {el.name}
                    </a>
                  </li>
                )
              })}
          </ul>
        </div>
      </>
    )
  }
