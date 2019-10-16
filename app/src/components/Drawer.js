import React from "react";
import { View } from "react-native";
import { colors } from "../styles";

const Drawer = ({ props }) => {
  console.log(props);
  return <View style={{ flex: 1, backgroundColors: colors.white }} />;
};

export default Drawer
