import React from "react";
import { TouchableOpacity, ActivityIndicator, View } from "react-native";
import Icon from "../components/Icon";
import globalStyle, { colors } from "../styles";

const NextButton = ({ onPress, loading, disabled }) => {
  const buttonSize = 55;
  const Container = disabled ? View : TouchableOpacity;
  return (
    <Container
      onPress={onPress}
      style={{
        height: buttonSize,
        width: buttonSize,
        borderRadius: buttonSize / 2,
        backgroundColor: disabled && !loading ? colors.grey : colors.primary,
        justifyContent: "center",
        alignItems: "center"
      }}
    >
      {loading ? (
        <ActivityIndicator color={colors.white} size={"small"} />
      ) : (
        <Icon
          asset={require("../assets/img/arrow-right.png")}
          tint={colors.white}
          size={22}
        />
      )}
    </Container>
  );
};

export default NextButton;
