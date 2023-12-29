const Rider = require("../models/Rider.model");
const Comment = require("../models/Comment.model");

module.exports.list = function (req, res, next) {
  const query = {};

  query.legend = !!req.query.legend;

  if (req.query.search) {
    const regex = new RegExp(req.query.search, "i");

    query.name = { $regex: regex };
  }

  Rider.find(query)
    .populate('likes')
    .then((riders) => {
    console.log(riders)
    res.render("riders/list", { riders })
  })
    .catch((error) => next(error));
};

module.exports.details = function (req, res, next) {
  const { id } = req.params;

  Rider.findById(id)
    .populate({
      path: "comments",
      populate: {
        path: "user",
      },
    })
    .then((rider) => {
      if (rider) {
        console.log(rider);
        res.render("riders/details", { rider });
      } else {
        res.redirect("/riders");
      }
    })
    .catch(next);
};

//aqui get
module.exports.create = (req, res, next) => {
  res.render("riders/form"); // meter un condicional de errores
};

//aqui post
module.exports.doCreate = function (req, res, next) {
  
  if (req.file){
    req.body.image = req.file.path
    }


  Rider.create(req.body)
    .then((riderDB) => res.redirect(`/riders/${riderDB.id}`))
    .catch((err) => {
      //Comprobar err instanceof mongoose.ValidationError

      next(err);
    });
};

module.exports.update = (req, res, next) => {
  const { id } = req.params;
  Rider.findById(id)
    .then((rider) => res.render("riders/form", { rider })) // meter un condicional de errores
    .catch((error) => next(error));
};

module.exports.doUpdate = function (req, res, next) {
  const { id } = req.params;
  const updates = { ...req.body };

  if (req.file) {
    updates.image = req.file.path;
  }

  Rider.findByIdAndUpdate(id, updates, { new: true })
    .then((riderDB) => res.redirect(`/riders/${id}`))
    .catch((err) => {
      //Comprobar err instanceof mongoose.ValidationError

      next(err);
    });
};

module.exports.delete = (req, res, next) => {
  const { id } = req.params;
  Rider.findByIdAndDelete(id)
    .then((rider) => res.redirect("/riders"))
    .catch((error) => next(error));
};
