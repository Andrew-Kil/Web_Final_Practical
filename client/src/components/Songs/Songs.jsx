import React, { Component } from "react";
import axios from "axios";

import "./Songs.css";

export default class Songs extends Component {
  state = {
    songs: [],
    didSearch: false,
    search: ""
  };

  componentDidMount() {
    axios
      .get("/songs")
      .then(res => {
        this.setState({ songs: res.data.data });
      })
      .catch(err => console.log(err));
  }

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value, didSearch: true });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.setState({
      didSearch: false,
      search: ""
    });
  };

  render() {
    console.log(this.state);

    const { songs, didSearch, search } = this.state;

    const filteredSongs = songs.filter(song => {
      return song.title.toLowerCase().includes(search.toLowerCase());
    });

    return (
      <div id="container">
        <h1>ALL SONGS</h1>
        <form onSubmit={this.handleSubmit} className="form-songs">
          <label htmlFor="submit-button">Search By Title: </label>
          <input
            type="text"
            name="search"
            onChange={this.handleChange}
            value={search}
          />
          <button type="submit" id="submit-button">
            Reset
          </button>
        </form>
        <br />

        {!didSearch
          ? songs.map(song => {
              return (
                <div key={song.id} id="song-container">
                  <h3 id="song-title">{song.title}</h3>
                  <img
                    src={song.img_url}
                    alt="link to song img"
                    className="img-song"
                  />
                  <p># of Favorites</p>
                  <p>Username: </p>
                  <button>Add to Favorites</button>
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
                  <p># of Favorites</p>
                  <p>Username: </p>
                  <button>Add to Favorites</button>
                  <br />
                  <br />
                </div>
              );
            })}
      </div>
    );
  }
}
