// responsible for views of application aka React side
import React from "react";
// react-router-dom contains a set of react-router helpers that help with
// navigating around the dom. BrowserRouter the is brains of react-router, it
// tells react-router how to behave. it looks up the current url and changes the
// views accordingly. The route object is a react component used to set up a
// rule between a certain route and a set of components that will be actually
// visible
import { BrowserRouter, Route } from "react-router-dom";

import Header from "./Header"
const Dashboard = () => <h2>Dashboard</h2>
const SurveyNew = () => <h2>SurveyNew</h2>
const Landing = () => <h2>Landing</h2>

const App = () => {
  return (
    <div>
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
};

export default App;
