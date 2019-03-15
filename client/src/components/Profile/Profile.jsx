import React, { Component } from "react";
import axios from "axios";

export default class Profile extends Component {
  state = {
    users: ""
  };
  componentDidMount() {
    axios
      .get("/users")
      .then(res => {
        this.setState({ users: res.data.data });
      })
      .catch(err => console.log(err));
  }
  render() {
    return (
      <>
        <h2>{this.state.users ? this.state.users[0].username : null}</h2>
      </>
    );
  }
}
