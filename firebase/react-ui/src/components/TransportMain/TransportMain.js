import React from "react";
import { Grid } from "@material-ui/core";
import styles from "./TransportMain.module.css";
import CreateTransport from "../CreateTransport/CreateTransport";

const TransportMain = props => {
  return (
    <div className={styles.container}>
      <CreateTransport startOpen={true}/>
    </div>
  );
};

export default TransportMain;
