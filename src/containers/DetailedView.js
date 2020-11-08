import React from 'react';
import SearchComponent from '../components/SearchComponent';
import DetailedTown from '../components/DetailedTown';

function DetailedView() {
  return (
    <div className="main-container">
      <SearchComponent />
      <DetailedTown />
    </div>
  )
}

export default DetailedView;