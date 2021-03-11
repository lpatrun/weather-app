import React from "react";
import { NavLink } from "react-router-dom";

export default function GoFollowComponent() {
  return (
    <div className="go-follow">
      <p>
        Trenutno ne pratite niti jedan grad :/
        <br />
        Prvo na tražilicu
      </p>
      <NavLink to="/search" className="btn btn-secondary">
        NA TRAŽILICU
      </NavLink>
    </div>
  );
}
