import React from "react";
import { FormGroup, Typography, Button, Paper } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import styles from "./SignUpForm.module.css";

export default function SignUpForm({ style }) {
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
    <Paper className={styles.paper} elevation={5}>
      <FormGroup className={styles.inputGroup}>
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
      <div className={styles.terms1}>
        <Typography variant={"caption"} style={{ fontSize: 10 }}>
          By proceeding, I agree to Uber's <a href={"#"}>Terms of Use</a> and
          acknowledge that I have read the <a href={"#"}>Privacy Policy</a>.
        </Typography>
      </div>
      <div className={styles.terms2}>
        <Typography variant={"caption"} style={{ fontSize: 10 }}>
          I also agree that Uber or its representatives may contact me by email,
          phone, or SMS (including by automated means) at the email address or
          number I provide, including for marketing purposes.
        </Typography>
      </div>
      <Button
        variant="contained"
        size="large"
        color={"primary"}
        className={styles.signUpButton}
        onClick={handleSubmit}
      >
        Sign up to drive
      </Button>
    </Paper>
  );
}
