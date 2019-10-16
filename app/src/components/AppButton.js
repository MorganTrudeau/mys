import React from "react";
import {
  StyleSheet,
  View,
  ActivityIndicator,
  Text,
  TouchableOpacity
} from "react-native";
import PropTypes from "prop-types";
import global, { colors } from "../styles";

const AppButton = ({
  title,
  titleStyle,
  loading,
  onPress,
  style,
  spinnerColor = colors.white
}) => (
  <TouchableOpacity
    onPress={!loading ? onPress : null}
    style={[global.button, style]}
  >
    <Text style={[global.buttonText, titleStyle]}>{title}</Text>

    {loading ? (
      <View style={{ position: "absolute", right: 5 }}>
        <ActivityIndicator
          size={"small"}
          animating={true}
          color={spinnerColor}
        />
      </View>
    ) : null}
  </TouchableOpacity>
);

AppButton.propTypes = {
  loading: PropTypes.bool,
  title: PropTypes.string,
  onPress: PropTypes.func
};

export default AppButton;
