import React, { useState } from 'react';

function MenuComponent() {
  const [showMenu, setShowMenu] = useState(false);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  }

  //className={`banner ${active ? "active" : ""}`}

  return (
    <nav className={`menuContainer ${showMenu ? "menu_shown" : ""}`}>
      <ul className="menu desktop">
        <li><a href="#" className="menu__item">Danas</a></li>
        <li><a href="#" className="menu__item">Po satu</a></li>
        <li><a href="#" className="menu__item">5 dana</a></li>
      </ul>
      <a className="menu__icon mobile" onClick={toggleMenu}><span></span></a>
      <ul className="menu mobile">
        <li><a href="#" className="menu__item">Danas</a></li>
        <li><a href="#" className="menu__item">Po satu</a></li>
        <li><a href="#" className="menu__item">5 dana</a></li>
      </ul>
    </nav >
  )
}

export default MenuComponent;

{/* <div className="menuContainer">
      <div>Trenutno</div>
      <div>Po satu</div>
      <div>5 dana</div>
    </div> */}