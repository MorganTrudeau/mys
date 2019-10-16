import React from "react";
import { View } from "react-native";
import globalStyles, { colors } from "../../styles";
import PhoneNumberInputModal from "../../components/PhoneNumberInputModal";

class PhoneNumberInputScreen extends React.PureComponent {
  render() {
    return (
      <View style={{ flex: 1, backgroundColor: colors.primary }}>
        <PhoneNumberInputModal />
      </View>
    );
  }

  static navigationOptions = { header: null };
}

export default PhoneNumberInputScreen;
