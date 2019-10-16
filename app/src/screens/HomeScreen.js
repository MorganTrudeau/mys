import React from "react";
import { View, StyleSheet } from "react-native";
import global, { colors } from "../styles";
import { connect } from "react-redux";
import AppButton from "../components/AppButton";
import { NavigationActions } from "react-navigation";
import Map from "../containers/Map";

class HomeScreen extends React.Component {
  render() {
    console.log("HomeScreen render");
    return (
      <View style={styles.container}>
        <Map />
        <View style={styles.footer}>
          <AppButton
            title={"Transport It"}
            onPress={() =>
              this.props.navigation.dispatch(
                NavigationActions.navigate({ routeName: "CheckoutScreen" })
              )
            }
          />
        </View>
      </View>
    );
  }

  static navigationOptions = { headerTransparent: true };
}

const mapStateToProps = state => {
  return {
    activeUser: state.user.active
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchCustomer: () => dispatch()
  };
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-end"
  },
  footer: {
    width: "100%",
    backgroundColor: colors.white,
    padding: 20,
    alignItems: "center"
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomeScreen);
