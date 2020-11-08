import React, { useContext, useEffect, useState } from 'react'
import MenuComponent from '../components/MenuComponent'
import SingleTown from '../components/SingleTown'
import { UserContext } from '../UserContext'

function StartView() {
  const cities = useContext(UserContext)
  const [selectedCity, setSelectedCity] = useState({})

  useEffect(() => {
    let mounted = true;
    if (cities.length && mounted) {
      setSelectedCity({ name: cities[0].name, id: cities[0].id })
    }

    return () => {
      mounted = false;
    }
  }, [cities])

  const cityToDisplay = (naem, id) => {
    setSelectedCity({ name: naem, id: id })
  }

  return (
    <div className="main-container">
      <div className="mainFuncs">
        <MenuComponent />
        <div className="citySwitch">
          {selectedCity ? (
            cities.map((city) => (
              <div
                key={city.id}
                onClick={() => cityToDisplay(city.name, city.id)}
                className={
                  city.name === selectedCity.name
                    ? 'citySwitchTownActive'
                    : 'citySwitchTown'
                }
              >
                {city.name}
              </div>
            ))
          ) : (
            <div className="loader">Loading...</div>
          )}
        </div>
      </div>

      <>
        { (selectedCity.name && cities) ? (
          <SingleTown key={selectedCity.id} propsCity={selectedCity} />
        ) : Object.keys(selectedCity).length ? (
          <div className="loader">Loading...</div>
        ) : (
          <p>Ne pratite niti jedan grad!</p>
        )}
      </>
    </div>
  )
}

export default StartView
