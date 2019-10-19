import React from "react";
import { compose } from "recompose";
import { connect } from "react-redux";
import { updateActiveUser } from "../actions/user";

const withActiveUserUpdate = WrappedComponent => {
  return class extends React.Component {
    static displayName = `WithActiveUserUpdate(${WrappedComponent.displayName ||
      WrappedComponent.name ||
      "WrappedComponent"})`;
    render() {
      return <WrappedComponent {...this.props} />;
    }
  };
};

const mapState = state => {
  return { activeUser: state.user.active };
};

const mapDispatch = dispatch => {
  return { updateActiveUser: user => dispatch(updateActiveUser(user)) };
};

export default compose(
  connect(
    mapState,
    mapDispatch
  ),
  withActiveUserUpdate
);
