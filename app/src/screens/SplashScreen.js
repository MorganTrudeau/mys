import React from "react";
import { connect } from "react-redux";
// import NativeSplashScreen from "../utils/splashScreen";

class SplashScreen extends React.Component {
  componentWillUnmount() {
    // setTimeout(() => NativeSplashScreen.hide(), 5);
  }

  render() {
    return null;
  }

  static navigationOptions = ({ navigation }) => {
    return {
      header: null
    };
  };
}

const mapStateToProps = state => {
  return {
    firebaseAuth: state.auth.firebaseAuth,
    authData: state.auth.data,
    activeUserSetUp: state.user.activeUserSetUp
    // networkConnected: state.network.connected
  };
};

const mapDispatchToProps = dispatch => {
  return {};
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SplashScreen);
