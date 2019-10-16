import { Image, Text, View, TouchableWithoutFeedback } from "react-native";
import global, { colors } from "../styles";
import SelectionIndicator from "./SelectionIndicator";
import React from "react";
import Icon from "../components/Icon";

const Source = ({ source, selected, onPress, style }) => {
  let creditCardImage;
  switch (source.brand) {
    case "Visa":
      creditCardImage = require("../assets/img/visa.png");
      break;
    case "MasterCard":
      creditCardImage = require("../assets/img/mastercard.png");
      break;
  }
  const handlePress =
    typeof onPress === "function" ? () => onPress(source) : () => {};
  return (
    <TouchableWithoutFeedback onPress={handlePress}>
      <View style={[global.itemContainerWhite, global.row]}>
        <Icon asset={creditCardImage} style={{ marginRight: 20 }} size={20} />
        <Text style={{ ...global.text, color: colors.grey, flex: 1 }}>
          •••• {source.last4}
        </Text>
        {selected && <SelectionIndicator />}
      </View>
    </TouchableWithoutFeedback>
  );
};

export default Source;
