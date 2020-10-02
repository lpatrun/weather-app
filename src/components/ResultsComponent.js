import React, { useEffect, useState } from 'react'
import { useParams } from "react-router-dom";
import classes from './ResultsComponent.module.css'

function ResultsComponent() {
  const api = {
    base: "http://api.openweathermap.org/data/2.5/",
    key: "26f7c14de162ddf380af26c56863bd3a"
  }

  const [weather, setWeather] = useState({});

  let { id } = useParams();

  useEffect(() => {
    fetch(`${api.base}weather?q=${id}&units=metric&lang=hr&appid=${api.key}`)
      .then(response => response.json())
      .then(result => {
        setWeather(result)
      })
  }, [id, api.base, api.key])

  return (
    <div>{
      (typeof weather.main != "undefined") ?
        <React.Fragment>
          <div className={classes.locationBox}>
            {weather.name}, {weather.sys.country}
          </div>
          <div className={classes.weatherBox}>
            <img src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt="" />
            <div className={classes.weatherBoxInfo}>
              <div className={classes.temp}>{Math.round(weather.main.temp)} °C</div>
              <div className={classes.realFeel}>Real feel: {weather.main.feels_like} °C</div>
              <div className={classes.weather}>{weather.weather[0].description}</div>
            </div>
          </div>
        </React.Fragment>
        : ''
    }</div>
  )

}

export default ResultsComponent;