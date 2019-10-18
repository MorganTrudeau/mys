import React from "react";
import { FormGroup, Button, Paper } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";

const useStyles = makeStyles(theme => ({
  loginButton: { marginTop: 30, backgroundColor: "#eb4447", color: "#fff" },
  paper: {
    padding: 40,
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  inputGroup: { width: "100%" }
}));

export default function LoginForm({ style, onSubmit }) {
  const classes = useStyles();

  const [values, setValues] = React.useState({
    email: "",
    password: ""
  });

  const [errors, setErrors] = React.useState({
    phoneNumber: false,
    password: false
  });

  const handleChange = name => event => {
    setValues({ ...values, [name]: event.target.value });
  };

  const handleSubmit = () => {
    const email = values.email.trim();
    const password = values.password.trim();
    if (email !== "" && password !== "") {
      onSubmit(email, password);
    } else {
      setErrors(errors);
    }
  };

  const getLabel = key => {
    const labels = {
      email: "Email",
      password: "Password"
    };
    return labels[key];
  };

  const getErrorText = key => {
    if (errors[key]) {
      return `${getLabel(key)} is required`;
    }
    return "";
  };

  const clearError = key => {
    setErrors({ ...errors, [key]: false });
  };

  return (
    <Paper elevation={5} className={classes.paper}>
      <FormGroup className={classes.inputGroup}>
        <TextField
          id={"email-input"}
          label="Email"
          value={values.email}
          onChange={handleChange("email")}
          margin={"normal"}
          error={!!getErrorText("email")}
          helperText={getErrorText("email")}
          onFocus={clearError.bind(null, "email")}
        />
        <TextField
          id="password"
          label="Password"
          value={values.password}
          onChange={handleChange("password")}
          margin={"normal"}
          type={"password"}
          error={!!getErrorText("password")}
          helperText={getErrorText("password")}
          onFocus={clearError.bind(null, "password")}
        />
      </FormGroup>
      <Button
        variant="contained"
        size="large"
        color={"primary"}
        className={classes.loginButton}
        onClick={handleSubmit}
      >
        Login
      </Button>
    </Paper>
  );
}
