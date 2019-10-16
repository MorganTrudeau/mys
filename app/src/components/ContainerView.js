import React from "react";
import { View, Keyboard, TouchableWithoutFeedback } from "react-native";

const ContainerView = props => (
    <TouchableWithoutFeedback {...props} onPress={() => Keyboard.dismiss()}>
        {props.children}
    </TouchableWithoutFeedback>
);

export default ContainerView;
