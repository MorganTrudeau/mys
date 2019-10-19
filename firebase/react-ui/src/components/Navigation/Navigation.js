import React, { Component } from "react";
import "../../styles/index.css";
import { Typography, Grid } from "@material-ui/core";
import LoginButton from "../LoginButton/LoginButton";
import SignOutButton from "../SIgnOutButton/SignOutButton";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { compose } from "recompose";
import styles from "./Navigation.module.css";
import TopNav from "../TopNav/TopNav";

class Navigation extends Component {
  onLogoCLick = () => {
    this.props.history.replace("./");
  };

  render() {
    return (
      <Grid
        container
        className={styles.container}
        alignItems={"center"}
        justify={"space-between"}
      >
        <Typography
          className={styles.logoText}
          variant={"h6"}
          onClick={this.onLogoCLick}
        >
          TRANSPORT IT
        </Typography>
        {this.props.history.location.pathname !== "/login" &&
          this.props.firebaseAuth === "INACTIVE" && <LoginButton />}
        <TopNav />
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
