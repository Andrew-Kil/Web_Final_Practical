import React, { Component } from "react";
import axios from "axios";

import "./Profile.css";

export default class Profile extends Component {
  state = {
    users: "",
    posted: "selected",
    favorites: "",
    title: "",
    img_url: "",
    user_id: "",
    genre_id: ""
  };

  componentDidMount() {
    axios
      .get("/users")
      .then(res => {
        this.setState({ users: res.data.data });
      })
      .catch(err => console.log(err));
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  selectedButton = e => {
    console.log(e.target.name);

    e.target.name === "posted-button"
      ? this.setState({
          posted: "selected",
          favorites: ""
        })
      : this.setState({
          favorites: "selected",
          posted: ""
        });
  };

  postSong = e => {
    e.preventDefault();

    const { title, img_url, user_id, genre_id } = this.state;

    axios
      .post("/songs", {
        title: title,
        img_url: img_url,
        user_id: user_id,
        genre_id: genre_id
      })
      .catch(err => console.log(err));

    console.log("SUCCESS!");
  };

  render() {
    const { posted, favorites } = this.state;

    console.log(this.state);

    return (
      <>
        <h2>{this.state.users ? this.state.users[0].username : null}</h2>
        <div id="profile-buttons">
          <button
            id="posted-button"
            className={posted}
            onClick={this.selectedButton}
            name="posted-button"
          >
            Posted
          </button>
          <button
            id="favorites-button"
            className={favorites}
            onClick={this.selectedButton}
            name="favorites-button"
          >
            Favorites
          </button>
        </div>

        {posted ? (
          <form onSubmit={this.postSong}>
            <label>
              {" "}
              Title
              <input type="text" name="title" onChange={this.handleChange} />
            </label>
            <label>
              {" "}
              Image URL
              <input type="text" name="img_url" onChange={this.handleChange} />
            </label>
            <label>
              {" "}
              User ID:
              <input type="text" name="user_id" onChange={this.handleChange} />
            </label>
            <label>
              {" "}
              Genre ID:
              <input type="text" name="genre_id" onChange={this.handleChange} />
            </label>
            <button type="submit">Submit</button>
          </form>
        ) : null}
      </>
    );
  }
}
