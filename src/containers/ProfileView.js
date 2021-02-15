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
    history.push("/");
  };

  return (
    <div className="main-container">
      <div className="mainFuncs">
        <MenuComponent />
      </div>
      <button onClick={() => toLogout()} style={{width:"100px", height:"100px", marginTop:"150px"}}>Odjava</button>
    </div>
  );
}

export default ProfileView;
