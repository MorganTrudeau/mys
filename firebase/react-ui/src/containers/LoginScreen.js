import React from "react";
import "../styles/index.css";
import { auth } from "../apis/auth";
import { connect } from "react-redux";
import LoginForm from "../components/LoginForm";
import { Grid } from "@material-ui/core";

class LoginScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: ""
    };
    this.login = this.login.bind(this);
  }

  login(email, password) {
    this.props.auth(email, password);
  }

  render() {
    return (
      <Grid
        container
        justify={"center"}
        alignItems={"center"}
        style={{ height: "80vh" }}
      >
        <Grid item style={{ height: 400, width: "100%", maxWidth: 550 }}>
          <LoginForm onSubmit={this.login} />
        </Grid>
      </Grid>
    );
  }
}

const mapStateToProps = state => {
  return { auth: state.auth };
};

const mapDispatchToProps = dispatch => {
  return {
    auth: (email, password) => dispatch(auth(email, password))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginScreen);
