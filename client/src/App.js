import React, { Component } from "react";
import { Route, Switch, NavLink } from "react-router-dom";
import Home from "./components/Home/Home.jsx";
import "./App.css";

class App extends Component {
  render() {
    return (
      <div className="App">
        <nav>
          <NavLink to="/">Home</NavLink>
          <NavLink to="/songs">All Songs</NavLink>
          <NavLink to="/popular">By Popularity</NavLink>
          <NavLink to="/genre">By Genre</NavLink>
          <NavLink to="/profile">My Profile</NavLink>
        </nav>
        Hi
        <Switch>
          <Route exact path="/" component={Home} />
        </Switch>
      </div>
    );
  }
}

export default App;
