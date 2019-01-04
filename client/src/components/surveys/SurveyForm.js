import React, { Component } from "react";
// reduxForm helps us communicate with our redux store
import { reduxForm } from "redux-form";

class SurveyForm extends Component {
  render() {
    return (
      <div>
        Survey Form!
      </div>
    );
  }
}

// reduxForm takes in one argument to help customize behavior of the form
export default reduxForm({
  form: "surveyForm"
})(SurveyForm);
