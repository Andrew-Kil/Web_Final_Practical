import React, { Component } from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";

import "./Profile.css";

export default class Profile extends Component {
  state = {
    posted: "selected",
    favorites: "",
    title: "",
    img_url: "",
    selectedGenre: "",
    allSongs: [],
    songs: [],
    genres: [],
    userFavorites: [],
    message: ""
  };

  componentDidMount() {
    this.getSongs();
    this.getUsers();
    this.getSongsForUser();
    this.getFavoritesForUser();
    this.getAllGenres();
  }

  getSongs = () => {
    axios
      .get("/songs")
      .then(res => {
        this.setState({ allSongs: res.data.data });
      })
      .catch(err => console.log(err));
  };

  getUsers = () => {
    axios
      .get("/users")
      .then(res => {
        this.setState({ users: res.data.data });
      })
      .catch(err => console.log(err));
  };

  getSongsForUser = () => {
    axios
      .get("/songs/user")
      .then(res => {
        this.setState({ songs: res.data.data });
      })
      .catch(err => console.log(err));
  };

  getFavoritesForUser = () => {
    axios
      .get("/favorites/user")
      .then(res => {
        this.setState({
          userFavorites: res.data.data
        });
      })
      .catch(err => console.log(err));
  };

  getAllGenres = () => {
    axios
      .get("/genres")
      .then(res => {
        this.setState({ genres: res.data.data });
      })
      .catch(err => console.log(err));
  };

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
    const { title, img_url, selectedGenre } = this.state;

    e.preventDefault();

    axios
      .post("/songs", {
        title: title,
        img_url: img_url,
        user_id: 1,
        genre_id: selectedGenre
      })
      .then(this.setState({ message: " Posted!" }))
      .then(this.getSongs)
      .catch(err => console.log(err));
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
      .then(this.getSongsForUser())
      .catch(err => console.log(err));

    e.target.reset();
  };

  render() {
    const { posted, favorites, songs, userFavorites } = this.state;

    console.log(this.state);

    return (
      <div id="container">
        <h2 className="ubuntu-font">
          {this.state.users ? this.state.users[0].username : null}
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

        {posted ? (
          <div id="post-song">
            <form onSubmit={this.postSong} id="post-song-form">
              <h3>Add New Song</h3>
              <span className="ubuntu-font" id="message">
                {this.state.message ? this.state.message : " "}
              </span>
              <label>
                <input
                  placeholder="Title"
                  onChange={this.handleChange}
                  name="title"
                />
              </label>
              <br />
              <label>
                <input
                  placeholder="Image URL"
                  onChange={this.handleChange}
                  name="img_url"
                />
              </label>
              <br />
              <label>
                <select onChange={this.handleChange} name="selectedGenre">
                  <option>Pick Genre</option>
                  {this.state.genres.map(genre => {
                    return (
                      <option key={genre.id} value={genre.id}>
                        {genre.genre_name}
                      </option>
                    );
                  })}
                </select>
              </label>
              <br />
              <button type="submit">Submit</button>
            </form>
          </div>
        ) : null}

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
                        <button id="favorite-button">Favorite</button>
                      </div>
                    </div>

                    {song.comments ? (
                      <div id="comments-container">
                        {song.comments.map((comment, i) => {
                          return (
                            <div key={i} id="comment-container">
                              {comment ? (
                                <>
                                  <span id="comment-text">
                                    "{comment.comment_body}"
                                  </span>

                                  <NavLink to={`/profile/${comment.user_id}`}>
                                    User:{" "}
                                    {comment.user_id ? comment.user_id : null}
                                  </NavLink>
                                </>
                              ) : (
                                <>
                                  <span id="comment-text">
                                    Add the first comment below!
                                  </span>
                                </>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    ) : null}

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
                      <form
                        onSubmit={this.handleComment}
                        name={userFavorite.id}
                      >
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
