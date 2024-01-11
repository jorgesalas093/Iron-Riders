const mongoose = require('mongoose');
const User = require('../models/User.model');
const passport = require("passport");
const cloudinary = require("../config/storage.config")

module.exports.profile = (req, res, next) => {
  res.render("users/profile");
}

module.exports.profileEdit = (req, res, next) => {
  const { id } = req.params;

  User.findById(id)

    .then(user => {
      const userPicture = User.schema.path('picture').enumValues;
      user = req.session.currentUser
      res.render('users/profileUpdate', { user, userPicture });

    })
    .catch(next)

}

module.exports.doProfileEdit = (req, res, next) => {
  const { id } = req.params
  const newUser = { ...req.body }

  if (req.files && req.files.picture && req.files.picture.length) {
    newUser.picture = req.files.picture[0].path;
  }

  User.findByIdAndUpdate(id, newUser, { new: true })
    .then((dbUser) => {
      req.session.currentUser = dbUser;
      res.redirect(`/profile`);
    })
    .catch(next);

}