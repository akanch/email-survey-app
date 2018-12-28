const mongoose = require("mongoose");
const requireLogin = require("../middlewares/requireLogin");
const requireCredits = require("../middlewares/requireCredits");

const Survey = mongoose.model("surveys");

module.exports = app => {
  // these arguments are called in line. make sure user is logged in first, then
  // check if user has enough credits, finally create survey if both true
  app.post("/api/surveys", requireLogin, requireCredits, (req, res) => {
    const { title, subject, body, recipients } = req.body;
    // creates new instance of a survey in memory
    const survey = new Survey({
      title,
      subject,
      body,
      // split the csl file into an array of emails, and map each email to an
      // object with a property email that contains each recipient's email. code
      // condensed with ES6
      recipients: recipients.split(",").map(email => ({ email })),
      _user: req.user.id,
      dateSent: Date.now()
    });
  });
};
