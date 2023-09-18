const multer = require('multer');
const express = require('express')
const {uploadData,getSheetData} = require("../controller/uploadData")
const router = express.Router()


const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post("/sheet",upload.single('file'),uploadData)
router.get("/retrieve",getSheetData)

module.exports = router