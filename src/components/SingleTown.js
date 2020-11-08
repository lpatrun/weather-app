import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import firebase from '../firebase';

function SingleTown({ propsCity }) {

  const api = {
    base: "https://api.openweathermap.org/data/2.5/",
    key: "26f7c14de162ddf380af26c56863bd3a"
  }

  const [city, setCity] = useState({});

  useEffect(() => {
    fetch(`${api.base}weather?q=${propsCity.name}&units=metric&lang=hr&appid=${api.key}`)
      .then(response => response.json())
      .then(result => {
        result = { ...result, realId: propsCity.id }
        setCity(result)
      })
  }, [api.base, propsCity, api.key])

  const handleRemoveCity = () => {
    const db = firebase.firestore();
    db.collection('cities').doc(city.realId).delete()
  }

  return (
    <>
      {
        city.main ?
          < div className="weatherResults" >
            <div className="locationBox">
              {city.name}, {city.sys.country}
            </div>
            <div className="weatherBox">
              <img src={`https://openweathermap.org/img/wn/${city.weather[0].icon}@4x.png`} alt={city.name} />
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
              <button className="unfollowBtn" onClick={handleRemoveCity}>Otprati</button>
              <Link
                to={'details=' + city.name}
                className="details">Detalji
            </Link>
            </div>
          </div >
          :
          <div className="loader">Loading...</div>
      }
    </>
  )
}

export default SingleTown;