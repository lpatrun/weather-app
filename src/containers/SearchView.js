import React, { useEffect } from 'react'
import MenuComponent from '../components/MenuComponent'
import SearchComponent from '../components/SearchComponent'

function SearchView() {

  useEffect(() => {
    console.log('SearchView')
  
    return () => {
      console.log('SearchView unmount')
    }
  }, [])

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
