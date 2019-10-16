import React from "react";
import {
  SafeAreaView,
  View,
  Text,
  TouchableWithoutFeedback,
  ActivityIndicator
} from "react-native";
import global, { colors } from "../styles";

const FooterButton = ({ text, style, onPress, loading }) => (
  <TouchableWithoutFeedback onPress={onPress}>
    <SafeAreaView style={{ backgroundColor: colors.red, ...style }}>
      <View
        style={{
          ...global.row,
          padding: 15,
          alignItems: "center",
          justifyContent: "center"
        }}
      >
        <Text
          style={{
            fontSize: 16,
            color: colors.white,
            fontWeight: "bold",
            marginRight: 15
          }}
        >
          {text}
        </Text>
        {loading && <ActivityIndicator color={colors.white} />}
      </View>
    </SafeAreaView>
  </TouchableWithoutFeedback>
);

export default FooterButton;
