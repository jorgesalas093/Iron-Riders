const mongoose = require("mongoose");

const RiderSchema = mongoose.Schema(
  {
    image: {
      type: String,
    },
    name: {
      type: String,

    },
    flag: {
      type: String,
      enum: [
        {
          "Spain": "https://res.cloudinary.com/dwahroldl/image/upload/v1703102384/ironhack/test/eaum1o3v0vmqtwgtkopt.png",
          "Italy": "https://res.cloudinary.com/dwahroldl/image/upload/v1704832207/italy_s2ktqm.png",
          "France": "https://res.cloudinary.com/dwahroldl/image/upload/v1704832207/france_a1yalx.png",
          "SouthAfrica": "https://res.cloudinary.com/dwahroldl/image/upload/v1704832208/south_africa_lvtuuk.png",
          "United States of America": "https://res.cloudinary.com/dwahroldl/image/upload/v1704832209/united_states_dewfvl.png",
          "Japan": "https://res.cloudinary.com/dwahroldl/image/upload/v1704832208/japan_dcqxpp.png",
          "Australia": "https://res.cloudinary.com/dwahroldl/image/upload/v1704832207/australia_xfvhb2.png",
          "Portugal": "https://res.cloudinary.com/dwahroldl/image/upload/v1704832208/portugal_y1imti.png",
          "United Kingdom of Great Britain and Northern Ireland": "https://res.cloudinary.com/dwahroldl/image/upload/v1704832209/united_kingdom_br45wh.png"
        }
      ],
      default: "Other"
    },
    nationality: {
      type: String,

    },
    bike: {
      type: String,
    },
    dateOfBirth: {
      type: String,
    },
    placeOfBirth: {
      type: String,
    },
    height: {
      type: String,
    },
    story: {
      type: String,
    },
    worldChampionship: {
      type: String,
    },
    victories: {
      type: String,
    },
    podiums: {
      type: String,
    },
    poles: {
      type: String,
    },
    races: {
      type: String,
    },
    merchandising: {
      type: String,
    },
    legend: {
      type: Boolean,
      default: false,
    },
    gallery: {
      type: [String],
    },
  },
  {
    virtual: true,
  }
);

RiderSchema.virtual("likes", {
  ref: "Like",
  localField: "_id",
  foreignField: "rider",
  justOne: false,
});

RiderSchema.virtual("comments", {
  ref: "Comment",
  localField: "_id",
  foreignField: "rider",
  justOne: false,
});

const Rider = mongoose.model("Rider", RiderSchema);
module.exports = Rider;
