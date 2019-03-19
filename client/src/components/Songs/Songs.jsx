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
    //So there's a couple of issues here. We're hard-coding the song here, so even when I post a comment on a different song it's being added to the first one. Also, we are firing our AJAX request here and our request in getSongs at the same time, which doesn't ensure that our song's comment section will update - maybe put getSongs in a .then clause? Finally, our comments are rendering with user IDs rather than usernames. They should render with usernames.
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


  // We can (and probably should!) modularize this whole folder a little bit more. You can farm out some of the form functionalities, for example, to separate components. It'd be *way* easier to re-enter and refactor this way!
  // Also, I'm currently not able to favorite stuff. I assume that feature is on its way?
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
                          <span id="comment-text">
                            "{comment.comment_body}"
                          </span>
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
