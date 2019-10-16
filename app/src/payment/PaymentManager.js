import stripe from "tipsi-stripe";
import * as StripeApi from "../api/stripe";
import { store } from "../store";

let paymentManager;
export const getPaymentManager = () => {
  if (!paymentManager) {
    paymentManager = new PaymentManager();
  }
  return paymentManager;
};

class PaymentManager {
  dispatch = null;

  init = dispatch => {
    stripe.setOptions({
      publishableKey: "pk_test_8Dr0oY4ib2bivUKJ7mSXTsmS00PjVywTtW",
      androidPayMode: "test"
    });
    this.dispatch = dispatch;
  };

  destroy = () => {};

  onStoreUpdate = () => {
    const currentState = store.getState();
    const { user, stripe } = currentState;
    if (user.active && user.active.customerId && !stripe.customer) {
      this.fetchCustomer(user.active.customerId);
    }
  };

  createTokenWithCard = async card => {
    const token = await stripe.createTokenWithCard(card);
    console.log("Token", token);
    return token;
  };

  createCustomer = async (tokenId, card) => {
    return await this.dispatch(StripeApi.createCustomer(tokenId, card));
  };

  fetchCustomer = async customerId => {
    return await this.dispatch(StripeApi.fetchCustomer(customerId));
  };

  addCardToCustomer = async tokenId => {
    return await this.dispatch(StripeApi.updateCustomer(tokenId));
  };

  chargeCustomer = async customer => {
    return await this.dispatch(StripeApi.chargeCustomer(customer));
  };
}
