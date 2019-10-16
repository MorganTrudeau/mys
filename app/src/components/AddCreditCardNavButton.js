import React from "react";
import { TouchableWithoutFeedback, Text, Image } from "react-native";
import { NavigationActions } from "react-navigation";
import global, { colors } from "../styles";

import { getPaymentManager } from "../payment/PaymentManager";
const paymentManager = getPaymentManager();

const AddCreditCardNavButton = ({ navigation }) => (
  <TouchableWithoutFeedback
    onPress={() =>
      navigation.dispatch(
        NavigationActions.navigate({ routeName: "AddNewCreditCardScreen" })
      )
    }
  >
    <Image
      source={require("../assets/img/add.png")}
      style={{ height: 22, width: 22, tintColor: colors.header, marginHorizontal: 10 }}
      resizeMode={"contain"}
    />
  </TouchableWithoutFeedback>
);

export default AddCreditCardNavButton;
