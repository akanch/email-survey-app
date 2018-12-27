module.exports = (req, res, next) => {
  if (!req.user) {
    return res.status(401).send({ error: "You must log in!" });
  }
  // if user logged in, continue to next middleware or request handler
  next();
};
