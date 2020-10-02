import React from 'react';
import ResultsComponent from '../components/ResultsComponent';
import SearchComponent from '../components/SearchComponent';


function ResultsScreen() {
  return (
    <React.Fragment>
      <SearchComponent />
      <ResultsComponent />
    </React.Fragment>
  )
}

export default ResultsScreen;