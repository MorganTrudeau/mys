import React from "react";
import { Modal, Text, View, Alert } from "react-native";
import CreditCardInput from "../components/CreditCardInput";
import Checkbox from "../components/Checkbox";
import global, { colors } from "../styles";
import AppButton from "../components/AppButton";
import { getPaymentManager } from "../payment/PaymentManager";
import { connect } from "react-redux";
import { NavigationActions } from "react-navigation";
import Icon from "../components/Icon";

const paymentManager = getPaymentManager();

type Props = {
  onClose: Function,
  onAddSource: Function
};

class AddSourceModal extends React.Component<Props, *> {
  state = {
    saveCard: false,
    card: { valid: false, number: "", expMonth: null, expYear: null, cvc: "" },
    addingCard: false
  };

  componentDidMount() {
    this.cardInput && this.cardInput.focus();
  }

  componentDidUpdate(prevProps, prevState) {
    if (!prevProps.saveSourceError && this.props.saveSourceError) {
      this.loadingEnd();
      Alert.alert(
        "Save Card Error",
        "There was a problem saving your card please try again."
      );
    }
    if (!prevProps.saveSourceSuccess && this.props.saveSourceSuccess) {
      this.props.onAddSource(this.props.saveSourceSuccess);
      this.props.onClose();
    }
    if (!prevProps.visible && this.props.visible) {
      this.cardInput && this.cardInput.focus();
    }
  }

  setCardInputRef = r => (this.cardInput = r);

  handleCreditCardInputParamsChange = (valid, params) => {
    this.setState({ valid, card: { ...this.state.card, ...params } });
  };

  handleAddCard = async () => {
    this.loadingStart();
    const cardInfo = this.state.card;
    try {
      const res = await paymentManager.createTokenWithCard(cardInfo);
      if (res) {
        const { tokenId, card } = res;
        if (this.state.saveCard) {
          this.props.saveSource(tokenId);
        } else {
          this.props.addTempSource(card);
          this.props.onAddSource(card);
          this.onClose();
        }
      }
    } catch (error) {
      this.loadingEnd();
      console.log("Failed to add card", error);
      Alert.alert(
        "Add Card Error",
        "There was a problem adding your card. Please try again."
      );
    }
  };

  onClose = () => {
    this.loadingEnd();
    this.props.onClose();
  };

  loadingStart = () => this.setState({ addingCard: true });
  loadingEnd = () => this.setState({ addingCard: false });

  render() {
    return (
      <Modal
        visible={this.props.visible}
        transparent={true}
        animationType={"slide"}
      >
        <View
          style={{
            flex: 1,
            paddingTop: 70,
            paddingHorizontal: 20,
            backgroundColor: colors.shadow
          }}
        >
          <View
            style={{
              flex: 1,
              backgroundColor: colors.white,
              borderTopRightRadius: 15,
              borderTopLeftRadius: 15
            }}
          >
            <View
              style={{
                ...global.itemContainer,
                ...global.row,
                width: "100%",
                justifyContent: "center"
              }}
            >
              <Text style={{ ...global.title }}>Add Card</Text>
              <Icon
                asset={require("../assets/img/close.png")}
                size={18}
                style={{ position: "absolute", right: 10 }}
                onPress={this.props.onClose}
              />
            </View>
            <View style={{ padding: 20, paddingTop: 40, alignItems: "center" }}>
              <CreditCardInput
                innerRef={this.setCardInputRef}
                onParamsChange={this.handleCreditCardInputParamsChange}
              />
              <View style={{ flexDirection: "row", marginTop: 20 }}>
                <Checkbox
                  active={this.state.saveCard}
                  onPress={() =>
                    this.setState({ saveCard: !this.state.saveCard })
                  }
                />
                <Text style={{ ...global.text, marginLeft: 8 }}>
                  I want to save this card for future use
                </Text>
              </View>
              <AppButton
                onPress={this.handleAddCard}
                loading={this.state.addingCard}
                title={"ADD NEW CARD"}
                spinnerColor={colors.white}
                style={{ backgroundColor: colors.primary, marginTop: 20 }}
                titleStyle={{ color: colors.white }}
              />
            </View>
          </View>
        </View>
      </Modal>
    );
  }

  static navigationOptions = () => {
    return { headerTitle: "Add New Card" };
  };
}

import * as StripeActions from "../actions/stripe";

const mapStateToProps = state => {
  return {
    savedSources: state.stripe.savedSources,
    saveSourceLoading: state.stripe.saveSourceLoading,
    saveSourceError: state.stripe.saveSourceError,
    saveSourceSuccess: state.stripe.saveSourceSuccess
  };
};

const mapDispatchToProps = dispatch => {
  return {
    saveSource: source => dispatch(StripeActions.saveSource(source)),
    addTempSource: card => dispatch(StripeActions.addTempSource(card))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddSourceModal);
