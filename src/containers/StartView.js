import React, { useEffect, useState } from 'react';
import '../App.css';
import MenuComponent from '../components/MenuComponent';
import SearchComponent from '../components/SearchComponent';
import firebase from '../firebase';
import SingleTown from '../components/SingleTown';

function StartView() {

  const [cities, setCities] = useState([]);
  const [selectedCity, setSelectedCity] = useState({});

  useEffect(() => {
    const db = firebase.firestore()
    return db.collection('cities').onSnapshot((snapshot) => {
      const citiesData = []
      snapshot.forEach(doc => citiesData.push(({ ...doc.data(), id: doc.id })))
      setCities(citiesData);
      if (citiesData.length) {
        setSelectedCity({ name: citiesData[0].name, id: citiesData[0].id })
      } else {
        setSelectedCity({});
      }
    })
  }, [])

  const cityToDisplay = (naem, id) => {
    setSelectedCity({ name: naem, id: id })
  }

  return (
    <div className="main-container">
      <div className="mainFuncs">
        <MenuComponent />
        <SearchComponent />
      </div>

      <div className="citySwitch">
        {
          cities.map(city =>
            <div
              onClick={() => cityToDisplay(city.name, city.id)}
              className={`${city.name === selectedCity.name ? "citySwitchTownActive" : "citySwitchTown"}`}
              key={city.id}>
              {city.name}
            </ div>
          )
        }
      </div>
      <>
        {
          selectedCity.name ?
            <SingleTown key={selectedCity.id} propsCity={selectedCity} /> :
            Object.keys(selectedCity).length ?
              <div className="loader">Loading...</div> :
              <p>Ne pratite niti jedan grad!</p>
        }
      </>
    </div>
  )
}

export default StartView;