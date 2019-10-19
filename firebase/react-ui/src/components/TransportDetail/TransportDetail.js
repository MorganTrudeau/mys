import { Button, Typography } from "@material-ui/core";
import React from "react";
import styles from "./TransportDetail.module.css";
import { TransportKeys } from "../../utils/Constants";
import moment from "moment";

const TransportDetailItem = ({ title, value, onClick }) => {
  if (!value) {
    return null;
  }
  return (
    <Button className={styles.detailItem} onClick={onClick}>
      <div>
        <Typography variant={"caption"}>{title}</Typography>
        <Typography variant={"body1"}>{value}</Typography>
      </div>
    </Button>
  );
};

const TransportDetail = ({ transport, onClick }) => {
  return (
    <div className={styles.container}>
      <TransportDetailItem
        title={"Load description"}
        value={transport.name}
        onClick={onClick.bind(null, TransportKeys.name)}
      />
      <TransportDetailItem
        title={"Weight class"}
        value={transport.weight}
        onClick={onClick.bind(null, TransportKeys.weight)}
      />
      <TransportDetailItem
        title={"Where from"}
        value={transport.startLocation}
        onClick={onClick.bind(null, TransportKeys.startLocation)}
      />
      <TransportDetailItem
        title={"Where to"}
        value={transport.endLocation}
        onClick={onClick.bind(null, TransportKeys.endLocation)}
      />
      <TransportDetailItem
        title={"Date"}
        value={moment(transport.date).format('LL')}
        onClick={onClick.bind(null, TransportKeys.date)}
      />
    </div>
  );
};

export default TransportDetail;
