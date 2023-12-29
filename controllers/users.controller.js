const mongoose = require('mongoose');
const User = require('../models/User.model');
const passport = require("passport");
const cloudinary = require("../config/storage.config")

module.exports.profile = (req, res, next) => {
  res.render("users/profile");
}

module.exports.profileEdit = (req, res, next) => {
  res.render("users/profileUpdate");
}

module.exports.doProfileEdit = (req, res, next) => {
  const { userID } = req.params
  const newUser = req.body
  user.findByIdandUpdate(_id)
    .then(() => {
      res.redirect("profile");
    })
    .catch(next);

}
/*
module.exports.profileEdit = (req, res, next) => {
  const { id } = req.params;

  username.findById(id)
    .then(user => {
      res.render("users/profileUpdate");
    })
    .catch(next)
}

module.exports.doProfileEdit = (req, res, next) => {
  const { id } = req.params;
  if (req.file) {
    req.body.image = req.file.path;
  }

  username.findByIdAndUpdate(id, req.body, { new: true })
    .then(user => {
      res.redirect(`/profile/${user._id}`);
    })
    .catch(next)
}*/