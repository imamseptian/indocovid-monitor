import React from "react";
import { NavLink } from "react-router-dom";

const Hospital = () => {
  return (
    <div>
      <h1>HOSPITAL</h1>
      <NavLink to="/">
        <h2>HOME</h2>
      </NavLink>
    </div>
  );
};

export default Hospital;
