import React from "react";
import { View, Text, StyleSheet, Alert } from "react-native";
import { connect } from "react-redux";
import global, { colors } from "../styles";
import CheckoutSourceList from "../containers/CheckoutSourceList";
import FooterButton from "../components/FooterButton";
import { createCharge } from "../actions/stripe";
import { NavigationActions } from "react-navigation";

class CheckoutScreen extends React.Component {
  state = {
    deliveryServiceAmount: (500.0).toFixed(2),
    gst: (500.0 * 0.07).toFixed(2),
    tip: (0.0).toFixed(2),
    total: (505.0).toFixed(2),
    selectedSource: null,
    currency: "usd"
  };

  componentDidUpdate(prevProps) {
    if (!prevProps.createChargeError && this.props.createChargeError) {
      Alert.alert(
        "Payment Failed",
        "We were unable to charge the card. Please try again or use a different card."
      );
    }
    if (!prevProps.createChargeSuccess && this.props.createChargeSuccess) {
      Alert.alert(
        "Payment Success",
        "We have confirmed your payment. Thank you for moving your shit with us.",
        [
          {
            text: "OK",
            onPress: () =>
              this.props.navigation.dispatch(NavigationActions.back())
          }
        ]
      );
    }
  }

  handleSourceSelect = source => {
    this.setState({ selectedSource: source.id });
    console.log("Selected source", source);
  };

  handleCheckout = () => {
    const { selectedSource, total, currency } = this.state;
    if (!selectedSource) {
      return Alert.alert(
        "Select a Payment Method",
        "Before proceeding you must select a method of payment."
      );
    } else {
      this.props.chargeSource(selectedSource, total * 100, currency);
    }
  };

  render() {
    const { deliveryServiceAmount, gst, tip, total } = this.state;
    return (
      <View style={global.container}>
        <View style={{ flex: 1 }}>
          <View style={global.itemContainerWhite}>
            <Text style={global.title}>Invoice</Text>
          </View>
          <View style={[global.itemContainer]}>
            <View style={styles.invoiceItem}>
              <Text style={global.text}>Delivery Service</Text>
              <Text style={global.text}>
                ${deliveryServiceAmount.toString()}
              </Text>
            </View>
            <View style={styles.invoiceItem}>
              <Text style={global.text}>GST</Text>
              <Text style={global.text}>${gst.toString()}</Text>
            </View>
            <View style={styles.invoiceItem}>
              <Text style={global.text}>Driver Tip</Text>
              <Text style={global.text}>${tip.toString()}</Text>
            </View>
          </View>
          <View style={global.itemContainer}>
            <View style={{ ...styles.invoiceItem, margin: 0 }}>
              <Text style={global.text}>Total</Text>
              <Text style={global.title}>${total.toString()}</Text>
            </View>
          </View>
          <View style={global.itemContainer}>
            <Text style={global.title}>Select Card</Text>
          </View>
          <CheckoutSourceList onSourceSelect={this.handleSourceSelect} />
        </View>
        <FooterButton
          text={"Checkout"}
          onPress={this.handleCheckout}
          loading={this.props.createChargeLoading}
        />
      </View>
    );
  }

  static navigationOptions = ({ navigation }) => {
    return { headerTitle: "Payment" };
  };
}

const styles = StyleSheet.create({
  invoiceItem: { ...global.row, justifyContent: "space-between", padding: 4 }
});

const mapStateToProps = state => {
  return {
    createChargeLoading: state.stripe.createChargeLoading,
    createChargeError: state.stripe.createChargeError,
    createChargeSuccess: state.stripe.createChargeSuccess
  };
};

const mapDispatchToProps = dispatch => {
  return {
    chargeSource: (source, amount, currency) =>
      dispatch(createCharge(source, amount, currency))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CheckoutScreen);
