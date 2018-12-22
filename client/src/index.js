// this file is responsible for Redux/ data setup
import "materialize-css/dist/css/materialize.min.css";
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import reduxThunk from "redux-thunk";

import App from "./components/App";
import reducers from "./reducers";


// store takes all the reducers of the app as the first argument,
// second argument is initial state, last is a middleware call
const store = createStore(reducers, {}, applyMiddleware(reduxThunk));

ReactDOM.render(
  // the provider tag is a react component that knows how to read changes from
  // redux store, and informs any new state updates to child components
  // a reducer is a pure function that takes the previous state and action
  // and returns the next state
  <Provider store={store}><App /></Provider>,
  document.querySelector("#root")
);
