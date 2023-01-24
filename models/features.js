const { Schema, model } = require("mongoose");

const featuresSchema = Schema({
      type: {
        type: String,
        required: true,
      },
      features:{
        type: Array,
        required: true,
    }
});

module.exports = model("Features", featuresSchema);