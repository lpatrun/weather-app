import React, { useContext } from "react";

import { UserContext } from "../App";

function SwitchComponent() {
  const { state, dispatch } = useContext(UserContext);

  const setSelCity = (name, id) => {
    dispatch({ type: "setSelectedCity", payload: { name, id } });
  };

  return (
    <div className="citySwitch">
      {state.cities ? (
        state.cities.map((city) => (
          <div
            key={city.id}
            onClick={() => setSelCity(city.name, city.id)}
            className={
              city.name === state.selectedCity.name
                ? "citySwitchTownActive"
                : "citySwitchTown"
            }
          >
            {city.name}
          </div>
        ))
      ) : (
        <div className="loader">Loading...</div>
      )}
    </div>
  );
}

export default SwitchComponent;
