import React from "react";
import { Alert, View } from "react-native";
import { connect } from "react-redux";
import SourceList from "../components/SourceList";
import {
  deleteSource,
  updateCustomer,
  fetchSavedSources
} from "../actions/stripe";
import SourceModal from "../components/SourceModal";

class SavedSourcesList extends React.Component {
  constructor(props) {
    super(props);
    this.state = { selectedSource: null };
  }

  componentDidMount() {
    this.props.fetchSavedSources();
  }

  componentDidUpdate(prevProps) {
    if (
      (!prevProps.deleteSourceSuccess && this.props.deleteSourceSuccess) ||
      (!prevProps.updateCustomerSuccess && this.props.updateCustomerSuccess)
    ) {
      this.setState({ selectedSource: null });
    }
    if (!prevProps.deleteSourceError && this.props.deleteSourceError) {
      Alert.alert(
        "Server Error",
        "There was a problem deleting your card. Please try again."
      );
    }
    if (!prevProps.updateCustomerError && this.props.updateCustomerError) {
      Alert.alert(
        "Server Error",
        "There was a problem deleting your card. Please try again."
      );
    }
  }

  openModal = selectedSource => {
    console.log("OPEN SOURCE", selectedSource);
    this.setState({ selectedSource });
  };

  onModalClose = () => this.setState({ selectedSource: null });

  render() {
    const {
      savedSources,
      defaultSource,
      deleteSource,
      setDefaultSource,
      deleteSourceLoading,
      updateCustomerLoading,
      ...rest
    } = this.props;
    return (
      <View style={{ flex: 1 }}>
        <SourceList
          sources={savedSources}
          selectedSource={defaultSource}
          onSourcePress={this.openModal}
          {...rest}
        />
        <SourceModal
          visible={!!this.state.selectedSource}
          source={this.state.selectedSource}
          defaultSource={defaultSource}
          onClose={this.onModalClose}
          deleteSource={deleteSource}
          setDefaultSource={setDefaultSource}
          deleteSourceLoading={deleteSourceLoading}
          updateCustomerLoading={updateCustomerLoading}
        />
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    fetchSavedSourcesLoading: state.stripe.fetchSavedSourcesLoading,
    defaultSource: state.stripe.defaultSource,
    savedSources: state.stripe.savedSources,
    deleteSourceLoading: state.stripe.deleteSourceLoading,
    deleteSourceSuccess: state.stripe.deleteSourceSuccess,
    updateCustomerLoading: state.stripe.updateCustomerLoading,
    updateCustomerError: state.stripe.updateCustomerError,
    updateCustomerSuccess: state.stripe.updateCustomerSuccess
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchSavedSources: () => dispatch(fetchSavedSources()),
    deleteSource: source => dispatch(deleteSource(source)),
    setDefaultSource: default_source =>
      dispatch(updateCustomer({ default_source }))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SavedSourcesList);
