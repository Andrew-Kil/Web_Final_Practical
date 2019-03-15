import React, { Component } from "react";
import { Route, Switch, NavLink } from "react-router-dom";
import Home from "./components/Home/Home.jsx";
import Nav from "./components/Nav/Nav.jsx";
import "./App.css";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Nav />
        <Switch>
          <Route exact path="/" component={Home} />
        </Switch>
      </div>
    );
  }
}

export default App;
