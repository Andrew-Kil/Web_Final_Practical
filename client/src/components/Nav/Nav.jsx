import React from "react";
import { NavLink } from "react-router-dom";

import "./Nav.css";

export default function Nav() {
  return (
    <div>
      <nav id="nav">
        <span id="nav-title">
          <NavLink to="/" id="nav-link">
            Earworm Report
          </NavLink>
        </span>
        <div id="nav-links">
          <NavLink to="/" id="nav-link">
            Home
          </NavLink>
          <NavLink to="/songs" id="nav-link">
            All Songs
          </NavLink>
          <NavLink to="/songs/bypop" id="nav-link">
            By Popularity
          </NavLink>
          <NavLink to="/songs/bygenre" id="nav-link">
            By Genre
          </NavLink>
          <NavLink to="/profile" id="nav-link">
            My Profile
          </NavLink>
        </div>
      </nav>
    </div>
  );
}
