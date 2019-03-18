import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./components/Home/Home.jsx";
import Songs from "./components/Songs/Songs.jsx";
import SongsByPop from "./components/Songs/SongsByPop.jsx";
import SongsByGenre from "./components/Songs/SongsByGenre.jsx";
import Profile from "./components/Profile/Profile.jsx";
import UserProfile from "./components/Profile/UserProfile.jsx";
import Nav from "./components/Nav/Nav.jsx";
import "./App.css";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Nav />
        <div className="main-section">
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/songs" component={Songs} />
            <Route exact path="/songs/bypop" component={SongsByPop} />
            <Route exact path="/songs/bygenre" component={SongsByGenre} />
            <Route exact path="/profile" component={Profile} />
            <Route path="/profile/:id" component={UserProfile} />
          </Switch>
        </div>
      </div>
    );
  }
}

export default App;
