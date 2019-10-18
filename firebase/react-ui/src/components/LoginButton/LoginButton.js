import React from "react";
import Button from "@material-ui/core/Button";
import { withRouter } from "react-router-dom";

function LoginButton({ history }) {
  const onClick = () => {
    history.push("/login");
  };
  return (
    <Button
      variant={"text"}
      color={"primary"}
      onClick={onClick}
      classes={{ root: "button" }}
    >
      Login
    </Button>
  );
}

export default withRouter(LoginButton);
