import React from "react";
import "../styles/index.css";
import logo from "../assets/logo.png";
import { BeatLoader } from "react-spinners";

class SplashScreen extends React.Component {
  render() {
    return (
      <div className={"splash"}>
        <img src={logo} width={200} style={{ marginBottom: 20 }} />
        <BeatLoader color={"#fff"} />
      </div>
    );
  }
}

export default SplashScreen;
