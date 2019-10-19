import React, { Component } from "react";
import { connect } from "react-redux";
import SignUpForm from "../SignUpForm/SignUpForm";
import { Typography, Grid } from "@material-ui/core";
import styles from "./HomeScreen.module.css";

class HomeScreen extends Component {
  render() {
    return (
      <Grid
        container
        justify="space-around"
        className={styles.container}
        direction={"row"}
      >
        <Grid
          container
          className={styles.gridItem}
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
        <Grid container className={styles.gridItem}>
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
