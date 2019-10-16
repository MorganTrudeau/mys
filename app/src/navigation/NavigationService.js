import { NavigationActions, SwitchActions } from "react-navigation";

let _navigator;

function setTopLevelNavigator(navigatorRef) {
  _navigator = navigatorRef;
}

function navigate(routeName, params) {
  _navigator.dispatch(
    NavigationActions.navigate({
      routeName,
      params
    })
  );
}

function switchNavigator(routeName) {
  _navigator.dispatch(SwitchActions.jumpTo({ routeName }));
}

function currentRoute() {
  return _navigator.state.routeName;
}

// add other navigation functions that you need and export them

export default {
  navigate,
  switchNavigator,
  currentRoute,
  setTopLevelNavigator
};
