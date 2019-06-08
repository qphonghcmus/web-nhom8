module.exports = (req, res, next) => {
  if (req.user) {
    res.locals.isAuthenticated = true;
    res.locals.authUser = req.user;
  }
  else {
    res.locals.isAuthenticated = false;
    res.locals.authUser = null;
  }
  next();
}
