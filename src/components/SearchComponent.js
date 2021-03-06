import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import cities from "../data/gradovi.json";

function SearchComponent() {
  let history = useHistory();
  const [hrGradovi] = useState(cities);
  const [gradoviZaSelect, setGradoviZaSelect] = useState([]);
  const [query, setQuery] = useState("");
  const [underlay, setUnderlay] = useState(false);

  const handleChange = (e) => {
    setQuery(e.target.value.toLowerCase());
    if (e.target.value) {
      setGradoviZaSelect(
        hrGradovi
          .filter((grad) => grad.name.toLowerCase().startsWith(e.target.value))
          .sort((a, b) => a.name.localeCompare(b.name))
      );
      setUnderlay(true);
    } else {
      setGradoviZaSelect([]);
      setUnderlay(false);
    }
  };

  const toHandleSubmit = (event) => {
    history.push("/search/" + query);
    event.preventDefault();
    setQuery("");
  };

  const toSelectTown = (city) => {
    setUnderlay(false);
    history.push("/search/" + city);
    setQuery("");
  };

  return (
    <div className="search-container">
      {underlay && (
        <div
          className="underly"
          onClick={() => {
            setUnderlay(false);
          }}
        ></div>
      )}
      <form onSubmit={toHandleSubmit} className="search-box">
        <input
          type="text"
          className="search-bar"
          placeholder="Tražilica..."
          onChange={handleChange}
          value={query}
          required
        />

        <button type="submit" className="btn btn-primary btn-small">
          Traži
        </button>

        {underlay && (
          <div className="autosuggestion">
            {gradoviZaSelect.map((grad) => (
              <div
                className="autosuggestion-item"
                key={grad.id}
                onClick={() => toSelectTown(grad.name)}
              >
                {grad.name}
              </div>
            ))}
          </div>
        )}
      </form>
    </div>
  );
}

export default SearchComponent;
