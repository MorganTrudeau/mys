import React from "react";
import { View } from "react-native";
import RootStack from "./navigation";
import { Provider } from "react-redux";
import { store, persistor } from "./store";
import { PersistGate } from "redux-persist/lib/integration/react";
import RootManager from "./utils/RootManager";
import LocationProvider from "./utils/LocationProvider";

export default class App extends React.Component {
  render() {
    return (
      <View style={{ flex: 1 }}>
        <Provider store={store}>
          <PersistGate persistor={persistor}>
            <RootManager>
              <LocationProvider>
                <View style={{ flex: 1 }}>
                  <RootStack />
                </View>
              </LocationProvider>
            </RootManager>
          </PersistGate>
        </Provider>
      </View>
    );
  }
}
