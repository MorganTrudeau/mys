import { PermissionsAndroid, Alert } from "react-native";
import Geolocation from "react-native-geolocation-service";

export async function androidHasLocationPermission() {
    try {
        const permission = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
            {
                title: "Location Permission",
                message: "Employee Link needs access to your location to add hours.",
                buttonNegative: "Cancel",
                buttonPositive: "OK"
            }
        );
        if (permission === PermissionsAndroid.RESULTS.GRANTED) {
            return true;
        } else if (permission === "denied") {
            Alert.alert(
                "Insufficient Permissions",
                "Location is required to submit hours. Please enable location access.",
                [
                    { text: "Cancel", onPress: () => {} },
                    { text: "Try again", onPress: () => androidHasLocationPermission() }
                ]
            );
            return false;
        } else if (permission === "never_ask_again") {
            Alert.alert(
                "Insufficient Permissions",
                "Location is required to submit hours. Please allow Employee Link access in the App permissions section in your phone settings.",
                [{ text: "Cancel", onPress: () => {} }]
            );
            return false;
        }
    } catch (error) {
        console.log("Android location permission error", error);
    }
}
