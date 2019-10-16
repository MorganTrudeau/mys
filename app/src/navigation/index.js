import React from "react";
import { View } from "react-native";
import { connect } from "react-redux";
import NavigationService from "./NavigationService";
import { createSwitchNavigator, createAppContainer } from "react-navigation";
import { createDrawerNavigator } from "react-navigation-drawer";
import { createStackNavigator } from "react-navigation-stack";
import AddNewCreditCardScreen from "../screens/AddSavedSourceScreen";
import SavedCreditCardsScreen from "../screens/SavedCreditCardsScreen";
import CheckoutScreen from "../screens/CheckoutScreen";
import SplashScreen from "../screens/SplashScreen";
import HomeScreen from "../screens/HomeScreen";
import SettingsScreen from "../screens/SettingsScreen";
import DrawerButton from "../components/DrawerButton";
import DrawerContent from "../components/Drawer";
// auth screens
import PhoneNumberInputScreen from "../screens/auth/PhoneNumberInputScreen";
import CodeVerificationScreen from "../screens/auth/CodeVerificationScreen";
import EmailInputScreen from "../screens/auth/EmailInputScreen";
import DisplayNameInputScreen from "../screens/auth/DisplayNameInputScreen";
import LoginScreen from "../screens/auth/LoginScreen";
import SignUpScreen from "../screens/auth/SignUpScreen";
import ForgotPasswordScreen from "../screens/auth/ForgotPasswordScreen";
import globalStyles, { colors } from "../styles";
import { fetchActiveUser } from "../actions/user";

class Navigator extends React.Component {
  navigator = null;

  componentWillMount() {
    this.initNavigator(this.props);
  }

  componentDidUpdate(prevProps) {
    if (
      prevProps.firebaseAuth !== this.props.firebaseAuth &&
      this.props.firebaseAuth === "INACTIVE"
    ) {
      this.initNavigator();
    }
    if (
      (prevProps.activeUserSetUp !== this.props.activeUserSetUp ||
        prevProps.firebaseAuth !== this.props.firebaseAuth) &&
      this.props.firebaseAuth === "ACTIVE" &&
      this.props.activeUserSetUp
    ) {
      this.initNavigator();
    }
  }

  initNavigator = () => {
    const { activeUserSetUp, firebaseAuth } = this.props;

    const AuthStack = createStackNavigator(
      {
        PhoneNumberInputScreen,
        CodeVerificationScreen,
        EmailInputScreen,
        DisplayNameInputScreen,
        LoginScreen,
        SignUpScreen,
        ForgotPasswordScreen
      },
      {
        initialRouteName: "PhoneNumberInputScreen",
        headerMode: "screen",
        defaultNavigationOptions: {
          header: null
        }
      }
    );

    const Drawer = createDrawerNavigator(
      {
        Home: this._wrapInStackNavigatorAndroid("HomeScreen", HomeScreen),
        Settings: this._wrapInStackNavigatorAndroid(
          "SettingsScreen",
          SettingsScreen
        )
      },
      {
        navigationOptions: { header: null },
        drawerPosition: "left",
        drawerWidth: 200,
        contentOptions: {
          activeTintColor: colors.primary
        }
      }
    );

    const MainStack = createStackNavigator({
      Drawer,
      SavedCreditCardsScreen,
      AddNewCreditCardScreen,
      CheckoutScreen
    });

    let initialRouteName = "SplashScreen";
    if (firebaseAuth === "ACTIVE" && activeUserSetUp) {
      initialRouteName = "MainStack";
    }
    if (firebaseAuth === "INACTIVE") {
      initialRouteName = "AuthStack";
    }
    const Switch = createSwitchNavigator(
      { SplashScreen, AuthStack, MainStack },
      { initialRouteName, headerMode: "screen" }
    );

    this.navigator = createAppContainer(Switch);

    this.forceUpdate();
  };

  _wrapInStackNavigatorAndroid = (routeName, component) =>
    createStackNavigator(
      {
        [routeName]: { screen: component }
      },
      {
        defaultNavigationOptions: ({ navigation }) =>
          this._navigationOptions(navigation)
      }
    );

  _navigationOptions = navigation => {
    return {
      headerStyle: globalStyles.headerTransparent,
      headerMode: "screen",
      headerBackTitle: null,
      headerLeft: DrawerButton,
      headerRight: <View style={{ width: 40 }} />
    };
  };

  render() {
    const AppNavigator = this.navigator;
    return (
      <AppNavigator
        ref={navigatorRef => {
          NavigationService.setTopLevelNavigator(navigatorRef);
        }}
      />
    );
  }
}

const mapStateToProps = state => {
  return {
    authData: state.auth.data,
    firebaseAuth: state.auth.firebaseAuth,
    activeUserSetUp: state.user.activeUserSetUp
  };
};

const mapDispatchToProps = dispatch => {
  return { fetchActiveUser: id => dispatch(fetchActiveUser(id)) };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Navigator);
