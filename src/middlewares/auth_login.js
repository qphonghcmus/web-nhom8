module.exports = (req, res, next) => {
    if (req.user) {
      res.redirect('/my-information');
    } 
    else next();
  }
  