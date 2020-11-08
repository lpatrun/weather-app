import React, { useState } from 'react'
import { Link } from 'react-router-dom'

function MenuComponent() {
  const [showMenu, setShowMenu] = useState(false)

  const toggleMenu = () => {
    setShowMenu(!showMenu)
  }

  return (
    <nav className={`menuContainer ${showMenu ? 'menu_shown' : ''}`}>
      <div className="menu desktop">
        <Link to="/" className="menu__item">
          Početna
        </Link>
        <Link to="/search" className="menu__item">
          Tražilica
        </Link>
      </div>
      <div className="menu__icon mobile" onClick={toggleMenu}>
        <span></span>
      </div>
      <div className="menu mobile">
        <Link to="/" className="menu__item">
          Početna
        </Link>
        <Link to="/search" className="menu__item">
          Tražilica
        </Link>
      </div>
    </nav>
  )
}

export default MenuComponent
