import React from "react";
import {
  Animated,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  Text,
  View,
  TouchableWithoutFeedback,
  Easing,
  StyleSheet
} from "react-native";
import globalStyles, { colors } from "../styles";
import PhoneNumberInput from "./PhoneNumberInput";
import ProgressionFooter from "./ProgressionFooter";
import AppHeader from "../components/AppHeader";
import { Header } from "react-navigation-stack";
import { connect } from "react-redux";
import { getAuthManager } from "../utils/AuthManager";

const AuthManager = getAuthManager();

const { height: DEVICE_HEIGHT } = Dimensions.get("window");

class PhoneNumberInputModal extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      height: new Animated.Value(0),
      maxHeight: DEVICE_HEIGHT,
      open: false,
      numberInvalid: false,
      phoneNumber: "",
      loading: false
    };
  }

  onChangeText = phoneNumber => {
    this.setState({ phoneNumber, numberInvalid: false });
  };

  onNext = () => {
    const numberInvalid = !this.input.isValidNumber();
    if (numberInvalid) {
      return this.setState({ numberInvalid });
    }
    const countryCode = this.input.getCountryCode();
    const phoneNumber =
      "+" + countryCode + this.state.phoneNumber.replace(/[^\d]/g, "");
    this.verifyPhoneNumber(phoneNumber, this.state.phoneNumber);
  };

  verifyPhoneNumber = (phoneNumber, formattedPhoneNumber) => {
    AuthManager.verifyPhoneNumber(phoneNumber, formattedPhoneNumber);
  };

  toggle = () => {
    this.setState(
      { open: !this.state.open, numberInvalid: false, phoneNumber: "" },
      () => {
        this.state.open ? this.open() : this.close();
      }
    );
  };
  open = () => {
    Animated.timing(this.state.height, {
      toValue: 1,
      duration: 1000,
      easing: Easing.out(Easing.poly(5))
    }).start();
    setTimeout(() => this.input.focus(), 400);
  };
  close = () => {
    Animated.timing(this.state.height, {
      toValue: 0,
      duration: 500,
      easing: Easing.in(Easing.linear)
    }).start();
  };

  setInputRef = r => {
    this.input = r;
  };

  render() {
    const InputWrapper = this.state.open ? View : TouchableWithoutFeedback;

    const headerAnimation = this.state.height.interpolate({
      inputRange: [0, 1],
      outputRange: [0, Header.HEIGHT]
    });
    const containerAnimation = this.state.height.interpolate({
      inputRange: [0, 1],
      outputRange: [DEVICE_HEIGHT * 0.7, 0]
    });

    return (
      <Animated.View style={[styles.container, { top: containerAnimation }]}>
        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={"padding"}
          keyboardVerticalOffset={Platform.OS === "ios" ? 30 : 20}
        >
          <SafeAreaView style={{ flex: 1 }}>
            <Animated.View style={[styles.header, { height: headerAnimation }]}>
              {this.state.open && <AppHeader onBack={this.toggle} />}
            </Animated.View>
            <View style={styles.content}>
              <Text style={styles.screenTitle}>
                {this.state.open
                  ? "Enter your mobile number"
                  : "Move it with Transporter"}
              </Text>
              <InputWrapper onPress={this.toggle}>
                <View>
                  <PhoneNumberInput
                    disabled={!this.state.open}
                    innerRef={this.setInputRef}
                    placeholder={
                      this.state.open
                        ? "(204) 234-5678"
                        : "Enter your mobile number"
                    }
                    onChangeText={this.onChangeText}
                    numberInvalid={this.state.numberInvalid}
                    onSubmitEditing={() =>
                      this.state.phoneNumber !== "" ? this.onNext() : null
                    }
                  />
                </View>
              </InputWrapper>
            </View>

            {this.state.open && (
              <ProgressionFooter
                onNext={this.onNext}
                loading={this.props.loading}
                disabled={this.state.phoneNumber === ""}
              >
                <Text style={styles.smsWarning}>
                  By continuing you may receive an SMS for verification. Message
                  and data rates may apply.
                </Text>
              </ProgressionFooter>
            )}
          </SafeAreaView>
        </KeyboardAvoidingView>
      </Animated.View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    backgroundColor: colors.white
  },
  header: {
    overflow: "hidden"
  },
  content: { flex: 1, padding: 20, paddingVertical: 30 },
  screenTitle: { ...globalStyles.textExtraLarge, marginBottom: 20 },
  smsWarning: { ...globalStyles.textSmall, width: "80%" }
});

export default connect(state => ({ loading: state.auth.loading }))(
  PhoneNumberInputModal
);
