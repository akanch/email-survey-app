// lodash's map function iterates over an array and returns a new a array with
// different records inside of it
import _ from "lodash";
import React, { Component } from "react";
// reduxForm helps us communicate with our redux store and Field is a helper
// that allows us to render any type of html form elements
import { reduxForm, Field } from "redux-form";
import SurveyField from "./SurveyField";
import { Link } from "react-router-dom";
import validateEmails from "../../utils/validateEmails";
import formFields from "./formFields"

// handleSubmit is a function provided from the reduxForm that was wired
// on the bottom. the function passed in will be automatically called
// when a user submits the form
class SurveyForm extends Component {
  renderFields() {
    return _.map(formFields, ({ label, name }) => {
      return (
        <Field
          key={name}
          component={SurveyField}
          type="text"
          label={label}
          name={name}
        />
      );
    });
  }
  render() {
    return (
      <div>
        <form onSubmit={this.props.handleSubmit(this.props.onSurveySubmit)}>
          {this.renderFields()}
          <Link to="/surveys" className="red btn-flat white-text">
            Cancel
          </Link>
          <button type="submit" className="teal btn-flat right white-text">
            Next
            <i className="material-icons right">done</i>
          </button>
        </form>
      </div>
    );
  }
}

// validate function takes an object that includes all the values entered by
// the user when creating a survey. If the errors object received back by
// reduxForm is empty, reduxForm assumes there are no errors. When the errors
// object is returned and there is an error, reduxForm looks at the properties
// of the errors object. If any of the property names matches with the name of
// one of the fields, reduxForm will automatically take the error we set here
// and pass it as a prop for our field component
function validate(values) {
  const errors = {};

  errors.recipients = validateEmails(values.recipients ||  "");

  _.each(formFields, ({ name, label }) => {
    if (!values[name]) {
      errors[name] = `You must provide a ${label.toLowerCase()}`;
    }
  });

  return errors;
}

// reduxForm takes in one argument to help customize behavior of the form, it
// wires up some additional props from reduxForm to our SurveyForm component.
// destroyOnUnmount helps to persist data when toggling between SurveyNew and
// SurveyFormReview
export default reduxForm({
  validate,
  form: "surveyForm",
  destroyOnUnmount: false
})(SurveyForm);
