import React from "react";
import { View } from "react-native";
import global, { colors } from "../styles";

const SelectionIndicator = props => (
  <View
    style={{
      borderRadius: 9,
      borderWidth: 2,
      borderColor: colors.red,
      justifyContent: "center",
      alignItems: "center",
      height: 18,
      width: 18
    }}
  >
    <View
      style={{
        backgroundColor: colors.red,
        height: 10,
        width: 10,
        borderRadius: 5
      }}
    />
  </View>
);

export default SelectionIndicator;
