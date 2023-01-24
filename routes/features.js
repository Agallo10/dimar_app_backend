const { Router } = require("express");
const {  insertFeaturesFromJson, getFeatureCollection, createJsonFile } = require("../controllers/featureController");

const router = Router();

router.post('/', insertFeaturesFromJson);
router.post('/download', createJsonFile);
router.get('/', getFeatureCollection);

module.exports = router; 