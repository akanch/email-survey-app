// this file holds all our action creators
import axios from "axios";
import { FETCH_USER } from "./types";

// redux thunk is wired up as a middleware. The purpose of redux thunk is to
// inspect whatever value is returned from the action creator. If redux thunk
// sees that a function is returned, redux thunk will automatically call the
// function and pass in the dispatch function as an argument. This allows us to
// dispatch actions whenever we want since we have access to the dispatch
// function. In our case, we only want to dispatch the action after our get
// request has been successfully returned. This allows our get request to be
// asynchronous.
export const fetchUser = () => async dispatch => {
  // use Axios for ajax request
  const res = await axios.get("/api/current_user");
  // once the response is back, then the action is dispatched to the reducers
  dispatch({ type: FETCH_USER, payload: res.data });
};

// this action creator handles the token returned from Stripe API
export const handleToken = (token) => async dispatch => {
  // using a post request to send information along with the request to the backend
  const res = await axios.post("/api/stripe", token);
  dispatch({ type: FETCH_USER, payload: res.data });
};

export const submitSurvey = (values) => {
  return { type: "submit_survey" };
};
