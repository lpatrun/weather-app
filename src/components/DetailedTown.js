import React, { useEffect, useState, useContext, useRef } from "react";
import { UserContext } from "../App";
import { Link } from "react-router-dom";

function DetailedTown() {
  const [city, setCity] = useState({});
  const dani = [
    "Nedjelja",
    "Ponedjeljak",
    "Utorak",
    "Srijeda",
    "Četvrtak",
    "Petak",
    "Subota",
  ];
  const { state } = useContext(UserContext);
  const mounted = useRef(false);

  const api = {
    key: process.env.REACT_APP_OPENWEATHER_API_KEY,
    base: "https://api.openweathermap.org/data/2.5/",
    detailedBase: "https://api.openweathermap.org/data/2.5/forecast?",
    search: "&lang=hr&units=metric",
  };

  useEffect(() => {
    mounted.current = true;
    if (state.selectedCity > -1) {
      fetch(
        `${api.detailedBase}q=${state.cities[state.selectedCity].name}&appid=${
          api.key
        }${api.search}`
      )
        .then((response) => response.json())
        .then((result) => {
          if (mounted.current) {
            setCity(result);
          }
        });
    }
    return () => {
      mounted.current = false;
    };
  }, [api.detailedBase, api.key, api.search, state.cities, state.selectedCity]);

  let weatherReport = null;

  if (city.list) {
    weatherReport = city.list.map((hour) => {
      const date = new Date(hour.dt * 1000);
      return (
        <div
          className="details-box d-flex justify-content-between"
          key={hour.dt}
        >
          <img
            alt={state.cities[state.selectedCity].name}
            height="100px"
            width="100px"
            src={require(`../images/${hour.weather[0].icon}.svg`)}
          />
          <div className="text-align-end">
            <h2 className="text-capitalize">{hour.weather[0].description}</h2>
            <h1>{Math.round(hour.main.temp)} °C</h1>
            <p>Dojam: {Math.round(hour.main.feels_like)} °C</p>
            <p>
              Vjetar: {Math.round(hour.wind.speed * 3.6)} km/h{" "}
              <span
                className="compass-arrow"
                style={{ transform: `rotate(${hour.wind.deg}deg)` }}
              >
                ➤
              </span>
            </p>
            <p>
              {date.getHours()}:00, {date.getDate()}.{date.getMonth() + 1}.
              {date.getFullYear()}.
            </p>
            <p>{dani[date.getDay()]}</p>
          </div>
        </div>
      );
    });
  }

  return (
    <div className="weather-results">
      {weatherReport ? (
        <>
          {weatherReport}
          <div className="weather-results-buttons-container">
            <Link to="/" className="btn btn-secondary">
              Natrag
            </Link>
          </div>
        </>
      ) : (
        <div className="loader"></div>
      )}
    </div>
  );
}

export default DetailedTown;
