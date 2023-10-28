const multer = require('multer');
const express = require('express')
const {uploadData,getSheetData,uploadMasterData, getMasterData, modifyBaseline, updateCustomerName, modifySheetData} = require("../controller/uploadData")
const router = express.Router()


const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post("/sheet",upload.single('file'),uploadData)
router.post("/masterData",upload.single('masterFile'),uploadMasterData)
router.post("/retrieveSheetData",getSheetData)
router.post("/retrieveMasterData",getMasterData)

router.put("/updateCustomer",updateCustomerName) //
router.put("/modifyBaseline",modifyBaseline) //uid,array:'updatedSheetData'
router.put("/modifySheetData",modifySheetData) //uid,array:'updatedSheetData'

module.exports = router