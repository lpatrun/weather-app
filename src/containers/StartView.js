import React, { useContext } from "react";
import MenuComponent from "../components/MenuComponent";
import SingleTown from "../components/SingleTown";
import SwitchComponent from "../components/SwitchComponent";
import GoFollowComponent from "../components/GoFollowComponent";
import { UserContext } from "../App";

function StartView() {
  const { state } = useContext(UserContext);

  return (
    <div className="main-container">
      <div className="main-funcs">
        <MenuComponent />
        <SwitchComponent />
      </div>
      <div className="weather-results">
        {state.selectedCity > -1 ? (
          <SingleTown key={state.cities[state.selectedCity]} />
        ) : state.loadingCities ? (
          <div className="loader"></div>
        ) : (
          <GoFollowComponent />
        )}
      </div>
    </div>
  );
}

export default StartView;
