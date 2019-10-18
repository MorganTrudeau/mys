import React from "react";
import Button from "@material-ui/core/Button";
import { withRouter } from "react-router-dom";
import { deAuth } from "../../apis/auth";
import { connect } from "react-redux";
import { compose } from "recompose";

function SignOutButton({ history, signOut }) {
  const onClick = () => {
    signOut();
  };
  return (
    <Button
      variant={"text"}
      color={"primary"}
      onClick={onClick}
      classes={{ root: "button" }}
    >
      Sign out
    </Button>
  );
}

const mapDispatch = dispatch => {
  return { signOut: () => dispatch(deAuth()) };
};

export default compose(
  connect(
    null,
    mapDispatch
  ),
  withRouter
)(SignOutButton);
