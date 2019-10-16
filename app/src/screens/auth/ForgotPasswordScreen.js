import React from "react";
import { Linking, Text, Dimensions, View, Alert } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import TextInput from "../../components/AppTextInput";
import Button from "../../components/AppButton";
import global, { colors } from "../../styles";
import { connect } from "react-redux";
import { resetPassword } from "../../api/auth";
import ContainerView from "../../components/ContainerView";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

const HEIGHT = Dimensions.get("window").height;

class ForgotScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = { email: "" };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidUpdate(prevProps) {
    if (
      !prevProps.auth.resetPasswordResult &&
      this.props.auth.resetPasswordResult
    ) {
      Alert.alert(
        "Password Reset Success",
        `An account recovery email has been sent to ${this.state.email}. `
      );
    }
    if (
      !prevProps.auth.resetPasswordError &&
      this.props.auth.resetPasswordError
    ) {
      Alert.alert("Password Reset Error", this.props.auth.resetPasswordError);
    }
  }

  handleSubmit = () => {
    this.props.resetPassword(this.state.email.trim());
  };

  render() {
    return (
      <ContainerView>
        <LinearGradient
          colors={[colors.primary, colors.secondary]}
          style={{ flex: 1 }}
        >
          <KeyboardAwareScrollView contentContainerStyle={{ flexGrow: 1 }}>
            <View
              style={{
                flex: 1,
                alignItems: "center",
                justifyContent: "center"
              }}
              onStartShouldSetResponder={() => true}
            >
              <Text
                style={[
                  global.inputHeader,
                  { marginBottom: 10, width: "90%", maxWidth: 300 }
                ]}
              >
                Forgot Password?
              </Text>
              <Text
                style={[
                  global.textWhite,
                  { marginBottom: 10, width: "90%", maxWidth: 300 }
                ]}
              >
                Enter your email below to receive a password reset link.
              </Text>
              <TextInput
                containerStyle={global.inputContainer}
                keyboardType={"email-address"}
                onChangeText={email => this.setState({ email })}
                value={this.state.email}
                onSubmitEditing={this.handleSubmit}
              />
              <Button
                title={"Submit"}
                style={{ marginVertical: 20 }}
                onPress={this.handleSubmit}
                loading={this.props.auth.resetPasswordLoading}
              />
              <Text
                style={[
                  global.inputHeader,
                  { marginTop: 40, width: "90%", maxWidth: 300 }
                ]}
              >
                Other Log-in Issues?
              </Text>
              <Text
                style={[
                  global.textWhite,
                  { marginBottom: 10, width: "90%", maxWidth: 300 }
                ]}
              >
                we're here to help...
              </Text>
              <Button
                titleStyle={{ color: colors.white }}
                style={{
                  backgroundColor: colors.secondary,
                  alignSelf: "center",
                  marginTop: 20
                }}
                title={"Contact Us"}
                onPress={() =>
                  Linking.openURL("mailto:employeelinkapp@gmail.com")
                }
              />
            </View>
          </KeyboardAwareScrollView>
        </LinearGradient>
      </ContainerView>
    );
  }

  static navigationOptions = () => {
    return {
      headerStyle: global.headerTransparent,
      headerTransparent: true,
      headerTintColor: "#fff"
    };
  };
}

const mapStateToProps = state => {
  return { auth: state.auth };
};

const mapDispatchToProps = dispatch => {
  return {
    resetPassword: email => dispatch(resetPassword(email))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ForgotScreen);
