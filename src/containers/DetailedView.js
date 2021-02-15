import React, { useContext } from "react";
import DetailedTown from "../components/DetailedTown";
import MenuComponent from "../components/MenuComponent";
import SwitchComponent from "../components/SwitchComponent";

import { UserContext } from "../App";

function DetailedView() {
  const { state } = useContext(UserContext);

  return (
    <div className="main-container">
      <div className="mainFuncs">
        <MenuComponent />
        <SwitchComponent />
      </div>

      <>
        {state ? (
          <DetailedTown
            key={state.selectedCity.id}
            propsCity={state.selectedCity}
          />
        ) : Object.keys(state.selectedCity).length ? (
          <div className="loader">Loading...</div>
        ) : (
          <p>Ne pratite niti jedan grad!</p>
        )}
      </>
    </div>
  );
}

export default DetailedView;