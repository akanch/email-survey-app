const sendgrid = require("sendgrid");
// sendgrid object that helps create the mailer
const helper = sendgrid.mail;
const keys = require("../config/keys");

// helper.Mail property is an object that takes a lot of configuration and
// returns a mailer. We extend that mailer object to tag on additional
// functaionalities and properties
class Mailer extends helper.Mail {
  
}
