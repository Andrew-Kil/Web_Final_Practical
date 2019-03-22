import React, { Component } from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";

import "./Profile.css";

export default class UserProfile extends Component {
  state = {
    users: "",
    posted: "selected",
    favorites: "",
    songs: [],
    userFavorites: []
  };

  componentDidMount() {
    axios
      .get("/users/")
      .then(res => {
        this.setState({ users: res.data.data });
      })
      .catch(err => console.log(err));

    axios
      .get(`/favorites/user/${this.props.match.params.id}`)
      .then(res => {
        this.setState({
          userFavorites: res.data.data
        });
      })
      .catch(err => console.log(err));
    this.getSongs();
    this.getUserSongs();
  }

  getSongs = () => {
    axios
      .get("/songs")
      .then(res => {
        this.setState({
          allSongs: res.data.data
        });
      })
      .catch(err => console.log(err));
  };

  getUserSongs = () => {
    axios
      .get(`/songs/user/${this.props.match.params.id}`)
      .then(res => {
        this.setState({ songs: res.data.data });
      })
      .catch(err => console.log(err));
  };

  handleClick = e => {
    if (e.target.value === "favorite") {
      axios
        .post("/favorites", {
          user_id: 1,
          song_id: Number(e.target.name)
        })
        .then(this.getSongs)
        .then(this.getFavoritesForUser)
        .catch(err => console.log(err));
    } else if (e.target.value === "unfavorite") {
      axios
        .delete(`/favorites/${e.target.name}`)
        .then(this.getSongs)
        .then(this.getFavoritesForUser)
        .catch(err => console.log(err));
    }
  };

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleComment = e => {
    const { comment_body } = this.state;

    e.preventDefault();

    axios
      .post("/comments", {
        comment_body: comment_body,
        user_id: 1,
        song_id: e.target.name
      })
      .then(this.getUserSongs)
      .catch(err => console.log(err));

    e.target.reset();
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

  render() {
    const { posted, favorites, songs, userFavorites } = this.state;

    console.log(this.state);

    console.log(this.props);

    return (
      <div id="container">
        <h2 className="ubuntu-font">
          {this.state.users
            ? this.state.users[this.props.match.params.id - 1].username
            : null}
        </h2>
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
            Favorited
          </button>
        </div>

        {posted && songs
          ? songs.map(song => {
              return (
                <div key={song.id} id="master-container">
                  <span id="image-container">
                    <img
                      src={song.img_url}
                      alt="link to song img"
                      className="img-song"
                    />
                  </span>
                  <span id="song-container">
                    <div id="info-box">
                      <h3 id="song-title">{song.title}</h3>
                      <p>
                        Posted By:{" "}
                        <NavLink to={`/profile/${song.user_id}`}>
                          {song.username}
                        </NavLink>
                      </p>
                      <div id="favorites-title">
                        <div id="favorites-spacing">
                          <span id="favorites-count">{song.favorites}</span>{" "}
                          Favorites
                        </div>
                        {this.state.userFavorites.length ? (
                          <button
                            id="favorite-button"
                            name={song.id}
                            value={
                              this.state.userFavorites[0].favorites.find(
                                favorite => favorite.title === song.title
                              )
                                ? "unfavorite"
                                : "favorite"
                            }
                            className={
                              this.state.userFavorites[0].favorites.find(
                                favorite => favorite.title === song.title
                              )
                                ? "unfavorite"
                                : "favorite"
                            }
                            onClick={this.handleClick}
                          >
                            {this.state.userFavorites[0].favorites.find(
                              favorite => favorite.title === song.title
                            )
                              ? "Unfavorite"
                              : "Favorite"}
                          </button>
                        ) : null}
                      </div>
                    </div>

                    <div id="comments-container">
                      {song.comments.map((comment, i) => {
                        return (
                          <div key={i} id="comment-container">
                            <span id="comment-text">
                              "{comment.comment_body}"
                            </span>
                            <NavLink to={`/profile/${comment.user_id}`}>
                              User: {comment.user_id}
                            </NavLink>
                          </div>
                        );
                      })}
                    </div>

                    <div id="add-comment-form">
                      <form onSubmit={this.handleComment} name={song.id}>
                        <input
                          type="text"
                          onChange={this.handleChange}
                          name="comment_body"
                          id="comment-input-field"
                        />
                        <button type="submit" id="add-comment-button">
                          Add Comment
                        </button>
                      </form>
                    </div>

                    <br />
                    <br />
                  </span>
                </div>
              );
            })
          : null}

        {favorites && userFavorites
          ? userFavorites[0].favorites.map(userFavorite => {
              return (
                <div key={userFavorite.id} id="master-container">
                  <span id="image-container">
                    <img
                      src={userFavorite.img_url}
                      alt="link to song img"
                      className="img-song"
                    />
                  </span>
                  <span id="song-container">
                    <div id="info-box">
                      <h3 id="song-title">{userFavorite.title}</h3>
                      <p>
                        Posted By:{" "}
                        <NavLink to={`/profile/${userFavorite.user_id}`}>
                          {userFavorite.username}
                        </NavLink>
                      </p>
                      <div id="favorites-title">
                        <div id="favorites-spacing">
                          <span id="favorites-count">
                            {userFavorite.favorites}
                          </span>{" "}
                          Favorites
                        </div>
                        <button id="favorite-button">Favorite</button>
                      </div>
                    </div>

                    {/* <div id="comments-container">
              {userFavorite.comments.map((comment, i) => {
                        return (
                          <div key={i} id="comment-container">
                            <span id="comment-text">
                              "{comment.comment_body}"
                            </span>
                            <NavLink to={`/profile/${comment.user_id}`}>
                              User: {comment.user_id}
                            </NavLink>
                          </div>
                        );
                      })}
                    </div> */}

                    <div id="add-comment-form">
                      <form onSubmit={this.handleComment}>
                        <input
                          type="text"
                          onChange={this.handleChange}
                          name="comment_body"
                          id="comment-input-field"
                        />
                        <button type="submit">Add Comment</button>
                      </form>
                    </div>

                    <br />
                    <br />
                  </span>
                </div>
              );
            })
          : null}
      </div>
    );
  }
}
