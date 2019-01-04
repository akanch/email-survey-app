import { combineReducers } from "redux";
import authReducer from "./authReducer";
// import form reducer from redux form
import { reducer as reduxForm } from "redux-form";

export default combineReducers({
  auth: authReducer,
  form: reduxForm
});
