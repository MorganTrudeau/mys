import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import { connect } from "react-redux";
import HomeScreen from "./HomeScreen";
import LoginScreen from "./LoginScreen";
import CompanyScreen from "./CompanyScreen";

class Main extends Component {
  render() {
    if (this.props.firebaseAuth === "ACTIVE") {
      return <Route component={CompanyScreen} />;
    }
    return (
      <Switch>
        <Route exact path="/" component={HomeScreen} />
        <Route path={"/login"} component={LoginScreen} />
      </Switch>
    );
  }
}

const mapStateToProps = state => {
  return { firebaseAuth: state.auth.firebaseAuth };
};

export default connect(
  mapStateToProps,
  null
)(Main);
