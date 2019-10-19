import React, { useState } from "react";
import { connect } from "react-redux";
import { Button, Grid, Typography } from "@material-ui/core";
import { switchNavState } from "../../actions/nav";
import styles from "./NavContent.module.css";
import { NavStates } from "../../utils/Constants";

const NavItem = ({ lastItem, onClick, label, selected }) => {
  return (
    <Button
      className={lastItem ? styles.navItemLast : styles.navItem}
      onClick={onClick}
    >
      <Typography
        className={selected ? styles.navItemLabelSelected : styles.navItemLabel}
      >
        {label}
      </Typography>
    </Button>
  );
};

const NavContent = ({ onSelect, userType, navState, switchNavState }) => {
  const [selected, setSelected] = useState(navState);
  const buildItemProps = state => {
    return {
      selected: selected === state,
      onClick: () => {
        setSelected(state);
        switchNavState(state);
        typeof onSelect === "function" && onSelect(state);
      }
    };
  };
  return (
    <Grid container direction={"column"} className={styles.navInner}>
      <NavItem label={"Transport"} {...buildItemProps(NavStates.transports)} />
      {userType === "company" && (
        <NavItem label={"Drivers"} {...buildItemProps(NavStates.drivers)} />
      )}
      <NavItem label={"Billing"} {...buildItemProps(NavStates.billing)} />
      <NavItem
        label={"Settings"}
        {...buildItemProps(NavStates.settings)}
        lastItem={true}
      />
    </Grid>
  );
};

const mapState = state => {
  return {
    userType: state.user.active && state.user.active.userType,
    navState: state.nav.state
  };
};

const mapDispatch = dispatch => {
  return { switchNavState: state => dispatch(switchNavState(state)) };
};

export default connect(
  mapState,
  mapDispatch
)(NavContent);
