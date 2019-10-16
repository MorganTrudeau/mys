import React from "react";
import "@firebase/storage";
import firebase from "../database";
import { BeatLoader } from "react-spinners";

const storageRef = firebase.storage().ref();

export default class FirebaseImage extends React.Component {
  constructor(props) {
    super(props);
    this.state = { url: null };
    this.loadImage = this.loadImage.bind(this);
  }

  componentDidMount() {
    this.loadImage();
  }

  loadImage = async () => {
    try {
      const url = await storageRef.child(this.props.path).getDownloadURL();
      this.setState({ url });
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    const { url } = this.state;
    return url ? (
      <img
        src={url}
        alt="cover-image"
        width={"100%"}
        style={this.props.style}
      />
    ) : (
      <BeatLoader color={"#000"} />
    );
  }
}
