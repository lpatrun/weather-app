import React, { useState } from 'react';
import { useHistory } from "react-router-dom";
import classes from './SearchComponent.module.css';

function SearchComponent() {
  let history = useHistory();

  const [query, setQuery] = useState('');

  const toHandleSubmit = (event) => {
    history.push("/results/" + query);
    event.preventDefault();
    setQuery('');
  }

  return (
    <React.Fragment>
      <form onSubmit={toHandleSubmit} className={classes.searchBox} id="parent">
        <input
          id="child"
          type="text"
          className={classes.searchBar}
          placeholder="Tražilica..."
          onChange={e => setQuery(e.target.value)}
          value={query}
          required
        />
        <button type="submit" className={classes.mainBtn}>Traži</button>
      </form>
    </React.Fragment>
  );
}

export default SearchComponent;