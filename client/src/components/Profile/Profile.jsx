import React, { Component } from "react";
import axios from "axios";

import "./Profile.css";

export default class Profile extends Component {
  state = {
    users: "",
    selectedButton: "posted",
    postedClassName: "",
    favoritesClassName: ""
  };

  componentDidMount() {
    axios
      .get("/users")
      .then(res => {
        this.setState({ users: res.data.data });
      })
      .catch(err => console.log(err));
  }

  selectedButton = e => {
    const { selectedButton } = this.state;
    console.log(e.target.name);
    // selectedButton === "posted"
    //   ? this.setState({ postedClassName: "selected" })
    //   : this.setState({
    //       favoritesClassName: "selected",
    //       selectedButton: "favorites"
    //     });

    if (e.target.name === "posted-button") {
      this.setState({
        postedClassName: "selected",
        favoritesClassName: ""
      });
    } else {
      this.setState({
        favoritesClassName: "selected",
        postedClassName: ""
      });
    }
  };

  render() {
    const { postedClassName, favoritesClassName } = this.state;

    console.log(this.state);

    return (
      <>
        <h2>{this.state.users ? this.state.users[0].username : null}</h2>
        <div id="profile-buttons">
          <button
            id="posted-button"
            className={postedClassName}
            onClick={this.selectedButton}
            name="posted-button"
          >
            Posted
          </button>
          <button
            id="favorites-button"
            className={favoritesClassName}
            onClick={this.selectedButton}
            name="favorites-button"
          >
            Favorites
          </button>
        </div>
      </>
    );
  }
}
