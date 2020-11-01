import React, { useEffect, useState } from 'react'
import { useParams, useHistory } from "react-router-dom";
import '../App.css'
import firebase from '../firebase';

function ResultsComponent() {
  const api = {
    base: "https://api.openweathermap.org/data/2.5/",
    key: "26f7c14de162ddf380af26c56863bd3a"
  }

  const [weather, setWeather] = useState({});

  let { id } = useParams();

  useEffect(() => {
    fetch(`${api.base}weather?q=${id.trim()}&units=metric&lang=hr&appid=${api.key}`)
      .then(response => response.json())
      .then(result => {
        setWeather(result)
      })
  }, [id, api.base, api.key])

  const saveCityToFirestore = (e) => {
    e.preventDefault();
    const db = firebase.firestore()
    db.collection('cities').add({ name: id })
    history.push('/');
  }

  let history = useHistory();

  const returnHome = () => {
    history.push('/');
  }

  return (
    <>
      {
        weather.main &&
        <>
          <div className="weatherResults">
            <div className="locationBox">
              {weather.name}, {weather.sys.country}
            </div>
            <div className="weatherBox">
              <img src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@4x.png`} alt="" />
              <div className="weatherBoxInfo">
                <div className="weather">{weather.weather[0].description}</div>
                <div className="temp">{Math.round(weather.main.temp)} °C</div>
                <div className="realFeel">
                  Dojam: {Math.round(weather.main.feels_like)} °C<br></br>
                  Vjetar: {Math.round(weather.wind.speed * 3.6)} km/h<br></br>
                  Maksimalno: {Math.round(weather.main.temp_max)} °C<br></br>
                  Minimalno: {Math.round(weather.main.temp_min)} °C<br></br>
                  Tlak zraka: {Math.round(weather.main.pressure)} hPa<br></br>
                  Vlaga: {Math.round(weather.main.humidity)} %</div>
              </div>
            </div>
            <button className="followCity" onClick={saveCityToFirestore}>Prati grad</button>
          </div>
          <button className="returnBtn" onClick={returnHome}>Natrag</button>
        </>
      }
    </>
  )

}

export default ResultsComponent;