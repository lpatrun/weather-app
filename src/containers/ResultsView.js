import React from 'react'

import SearchComponent from '../components/SearchComponent'
import ResultsComponent from '../components/ResultsComponent'
import MenuComponent from '../components/MenuComponent'

function ResultsView() {
  return (
    <div className="main-container">
      <div className="main-funcs">
        <MenuComponent />
        <SearchComponent />
      </div>
      <ResultsComponent />
    </div>
  )
}

export default ResultsView
