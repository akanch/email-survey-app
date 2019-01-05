// lodash's map function iterates over an array and returns a new a array with
// different records inside of it
import _ from "lodash";
import React, { Component } from "react";
// reduxForm helps us communicate with our redux store and Field is a helper
// that allows us to render any type of html form elements
import { reduxForm, Field } from "redux-form";
import SurveyField from "./SurveyField";

const FIELDS = [
  { label: "Survey Title", name: "title" },
  { label: "Subject Line", name: "subject" },
  { label: "Email Body", name: "body" },
  { label: "Recipient List", name: "emails" }
];

// handleSubmit is a function provided from the reduxForm that was wired
// on the bottom. the function passed in will be automatically called
// when a user submits the form
class SurveyForm extends Component {
  renderFields() {
    return _.map(FIELDS, ({ label, name }) => {
      return (
        <Field key={name} component={SurveyField} type="text" label={label} name={name} />
      );
    });
  }
  render() {
    return (
      <div>
        <form onSubmit={this.props.handleSubmit(values => console.log(values))}>
          {this.renderFields()}
          <button type="submit">Submit</button>
        </form>
      </div>
    );
  }
}

// reduxForm takes in one argument to help customize behavior of the form, it
// wires up some additional props from reduxForm to our SurveyForm component
export default reduxForm({
  form: "surveyForm"
})(SurveyForm);
