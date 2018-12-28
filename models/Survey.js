const mongoose = require("mongoose");
const { Schema } = mongoose;
const RecipientSchema = require("./Recipient");

const surveySchema = new Schema({
  title: String,
  body: String,
  subject: String,
  // we choose to use a recipient sub-document collection because that allows
  // us to track whether a recipient has responded before. we do not enclose
  // the whole survey as a sub-document collection under a given user because
  // mongodb limits each document to 4mb, and that limits the number of surveys
  // each user can send. by breaking each survey into its own document, the
  // storage limit is changed to how many recipients there can be to each email
  // which is ~200,000
  recipients: [RecipientSchema],
  yes: { type: NUmber, default: 0 },
  no: { type: NUmber, default: 0 },
  // the underscore is optional, just by convention, underscore shows it is
  // a relationship field and it is linked to another model.
  // Schema.Types.ObjectId is the id of the user that owns the record. the
  // ref: User tells mongoose that the reference we are making this to is the
  // User collection
  _user:  { type: Schema.Types.ObjectId, ref: "User" },
  dateSent: Date,
  lastResponded: Date
});

mongoose.model("surveys", surveySchema);
