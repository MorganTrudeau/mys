import React from "react";
import {
  SafeAreaView,
  Text,
  View,
  KeyboardAvoidingView,
  StyleSheet
} from "react-native";
import globalStyles, { colors } from "../../styles";
import { connect } from "react-redux";
import AppHeader from "../../components/AppHeader";
import ProgressionFooter from "../../components/ProgressionFooter";
import CodeInput from "../../components/CodeInput";
import { getAuthManager } from "../../utils/AuthManager";

const AuthManager = getAuthManager();

class CodeVerificationScreen extends React.PureComponent {
  state = {
    loading: false
  };

  _onFinishCheckingCode = async code => {
    AuthManager.authenticatePhone(code);
  };

  _resendCode = () => {
    const {
      params: { phoneNumber, formattedPhoneNumber }
    } = this.props.navigation.state;
    AuthManager.verifyPhoneNumber(phoneNumber, formattedPhoneNumber);
  };

  render() {
    const { params = {} } = this.props.navigation.state;
    return (
      <KeyboardAvoidingView behavior={"padding"} style={{ flex: 1 }}>
        <SafeAreaView style={{ flex: 1 }}>
          <AppHeader />
          <View
            style={{
              paddingHorizontal: 20,
              paddingVertical: 40,
              alignItems: "center",
              flex: 1
            }}
          >
            <Text style={[globalStyles.textExtraLarge, { marginBottom: 20 }]}>
              Enter the 4-digit code sent to you at{" "}
              {params.formattedPhoneNumber}
            </Text>
            <CodeInput
              ref="codeInput"
              initialValue={this.state.code}
              keyboardType="numeric"
              codeLength={6}
              className="border-b"
              autoFocus={true}
              codeInputStyle={[
                {
                  fontSize: 30
                }
              ]}
              onFulfill={this._onFinishCheckingCode}
              activeColor={colors.blue}
              inactiveColor={"rgba(0, 0, 0, 0.3)"}
            />
          </View>
          <ProgressionFooter
            onNext={this.onNext}
            disabled={true}
            loading={this.props.loading}
          >
            <Text onPress={this._resendCode} style={styles.link}>
              I didn't receive a code
            </Text>
          </ProgressionFooter>
        </SafeAreaView>
      </KeyboardAvoidingView>
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
  screenTitle: { ...globalStyles.textExtraLarge, marginBottom: 20 },
  link: { ...globalStyles.textSmall, width: "80%", color: colors.blue }
});

export default connect(state => ({
  loading: state.auth.loading || state.user.fetchLoading
}))(CodeVerificationScreen);
