import React from "react";
import { NavLink } from "react-router-dom";

import "./Nav.css";

export default function Nav() {
  return (
    <div>
      <nav id="nav">
        <span id="nav-title">
          <NavLink to="/">Earworm Report</NavLink>
        </span>
        <div id="nav-links">
          <NavLink to="/">Home</NavLink>
          <NavLink to="/songs">All Songs</NavLink>
          <NavLink to="/songs/bypop">By Popularity</NavLink>
          <NavLink to="/songs/bygenre">By Genre</NavLink>
          <NavLink to="/profile">My Profile</NavLink>
        </div>
      </nav>
    </div>
  );
}
