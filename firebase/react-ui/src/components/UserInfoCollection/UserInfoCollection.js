import React from "react";
import "./UserInfoCollection.module.css";
import { connect } from "react-redux";
import { updateActiveUser } from "../../actions/user";
import UserTypeSelect from "../UserTypeSelect/UserTypeSelect";
import { Grid, Paper } from "@material-ui/core";
import "../../styles/index.css";
import styles from "./UserInfoCollection.module.css";

class UserInfoCollection extends React.Component {
  state = { view: null };

  renderCollectionComponent = () => {
    const { view } = this.state;
    const { activeUser } = this.props;
    if (!activeUser.userType || view === "userType") {
      return <UserTypeSelect />;
    }
  };

  render() {
    return (
      <Grid
        container
        justify={"center"}
        alignItems={"center"}
        className={"container"}
        style={{ padding: 10 }}
      >
        <Paper elevation={5} className={styles.paper}>
          {this.renderCollectionComponent()}
        </Paper>
      </Grid>
    );
  }
}

const mapState = state => {
  return {
    activeUser: state.user.active
  };
};

const mapDispatch = dispatch => {
  return { updateUser: user => dispatch(updateActiveUser(user)) };
};

export default connect(
  mapState,
  mapDispatch
)(UserInfoCollection);
