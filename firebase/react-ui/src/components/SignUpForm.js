import React from "react";
import { FormGroup, Typography, Button, Paper } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";

const useStyles = makeStyles(theme => ({
  terms1: { marginTop: 20 },
  terms2: { marginTop: 10 },
  signUpButton: { marginTop: 30 },
  paper: {
    padding: 40,
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  inputGroup: { width: "100%" }
}));

export default function SignUpForm({ style }) {
  const classes = useStyles();

  const [values, setValues] = React.useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    password: "",
    city: ""
  });

  const [errors, setErrors] = React.useState({
    firstName: false,
    lastName: false,
    email: false,
    phoneNumber: false,
    password: false,
    city: false
  });

  const handleChange = name => event => {
    setValues({ ...values, [name]: event.target.value });
  };

  const handleSubmit = () => {
    let errors = {};
    Object.entries(values).forEach(([key, value]) => {
      console.log(key, value);
      if (value === "") {
        errors[key] = true;
      }
    });
    if (!Object.keys(errors).length) {
      this.props.onSubmit(values);
    } else {
      setErrors(errors);
    }
  };

  const getLabel = key => {
    const labels = {
      firstName: "First name",
      lastName: "Last name",
      email: "Email",
      phoneNumber: "Phone number",
      password: "Password",
      city: "City"
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
    <Paper className={classes.paper} elevation={5}>
      <FormGroup className={classes.inputGroup}>
        <TextField
          type={"first-name"}
          id={"first-name-input"}
          label="First name"
          value={values.firstName}
          onChange={handleChange("firstName")}
          margin={"normal"}
          error={!!getErrorText("firstName")}
          helperText={getErrorText("firstName")}
          onFocus={clearError.bind(null, "firstName")}
        />
        <TextField
          type={"last-name"}
          id={"last-name-input"}
          label="Last Name"
          value={values.name}
          onChange={handleChange("lastName")}
          margin={"normal"}
          error={!!getErrorText("lastName")}
          helperText={getErrorText("lastName")}
          onFocus={clearError.bind(null, "lastName")}
        />
        <TextField
          type={"email"}
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
          type={"phone-number"}
          id={"phone-number"}
          label="Phone number"
          value={values.phoneNumber}
          onChange={handleChange("phoneNumber")}
          margin={"normal"}
          error={!!getErrorText("phoneNumber")}
          helperText={getErrorText("phoneNumber")}
          onFocus={clearError.bind(null, "phoneNumber")}
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
      <div className={classes.terms1}>
        <Typography variant={"caption"}>
          By proceeding, I agree to Uber's <a href={"#"}>Terms of Use</a> and
          acknowledge that I have read the <a href={"#"}>Privacy Policy</a>.
        </Typography>
      </div>
      <div className={classes.terms2}>
        <Typography variant={"caption"}>
          I also agree that Uber or its representatives may contact me by email,
          phone, or SMS (including by automated means) at the email address or
          number I provide, including for marketing purposes.
        </Typography>
      </div>
      <Button
        variant="contained"
        size="large"
        color={"primary"}
        className={classes.signUpButton}
        onClick={handleSubmit}
      >
        Sign up to drive
      </Button>
    </Paper>
  );
}
