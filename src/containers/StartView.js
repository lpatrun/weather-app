import React, { useContext, useEffect } from "react";
import MenuComponent from "../components/MenuComponent";
import SingleTown from "../components/SingleTown";
import SwitchComponent from "../components/SwitchComponent";
import { UserContext } from "../App";
import { useHistory } from "react-router-dom";
import "./StartView.css";

function StartView() {
  const { state } = useContext(UserContext);
  let history = useHistory();

  useEffect(() => {
    !state.userData && history.push("/search");
    // eslint-disable-next-line
  }, []);

  return (
    <div className="main-container">
      <div className="mainFuncs">
        <MenuComponent />
        <SwitchComponent />
      </div>

      <>
        {state.selectedCity ? (
          <SingleTown
            key={state.selectedCity.id}
            propsCity={state.selectedCity}
          />
        ) : Object.keys(state.selectedCity).length ? (
          <div className="loader">Loading...</div>
        ) : (
          <p style={{ color: "white", margin: "0 auto" }}>
            Ne pratite niti jedan grad!
          </p>
        )}
      </>
    </div>
  );
}

export default StartView;
