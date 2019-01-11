const mongoose = require("mongoose");
const requireLogin = require("../middlewares/requireLogin");
const requireCredits = require("../middlewares/requireCredits");
const Mailer = require("../services/Mailer");
const surveyTemplate = require("../services/emailTemplates/surveyTemplate");

const Survey = mongoose.model("surveys");

module.exports = app => {
  app.get("/api/surveys/thanks", (req, res) => {
    res.send("Thanks for your feedback!");
  });

  app.post("/api/surveys/webhooks", (req, res) => {
    console.log(req.body);
    res.send({});
  });

  // these arguments are called in line. make sure user is logged in first, then
  // check if user has enough credits, finally create survey if both true
  app.post("/api/surveys", requireLogin, requireCredits, async (req, res) => {
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
    // sends new mailer to sendgrid's api. send function defined in Mailer.js
    const mailer = new Mailer(survey, surveyTemplate(survey));

    try {
      // send out mailer and save survey to database
      await mailer.send();
      await survey.save();
      req.user.credits -= 1;
      const user = await req.user.save();

      // sends back updated user model to reflect correct number of credits
      res.send(user);
  } catch (err) {
    // sends back error assuming user sends poorly formed survey
    res.status(422)
  }
  });
};
