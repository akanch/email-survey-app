// creating a new mongoose model class automatically creates a new collection of
// records inside our database
const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
  googleId: String,
  credits: { type: Number, default: 0 }
});

// load the schema up to mongoose library, first arg is model class name and
// name of schema
mongoose.model("users", userSchema);
