module.exports.isAuthenticated = (req, res, next) => {
  if (req.session.currentUser) {
    next();
  } else {
    res.redirect("/login");
  }
};

module.exports.isNotAuthenticated = (req, res, next) => {
  if (!req.session.currentUser) {
    next();
  } else {
    res.redirect("/profile");
  }
};

module.exports.isAdmin = (req, res, next) => {
  if (req.session.currentUser.isAdmin) {
    next();
  } else {
    res.render("error", {
      error: "You are not admin",
    });
  }
};
