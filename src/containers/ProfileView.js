import React, { useContext } from "react";
import { UserContext } from "../App";
import { useHistory } from "react-router-dom";
import MenuComponent from "../components/MenuComponent";
import { auth } from "../firebase";

function ProfileView() {
  let history = useHistory();
  const { dispatch } = useContext(UserContext);

  const toLogout = () => {
    auth.signOut();
    dispatch({ type: "authorisationLogout" });
    history.push("/search");
  };

  return (
    <div className="main-container">
      <div className="main-funcs">
        <MenuComponent />
      </div>
      <div className="weather-results">
        <button onClick={() => toLogout()} className="btn btn-primary">
          Odjava
        </button>
      </div>
    </div>
  );
}

export default ProfileView;
