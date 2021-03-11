import React, { useContext, useEffect, useState } from "react";
import { useParams, useHistory, Link } from "react-router-dom";
import { UserContext } from "../App";
import firebase from "../firebase";

function ResultsComponent() {
  const api = {
    base: "https://api.openweathermap.org/data/2.5/",
    key: process.env.REACT_APP_OPENWEATHER_API_KEY,
  };

  const [weather, setWeather] = useState({});
  const { state } = useContext(UserContext);
  let { id } = useParams();

  useEffect(() => {
    fetch(
      `${api.base}weather?q=${id.trim()}&units=metric&lang=hr&appid=${api.key}`
    )
      .then((response) => response.json())
      .then((result) => {
        setWeather(result);
      });
  }, [id, api.base, api.key]);

  const saveCityToFirestore = (e) => {
    e.preventDefault();
    const db = firebase.firestore();
    db.collection("cities")
      .doc(state.userData.uid)
      .collection("userCities")
      .add({ name: id });
    history.push("/");
  };

  let history = useHistory();

  const followButton = () => {
    let contains = false;
    state.cities.forEach((element) => {
      if (element.name === weather.name) {
        contains = true;
      }
    });
    return contains ? (
      <></>
    ) : (
      <button className="btn btn-secondary" onClick={saveCityToFirestore}>
        dodaj
      </button>
    );
  };

  return (
    <>
      {weather.main ? (
        <>
          <div className="weather-results">
            <div className="weather-box">
              <p className="h2 text-center text-uppercase">
                {weather.name}, {weather.sys.country}
              </p>
              <img
                src={require(`../images/${weather.weather[0].icon}.svg`)}
                alt="slika"
                width="200px"
                height="200px"
              />
              <div className="text-align-end">
                <p className="h2 text-capitalize">
                  {weather.weather[0].description}
                </p>
                <h1>{Math.round(weather.main.temp)} °C</h1>
                <p>Dojam: {Math.round(weather.main.feels_like)} °C</p>
                <p>Vjetar: {Math.round(weather.wind.speed * 3.6)} km/h</p>
                <p>Maksimalno: {Math.round(weather.main.temp_max)} °C</p>
                <p>Minimalno: {Math.round(weather.main.temp_min)} °C</p>
                <p>Tlak zraka: {Math.round(weather.main.pressure)} hPa</p>
                <p>Vlaga: {Math.round(weather.main.humidity)} %</p>
              </div>
            </div>
            <div className="d-flex justify-content-between">
              <Link to="/" className="btn btn-primary">
                Natrag
              </Link>
              {state.userData && followButton()}
            </div>
          </div>
        </>
      ) : (
        <div className="weather-results">
          <div className="loader"></div>
        </div>
      )}
    </>
  );
}

export default ResultsComponent;
