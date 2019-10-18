import React, { Component } from "react";
import Main from "./containers/Main";

import { Provider } from "react-redux";
import store from "./store";
import "./styles/index.css";
import Navigation from "./components/Navigation/Navigation";

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Navigation />
        <Main />
      </Provider>
    );
  }
}

export default App;
