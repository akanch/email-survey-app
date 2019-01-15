import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchSurveys } from "../../actions";

class SurveyList extends Component {
  // anytime this component is rendered to the screen, the fetchSurveys action
  // creator is called
  componentDidMount() {
    this.props.fetchSurveys();
  }

  render() {
    return (
      <div>
        SurveyList
      </div>
    );
  }
}


function mapStateToProps({ surveys }) {
  return { surveys };
}

export default connect(mapStateToProps, { fetchSurveys })(SurveyList);
