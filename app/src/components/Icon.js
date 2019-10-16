import React from "react";
import { Image, TouchableOpacity, View } from "react-native";
import global, { colors } from "../styles";

const Icon = ({ asset, style, containerStyle, tint, size, onPress }) => {
  const Container = onPress ? TouchableOpacity : View;
  return (
    <Container onPress={onPress} style={containerStyle}>
      <Image
        source={asset}
        style={{
          height: size,
          width: size,
          tintColor: tint || colors.grey,
          ...style
        }}
        resizeMode={"contain"}
      />
    </Container>
  );
};

export default Icon;
