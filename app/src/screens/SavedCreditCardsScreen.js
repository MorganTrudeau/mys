import React from "react";
import { Text, View, FlatList } from "react-native";
import global, { colors } from "../styles";
import { getPaymentManager } from "../payment/PaymentManager";
import AddCreditCardNavButton from "../components/AddCreditCardNavButton";
import SavedCreditCardList from "../containers/SavedSourcesList";

class AddNewCreditCardScreen extends React.Component {
  render() {
    console.log("AddNewCreditCardScreen render");
    return (
      <View
        style={{
          flex: 1,
          alignItems: "center",
          backgroundColor: colors.lightGrey
        }}
      >
        <SavedCreditCardList />
      </View>
    );
  }

  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: "Saved Cards",
      headerRight: <AddCreditCardNavButton navigation={navigation} />
    };
  };
}

export default AddNewCreditCardScreen;
