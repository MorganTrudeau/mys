import React from "react";
import "../styles/index.css";
import logo from "../assets/cherries.png";
import { auth } from "../apis/auth";
import { connect } from "react-redux";

class LoginScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: ""
    };
    this.login = this.login.bind(this);
  }

  login() {
    this.props.auth(this.state.email.trim(), this.state.password);
  }

  render() {
    return (
      <div className={"login"}>
        <img src={logo} height={100} style={{ marginBottom: 20 }} />
        <div
          style={{
            width: "80%",
            maxWidth: 150,
            justifyContent: "center",
            display: "flex",
            flexDirection: "column"
          }}
        >
          <h5 style={{ marginBottom: 10, color: "#fff" }}>Email</h5>
          <input
            className={"textInput"}
            style={{ marginBottom: 10, padding: 5 }}
            type={"text"}
            onChange={e => this.setState({ email: e.target.value })}
          />
          <h5 style={{ marginBottom: 10, color: "#fff" }}>Password</h5>
          <input
            className={"textInput"}
            style={{ marginBottom: 40, padding: 5 }}
            type={"text"}
            onChange={e => this.setState({ password: e.target.value })}
          />
          <input
            className={"button center"}
            type={"button"}
            style={{ marginBottom: 20 }}
            onClick={this.login}
            value={"Login"}
          />
        </div>
      </div>
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
