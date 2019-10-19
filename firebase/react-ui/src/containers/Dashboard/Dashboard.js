import React from "react";
import { connect } from "react-redux";

import styles from "./Dashboard.module.css";
import { NavStates } from "../../utils/Constants";

import { Grid, Paper, CircularProgress } from "@material-ui/core";
import SideNav from "../../components/SideNav/SideNav";
import UserInfoCollection from "../../components/UserInfoCollection/UserInfoCollection";
import TransportMain from "../../components/TransportMain/TransportMain";
import DriversMain from "../../components/DriversMain/DriversMain";
import BillingMain from "../../components/BillingMain/BillingMain";
import SettingsMain from "../../components/SettingsMain/SettingsMain";

class Dashboard extends React.Component {
  renderMain = state => {
    switch (state) {
      case NavStates.transports:
        return <TransportMain />;
      case NavStates.drivers:
        return <DriversMain />;
      case NavStates.billing:
        return <BillingMain />;
      case NavStates.settings:
        return <SettingsMain />;
      default:
        return null;
    }
  };

  render() {
    const { navState } = this.props;
    if (!this.props.activeUser) {
      return (
        <div className={styles.container}s>
          <CircularProgress style={{ alignSelf: "center" }} />
        </div>
      );
    }
    if (!this.props.activeUser.userType) {
      return <UserInfoCollection />;
    }
    return (
      <div className={styles.container}>
        <div className={styles.inner}>
          <SideNav />
          <Paper className={styles.main} elevation={5}>
            {this.renderMain(navState)}
          </Paper>
        </div>
      </div>
    );
  }
}

const mapState = state => {
  return { activeUser: state.user.active, navState: state.nav.state };
};

export default connect(mapState)(Dashboard);
