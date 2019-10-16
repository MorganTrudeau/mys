import React from "react";
import { withNavigation } from "react-navigation";
import { DrawerActions } from "react-navigation-drawer";
import Icon from "../components/Icon";
import { colors } from "../styles";

const DrawerButton = ({navigation}) => {
  return (
    <Icon
      asset={require("../assets/img/menu.png")}
      tint={colors.black}
      size={30}
      onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}
      style={{ marginHorizontal: 15 }}
    />
  );
};

export default withNavigation(DrawerButton);
