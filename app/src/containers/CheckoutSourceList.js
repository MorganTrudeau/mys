import React from "react";
import { Text, TouchableWithoutFeedback, View } from "react-native";
import SourceList from "../components/SourceList";
import AddSourceModal from "../components/AddSourceModal";
import { connect } from "react-redux";
import global from "../styles";
import Icon from "../components/Icon";
import { fetchSavedSources } from "../actions/stripe";

class CheckoutSourceList extends React.Component {
  state = { addSourceModalVisible: false, selectedSource: null };

  componentDidMount() {
    this.props.fetchSavedSources();
  }

  openAddSourceModal = () => this.setState({ addSourceModalVisible: true });

  onModalClose = () => this.setState({ addSourceModalVisible: false });

  handleSourcePress = source => {
    const { onSourceSelect } = this.props;
    typeof onSourceSelect === "function" && onSourceSelect(source);
    this.setState({ selectedSource: source.id });
  };

  handleAddSource = source => {
    const { onSourceSelect } = this.props;
    typeof onSourceSelect === "function" && onSourceSelect(source);
    this.setState({ selectedSource: source.id });
  };

  render() {
    const { tempSources, savedSources } = this.props;
    return (
      <View>
        <TouchableWithoutFeedback onPress={this.openAddSourceModal}>
          <View
            style={[
              global.itemContainerWhite,
              global.row,
              { justifyContent: "space-between" }
            ]}
          >
            <Text style={global.text}>Add New Card</Text>
            <Icon asset={require("../assets/img/arrow-right.png")} size={15} />
          </View>
        </TouchableWithoutFeedback>
        <View style={global.itemContainer}>
          <Text style={global.title}>Saved Cards</Text>
        </View>
        <SourceList
          sources={savedSources}
          onSourcePress={this.handleSourcePress}
          selectedSource={this.state.selectedSource}
        />
        {tempSources.size > 0 && (
          <View style={global.itemContainer}>
            <Text style={global.title}>Temporary Cards</Text>
          </View>
        )}
        <SourceList
          sources={tempSources}
          onSourcePress={this.handleSourcePress}
          selectedSource={this.state.selectedSource}
        />

        <AddSourceModal
          visible={this.state.addSourceModalVisible}
          onAddSource={this.handleAddSource}
          onClose={this.onModalClose}
        />
      </View>
    );
  }
}

const mapStateToProps = state => ({
  savedSources: state.stripe.savedSources,
  tempSources: state.stripe.tempSources
});

const mapDispatchToProps = dispatch => {
  return {
    fetchSavedSources: () => dispatch(fetchSavedSources())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CheckoutSourceList);
