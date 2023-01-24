// const { response } = require("express");
// const { readFileSync } = require("fs");
// const Feature = require("../models/feature");
// const Features = require("../models/features");

// const insertFeatures = async (req, res = response) => {
//   try {
//     const features = await Features.find();

//     const allFeatures = features[0].features;

//     for (let index = 0; index < allFeatures.length; index++) {
//         const element = allFeatures[index];

//         const feature = new Feature(element);

//         await feature.save();

//         console.log(element);        
//     }

//     res.json({
//       ok: true,
//       msg: "insert all features successful",
//       //features: allFeatures,
//     });
//   } catch (error) {
//     console.log(error);
//     res.status.json({
//       ok: false,
//       msg: "insert failed",
//     });
//   }
// };

// const getAllFeatures = async (req, res = response) => {
//   try {
//     const features = await Feature.find();

//     res.json({
//       ok: true,
//       msg: "get successful",
//       features: features,
//     });
//   } catch (error) {
//     console.log(error);
//     res.status.json({
//       ok: false,
//       msg: "get failed",
//     });
//   }
// };

// module.exports = {
//     insertFeatures,
//     getAllFeatures,
// };
