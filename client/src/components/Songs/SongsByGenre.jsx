import React, { Component } from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";

import "./Songs.css";

export default class SongsByGenre extends Component {
  state = {
    songs: [],
    genres: []
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
    // const { search } = this.state;
    // search
    //   ? this.setState({ [e.target.name]: e.target.value, didSearch: true })
    //   : this.setState({
    //       [e.target.name]: e.target.value
    //     });
  };

  handleSubmit = e => {
    e.preventDefault();
    // this.setState({
    //   didSearch: false,
    //   search: ""
    // });
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

    // const { songs, didSearch, search } = this.state;

    // const filteredSongs = songs.filter(song => {
    //   return song.title.toLowerCase().includes(search.toLowerCase());
    // });

    const { genres } = this.state;

    return (
      <div id="container">
        <h1>BY GENRE</h1>
        <form onSubmit={this.handleSubmit} className="form-songs">
          <label htmlFor="submit-button">Search By Title: </label>
          <select>
            <option value="0" />
            {genres.map(genre => {
              return <option>{genre.genre_name}</option>;
            })}
          </select>
          <button type="submit" id="submit-button">
            Reset
          </button>
        </form>
        <br />

        {/* {!didSearch
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
          : filteredSongs.map(song => {
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
                  <br />
                  <br />
                </div>
              );
            })} */}
      </div>
    );
  }
}
