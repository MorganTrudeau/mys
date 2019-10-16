import React from "react";
import { StyleSheet, Text, View, TextInput, Alert } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { signUp } from "../../api/auth";
import global, { colors } from "../../styles";
import { connect } from "react-redux";
import Button from "../../components/AppButton";
import ContainerView from "../../components/ContainerView";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

class SignUpScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      firstName: "",
      lastName: "",
      signUpActive: false
    };
  }

  componentDidUpdate(prevProps) {
    if (!prevProps.auth.signUpError && this.props.auth.signUpError) {
      Alert.alert("Sign Up Error", this.props.auth.signUpError);
    }
  }

  componentWillUnmount() {
    this.setState({ signUpLoading: false });
  }

  signUpUser = async () => {
    let { email, firstName, lastName, password, confirmPassword } = this.state;

    email = email.trim();
    firstName = firstName.trim();
    lastName = lastName.trim();

    if (confirmPassword === password) {
      this.setState({ signUpLoading: true });
      const res = await this.props.signUp(email, password, firstName, lastName);
      console.log(res);
    } else {
      Alert.alert("Sign up failure", "Passwords do not match");
    }
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
            <View style={styles.content} onStartShouldSetResponder={() => true}>
              <View style={[global.inputContainer]}>
                <Text style={global.inputHeader}>Email</Text>
                <TextInput
                  onSubmitEditing={() => this.firstNameInput.focus()}
                  style={[global.text, global.input]}
                  keyboardType={"email-address"}
                  onChangeText={email => this.setState({ email })}
                  value={this.state.email}
                  autoCapitalize={"none"}
                  autoCorrect={false}
                  underlineColorAndroid="transparent"
                  returnKeyType={"next"}
                />
              </View>

              <View style={[global.inputContainer]}>
                <Text style={global.inputHeader}>First Name</Text>
                <TextInput
                  ref={r => (this.firstNameInput = r)}
                  onSubmitEditing={() => this.lastNameInput.focus()}
                  style={[global.text, global.input]}
                  onChangeText={firstName => this.setState({ firstName })}
                  value={this.state.firstName}
                  autoCapitalize={"none"}
                  autoCorrect={false}
                  underlineColorAndroid="transparent"
                  returnKeyType={"next"}
                />
              </View>

              <View style={[global.inputContainer]}>
                <Text style={global.inputHeader}>Last Name</Text>
                <TextInput
                  ref={r => (this.lastNameInput = r)}
                  onSubmitEditing={() => this.passwordInput.focus()}
                  style={[global.text, global.input]}
                  onChangeText={lastName => this.setState({ lastName })}
                  value={this.state.lastName}
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
                  onSubmitEditing={() => this.confirmPasswordInput.focus()}
                  style={[global.text, global.input]}
                  onChangeText={password => this.setState({ password })}
                  value={this.state.password}
                  autoCapitalize={"none"}
                  autoCorrect={false}
                  secureTextEntry={true}
                  underlineColorAndroid="transparent"
                  returnKeyType={"next"}
                />
              </View>

              <View style={global.inputContainer}>
                <Text style={global.inputHeader}>Confirm Password</Text>
                <TextInput
                  ref={r => (this.confirmPasswordInput = r)}
                  onSubmitEditing={this.signUpUser}
                  style={[global.text, global.input]}
                  onChangeText={confirmPassword =>
                    this.setState({ confirmPassword })
                  }
                  value={this.state.confirmPassword}
                  autoCapitalize={"none"}
                  autoCorrect={false}
                  secureTextEntry={true}
                  underlineColorAndroid="transparent"
                  returnKeyType={"go"}
                />
              </View>

              <View
                style={{
                  marginTop: 40,
                  marginBottom: 0
                }}
              >
                <Button
                  title={"SIGN UP"}
                  onPress={this.signUpUser}
                  loading={loading}
                  spinnerColor={colors.black}
                  style={{ backgroundColor: colors.frost }}
                />
              </View>
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

const styles = StyleSheet.create({
  content: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  }
});

const mapStateToProps = state => {
  return { auth: state.auth, loading: state.auth.signUpLoading };
};

const mapDispatchToProps = dispatch => {
  return {
    signUp: (email, password, firstName, lastName) =>
      dispatch(signUp(email, password, firstName, lastName))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignUpScreen);
