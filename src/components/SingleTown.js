import React, { useState, useEffect, useContext, useRef } from "react";
import "./ResultsComponent.css";

import { Link, useHistory, NavLink } from "react-router-dom";

import { UserContext } from "../App";

function SingleTown({ propsCity }) {
  const { state, dispatch } = useContext(UserContext);

  const api = {
    base: "https://api.openweathermap.org/data/2.5/",
    key: process.env.REACT_APP_OPENWEATHER_API_KEY,
  };

  const [city, setCity] = useState({});
  const mounted = useRef(false);

  useEffect(() => {
    mounted.current = true;
    if (propsCity.name) {
      fetch(
        `${api.base}weather?q=${propsCity.name}&units=metric&lang=hr&appid=${api.key}`
      )
        .then((response) => response.json())
        .then((result) => {
          result = { ...result, realId: propsCity.id };
          if (mounted.current) {
            setCity(result);
          }
        });
    }

    return () => {
      mounted.current = false;
    };
  }, [api.base, propsCity, api.key]);

  const handleRemoveCity = (e) => {
    e.preventDefault();
    dispatch({ type: "removeCity", payload: { cityToRemove: city.realId } });
    returnHome();
  };

  let history = useHistory();
  const returnHome = () => {
    history.push("/");
  };

  return (
    <div className="weatherResults">
      {city.main ? (
        <>
          <div className="weatherBox">
            <img
              src={`https://openweathermap.org/img/wn/${city.weather[0].icon}@4x.png`}
              alt={city.name}
              height="200px"
              width="200px"
            />
            <div className="weatherBoxInfo">
              <div className="weather">{city.weather[0].description}</div>
              <div className="temp">{Math.round(city.main.temp)} °C</div>
              <div className="realFeel">
                Dojam: {Math.round(city.main.feels_like)} °C<br></br>
                Vjetar: {Math.round(city.wind.speed * 3.6)} km/h
              </div>
            </div>
          </div>
          <div className="options">
            {state.userData && (
              <button className="unfollowBtn" onClick={handleRemoveCity}>
                Otprati
              </button>
            )}
            <Link to="/details" className="details">
              5 dana
            </Link>
          </div>
        </>
      ) : Object.keys(state.selectedCity).length ? (
        <div className="loader">Loading...</div>
      ) : (
        <div style={{display:'flex', flexDirection:'column',alignItems:'center' }}><p style={{ color: "white", textAlign: "center" }}>
          Trenutno ne pratite niti jedan grad :/
        </p>
        <p style={{ color: "white", textAlign: "center" }}>
          Prvo na tražilicu
        </p>
        <NavLink to="/search"><button style={{margin:'10px auto'}}>NA TRAŽILICU</button></NavLink>
        </div>
      )}
    </div>
  );
}

export default SingleTown;
