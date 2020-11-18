import React, { useContext } from 'react'
import DetailedTown from '../components/DetailedTown'
import MenuComponent from '../components/MenuComponent'
import { UserContext } from '../UserContext'

function DetailedView() {
  const {store, setStore} = useContext(UserContext)
  
  const setSelCity = (name, id) => {
    setStore({
      ...store,
      selectedCity: { name: name, id: id }
    })
  }

  return (
    <div className="main-container">
      <div className="mainFuncs">
        <MenuComponent />
        <div className="citySwitch">
          {store ? (
            store.cities.map((city) => (
              <div
                key={city.id}
                onClick={() => setSelCity(city.name, city.id)}
                className={
                  city.name === store.selectedCity.name
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
        { store ? (
          <DetailedTown key={store.selectedCity.id} propsCity={store.selectedCity} />
        ) : Object.keys(store.selectedCity).length ? (
          <div className="loader">Loading...</div>
        ) : (
          <p>Ne pratite niti jedan grad!</p>
        )}
      </>
    </div>
  )
}

export default DetailedView
