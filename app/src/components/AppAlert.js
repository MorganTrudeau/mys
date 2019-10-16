import React from "react";
import { Alert } from "react-native";

export default class AppAlert extends React.Component {
  static alert(title, message, buttons) {
    return Alert.alert(title, message, buttons);
  }
}
