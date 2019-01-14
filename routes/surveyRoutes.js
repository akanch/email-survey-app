const mongoose = require("mongoose");
const requireLogin = require("../middlewares/requireLogin");
const requireCredits = require("../middlewares/requireCredits");
const Mailer = require("../services/Mailer");
const surveyTemplate = require("../services/emailTemplates/surveyTemplate");
const _ = require("lodash");
const { Path } = require("path-parser");
const { URL } = require("url");

const Survey = mongoose.model("surveys");

module.exports = app => {
  app.get("/api/surveys", requireLogin, async (req, res) => {
    const surveys = await Survey.find({ _user: req.user.id })
      .select({ recipients: false });

    res.send(surveys);
  });

  app.get("/api/surveys/:surveyId/:choice", (req, res) => {
    res.send("Thanks for your feedback!");
  });

  app.post("/api/surveys/webhooks", (req, res) => {
    const p = new Path("/api/surveys/:surveyId/:choice");

    _.chain(req.body)
      .map(({ email, url }) => {
        // extracts the path from the event url
        // extracts survey id and response from pathname variable. If there is no
        // surveyId or choice, p.test(pathname) will return null
        const match = p.test(new URL(url).pathname);
        if (match) {
          return { email, surveyId: match.surveyId, choice: match.choice };
        }
      })
      // removes any elements that are undefined and any duplicate records
      .compact()
      .uniqBy("email", "surveyId")
      .each(({ surveyId, email, choice }) => {
        // Query goes through entire survey collection and finds the survey with
        // same surveyId, and then go through its recipients sub-document collection and
        // find one record that matches the same email, with a responded property false.
        // the second argument instructs mongoose how to update the survey record.
        // First, it finds the choice property and increments yes or no by one. Next, it
        // looks into the recipients sub-document collection at the record matched from
        // elemMatch and updates the responded property to true.Lastly, it sets the
        // lastResponded date to the current date. All of this is done inside of Mongo
        Survey.updateOne(
          {
            _id: surveyId,
            recipients: {
              $elemMatch: { email: email, responded: false }
            }
          },
          {
            $inc: { [choice]: 1 },
            $set: { "recipients.$.responded": true },
            lastResponded: new Date()
          }
        ).exec();
      })
      .value();

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
      res.status(422);
    }
  });
};
