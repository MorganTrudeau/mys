import React from "react";
import {
  KeyboardAvoidingView,
  SafeAreaView,
  Text,
  View,
  LayoutAnimation,
  StyleSheet
} from "react-native";
import AppHeader from "../../components/AppHeader";
import globalStyles, { colors } from "../../styles";
import ProgressionFooter from "../../components/ProgressionFooter";
import AppTextInput from "../../components/AppTextInput";
import { getAuthManager } from "../../utils/AuthManager";
import { createActiveUser } from "../../actions/user";
import { connect } from "react-redux";

const AuthManager = getAuthManager();

class DisplayNameInputScreen extends React.Component {
  state = { firstName: "", lastName: "", view: "firstName" };

  componentDidMount() {
    this.firstNameInput.focus();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.view !== this.state.view) {
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    }
  }

  onFirstNameTextChange = firstName => this.setState({ firstName });
  onLastNameTextChange = lastName => this.setState({ lastName });

  onNext = async () => {
    if (this.state.view === "firstName") {
      this.setState({ view: "lastName" }, () => {
        setTimeout(() => this.lastNameInput.focus(), 1);
      });
    } else {
      const displayName = `${this.state.firstName.trim()} ${this.state.lastName.trim()}`;
      await AuthManager.updateDisplayName(displayName);
    }
  };

  onBack = () => {
    this.setState({ view: "firstName" }, () => {
      this.firstNameInput.focus();
    });
  };

  setFirstNameInputRef = r => (this.firstNameInput = r);
  setLastNameInputRef = r => (this.lastNameInput = r);

  render() {
    return (
      <KeyboardAvoidingView behavior={"padding"} style={{ flex: 1 }}>
        <SafeAreaView style={{ flex: 1 }}>
          <AppHeader
            hide={this.state.view === "firstName"}
            onBack={this.onBack}
          />
          <View style={styles.content}>
            {this.state.view === "firstName" ? (
              <View>
                <Text style={styles.title}>Whats your first name?</Text>
                <AppTextInput
                  ref={this.setFirstNameInputRef}
                  onChangeText={this.onFirstNameTextChange}
                  value={this.state.firstName}
                  autoCapitalize={"words"}
                  onSubmitEditing={() =>
                    this.state.firstName !== "" ? this.onNext() : null
                  }
                />
              </View>
            ) : (
              <View>
                <Text style={styles.title}>Whats your last name?</Text>
                <AppTextInput
                  ref={this.setLastNameInputRef}
                  onChangeText={this.onLastNameTextChange}
                  value={this.state.lastName}
                  autoCapitalize={"words"}
                  onSubmitEditing={() =>
                    this.state.lastName !== "" ? this.onNext() : null
                  }
                />
              </View>
            )}
          </View>

          <ProgressionFooter
            onNext={this.onNext}
            disabled={
              (this.state.view === "firstName" &&
                this.state.firstName === "") ||
              (this.state.view === "lastName" && this.state.lastName === "")
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

const mapState = state => {
  return {
    loading: state.auth.loading || state.user.fetchLoading
  };
};

const mapDispatch = dispatch => {
  return {
    createActiveUser: authData => dispatch(createActiveUser(authData))
  };
};

export default connect(
  mapState,
  mapDispatch
)(DisplayNameInputScreen);
