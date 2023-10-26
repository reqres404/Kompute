const multer = require('multer');
const express = require('express')
const {uploadData,getSheetData,uploadMasterData, getMasterData, modifyBaseline} = require("../controller/uploadData")
const router = express.Router()


const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post("/sheet",upload.single('file'),uploadData)
router.post("/masterData",upload.single('masterFile'),uploadMasterData)
router.post("/retrieveSheetData",getSheetData)
router.post("/retrieveMasterData",getMasterData)

router.put("/modifyBaseline",modifyBaseline)

module.exports = router