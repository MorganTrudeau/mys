import React from "react";
import { TextInput } from "react-native";
import globalStyles, { colors } from "../styles";

const AppTextInput = React.forwardRef((props, ref) => {
  return (
    <TextInput
      ref={ref}
      style={[globalStyles.text, globalStyles.textInput]}
      autoCapitalize={"none"}
      autoCorrect={false}
      {...props}
    />
  );
});

export default AppTextInput;
