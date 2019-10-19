import React from "react";
import Button from "@material-ui/core/Button";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { compose } from "recompose";
import { getAuthManager } from "../../utils/AuthManager";

const AuthManager = getAuthManager();

function SignOutButton({ history, signOut }) {
  const onClick = () => {
    return AuthManager.signOut();
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

export default withRouter(SignOutButton);
