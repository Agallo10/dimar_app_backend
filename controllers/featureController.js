const { response } = require("express");
const { readFileSync, createWriteStream, writeFileSync } = require("fs");
const Features = require("../models/features");
var http = require("http");
const request = require("request");

const _checkIfPhishing = (url, file) => {
  //const succes = 
  request(url, (error, response, body) => {
    if (!error && response.statusCode === 200) {
      writeFileSync(file, body);
      //console.log("Archivo descargado con éxito!");
      //return true;
    } else {
      //console.log("Error al descargar el archivo");
      //return false;
    }
  });

  //return succes;
};

const _extrackJson = (file) => {
  const featuresJson = JSON.parse(readFileSync(file));
  return featuresJson;
};

const _returnJson = (url, file) => {
  const cp = _checkIfPhishing(url, file);
  //console.log('cp: ',cp);
  let jsonFInal;

  if (cp != undefined) {
    jsonFInal = _extrackJson(file);
  }
  return jsonFInal;
};

const createJsonFile = (req, res = response) => {
  url = "http://archive.sgc.gov.co/feed/v1.0/summary/five_days_all.json";
  file = "./file/five_days_all.json";

  try {
    _checkIfPhishing(url, file);

    res.json({
      ok: true,
      msg: "Json file downloaded successfully",
      //features: features,
    });
  } catch (error) {
    console.log(error);
    res.status.json({
      ok: false,
      msg: "insert failed",
    });
  }
};

const insertFeaturesFromJson = async (req, res = response) => {
  // const featuresJson = JSON.parse(
  //   readFileSync("./file/five_days_all.json", "utf8")
  // );

  //url = "http://archive.sgc.gov.co/feed/v1.0/summary/five_days_all.json";
  file = "./file/five_days_all.json";

  const featuresJson = _extrackJson(file);

  //console.log('featuresJson ', featuresJson);

  try {

    if (featuresJson == undefined) {
      res.status(404).json({
        ok: false,
        msg: "not found",
      });
    } else {
      const features = new Features(featuresJson);

      await features.save();
  
      res.json({
        ok: true,
        msg: "insert features successful",
        //features: features,
      });
    }
   
  } catch (error) {
    console.log(error);
    res.status.json({
      ok: false,
      msg: "insert failed",
    });
  }
};

const getFeatureCollection = async (req, res = response) => {
  try {
    const featuresDb = await Features.find();

    if (featuresDb.length <= 0) {
      res.status(404).json({
        ok: false,
        msg: "not found",
        features: [],
      });
    } else {
      const allFeatures = featuresDb[0].features;

      res.json({
        ok: true,
        msg: "get successful",
        features: allFeatures,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "get failed",
    });
  }
};

module.exports = {
  insertFeaturesFromJson,
  getFeatureCollection,
  createJsonFile,
};
