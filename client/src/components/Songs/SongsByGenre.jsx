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
    this.getSongs();
    this.getGenres();
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

  handleChange = e => {
    const { selectedGenre } = this.state;

    selectedGenre
      ? this.setState({ [e.target.name]: e.target.value, didSearch: true })
      : this.setState({
          [e.target.name]: e.target.value
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
        song_id: e.target.name
      })
      .then(this.getSongs())
      .catch(err => console.log(err));

    e.target.reset();
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
            Select Genre:
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
                      <div id="favorites-title">
                        <div id="favorites-spacing">
                          <span id="favorites-count">{song.favorites}</span>{" "}
                          Favorites
                        </div>
                        <button id="favorite-button">Favorite</button>
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
                      <div id="favorites-title">
                        <div id="favorites-spacing">
                          <span id="favorites-count">{song.favorites}</span>{" "}
                          Favorites
                        </div>
                        <button id="favorite-button">Favorite</button>
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
                        />
                        <button type="submit">Add Comment</button>
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
