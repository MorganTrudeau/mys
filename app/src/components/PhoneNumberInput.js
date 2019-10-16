import React from "react";
import { View, Text } from "react-native";
import PhoneInput from "react-native-phone-input";
import globalStyles, { colors, normalize } from "../styles";

type Props = {
  onChangeText: Function
};

class PhoneNumberInput extends React.PureComponent<Props> {
  render() {
    const {
      onChangeText,
      placeholder,
      disabled,
      numberInvalid,
      onSubmitEditing
    } = this.props;
    return (
      <View pointerEvents={disabled ? "none" : "auto"}>
        <View
          style={{
            borderBottomWidth: 2,
            borderBottomColor: numberInvalid
              ? colors.red
              : disabled
              ? colors.lightGrey
              : colors.black
          }}
        >
          <PhoneInput
            ref={this.props.innerRef}
            disabled={disabled}
            textProps={{
              placeholder,
              style: {
                paddingVertical: 10,
                fontSize: normalize(16)
              },
              onSubmitEditing
            }}
            onChangePhoneNumber={onChangeText}
          />
        </View>
        {numberInvalid && (
          <Text
            style={[
              globalStyles.textSmall,
              { color: colors.red, marginTop: 5 }
            ]}
          >
            This phone number is invalid
          </Text>
        )}
      </View>
    );
  }
}

export default PhoneNumberInput;
