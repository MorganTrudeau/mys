import React from "react";
import { Grid } from "@material-ui/core";
import styles from "./SettingsMain.module.css";
import SignOutButton from "../SIgnOutButton/SignOutButton";

const SettingsMain = props => {
  return (
    <div className={styles.container}>
      <SignOutButton />
    </div>
  );
};

export default SettingsMain;
