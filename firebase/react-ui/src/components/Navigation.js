import React, { Component } from "react";
import logo from "../assets/logo.png";
import "../styles/index.css";

class Navigation extends Component {
  render() {
    return (
      <div className="nav">
        <img
          src={logo}
          height={20}
          style={{ float: "left", margin: "0px 20px 0px 20px" }}
        />
      </div>
    );
  }
}

export default Navigation;
