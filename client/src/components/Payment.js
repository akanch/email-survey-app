import React, { Component } from "react";
import StripeCheckout from "react-stripe-checkout";
import { connect } from "react-redux";
import * as actions from "../actions";

class Payment extends Component {
  render() {
    return (
      <StripeCheckout
        name="Wudi"
        description="$5 for 5 email credits"
        // amount is measured in cents, the amount is how much we are requesting
        // from the user
        amount={500}
        // token expects to receive a callback function, and it s called after
        // we receive the authorization token from Stripe's api
        token={token => this.props.handleToken(token)}
        // the publishable api key
        stripeKey={process.env.REACT_APP_STRIPE_KEY}
      >
        <button className="btn">
          Add Credits
        </button>
      </StripeCheckout>
    );
  }
}

export default connect(null, actions)(Payment);
