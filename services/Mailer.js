const sendgrid = require("sendgrid");
// sendgrid object that helps create the mailer
const helper = sendgrid.mail;
const keys = require("../config/keys");

// helper.Mail property is an object that takes a lot of configuration and
// returns a mailer. We extend that mailer object to tag on additional
// functaionalities and properties
class Mailer extends helper.Mail {
  constructor({ subject, recipients }, content) {
    super();
    // sendgrid specific code
    // creates an object assigned to sgApi to communicate with sendgrid's API
    this.sgApi = sendgrid(keys.sendGridKey);
    // who the email is sent from
    this.from_email = new helper.Email("no-reply@wudi.com");
    // subject line of the email
    this.subject = subject;
    // content of email
    this.body = new helper.Content("text/html", content);
    // list of recipients
    this.recipients = this.formatAddresses(recipients);

    // addContent is a built-in functionality of helper.Mail. This function
    // makes sure the body gets added to the actual content
    this.addContent(this.body);
    this.addClickTracking();
    // actually adds recipients to mailer
    this.addRecipients();
  }

  formatAddresses(recipients) {
    return recipients.map(({ email }) => {
      // returns helper.Email objects for each recipient email
      return new helper.Email(email);
    });
  }

  // enables click tracking for sendgrid to know what recipients click
  addClickTracking() {
    const trackingSettings = new helper.TrackingSettings();
    const clickTracking = new helper.ClickTracking(true, true);

    trackingSettings.setClickTracking(clickTracking);
    this.addTrackingSettings(trackingSettings);
  }

  addRecipients() {
    const personalize = new helper.Personalization();
    this.recipients.forEach(recipient => {
      // adds each recipient to the personalize object
      personalize.addTo(recipient);
    });
    // add the entire personalize object
    this.addPersonalization(personalize);
  }

  // async function to send the entire Mailer to sendgrid's api to send to recipients
  async send() {
    const request = this.sgApi.emptyRequest({
      method: "POST",
      path: "/v3/mail/send",
      body: this.toJSON()
    });
    const response = this.sgApi.API(request);
    return response;
  }
}

module.exports = Mailer;
