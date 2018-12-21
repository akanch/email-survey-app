// responsible for views of application aka React side
import React, { Component } from "react";
// react-router-dom contains a set of react-router helpers that help with
// navigating around the dom. BrowserRouter the is brains of react-router, it
// tells react-router how to behave. it looks up the current url and changes the
// views accordingly. The route object is a react component used to set up a
// rule between a certain route and a set of components that will be actually
// visible
import { BrowserRouter, Route } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "../actions";

import Header from "./Header";
const Dashboard = () => <h2>Dashboard</h2>;
const SurveyNew = () => <h2>SurveyNew</h2>;
const Landing = () => <h2>Landing</h2>;

class App extends Component {
  // once the component is mounted, figure out whether a user is currently
  // logged in. componentDidMount is the preferred method for mounting initial
  // components
  componentDidMount() {
    this.props.fetchUser();
  }
  render() {
    return (
      <div className="container">
        <BrowserRouter>
          <div>
            <Header />
            <Route exact path="/" component={Landing} />
            <Route exact path="/surveys" component={Dashboard} />
            <Route path="/surveys/new" component={SurveyNew} />
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

// the actions are now assigned to the App as props and can be called e.g.
// this.props.fetchUser() (used in componentDidMount), the first argument is for
// the map state to props function which we don't need here
export default connect(null, actions)(App);
