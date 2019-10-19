import React from "react";
import "../../styles/index.css";
import { connect } from "react-redux";
import LoginForm from "../../components/LoginForm";
import { getAuthManager } from "../../utils/AuthManager";
import styles from "./LoginScreen.module.css";

class LoginScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: ""
    };
    this.AuthManager = getAuthManager();
  }

  login = (email, password) => {
    return this.AuthManager.signInWithEmailAndPassword(email, password);
  };

  render() {
    return (
      <div className={styles.container}>
        <div className={styles.inner}>
          <div className={styles.formWrapper}>
            <LoginForm onSubmit={this.login} />
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { auth: state.auth };
};

export default connect(mapStateToProps)(LoginScreen);
