import Rate, { AndroidMarket } from "react-native-rate";
import { Alert, AsyncStorage, Platform } from "react-native";
import moment from "moment";

export async function rateApp(inAppOnly, withTimeout) {
    let preferInApp = true;
    let inAppRatingDates = [];
    const inAppRatingDatesJSON = await getRatingDates();
    if (inAppRatingDatesJSON === null) {
        return saveRatingDate(inAppRatingDates);
    } else {
        inAppRatingDates = JSON.parse(inAppRatingDatesJSON);
        console.log("In app rating dates", inAppRatingDates);
    }
    if (
        inAppOnly &&
        (moment().diff(inAppRatingDates[0], "days") < 15 ||
            inAppRatingDates.length > 1)
    ) {
        console.log("Preventing in app rating");
        return;
    }
    if (inAppRatingDates.length === 4) {
        if (moment().diff(inAppRatingDates[1], "years") === 0) {
            preferInApp = false;
        } else {
            inAppRatingDates = [moment().format("YYYY-MM-DD")];
        }
    }
    let options = {
        AppleAppID: "1397280601",
        GooglePackageName: "com.morgantrudeau.employeelink",
        OtherAndroidURL:
            "https://play.google.com/store/apps/details?id=com.morgantrudeau.employeelink",
        preferredAndroidMarket: AndroidMarket.Google,
        preferInApp,
        openAppStoreIfInAppFails: !inAppOnly && inAppRatingDates.length === 4,
        fallbackPlatformURL: "http://www.employeelinkapp.ca"
    };
    if (inAppOnly && Platform.OS === "android") {
        Alert.alert("Enjoying Employee Link?", "We appreciate your feedback!", [
            { text: "Later", onPress: () => resetRatingDates() },
            {
                text: "Rate",
                onPress: () => completeRating(options, withTimeout, inAppRatingDates)
            }
        ]);
    } else {
        completeRating(options, withTimeout, inAppRatingDates);
    }
}

function completeRating(options, withTimeout, dates) {
    setTimeout(
        () =>
            Rate.rate(options, success => {
                if (success) {
                    console.log("Rating successful");
                } else {
                    console.log("Rating error");
                }
            }),
        withTimeout ? 100 : 0
    );
    saveRatingDate(dates);
}

async function getRatingDates() {
    try {
        return await AsyncStorage.getItem("IN_APP_RATINGS");
    } catch (error) {
        console.log("Get rating dates error", error);
    }
}

function saveRatingDate(dates) {
    try {
        if (dates.length < 4) {
            dates.push(moment().format("YYYY-MM-DD"));
            AsyncStorage.setItem("IN_APP_RATINGS", JSON.stringify(dates));
        }
    } catch (error) {
        console.log("Save rating dates error", error);
    }
}

function resetRatingDates() {
    AsyncStorage.setItem(
        "IN_APP_RATINGS",
        JSON.stringify([moment().format("YYYY-MM-DD")])
    );
}
