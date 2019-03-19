import React, { Component } from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";

import "./Songs.css";

export default class SongsByGenre extends Component {
  state = {
    songs: [],
    genres: [],
    didSelect: false,
    selectedGenre: ""
  };

  componentDidMount() {
    axios
      .get("/songs")
      .then(res => {
        this.setState({ songs: res.data.data });
      })
      .catch(err => console.log(err));

    axios
      .get("/genres")
      .then(res => {
        this.setState({
          genres: res.data.data
        });
      })
      .catch(err => console.log(err));
  }

  handleChange = e => {
    this.setState({
      didSelect: true,
      selectedGenre: e.target.value
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.setState({ didSelect: false });
  };

  handleComment = e => {
    const { comment_body } = this.state;

    e.preventDefault();

    axios
      .post("/comments", {
        comment_body: comment_body,
        user_id: 1,
        song_id: 1
      })
      .catch(err => console.log(err));

    console.log("HURRAY!");
  };

  render() {
    console.log(this.state);

    const { genres, didSelect, songs, selectedGenre } = this.state;

    const filteredSongs = songs.filter(song => {
      return song.genre_name === selectedGenre;
    });

    return (
      <div id="container">
        <h1 className="ubuntu-font">BY GENRE</h1>
        <form onSubmit={this.handleSubmit} className="form-songs">
          <label htmlFor="submit-button" className="ubuntu-font">
            Search By Title:{" "}
          </label>
          <select onChange={this.handleChange}>
            <option value="0" />
            {genres.map(genre => {
              return (
                <option key={genre.id} value={genre.genre_name}>
                  {genre.genre_name}
                </option>
              );
            })}
          </select>
          <button type="submit" id="submit-button">
            Reset
          </button>
        </form>
        <br />

        {!didSelect
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
                      <p id="favorites-title">
                        <div id="favorites-spacing">
                          <span id="favorites-count">{song.favorites}</span>{" "}
                          Favorites
                        </div>
                        <button id="favorite-button">Favorite</button>
                      </p>
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
                      <form onSubmit={this.handleComment}>
                        <input
                          type="text"
                          onChange={this.handleChange}
                          name="comment_body"
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

                      <p>
                        Posted By:{" "}
                        <NavLink to={`/profile/${song.user_id}`}>
                          {song.username}
                        </NavLink>
                      </p>
                      <p id="favorites-title">
                        <div id="favorites-spacing">
                          <span id="favorites-count">{song.favorites}</span>{" "}
                          Favorites
                        </div>
                        <button id="favorite-button">Favorite</button>
                      </p>
                    </div>

                    {song.comments.map((comment, i) => {
                      return (
                        <div key={i} id="comment-container">
                          {comment.comment_body}
                          <br />
                          <NavLink to={`/profile/${comment.user_id}`}>
                            User: {comment.user_id}
                          </NavLink>
                        </div>
                      );
                    })}
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
