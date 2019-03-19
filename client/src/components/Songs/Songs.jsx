import React, { Component } from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";

import "./Songs.css";

export default class Songs extends Component {
  state = {
    songs: [],
    users: [],
    didSearch: false,
    search: ""
  };

  componentDidMount() {
    this.getSongs();
    this.getUsers();
  }

  matchUser = ID => {
    this.state.users.forEach(user => {
      console.log(typeof user.id);
      console.log(typeof ID);
      if (ID === user.id) {
        console.log(typeof user.username);
        return <p>user.username</p>;
      }
    });
  };

  getSongs = () => {
    axios
      .get("/songs")
      .then(res => {
        this.setState({ songs: res.data.data });
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

  handleChange = e => {
    const { search } = this.state;

    search
      ? this.setState({ [e.target.name]: e.target.value, didSearch: true })
      : this.setState({
          [e.target.name]: e.target.value
        });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.setState({
      didSearch: false,
      search: ""
    });
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

    this.getSongs();

    e.target.reset();

    console.log("HURRAY!");
  };

  render() {
    console.log(this.state);

    const { songs, didSearch, search } = this.state;

    const filteredSongs = songs.filter(song => {
      return song.title.toLowerCase().includes(search.toLowerCase());
    });

    return (
      <div id="container">
        <h1 className="ubuntu-font">ALL SONGS</h1>
        <form onSubmit={this.handleSubmit} className="form-songs">
          <label htmlFor="submit-button" className="ubuntu-font">
            Search By Title:{" "}
          </label>
          <input
            type="text"
            name="search"
            onChange={this.handleChange}
            value={search}
          />
          <button type="submit" id="submit-button" className="ubuntu-font">
            Reset
          </button>
        </form>
        <br />

        {!didSearch
          ? songs.map(song => {
              return (
                <div key={song.id} id="master-container">
                  <div id="song-container">
                    <img
                      src={song.img_url}
                      alt="link to song img"
                      className="img-song"
                    />
                    <span id="info-box">
                      <h3 id="song-title">{song.title}</h3>
                      <p>
                        Favorited: {""}
                        <span id="favorites-count">{song.favorites}</span>
                        {""} times
                      </p>
                    </span>
                    <p>
                      Posted By:{" "}
                      <NavLink to={`/profile/${song.user_id}`}>
                        {song.username}
                      </NavLink>
                    </p>
                    <button>Add to Favorites</button>

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
                  <div id="comments-container">
                    <p>Comments:</p>
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
                  </div>
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
                        <NavLink to={`/profile/${comment.user_id}`}>
                          User: {comment.user_id}
                        </NavLink>
                      </div>
                    );
                  })}
                  <br />
                  <br />
                </div>
              );
            })}
      </div>
    );
  }
}
