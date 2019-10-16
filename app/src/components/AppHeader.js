import React from "react";
import { View } from "react-native";
import { withNavigation, NavigationActions } from "react-navigation";
import { Header } from "react-navigation-stack";
import { colors } from "../styles";
import Icon from "./Icon";

const AppHeader = ({ navigation, onBack, hide }) => {
  if (hide) {
    return <View style={{ height: Header.HEIGHT }} />;
  }
  return (
    <View
      style={{
        height: Header.HEIGHT,
        justifyContent: "center",
        paddingHorizontal: 15
      }}
    >
      <Icon
        onPress={() =>
          onBack ? onBack() : navigation.dispatch(NavigationActions.back())
        }
        asset={require("../assets/img/arrow-left.png")}
        tint={colors.icon}
        size={22}
      />
    </View>
  );
};

export default withNavigation(AppHeader);
