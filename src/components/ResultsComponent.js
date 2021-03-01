import React, { useContext, useEffect, useState } from "react";
import "./ResultsComponent.scss";
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
      <button className="follow-city" onClick={saveCityToFirestore}>
        Prati grad
      </button>
    );
  };

  return (
    <>
      {weather.main && (
        <>
          <div className="weather-results">
            <div className="location-box">
              {weather.name}, {weather.sys.country}
            </div>
            <div className="weather-box">
              <img
                src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@4x.png`}
                alt="slika"
                width="200px"
                height="200px"
              />
              <div className="weather-box-info">
                <div className="weather">{weather.weather[0].description}</div>
                <div className="temp">{Math.round(weather.main.temp)} °C</div>
                <div className="real-feel">
                  Dojam: {Math.round(weather.main.feels_like)} °C<br></br>
                  Vjetar: {Math.round(weather.wind.speed * 3.6)} km/h<br></br>
                  Maksimalno: {Math.round(weather.main.temp_max)} °C<br></br>
                  Minimalno: {Math.round(weather.main.temp_min)} °C<br></br>
                  Tlak zraka: {Math.round(weather.main.pressure)} hPa<br></br>
                  Vlaga: {Math.round(weather.main.humidity)} %
                </div>
              </div>
            </div>
            {state.userData && followButton()}
          </div>
          <Link to="/" className="btn btn-secondary">
            Natrag
          </Link>
        </>
      )}
    </>
  );
}

export default ResultsComponent;
