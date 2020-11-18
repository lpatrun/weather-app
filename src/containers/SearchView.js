import React from 'react'
import MenuComponent from '../components/MenuComponent'
import SearchComponent from '../components/SearchComponent'

function SearchView() {

  return (
    <div className="main-container">
      <div className="mainFuncs">
        <MenuComponent />
        <SearchComponent />
      </div>
    </div>
  )
}

export default SearchView
