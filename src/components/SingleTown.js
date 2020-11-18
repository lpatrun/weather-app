import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import firebase from '../firebase'
import './ResultsComponent.css'

function SingleTown({ propsCity }) {
  const api = {
    base: 'https://api.openweathermap.org/data/2.5/',
    key: process.env.REACT_APP_OPENWEATHER_API_KEY,
  }

  const [city, setCity] = useState({})

  useEffect(() => {
    if (propsCity.name) {
      fetch(
        `${api.base}weather?q=${propsCity.name}&units=metric&lang=hr&appid=${api.key}`,
      )
        .then((response) => response.json())
        .then((result) => {
          result = { ...result, realId: propsCity.id }
          setCity(result)
        })
    }
  }, [api.base, propsCity, api.key])

  const handleRemoveCity = () => {
    const db = firebase.firestore()
    db.collection('cities').doc(city.realId).delete()
  }

  return (
    <div className="weatherResults">
      {city.main ? (
        <>
          {/* <div className="locationBox">
              {city.name}, {city.sys.country}
            </div> */}
          <div className="weatherBox">
            <img
              src={`https://openweathermap.org/img/wn/${city.weather[0].icon}@4x.png`}
              alt={city.name}
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
            <button className="unfollowBtn" onClick={handleRemoveCity}>
              Otprati
            </button>
            <Link to="/details" className="details">
              Detalji
            </Link>
          </div>
        </>
      ) : (
        <div className="loader">Loading...</div>
      )}
    </div>
  )
}

export default SingleTown
