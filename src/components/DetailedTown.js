import React, { useEffect, useState, useContext } from "react";
import "./DetailedTown.scss";
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

  const api = {
    key: process.env.REACT_APP_OPENWEATHER_API_KEY,
    base: "https://api.openweathermap.org/data/2.5/",
    detailedBase: "https://api.openweathermap.org/data/2.5/forecast?",
    search: "&lang=hr&units=metric",
  };

  useEffect(() => {
    if (state.selectedCity > -1) {
      fetch(
        `${api.detailedBase}q=${state.cities[state.selectedCity].name}&appid=${
          api.key
        }${api.search}`
      )
        .then((response) => response.json())
        .then((result) => {
          setCity(result);
        });
    }
  }, [api.detailedBase, api.key, api.search, state.cities, state.selectedCity]);

  let weatherReport = null;

  if (city.list) {
    weatherReport = city.list.map((hour) => {
      const date = new Date(hour.dt * 1000);
      return (
        <div className="details-box" key={hour.dt}>
          <img
            src={`http://openweathermap.org/img/wn/${hour.weather[0].icon}@2x.png`}
            alt={state.cities[state.selectedCity]}
            title={hour.weather[0].description}
            height="100px"
            width="100px"
          />
          <div className="details-box-info">
            <div className="details-weather">{hour.weather[0].description}</div>
            <div className="details-temp">{Math.round(hour.main.temp)} °C</div>
            <div className="details-real-feel">
              <p>Dojam: {Math.round(hour.main.feels_like)} °C</p>
              <p>Vjetar: {Math.round(hour.wind.speed * 3.6)} km/h  <span className="compass-arrow" style={{ transform: `rotate(${hour.wind.deg}deg)`}}>➤</span></p>
              <p>{date.getHours()}:00, {date.getDate()}.{date.getMonth() + 1}.{date.getFullYear()}.</p>
              <p>{dani[date.getDay()]}</p>
            </div>
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
          <div className="options">
            <Link to="/" className="btn btn-secondary">
              Natrag
            </Link>
          </div>
        </>
      ) : (
        <div className="loader">Loading...</div>
      )}
    </div>
  );
}

export default DetailedTown;
