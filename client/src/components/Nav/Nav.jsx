import React from "react";
import { NavLink } from "react-router-dom";

import "./Nav.css";

export default function Nav() {
  return (
    <div>
      <nav id="nav">
        <NavLink to="/">Home</NavLink>
        <NavLink to="/songs">All Songs</NavLink>
        <NavLink to="/popular">By Popularity</NavLink>
        <NavLink to="/genre">By Genre</NavLink>
        <NavLink to="/profile">My Profile</NavLink>
      </nav>
    </div>
  );
}
