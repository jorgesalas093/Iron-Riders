const Like = require('../models/Like.model')
const Rider = require("../models/Rider.model");

module.exports.doCreate = (req, res, next) => {
    const { riderId } = req.params;
    const userId = req.session.currentUser._id;

    Like.findOne({ user: userId, rider: riderId })
        .then((like) => {
            if (!like) {

                return Like.create({ user: req.session.currentUser._id, rider: riderId })
                    .then(() => {
                        // Después de crear el like, obtén la información completa del rider
                        return Rider.findById(riderId);
                    })

                    .then((rider) => {
                        console.log("lllllllllllllllllllll", rider);
                        if (rider.legend) {

                            res.redirect('/riders?legend=true')
                        }
                        else {
                            res.redirect('/riders')
                        }
                    })
            } else {
                return Like.findByIdAndDelete(like._id)
                    .then(() => {
                        // Después de crear el like, obtén la información completa del rider
                        return Rider.findById(riderId);
                    })
                    .then((rider) => {
                        if (rider.legend) {

                            res.redirect('/riders?legend=true')
                        }
                        else {
                            res.redirect('/riders')
                        }
                    })
            }
        })
        .catch(next)
}