import React, { Component } from "react";
import axios from "axios";

export default class Songs extends Component {
  state = {
    songs: []
  };

  componentDidMount() {
    axios
      .get("/songs")
      .then(res => {
        this.setState({ songs: res.data.data });
        debugger;
      })
      .catch(err => console.log(err));
  }

  render() {
    console.log(this.state);

    const { songs } = this.state;

    // const allSongs = songs.map(song => {
    //   return <p>Title: {song.title}</p>;
    // });

    return (
      <>
        <h1>ALL SONGS</h1>
        {songs
          ? songs.map(song => {
              return <p>Title: {song.title}</p>;
            })
          : null}
      </>
    );
  }
}
