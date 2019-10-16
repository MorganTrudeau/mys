import React from "react";
import { StyleSheet, ActivityIndicator, View } from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import { connect } from "react-redux";
const googleMapsTheme = require("../google_maps_theme");

class Map extends React.Component {
  constructor(props) {
    super(props);
    const { currentPosition } = props;
    this.state = {
      region: currentPosition
        ? {
            latitude: currentPosition?.latitude,
            longitude: currentPosition?.longitude,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01
          }
        : null
    };
  }

  componentDidUpdate(prevProps) {
    if (!prevProps.currentPosition && this.props.currentPosition) {
      this.setState({
        region: {
          latitude: this.props.currentPosition.latitude,
          longitude: this.props.currentPosition.longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01
        }
      });
    }
  }

  render() {
    if (!this.state.region) {
      return (
        <View
          style={{
            ...StyleSheet.absoluteFillObject,
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          <ActivityIndicator />
        </View>
      );
    }
    return (
      <MapView
        style={{ ...StyleSheet.absoluteFillObject }}
        initialRegion={this.state.region}
        provider={PROVIDER_GOOGLE}
        customMapStyle={googleMapsTheme}
      >
        <Marker
          coordinate={{
            latitude: this.props.currentPosition.latitude,
            longitude: this.props.currentPosition.longitude
          }}
        />
      </MapView>
    );
  }
}

const mapState = state => {
  return {
    currentPosition: state.location.currentPosition
  };
};

export default connect(mapState)(Map);
