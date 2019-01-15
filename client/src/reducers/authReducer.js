import { FETCH_USER } from "../actions/types";

// initial state object starts off as undefined, and we set it as null. That way,
// by default, we will return null if we are unsure if the user is currently
// logged in. That prevents issues such as a user having bad wifi to not be shown
// the login button by default even when they are logged in.
export default function(state = null, action) {
  switch (action.type) {
    case FETCH_USER:
      return action.payload || false;
    default:
      return state;
  }
}
