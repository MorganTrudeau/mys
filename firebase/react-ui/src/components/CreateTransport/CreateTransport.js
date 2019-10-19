import React from "react";
import {
  Grid,
  Fab,
  Button,
  Typography,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel
} from "@material-ui/core";
import styles from "./CreateTransport.module.css";
import "../../styles/index.css";
import { Close, ArrowRightAlt } from "@material-ui/icons";
import { connect } from "react-redux";
import { createTransport } from "../../actions/transport";
import TransportDetail from "../TransportDetail/TransportDetail";
import PlacesAutoCompleteInput from "../PlacesAutoCompleteInput";
import { TransportKeys } from "../../utils/Constants";
import MomentUtils from "@date-io/moment";
import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import { generateUid } from "../../utils";

const keyProgression = Object.values(TransportKeys);

const initialState = {
  open: false,
  transport: {},
  phase: 0,
  inputValue: "",
  errors: {}
};

class CreateTransport extends React.Component {
  constructor(props) {
    super(props);
    this.state = { ...initialState, open: props.startOpen };
  }

  toggle = () => {
    if (this.state.open) {
      return this.setState(initialState);
    }
    this.setState({ open: true });
  };

  getActiveKey = () => {
    return keyProgression[this.state.phase];
  };

  handleChange = event => {
    this.setState({
      inputValue: event.target.value
    });
  };

  setValue = value => this.setState({ inputValue: value });

  getInputHeader = () => {
    switch (this.getActiveKey()) {
      case TransportKeys.name:
        return "What needs transporting?";
      case TransportKeys.weight:
        return "How much does it weigh?";
      case TransportKeys.startLocation:
        return "Where's it being picked up?";
      case TransportKeys.endLocation:
        return "Where's it being dropped up?";
      case TransportKeys.date:
        return "When's it happening?";
    }
  };

  getInputLabel = key => {
    switch (key) {
      case TransportKeys.name:
        return "Description of load";
      case TransportKeys.startLocation:
        return "Pick up location";
      case TransportKeys.endLocation:
        return "Drop off location";
    }
  };

  renderInput = () => {
    const { inputValue } = this.state;
    const activeKey = this.getActiveKey();
    switch (activeKey) {
      case TransportKeys.name:
        return (
          <TextField
            key={activeKey}
            id={activeKey}
            label={this.getInputLabel(activeKey)}
            value={inputValue}
            onChange={this.handleChange}
            autoFocus={true}
            onKeyPress={event => {
              if (event.key === "Enter" && inputValue) {
                this.handleNext();
              }
            }}
          />
        );
      case TransportKeys.weight:
        return (
          <FormControl style={{ minWidth: 120 }}>
            <InputLabel htmlFor="demo-controlled-open-select">
              Weight Class
            </InputLabel>
            <Select
              value={inputValue}
              onChange={this.handleChange}
              onKeyPress={event => {
                if (event.key === "Enter" && inputValue) {
                  this.handleNext();
                }
              }}
            >
              <MenuItem value={"100lbs - 500lbs"}>100lbs - 500lbs</MenuItem>
              <MenuItem value={"500lbs - 2000lbs"}>500lbs - 2000lbs</MenuItem>
              <MenuItem value={"2000lbs - 10,000lbs"}>
                2000lbs - 10,000lbs
              </MenuItem>
            </Select>
          </FormControl>
        );
      case TransportKeys.startLocation:
      case TransportKeys.endLocation:
        return (
          <PlacesAutoCompleteInput
            key={activeKey}
            value={inputValue}
            onChange={this.handleChange}
            onSelect={this.setValue}
            label={this.getInputLabel(activeKey)}
          />
        );
      case TransportKeys.date:
        return (
          <MuiPickersUtilsProvider utils={MomentUtils}>
            <DatePicker
              id="date-picker-dialog"
              label="Date picker dialog"
              format={"LL"}
              value={inputValue === "" ? null : inputValue}
              onChange={this.setValue}
            />
          </MuiPickersUtilsProvider>
        );
    }
  };

  handleKeyChange = key => {
    const index = keyProgression.findIndex(item => item === key);
    this.setState({
      phase: index,
      inputValue: this.state.transport[key] || ""
    });
  };

  handleNext = () => {
    const nextPhase = keyProgression.findIndex(
      key => !this.state.transport[key] && key !== this.getActiveKey()
    );
    this.setState({
      transport: {
        ...this.state.transport,
        [this.getActiveKey()]: this.state.inputValue
      },
      inputValue: "",
      phase: nextPhase
    });
  };

  handleSubmit = () => {
    const transport = { ...this.state.transport, id: generateUid() };
    this.props.createTransport(transport);
  };

  render() {
    const { transport, open, inputValue } = this.state;
    if (!open) {
      return (
        <Button
          variant={"contained"}
          onClick={this.toggle}
          style={{ alignSelf: "center" }}
        >
          Request Transport
        </Button>
      );
    }
    return (
      <div className={styles.container}>
        <div className={styles.header}>
          <Fab onClick={this.toggle} size={"small"}>
            <Close />
          </Fab>
        </div>
        <div className={styles.inner}>
          {this.state.phase === -1 ? (
            <div className={"globalCenterColumn"}>
              <TransportDetail
                transport={transport}
                onClick={this.handleKeyChange}
              />
              <Button
                variant={"contained"}
                color={"primary"}
                style={{ marginTop: 40 }}
                onClick={this.handleSubmit}
              >
                Send Request
              </Button>
            </div>
          ) : (
            <div className={styles.inputContainer}>
              <Typography variant={"h4"} className={styles.inputLabel}>
                {this.getInputHeader()}
              </Typography>
              {this.renderInput()}
              <Fab
                disabled={!inputValue}
                color={!!inputValue ? "primary" : "default"}
                onClick={this.handleNext}
                className={styles.nextButton}
              >
                <ArrowRightAlt />
              </Fab>
            </div>
          )}
        </div>
      </div>
    );
  }
}

const mapDispatch = dispatch => {
  return { createTransport: transport => dispatch(createTransport(transport)) };
};

export default connect(
  null,
  mapDispatch
)(CreateTransport);
