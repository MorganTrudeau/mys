import React from "react";
import { StyleSheet } from "react-native";
import { PaymentCardTextField } from "tipsi-stripe";
import global, { colors } from "../styles";

const CreditCardInput = ({ innerRef, onParamsChange }) => (
  <PaymentCardTextField
    ref={innerRef}
    style={styles.field}
    cursorColor={colors.blue}
    textErrorColor={colors.red}
    placeholderColor={colors.grey}
    numberPlaceholder={"Credit Card Number"}
    expirationPlaceholder={"MM/YY"}
    cvcPlaceholder={"CVV"}
    disabled={false}
    onParamsChange={onParamsChange}
  />
);

const styles = StyleSheet.create({
  field: {
    width: 300,
    color: colors.blue,
    borderColor: "#000",
    borderWidth: 1,
    borderRadius: 5
  }
});

export default CreditCardInput;
