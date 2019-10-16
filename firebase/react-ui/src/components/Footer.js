import React, { Component } from "react";
import logo from "../assets/cherries.png";

class Footer extends Component {
  render() {
    return (
      <div className="footer">
        <img src={logo} height={30} style={{ margin: "0px 20px 0px 20px" }} />
        <h5
          style={{
            display: "inline-block",
            color: "#939cb6",
            fontFamily: "Verdana, Geneva, sans-serif"
          }}
        >
          DATE NIGHT
        </h5>
      </div>
    );
  }
}

export default Footer;
