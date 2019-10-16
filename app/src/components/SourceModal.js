import React from "react";
import {
  Modal,
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  TouchableWithoutFeedback
} from "react-native";
import global, { colors } from "../styles";
import Source from "../components/Source";

type Props = {
  source: Object,
  visible: boolean,
  deleteSource: Function,
  setDefaultSource: Function
};

export default class SourceModal extends React.Component<Props, *> {
  state = { confirmingDelete: false };

  render() {
    const {
      source,
      visible,
      deleteSource,
      setDefaultSource,
      defaultSource,
      onClose
    } = this.props;
    if (!source) {
      return null;
    }
    return (
      <Modal visible={visible} transparent={true}>
        <TouchableWithoutFeedback onPress={onClose}>
          <View
            style={{
              flex: 1,
              backgroundColor: colors.shadow,
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            <View
              style={{
                width: 280,
                backgroundColor: colors.white,
                borderRadius: 10,
                overflow: "hidden"
              }}
            >
              {this.state.confirmingDelete ? (
                <View />
              ) : (
                <View>
                  <Source source={source} />
                  <TouchableOpacity
                    onPress={deleteSource.bind(null, source.id)}
                  >
                    <View style={styles.button}>
                      <Text style={global.text}>DELETE</Text>
                      {this.props.deleteSourceLoading && (
                        <ActivityIndicator
                          color={colors.primary}
                          style={{ position: "absolute", right: 10 }}
                        />
                      )}
                    </View>
                  </TouchableOpacity>
                  {defaultSource !== source.id && (
                    <TouchableOpacity
                      onPress={setDefaultSource.bind(null, source.id)}
                    >
                      <View style={styles.button}>
                        <Text style={global.text}>SET AS DEFAULT</Text>
                        {this.props.updateCustomerLoading && (
                          <ActivityIndicator
                            color={colors.primary}
                            style={{ position: "absolute", right: 10 }}
                          />
                        )}
                      </View>
                    </TouchableOpacity>
                  )}
                </View>
              )}
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: colors.border,
    padding: 15,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center"
  }
});
