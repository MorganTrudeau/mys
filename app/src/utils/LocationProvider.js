import React from "react";
import { Alert, Platform } from "react-native";
import Geolocation from "react-native-geolocation-service";
import { connect } from "react-redux";
import { savePosition } from "../actions/location";

import { androidHasLocationPermission } from "../utils/permissions";

class LocationProvider extends React.Component {
  watchId = null;

  componentDidUpdate(prevProps) {
    if (
      (!prevProps.firebaseAuth || prevProps.firebaseAuth === "INACTIVE") &&
      this.props.firebaseAuth === "ACTIVE"
    ) {
      this.watchPosition();
    }
    if (
      prevProps.firebaseAuth === "ACTIVE" &&
      this.props.firebaseAuth === "INACTIVE"
    ) {
      if (!!this.watchId) {
        this.clearWatch(this.watchId);
      }
    }
  }

  componentWillUnmount() {
    this.clearWatch();
  }

  clearWatch = () => {
    Geolocation.clearWatch(this.watchId);
  };

  watchPosition = async () => {
    let hasPermission = false;
    if (Platform.OS === "android") {
      hasPermission = await androidHasLocationPermission();
    } else {
      hasPermission = true;
    }
    if (hasPermission) {
      this.watchId = Geolocation.watchPosition(
        async position => {
          const { latitude, longitude, speed } = position.coords;
          this.props.savePosition({ latitude, longitude, speed });
        },
        error => {
          console.log("Geolocation Error", error);
          // switch (error.code) {
          //   case 1:
          //     return Alert.alert(
          //       "Insufficient Permissions",
          //       "Location is required to submit hours. Please allow Employee Link location access in your phone settings."
          //     );
          //   case 2:
          //     return Alert.alert(
          //       "Location Unavailable",
          //       "Check that Location is enabled in your phone settings or try again later."
          //     );
          //   case 3:
          //     return Alert.alert(
          //       "Location Unavailable",
          //       "Request for location timed out. Check internet connection and try again"
          //     );
          //   case 4:
          //     return Alert.alert(
          //       "Location Unavailable",
          //       "Request for location timed out. Check internet connection and try again"
          //     );
          //   case 5:
          //     return Alert.alert(
          //       "Location Unavailable",
          //       "Request for location timed out. Check internet connection and try again"
          //     );
          //   case -1:
          //     return Alert.alert(
          //       "Location Unavailable",
          //       "Request for location timed out. Check internet connection and try again"
          //     );
          // }
        },
        { enableHighAccuracy: true, timeout: 20000, maximumAge: 10000 }
      );
    }
  };

  render() {
    return React.Children.only(this.props.children);
  }
}

const mapStateToProps = state => {
  return {
    loginSuccess: state.auth.loginSuccess,
    firebaseAuth: state.auth.firebaseAuth
  };
};

const mapDispatchToProps = dispatch => {
  return {
    savePosition: position => dispatch(savePosition(position))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LocationProvider);
