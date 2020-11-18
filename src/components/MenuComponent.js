import React, { useState } from 'react'
import './MenuComponent.css'
import { NavLink } from 'react-router-dom'
import searchIcon from '../images/loupe.png'
import detailsIcon from '../images/checklist.png'
import homeIcon from '../images/house.png'

function MenuComponent() {
  const [showMenu, setShowMenu] = useState(false)

  const toggleMenu = () => {
    setShowMenu(!showMenu)
  }

  return (
    <nav className={`menuContainer ${showMenu ? 'menu_shown' : ''}`}>
      <div className="menu desktop">
        <NavLink exact to="/" className="menu__item">
          <img src={homeIcon} alt="home" />
          POČETNA
        </NavLink>
        <NavLink to="/details" className="menu__item">
          <img src={detailsIcon} alt="details" />
          DETALJNO
        </NavLink>
        <NavLink to="/search" className="menu__item">
          <img src={searchIcon} alt="search" />
          TRAŽILICA
        </NavLink>
      </div>
      <div className="menu__icon mobile" onClick={toggleMenu}>
        <span></span>
      </div>
      <div className="menu mobile">
        <NavLink exact to="/" className="menu__item">
          <img src={homeIcon} alt="home" />
          POČETNA
        </NavLink>
        <NavLink to="/details" className="menu__item">
          <img src={detailsIcon} alt="details" />
          DETALJNO
        </NavLink>
        <NavLink to="/search" className="menu__item">
          <img src={searchIcon} alt="search" />
          TRAŽILICA
        </NavLink>
      </div>
    </nav>
  )
}

export default MenuComponent
