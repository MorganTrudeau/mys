import React from "react";
import { TouchableWithoutFeedback, View, Image } from "react-native";
import global, { colors } from "../styles";

const Checkbox = ({ active, onPress }) => (
  <TouchableWithoutFeedback onPress={onPress}>
    <View
      style={{
        borderColor: colors.primary,
        borderWidth: 2,
        backgroundColor: active ? colors.primary : "transparent",
        borderRadius: 5,
        height: 20,
        width: 20,
        alignItems: "center",
        justifyContent: "center"
      }}
    >
      {active && (
        <Image
          source={require("../assets/img/check.png")}
          resizeMode={"contain"}
          style={{ width: 18, height: 18, tintColor: colors.white }}
        />
      )}
    </View>
  </TouchableWithoutFeedback>
);

export default Checkbox;
