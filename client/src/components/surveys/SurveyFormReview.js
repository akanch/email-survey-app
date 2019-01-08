import React from "react";
import _ from "lodash";
import { connect } from "react-redux";
import formFields from "./formFields";
import * as actions from "../../actions";
import { withRouter } from "react-router-dom";

const SurveyFormReview = ({ onCancel, formValues, submitSurvey, history }) => {
  const reviewFields = _.map(formFields, ({ name, label }) => {
    return (
      <div key={name}>
        <label>{label}</label>
        <div>{formValues[name]}</div>
      </div>
    );
  });

  return (
    <div>
      <h5>Please confirm your entries</h5>
      {reviewFields}
      <button
        className="yellow white-text btn-flat darken-3"
        onClick={onCancel}
      >
        Back
      </button>
      <button
        className="green btn-flat right white-text"
        onClick={() => submitSurvey(formValues, history)}
      >
        Send Survey
        <i className="material-icons right">email</i>
      </button>
    </div>
  );
};

function mapStateToProps(state) {
  // whatever returned here will be passed as props to SurveyFormReview with the
  // help of the connect function
  return {
    formValues: state.form.surveyForm.values
  };
}

// withRouter connects the SurveyFormReview component with react router. This
// allows SurveyFormReview to know about the history object provided by react
// router. The history object can be accessed on props, and is passed to the
// submitSurvey action creator
export default connect(
  mapStateToProps,
  actions
)(withRouter(SurveyFormReview));
