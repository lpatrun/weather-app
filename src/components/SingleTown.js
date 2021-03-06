import React, { useState, useEffect, useContext, useRef } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../App";
import firebase from "../firebase";

function SingleTown() {
  const { state, dispatch } = useContext(UserContext);
  const [city, setCity] = useState({});
  const mounted = useRef(false);

  const api = {
    key: process.env.REACT_APP_OPENWEATHER_API_KEY,
    base: "https://api.openweathermap.org/data/2.5/",
    detailedBase: "https://api.openweathermap.org/data/2.5/forecast?",
    search: "&lang=hr&units=metric",
    sinSet: "&units=metric&lang=hr",
  };

  useEffect(() => {
    mounted.current = true;
    if (state.selectedCity > -1) {
      const city = state.cities[state.selectedCity].name;
      fetch(`${api.base}weather?q=${city}${api.sinSet}&appid=${api.key}`)
        .then((response) => response.json())
        .then((result) => {
          result = {
            ...result,
            realId: state.cities[state.selectedCity].id,
          };
          if (mounted.current) {
            setCity(result);
          }
        });
    }

    return () => {
      mounted.current = false;
    };
  }, [api.base, api.key, api.sinSet, state.selectedCity, state.cities]);

  const handleRemoveCity = (e) => {
    e.preventDefault();
    const db = firebase.firestore();
    if (state.cities.length === 1) {
      dispatch({ type: "setSelectedCity", payload: { index: -1 } });
    } else {
      dispatch({ type: "setSelectedCity", payload: { index: 0 } });
    }
    db.collection("cities")
      .doc(state.userData.uid)
      .collection("userCities")
      .doc(city.realId)
      .delete();
  };

  return (
    <>
      {Object.keys(city).length ? (
        <div>
          <div className="single-town">
            <img
              alt={city.name}
              src={require(`../images/${city.weather[0].icon}.svg`)}
            />
            <div className="text-align-end">
              <h2 className="text-capitalize">{city.weather[0].description}</h2>
              <h1>{Math.round(city.main.temp)} °C</h1>
              <p>Dojam: {Math.round(city.main.feels_like)} °C</p>
              <p>
                Vjetar: {Math.round(city.wind.speed * 3.6)} km/h{" "}
                <span
                  className="compass-arrow"
                  style={{ transform: `rotate(${city.wind.deg + 90}deg)` }}
                >
                  ➤
                </span>
              </p>
            </div>
          </div>
          <div className="options">
            {state.userData && (
              <button className="btn btn-primary" onClick={handleRemoveCity}>
                Otprati
              </button>
            )}
            <Link to="/details" className="btn btn-secondary">
              5 dana
            </Link>
          </div>
        </div>
      ) : (
          <div className="loader"></div>
      )}
    </>
  );
}

export default SingleTown;
