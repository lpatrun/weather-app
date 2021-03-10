import React, { useContext } from "react";
import MenuComponent from "../components/MenuComponent";
import SingleTown from "../components/SingleTown";
import SwitchComponent from "../components/SwitchComponent";
import { UserContext } from "../App";
import { NavLink } from "react-router-dom";
import "./StartView.scss";

function StartView() {
  const { state } = useContext(UserContext);

  return (
    <div className="main-container">
      <div className="main-funcs">
        <MenuComponent />
        <SwitchComponent />
      </div>
      <>
        {state.selectedCity > -1 
        ? (<SingleTown key={state.cities[state.selectedCity]} />)
        : state.loadingCities  
        ? (<div className="loader"></div>) 
        : (<div style={{ display: "flex", flexDirection: "column", alignItems: "center", paddingTop: "100px"}}>
            <p style={{ color: "white", textAlign: "center" }}>
              Trenutno ne pratite niti jedan grad :/
            </p>
            <p style={{ color: "white", textAlign: "center" }}>
              Prvo na tražilicu
            </p>
            <NavLink to="/search">
              <button style={{ margin: "10px auto" }}>NA TRAŽILICU</button>
            </NavLink>
          </div>
        )}
      </>
    </div>
  );
}

export default StartView;
