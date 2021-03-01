import React, { useContext } from "react";
import DetailedTown from "../components/DetailedTown";
import MenuComponent from "../components/MenuComponent";
import SwitchComponent from "../components/SwitchComponent";
import { UserContext } from "../App";
import { NavLink } from "react-router-dom";

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
          <div className="loader">Loading...</div>
        ) : (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              paddingTop: "100px",
            }}
          >
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

export default DetailedView;
