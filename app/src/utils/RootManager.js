import React from "react";
import { connect } from "react-redux";
import { getPaymentManager } from "../payment/PaymentManager";
import { getAuthManager } from "./AuthManager";

class RootManager extends React.Component {
  paymentManager = null;
  authManager = null;

  componentDidMount() {
    this.paymentManager = getPaymentManager();
    this.authManager = getAuthManager();

    this.paymentManager.init(this.props.dispatch);
    this.authManager.init(this.props.dispatch);
  }

  componentWillUnmount() {
    this.paymentManager.destroy();
    this.authManager.destroy();
  }

  render() {
    console.log("RootManager render");
    return React.Children.only(this.props.children);
  }
}

export default connect()(RootManager);
