import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import { connect } from "react-redux";
import HomeScreen from "./HomeScreen";
import LoginScreen from "./LoginScreen";
import SplashScreen from "./SplashScreen";

class Main extends Component {
  render() {
    const { auth } = this.props;
    if (
      auth.firebaseAuth === "ACTIVE" &&
      auth.user.id === "bMagkkLeGogb9YdrsLiBAmyYjio2"
    ) {
      return (
        <Switch>
          <Route exact path="/" component={HomeScreen} />
        </Switch>
      );
    }
    if (auth.firebaseAuth === "INACTIVE") {
      return <Route exact path="/" component={LoginScreen} />;
    }
    return <Route exact path="/" component={SplashScreen} />;
  }
}

const mapStateToProps = state => {
  return { auth: state.auth, company: state.company };
};

export default connect(
  mapStateToProps,
  null
)(Main);
