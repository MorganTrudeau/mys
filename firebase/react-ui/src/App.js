import React, { Component } from "react";
import Main from "./containers/Main";

import { Provider } from "react-redux";
import store from "./store";
import "./styles/index.css";

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <div className="app">
          <Main />
        </div>
      </Provider>
    );
  }
}

export default App;
