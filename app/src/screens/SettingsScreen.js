import React from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import global, { colors } from "../styles";
import { NavigationActions } from "react-navigation";
import { connect } from "react-redux";
import { rateApp } from "../utils/appRating";
import { logout } from "../api/auth";

const SettingsItem = ({ onPress, title, titleColor }) => (
  <TouchableOpacity
    onPress={onPress}
    style={[global.itemContainerWhite, { marginVertical: 5 }]}
  >
    <Text style={[global.textLarge, titleColor ? { color: titleColor } : {}]}>
      {title}
    </Text>
  </TouchableOpacity>
);

class SettingsScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isRating: false
    };
  }

  navigateToSupport = () => {
    this.props.navigation.dispatch(
      NavigationActions.navigate({ routeName: "SupportScreen" })
    );
  };

  rateApp = () => {
    !this.state.isRating && rateApp();
    this.setState({ isRating: true }, () =>
      setTimeout(() => this.setState({ isRating: false }), 3000)
    );
  };

  navigateToSavedCards = () => {
    this.props.navigation.dispatch(
      NavigationActions.navigate({ routeName: "SavedCreditCardsScreen" })
    );
  };

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: colors.bg, paddingVertical: 5 }}>
        <ScrollView>
          <View style={{ flex: 1 }}>
            <SettingsItem
              onPress={() =>
                this.props.navigation.dispatch(
                  NavigationActions.navigate({ routeName: "AboutScreen" })
                )
              }
              title={"About"}
            />
            <SettingsItem
              onPress={this.navigateToSupport}
              title={"Support and Feedback"}
            />
            <SettingsItem
              onPress={this.rateApp}
              title={"Rate This App"}
              loading={this.state.isRating}
            />
            <SettingsItem
              onPress={this.navigateToSavedCards}
              title={"Saved Cards"}
            />
            <SettingsItem
              onPress={logout}
              title={"Logout"}
              titleColor={colors.red}
            />
          </View>
        </ScrollView>
      </View>
    );
  }

  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: "Settings"
    };
  };
}

const mapStateToProps = state => {
  return {};
};

const mapDispatchToProps = dispatch => {
  return {};
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SettingsScreen);
