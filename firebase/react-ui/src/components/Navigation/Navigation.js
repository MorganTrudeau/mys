import React, { Component } from "react";
import "../../styles/index.css";
import { Typography, Grid } from "@material-ui/core";
import LoginButton from "../LoginButton/LoginButton";
import SignOutButton from "../SIgnOutButton/SignOutButton";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { compose } from "recompose";
import "./Navigation.css";
import { deAuth } from "../../apis/auth";

class Navigation extends Component {
  onLogoCLick = () => {
    this.props.history.replace("./");
  };

  render() {
    console.log(this.props.history);
    return (
      <Grid
        container
        className={"container"}
        alignItems={"center"}
        justify={"space-between"}
      >
        <Typography
          className={"logo-text"}
          variant={"h6"}
          onClick={this.onLogoCLick}
        >
          TRANSPORTER
        </Typography>
        {this.props.history.location.pathname !== "/login" &&
          this.props.firebaseAuth === "INACTIVE" && <LoginButton />}
        {this.props.firebaseAuth === "ACTIVE" && <SignOutButton />}
      </Grid>
    );
  }
}

const mapState = state => {
  return { firebaseAuth: state.auth.firebaseAuth };
};

export default compose(
  connect(mapState),
  withRouter
)(Navigation);
