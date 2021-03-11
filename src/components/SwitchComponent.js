import React, { useContext } from "react";
import { UserContext } from "../App";

function SwitchComponent() {
  const { state, dispatch } = useContext(UserContext);

  const setSelCity = (index) => {
    dispatch({ type: "setSelectedCity", payload: { index } });
  };

  return (
    <div className="city-switch">
      {state.cities ? (
        state.cities.map((city, index) => (
          <div
            key={city.id}
            onClick={() => setSelCity(index)}
            className={
              index === state.selectedCity
                ? "city-switch-town-active"
                : "city-switch-town"
            }
          >
            {city.name}
          </div>
        ))
      ) : (
        <div className="loader"></div>
      )}
    </div>
  );
}

export default SwitchComponent;
