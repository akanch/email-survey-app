const express = require("express");
const mongoose = require("mongoose");
const cookieSession = require("cookie-session");
const passport = require("passport");
const keys = require("./config/keys");
const bodyParser = require("body-parser");
require("./models/User");
require("./services/passport");

mongoose.connect(keys.mongoURI);

const app = express();

// by default, express does not parse responses from any requests with a request
// body. the body-parser middleware instructs express to automatically parse them
app.use(bodyParser.json());
app.use(
  // cookieSession takes in a configuration object with two properties
  // cookieSession is a middleware that extracts cookie data and assigns it to req.session
  // express-session is another middleware that stores user info in remote database
  // instead of directly on cookie, cookie is limited to store 14kb or data, express-session
  // can store unlimited. We use cookie here because we only need cookie to store user ID
  cookieSession({
    // how long a cookie can exist in a browser before automatic expiration (in ms)
    maxAge: 30 * 24 * 60 * 60 * 1000,
    // key used to encrypt cookie, if more than one key, they will be randomly assigned
    keys: [keys.cookieKey]
  })
);

// 2 middlewares that tell passport to use cookies to handle authentication
app.use(passport.initialize());
app.use(passport.session());

// functions are returned here which are immediately called with the express
// app object
require("./routes/authRoutes")(app);
require("./routes/billingRoutes")(app);

// this code makes sure that express handles everything in production correctly.
// this code will only run in production if in production
if (process.env.NODE_ENV === "production") {
  // makes sure express will serve production assets like main.js. if any get
  // requests comes in for some route or file and no express route handler has
  // been set up, look into the client/build folder to see if anything matches
  // up with that request
  app.use(express.static("client/build"));
  // express will serve up index.html file if doesn't recognize the route after
  // checking in client/build
  const path = require("path");
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", " build", "index.html"));
  })
}

const PORT = process.env.PORT || 5000;
app.listen(PORT);
