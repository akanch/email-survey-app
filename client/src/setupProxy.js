// proxy only used in dev since we need both react and express servers
// in prod react server gets bundled by webpack and babel and goes away
// an additional benefit of a proxy is that when a broswer makes an AJAX
// request from localhost:3000 to localhost:5000, cookies(the primary
// piece of ID), will not be included for security purposes. Since the
// browser is unaware of the proxy, cookies can be passed from
// localhost:3000(react server) to localhost:5000(express server)
const proxy = require("http-proxy-middleware");

module.exports = function(app) {
  app.use(proxy("/auth/google", { target: "http://localhost:5000" }));
  app.use(proxy("/api/*", { target: "http://localhost:5000" }));
};
