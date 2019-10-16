import React from "react";
import {
  KeyboardAvoidingView,
  SafeAreaView,
  Text,
  View,
  LayoutAnimation,
  StyleSheet,
  TextInput
} from "react-native";
import AppHeader from "../../components/AppHeader";
import globalStyles, { colors } from "../../styles";
import ProgressionFooter from "../../components/ProgressionFooter";
import AppTextInput from "../../components/AppTextInput";
import { getAuthManager } from "../../utils/AuthManager";
import { NavigationActions } from "react-navigation";
import { connect } from "react-redux";

const AuthManager = getAuthManager();

class EmailInputScreen extends React.PureComponent {
  state = { email: "", password: "", view: "email" };

  componentDidMount() {
    this.emailInput.focus();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.view !== this.state.view) {
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    }
  }

  onEmailChangeText = email => this.setState({ email });
  onPasswordChangeText = password => this.setState({ password });

  onNext = async () => {
    if (this.state.view === "email") {
      this.setState({ view: "password" }, () =>
        setTimeout(() => this.passwordInput.focus(), 1)
      );
    } else {
      try {
        await AuthManager.linkEmail(this.state.email, this.state.password);
      } catch (errorCode) {
        switch (errorCode) {
          case "auth/invalid-email":
          case "auth/email-already-in-use":
            this.setState({ view: "email" });
        }
      }
    }
  };

  onBack = () => {
    if (this.state.view === "password") {
      this.setState({ view: "email" }, () =>
        setTimeout(() => this.emailInput.focus(), 1)
      );
    } else {
      this.props.navigation.dispatch(NavigationActions.back());
    }
  };

  setEmailInputRef = r => (this.emailInput = r);
  setPasswordInputRef = r => (this.passwordInput = r);

  render() {
    return (
      <KeyboardAvoidingView behavior={"padding"} style={{ flex: 1 }}>
        <SafeAreaView style={{ flex: 1 }}>
          <AppHeader onBack={this.onBack} />
          <View style={styles.content}>
            {this.state.view === "email" ? (
              <View>
                <Text style={styles.title}>What's your email address?</Text>
                <AppTextInput
                  ref={this.setEmailInputRef}
                  onChangeText={this.onEmailChangeText}
                  value={this.state.email}
                  placeholder={"example@mail.com"}
                  onSubmitEditing={() =>
                    this.state.email !== "" ? this.onNext() : null
                  }
                />
              </View>
            ) : (
              <View>
                <Text style={styles.title}>Enter a password</Text>
                <AppTextInput
                  ref={this.setPasswordInputRef}
                  onChangeText={this.onPasswordChangeText}
                  value={this.state.password}
                  placeholder={"Minimum 6 characters"}
                  type={"password"}
                  onSubmitEditing={() =>
                    this.state.password !== "" ? this.onNext() : null
                  }
                />
              </View>
            )}
          </View>

          <ProgressionFooter
            onNext={this.onNext}
            disabled={
              (this.state.view === "email" && this.state.email === "") ||
              (this.state.view === "password" && this.state.password === "")
            }
            loading={this.props.loading}
          />
        </SafeAreaView>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  content: {
    paddingHorizontal: 20,
    paddingVertical: 30,
    flex: 1
  },
  title: { ...globalStyles.textExtraLarge, marginBottom: 20 }
});

export default connect(state => ({ loading: state.auth.loading }))(
  EmailInputScreen
);
