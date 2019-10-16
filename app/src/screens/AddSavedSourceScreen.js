import React from "react";
import { SafeAreaView, Text, View, Alert } from "react-native";
import CreditCardInput from "../components/CreditCardInput";
import Checkbox from "../components/Checkbox";
import global, { colors } from "../styles";
import AppButton from "../components/AppButton";
import { getPaymentManager } from "../payment/PaymentManager";
import { connect } from "react-redux";
import { NavigationActions } from "react-navigation";

const paymentManager = getPaymentManager();

class AddSavedSourceScreen extends React.Component {
  state = {
    saveCard: false,
    card: { valid: false, number: "", expMonth: null, expYear: null, cvc: "" }
  };

  componentDidMount() {
    this.cardInput.focus();
  }

  componentDidUpdate(prevProps) {
    if (!prevProps.saveSourceError && this.props.saveSourceError) {
      Alert.alert(
        "Save Card Error",
        "There was a problem saving your card please try again."
      );
    }
    if (!prevProps.saveSourceSuccess && this.props.saveSourceSuccess) {
      this.props.navigation.dispatch(NavigationActions.back());
    }
  }

  setCardInputRef = r => (this.cardInput = r);

  handleCreditCardInputParamsChange = (valid, params) => {
    this.setState({ valid, card: { ...this.state.card, ...params } });
  };

  handleAddCard = async () => {
    const cardInfo = this.state.card;
    try {
      const res = await paymentManager.createTokenWithCard(cardInfo);
      if (res) {
        const { tokenId, card } = res;
        this.props.saveSource(tokenId);
      }
    } catch (error) {
      console.log("Failed to add card", error);
      Alert.alert(
        "Add Card Error",
        "There was a problem adding your card. Please try again."
      );
    }
  };

  render() {
    return (
      <View style={{ flex: 1, alignItems: "center", padding: 20 }}>
        <CreditCardInput
          innerRef={this.setCardInputRef}
          onParamsChange={this.handleCreditCardInputParamsChange}
        />
        <AppButton
          onPress={this.handleAddCard}
          loading={this.props.saveSourceLoading}
          title={"ADD NEW CARD"}
          spinnerColor={colors.white}
          style={{ backgroundColor: colors.primary, marginTop: 20 }}
          titleStyle={{ color: colors.white }}
        />
      </View>
    );
  }

  static navigationOptions = () => {
    return { headerTitle: "Add New Card" };
  };
}

import * as StripeActions from "../actions/stripe";

const mapStateToProps = state => {
  return {
    saveSourceLoading: state.stripe.saveSourceLoading,
    saveSourceError: state.stripe.saveSourceError,
    saveSourceSuccess: state.stripe.saveSourceSuccess
  };
};

const mapDispatchToProps = dispatch => {
  return {
    logout: () => dispatch(deAuth()),
    saveSource: source => dispatch(StripeActions.saveSource(source))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddSavedSourceScreen);
