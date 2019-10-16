import React from "react";
import { View } from "react-native";
import NextButton from "../components/NextButton";
import globalStyle from "../styles";

const ProgressionFooter = ({ onNext, loading, disabled, children }) => {
  return (
    <View style={[globalStyle.row, { padding: 20 }]}>
      <View style={{ flex: 1 }}>{children}</View>
      <NextButton onPress={onNext} loading={loading} disabled={disabled} />
    </View>
  );
};

export default ProgressionFooter;
