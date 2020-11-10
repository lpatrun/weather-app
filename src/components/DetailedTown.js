import React, { useEffect, useState } from 'react'
import '../App.css'
import { useHistory } from 'react-router-dom'

function DetailedTown({ propsCity }) {
  const [city, setCity] = useState({})

  const api = {
    base: 'https://api.openweathermap.org/data/2.5/forecast?',
    search: '&lang=hr&units=metric',
    key: '26f7c14de162ddf380af26c56863bd3a',
  }

  useEffect(() => {
    fetch(`${api.base}q=${propsCity.name}&appid=${api.key}${api.search}`)
      .then((response) => response.json())
      .then((result) => {
        setCity(result)
      })
  }, [api.base, api.key, api.search, propsCity])

  let history = useHistory()

  const returnHome = () => {
    history.push('/')
  }

  let weatherReport = null

  if (city.list) {
    weatherReport = city.list.map((hour) => {
      const date = new Date(hour.dt * 1000)
      return (
        <div className="detailsBox" key={hour.dt}>
          <img
            src={`http://openweathermap.org/img/wn/${hour.weather[0].icon}@2x.png`}
            alt={propsCity.name}
            title={hour.weather[0].description}
          />
          <div className="detailsBoxInfo">
            <div className="detailsWeather">{hour.weather[0].description}</div>
            <div className="detailsTemp">{Math.round(hour.main.temp)} °C</div>
            <div className="detailsRealFeel">
              Dojam: {Math.round(hour.main.feels_like)} °C<br></br>
              Vjetar: {Math.round(hour.wind.speed * 3.6)} km/h<br></br>
              {date.getHours()}:00, {date.getDate()}.{date.getMonth() + 1}.
              {date.getFullYear()}.
            </div>
          </div>
        </div>
      )
    })
  }

  return (
    <div className="weatherResults">
      {weatherReport ? (
        <>
          {/* <div className="locationBox">{city.city.name}</div> */}
          {weatherReport}
          <div className="options">
            <button className="returnBtn" onClick={returnHome}>
              Natrag
            </button>
          </div>
        </>
      ) : (
        <div className="loader">Loading...</div>
      )}
    </div>
  )
}

export default DetailedTown
