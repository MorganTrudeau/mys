import React, { Component } from "react";
import { connect } from "react-redux";
import SignUpForm from "../components/SignUpForm";
import { Typography, Grid } from "@material-ui/core";
require("./HomeScreen.css");

class HomeScreen extends Component {
  render() {
    return (
      <Grid container justify="space-around">
        <Grid
          container
          className={"cover-item"}
          direction={"column"}
          justify={"center"}
        >
          <Typography variant={"h2"} style={{ lineHeight: 1.2 }}>
            Put your truck to work
          </Typography>
          <Typography
            variant={"h3"}
            style={{
              marginTop: 20,
              lineHeight: 1.2
            }}
          >
            Become a Transporter
          </Typography>
        </Grid>
        <Grid item className={"cover-item"}>
          <SignUpForm />
        </Grid>
      </Grid>
    );
  }
}

const mapStateToProps = state => {
  return {};
};

const mapDispatchToProps = dispatch => {
  return {};
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomeScreen);
