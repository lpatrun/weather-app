import React, { useContext } from "react";
import DetailedTown from "../components/DetailedTown";
import MenuComponent from "../components/MenuComponent";
import SwitchComponent from "../components/SwitchComponent";
import GoFollowComponent from "../components/GoFollowComponent";
import { UserContext } from "../App";

function DetailedView() {
  const { state } = useContext(UserContext);

  return (
    <div className="main-container">
      <div className="main-funcs">
        <MenuComponent />
        <SwitchComponent />
      </div>

      <>
        {state.cities.length ? (
          <DetailedTown key={state.cities[state.selectedCity]} />
        ) : state.selectedCity > -1 ? (
          <div className="loader"></div>
        ) : (
          <GoFollowComponent />
        )}
      </>
    </div>
  );
}

export default DetailedView;
