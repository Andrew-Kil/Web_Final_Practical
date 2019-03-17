import React, { Component } from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";

import "./Profile.css";

export default class Profile extends Component {
  state = {
    users: "",
    posted: "selected",
    favorites: "",
    title: "",
    img_url: "",
    user_id: "",
    genre_id: "",
    songs: [],
    userFavorites: []
  };

  componentDidMount() {
    axios
      .get("/users")
      .then(res => {
        this.setState({ users: res.data.data });
      })
      .catch(err => console.log(err));

    axios
      .get("/songs/user")
      .then(res => {
        this.setState({ songs: res.data.data });
      })
      .catch(err => console.log(err));

    axios
      .get("/favorites/user")
      .then(res => {
        this.setState({ userFavorites: res.data.data });
      })
      .catch(err => console.log(err));
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  selectedButton = e => {
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
    const { title, img_url, user_id, genre_id } = this.state;

    e.preventDefault();

    axios
      .post("/songs", {
        title: title,
        img_url: img_url,
        user_id: user_id,
        genre_id: genre_id
      })
      .catch(err => console.log(err));
  };

  render() {
    const { posted, favorites, songs, userFavorites } = this.state;

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

        {posted && songs
          ? songs.map(song => {
              return (
                <div key={song.id} id="song-container">
                  <h3 id="song-title">{song.title}</h3>
                  <img
                    src={song.img_url}
                    alt="link to song img"
                    className="img-song"
                  />
                  <p>
                    Favorited: {""}
                    <span id="favorites-count">{song.favorites}</span>
                    {""} times
                  </p>
                  <p>
                    Posted By:{" "}
                    <NavLink to={`/users/${song.user_id}`}>
                      {song.username}
                    </NavLink>
                  </p>
                  <button>Add to Favorites</button>
                  <p>Comments:</p>
                  {song.comments.map((comment, i) => {
                    return (
                      <div key={i} id="comment-container">
                        {comment.comment_body}
                        <br />
                        User: {comment.user_id}
                      </div>
                    );
                  })}
                  <form onSubmit={this.handleComment}>
                    <input
                      type="text"
                      onChange={this.handleChange}
                      name="comment_body"
                    />
                    <button type="submit">Add Comment</button>
                  </form>

                  <br />
                  <br />
                </div>
              );
            })
          : null}

        {favorites && userFavorites
          ? userFavorites[0].favorites.map(userFavorite => {
              return (
                <div key={userFavorite.id} id="song-container">
                  <h3 id="song-title">{userFavorite.title}</h3>
                  <img
                    src={userFavorite.img_url}
                    alt="link to song img"
                    className="img-song"
                  />
                  <p>
                    Favorited: {""}
                    <span id="favorites-count">{userFavorite.favorites}</span>
                    {""} times
                  </p>
                  <p>
                    Posted By:{" "}
                    <NavLink to={`/users/${userFavorite.user_id}`}>
                      {userFavorite.username}
                    </NavLink>
                  </p>
                  <button>Add to Favorites</button>
                  <p>Comments:</p>
                  {/* {userFavorite.comments.map((comment, i) => {
                    return (
                      <div key={i} id="comment-container">
                        {comment.comment_body}
                        <br />
                        User: {comment.user_id}
                      </div>
                    );
                  })} */}
                  <form onSubmit={this.handleComment}>
                    <input
                      type="text"
                      onChange={this.handleChange}
                      name="comment_body"
                    />
                    <button type="submit">Add Comment</button>
                  </form>

                  <br />
                  <br />
                </div>
              );
            })
          : null}
      </>
    );
  }
}
