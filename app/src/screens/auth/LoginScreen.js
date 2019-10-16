import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Alert,
  SafeAreaView
} from "react-native";
import LinearGradient from "react-native-linear-gradient";
import global, { colors } from "../../styles";
import { auth, deAuth } from "../../api/auth";
import { connect } from "react-redux";
import Button from "../../components/AppButton";
import ContainerView from "../../components/ContainerView";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { NavigationActions } from "react-navigation";

class LoginScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: ""
    };
  }

  componentDidUpdate(prevProps) {
    if (!prevProps.auth.loginError && this.props.auth.loginError) {
      this.setState({ loginActive: false });
      Alert.alert("Login Error", auth.loginError);
    }
  }

  login = () => {
    this.props.auth(this.state.email.trim(), this.state.password);
  };

  navigateToForgotScreen = () => {
    this.props.navigation.dispatch(
      NavigationActions.navigate({ routeName: "ForgotPasswordScreen" })
    );
  };

  render() {
    const { loading } = this.props;
    return (
      <ContainerView>
        <LinearGradient
          colors={[colors.primary, colors.secondary]}
          style={{ flex: 1 }}
        >
          <KeyboardAwareScrollView contentContainerStyle={{ flexGrow: 1 }}>
            <SafeAreaView
              style={styles.container}
              onStartShouldSetResponder={() => true}
            >
              <View style={{ flex: 3, padding: 10, justifyContent: "center" }}>
                {/*<Image*/}
                {/*source={require("../assets/logo-transparent.png")}*/}
                {/*style={{*/}
                {/*alignSelf: "center",*/}
                {/*width: 80,*/}
                {/*height: 110*/}
                {/*}}*/}
                {/*/>*/}
              </View>
              <View
                style={{
                  flex: 5,
                  width: "100%",
                  alignItems: "center"
                }}
              >
                <View style={global.inputContainer}>
                  <Text style={global.inputHeader}>Email</Text>
                  <TextInput
                    onSubmitEditing={() => this.passwordInput.focus()}
                    style={[global.text, global.input]}
                    onChangeText={text => this.setState({ email: text })}
                    value={this.state.email}
                    keyboardType={"email-address"}
                    autoCapitalize={"none"}
                    autoCorrect={false}
                    underlineColorAndroid="transparent"
                    returnKeyType={"next"}
                  />
                </View>
                <View style={global.inputContainer}>
                  <Text style={global.inputHeader}>Password</Text>
                  <TextInput
                    ref={r => (this.passwordInput = r)}
                    onSubmitEditing={this.login}
                    style={[global.text, global.input]}
                    onChangeText={text => this.setState({ password: text })}
                    value={this.state.password}
                    autoCapitalize={"none"}
                    autoCorrect={false}
                    secureTextEntry={true}
                    underlineColorAndroid="transparent"
                    returnKeyType={"go"}
                  />
                  <TouchableOpacity onPress={this.navigateToForgotScreen}>
                    <Text style={[global.textAlt, { marginTop: 10 }]}>
                      Trouble logging in?
                    </Text>
                  </TouchableOpacity>
                </View>
                <View style={{ marginTop: 20 }}>
                  <Button
                    onPress={this.login}
                    title={"LOG IN"}
                    loading={loading}
                    spinnerColor={colors.black}
                    style={{ backgroundColor: colors.frost }}
                  />
                </View>
              </View>
            </SafeAreaView>
          </KeyboardAwareScrollView>
          <SafeAreaView
            style={{
              backgroundColor: colors.frost,
              width: "100%"
            }}
          >
            <TouchableOpacity
              onPress={() =>
                this.props.navigation.dispatch(
                  NavigationActions.navigate({ routeName: "SignUpScreen" })
                )
              }
              style={{
                padding: 15,
                width: "100%",
                justifyContent: "center",
                alignItems: "center"
              }}
            >
              <Text style={global.titleWhite}>Sign Up</Text>
            </TouchableOpacity>
          </SafeAreaView>
        </LinearGradient>
      </ContainerView>
    );
  }

  static navigationOptions = () => {
    return {
      headerStyle: global.headerTransparent,
      headerTransparent: true
    };
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    width: "100%"
  }
});

const mapStateToProps = state => {
  return { auth: state.auth, loading: state.auth.loginLoading };
};

const mapDispatchToProps = dispatch => {
  return {
    auth: (email, password) => dispatch(auth(email, password)),
    logout: () => dispatch(deAuth())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginScreen);
