import React, { Component } from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";

import "./Songs.css";

export default class SongsByGenre extends Component {
  state = {
    songs: [],
    genres: [],
    favorites: [],
    didSubmit: false,
    selectedGenre: ""
  };

  componentDidMount() {
    this.getSongs();
    this.getGenres();
    this.getFavorites();
  }

  getSongs = () => {
    axios
      .get("/songs")
      .then(res => {
        this.setState({ songs: res.data.data });
      })
      .catch(err => console.log(err));
  };

  getGenres = () => {
    axios
      .get("/genres")
      .then(res => {
        this.setState({
          genres: res.data.data
        });
      })
      .catch(err => console.log(err));
  };

  getFavorites = () => {
    axios.get("/favorites/user").then(res => {
      this.setState({
        favorites: res.data.data[0].favorites
      });
    });
  };

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value,
      didSubmit: false
    });
  };

  handleSubmit = e => {
    e.preventDefault();

    this.setState({ didSubmit: true });
  };

  handleClick = e => {
    if (e.target.value === "favorite") {
      axios
        .post("/favorites", {
          user_id: 1,
          song_id: Number(e.target.name)
        })
        .then(this.getSongs)
        .then(this.getFavorites)
        .catch(err => console.log(err));
    } else if (e.target.value === "unfavorite") {
      axios
        .delete(`/favorites/${e.target.name}`)
        .then(this.getSongs)
        .then(this.getFavorites)
        .catch(err => console.log(err));
    }
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
      .then(this.getSongs)
      .catch(err => console.log(err));

    e.target.reset();
  };

  render() {
    const { genres, didSubmit, songs, selectedGenre } = this.state;

    const filteredSongs = songs.filter(song => {
      return song.genre_name === selectedGenre;
    });

    return (
      <div id="container">
        <h1 className="ubuntu-font">BY GENRE</h1>
        <form onSubmit={this.handleSubmit} className="form-songs">
          <label htmlFor="submit-button" className="ubuntu-font">
            Select Genre:
          </label>
          <select onChange={this.handleChange} name="selectedGenre">
            <option value="0" />
            {genres.map(genre => {
              return (
                <option key={genre.id} name="selectedGenre">
                  {genre.genre_name}
                </option>
              );
            })}
          </select>
          <button type="submit" id="submit-button" className="ubuntu-font">
            Submit
          </button>
        </form>
        <br />

        {!didSubmit
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
                      <p id="posted-by-text">
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
                        <button
                          id="favorite-button"
                          name={song.id}
                          value={
                            this.state.favorites.find(
                              favorite => favorite.title === song.title
                            )
                              ? "unfavorite"
                              : "favorite"
                          }
                          className={
                            this.state.favorites.find(
                              favorite => favorite.title === song.title
                            )
                              ? "unfavorite"
                              : "favorite"
                          }
                          onClick={this.handleClick}
                        >
                          {this.state.favorites.find(
                            favorite => favorite.title === song.title
                          )
                            ? "Unfavorite"
                            : "Favorite"}
                        </button>
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
          : filteredSongs.map(song => {
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

                      <p id="posted-by-text">
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
                        <button
                          id="favorite-button"
                          name={song.id}
                          value={
                            this.state.favorites.find(
                              favorite => favorite.title === song.title
                            )
                              ? "unfavorite"
                              : "favorite"
                          }
                          className={
                            this.state.favorites.find(
                              favorite => favorite.title === song.title
                            )
                              ? "unfavorite"
                              : "favorite"
                          }
                          onClick={this.handleClick}
                        >
                          {this.state.favorites.find(
                            favorite => favorite.title === song.title
                          )
                            ? "Unfavorite"
                            : "Favorite"}
                        </button>
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
            })}
      </div>
    );
  }
}
