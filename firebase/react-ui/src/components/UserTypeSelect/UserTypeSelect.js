import React from "react";
import { Grid, Button, Typography } from "@material-ui/core";
import withActiveUserUpdate from "../../hocs/withUserUpdate";
import styles from "./UserTypeSelect.module.css";

class UserTypeSelect extends React.Component {
  state = { view: "initial" };

  changeView = view => this.setState({ view });

  setUserType = userType =>
    this.props.updateActiveUser({ ...this.props.activeUser, userType });

  render() {
    const { activeUser } = this.props;
    const { view } = this.state;
    if (view === "initial") {
      return (
        <Grid container direction={"column"} alignItems={"center"}>
          <Typography variant={"h4"}>
            How are you using this service?
          </Typography>
          <Grid container style={{ marginTop: 40 }} justify={"center"}>
            <Button
              key={"customer"}
              variant={"contained"}
              onClick={this.setUserType.bind(null, "customer")}
              className={styles.button}
            >
              I need transportation
            </Button>
            <Button
              key={"transporter"}
              variant={"contained"}
              onClick={this.changeView.bind(null, "transporter")}
              className={styles.button}
            >
              I am transporting
            </Button>
          </Grid>
        </Grid>
      );
    }
    return (
      <Grid container direction={"column"} alignItems={"center"}>
        <Typography variant={"h4"}>
          Are you joining or creating a company?
        </Typography>
        <Grid style={{ marginTop: 40 }}>
          <Button
            key={"creating"}
            variant={"contained"}
            onClick={this.changeView.bind(null, "transporter")}
            className={styles.button}
          >
            Creating
          </Button>
          <Button
            key={"joining"}
            variant={"contained"}
            onClick={this.changeView.bind(null, "customer")}
            className={styles.button}
          >
            Joining
          </Button>
        </Grid>
      </Grid>
    );
  }
}

export default withActiveUserUpdate(UserTypeSelect);
