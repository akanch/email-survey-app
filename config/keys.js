// used to decide which set of credentials to return, prod or dev
if (process.env.NODE_ENV === "production") {
  module.exports = require("./prod");
} else {
  module.exports = require("./dev");
}
