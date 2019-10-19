import React, { useState } from "react";
import styles from "../SideNav/SideNav.module.css";
import { Grid, Paper, Typography, Button, Hidden } from "@material-ui/core";
import NavContent from "../NavContent/NavContent";

const SideNav = props => {
  return (
    <Hidden smDown implementation="css">
      <Paper className={styles.sideNavPaper} elevation={5}>
        <NavContent />
      </Paper>
    </Hidden>
  );
};

export default SideNav;
