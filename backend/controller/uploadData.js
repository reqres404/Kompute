const ExcelJS = require("exceljs");
const express = require("express");
const router = express.Router();
const UploadData = require("../model/uploadData");
const MasterData = require("../model/masterData")

// Sample data in the desired format
const sheetData = {
  "COTS Rehost": { Simple: 0, Medium: 0, Complex: 0 },
  "COTS Replatform": { Simple: 0, Medium: 0, Complex: 0 },
  "Bespoke Rehost": { Simple: 0, Medium: 0, Complex: 0 },
  "Bespoke Replatform": { Simple: 0, Medium: 0, Complex: 0 },
  "Bespoke Refactor": { Simple: 0, Medium: 0, Complex: 0 },
};

const uploadData = async (req, res) => {
  try {
    const workbook = new ExcelJS.Workbook();
    await workbook.xlsx.load(req.file.buffer);
    const worksheet = workbook.getWorksheet(1);

    worksheet.eachRow({ includeEmpty: false }, (row, rowNumber) => {
      if (rowNumber > 1) {
        // This has to be converted into dynamic rather than fixed Numbers
       
        const serverCount = row.getCell(2).value;
        const rLane = row.getCell(3).value;
        const cotsBespoke = row.getCell(4).value;
        const complexity = row.getCell(9).value;

        let applicationTreatment;
        if (cotsBespoke === "COTS" && rLane === "Rehost") {
          applicationTreatment = "COTS Rehost";
        } else if (cotsBespoke === "COTS" && rLane === "Replatform") {
          applicationTreatment = "COTS Replatform";
        } else if (cotsBespoke === "Bespoke" && rLane === "Rehost") {
          applicationTreatment = "Bespoke Rehost";
        } else if (cotsBespoke === "Bespoke" && rLane === "Replatform") {
          applicationTreatment = "Bespoke Replatform";
        } else {
          applicationTreatment = "Bespoke Refactor";
        }

        // Update the counts under the appropriate "Application Treatment"
        if (complexity === "Simple") {
          sheetData[applicationTreatment].Simple += serverCount;
        } else if (complexity === "Medium") {
          sheetData[applicationTreatment].Medium += serverCount;
        } else if (complexity === "Complex") {
          sheetData[applicationTreatment].Complex += serverCount;
        }
      }
    });

    const user_id = req.body.user_id;
    const customerName = req.body.customerName
    try {
      // Check if a document with the same user_id already exists
      const existingData = await UploadData.findOne({ user_id });
      const masterData = await MasterData.findOne({dataName:"master"})
      
      if (existingData) {
        // If it exists, update the existing document
        existingData.uploadData = Object.entries(sheetData).map(([key, value]) => ({
          ApplicationTreatment: key,
          Simple: value.Simple,
          Medium: value.Medium,
          Complex: value.Complex,
        }));
        await existingData.save();

        res.status(200).json({ message: "Data updated successfully" });
      } else {
        // If it doesn't exist, create a new document
        const newUploadData = new UploadData({
          user_id: user_id,
          customerName:customerName.toLowerCase(),
          uploadData: Object.entries(sheetData).map(([key, value]) => ({
            ApplicationTreatment: key,
            Simple: value.Simple,
            Medium: value.Medium,
            Complex: value.Complex,
          })),
          userBaseline: masterData.data,
          
        });

        await newUploadData.save();

        res.status(200).json({ message: "Data saved successfully" });
      }
    } catch (error) {
      console.error("Error saving/updating data to MongoDB", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  } catch (error) {
    console.error("Error processing data:", error);
    res.status(500).json({ error: error });
  }
};

const getSheetData = async (req, res) => {
  try {
    const user_id = req.body.user_id;

    const sheetData = await UploadData.find({ user_id: user_id });

    if (sheetData.length === 0) {
      return res
        .status(404)
        .json({ message: "No data found for the specified user_ID" });
    }

    res.status(200).json(sheetData);
  } catch (error) {
    // console.error("Error retrieving data from MongoDB", error);
    res.status(500).json({ message: error });
  }
};


// const uploadData = async (req, res) => {
//   if (!req.file) {
//     return res.status(400).json({ message: "No file uploaded." });
//   }

//   const workbook = new ExcelJS.Workbook();
//   await workbook.xlsx.load(req.file.buffer);
//   const worksheet = workbook.getWorksheet(1);

//   const data = [];

//   worksheet.eachRow({ includeEmpty: false }, (row, rowNumber) => {
//     if (rowNumber > 1) {
//       data.push({
//         ApplicationTreatment: row.getCell(1).value,
//         Simple: row.getCell(2).value,
//         Medium: row.getCell(3).value,
//         Complex: row.getCell(4).value,
//       });
//     }
//   });

//   const user_id = req.body.user_id;

//   try {
//     // Check if a document with the same user_id already exists
//     const existingData = await UploadData.findOne({ user_id });

//     if (existingData) {
//       // If it exists, update the existing document
//       existingData.uploadData = data;
//       await existingData.save();
//       console.log(existingData);

//       res.status(200).json({ message: "Data updated successfully" });
//     } else {
//       // If it doesn't exist, create a new document
//       const newUploadData = new UploadData({
//         user_id: user_id,
//         uploadData: data,
//       });

//       await newUploadData.save();
//       console.log(newUploadData);

//       res.status(200).json({ message: "Data saved successfully" });
//     }
//   } catch (error) {
//     console.error("Error saving/updating data to MongoDB", error);
//     res.status(500).json({ message: "Internal Server Error" });
//   }
// };

const uploadMasterData = async(req,res) =>{
  const user_id = req.body.user_id
  const dataName = "master"
  const workbook = new ExcelJS.Workbook();
  await workbook.xlsx.load(req.file.buffer);
  const worksheet = workbook.getWorksheet(1);
  const data = [];

    worksheet.eachRow({ includeEmpty: false }, (row, rowNumber) => {
    if (rowNumber > 1) {
      data.push({
        ApplicationTreatment: row.getCell(1).value,
        Simple: row.getCell(2).value,
        Medium: row.getCell(3).value,
        Complex: row.getCell(4).value,
      });
    }
  });
    try {
    // Check if a document with the same user_id already exists
    const existingData = await MasterData.findOne({ user_id });

    if (existingData) {
      // If it exists, update the existing document
      existingData.masterData = data;
      await existingData.save();
      console.log(existingData);

      res.status(200).json({ message: "Data updated successfully" });
    } else {
      // If it doesn't exist, create a new document
      const newMasterData = new MasterData({
        dataType: dataName,
        data: data,
      });

      await newMasterData.save();

      res.status(200).json({ message: "Data saved successfully" });
    }
  } catch (error) {
    console.error("Error saving/updating data to MongoDB", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
} 

const getMasterData = async(req,res) =>{
  try {
    const user_id = req.body.user_id;
    const dataName = req.body.dataName;
    const masterData = await MasterData.find({dataType:dataName})

    if(masterData.length === 0){
      return res
      .status(404)
      .json({message:"Requested Data doesn't exist in database"})
    }
    res.status(200).json(masterData)
  } catch (error) {
    res.status(500).json({message:error})
  }
}
const updateCustomerName = async(req,res)=>{
  try {
    const {user_id,customerName} = req.body
    const filter = {user_id:user_id}
    const update = {customerName:customerName}
    const updatedCustomer = await UploadData.findOneAndUpdate(filter,update,{new:true})
    
    if (updatedCustomer) {
      console.log(`Customer name updated to: ${updatedCustomer.customerName}`);
      res.status(200).send({message:`Customer name updated to: ${updatedCustomer.customerName}`})
    } else {
      console.log('Document not found for the given user_id.');
      res.status(404).send({message:"Document not found for given user_id"})
    }
        
  } catch (error) {
    res.status(500).send({message:"internal server error"})
  }
}
const modifySheetData=async(req,res) =>{
  try {
    const {user_id,updatedSheetData} = req.body
    const filter = {user_id:user_id}
    const update = {uploadData:updatedSheetData}
    const updatedDocument = await UploadData.findOneAndUpdate(filter, update, {
      new: true, // This option returns the updated document
    });
    if(updatedDocument){
      res.status(200).send({updatedDocument})      
    }
    else{
      res.status(404).send({message:"No Data to update"})
    }

      
  } catch (error) {
    res.status(500).send({message:"Internal server error "})
  }

}
const modifyBaseline=async(req,res) =>{
  try {
    const {user_id,updatedBaseline} = req.body
    const filter = {user_id:user_id}
    const update = {userBaseline:updatedBaseline}
    const updatedDocument = await UploadData.findOneAndUpdate(filter, update, {
      new: true, // This option returns the updated document
    });
    if(updatedDocument){
      res.status(200).send({updatedDocument})      
    }
    else{
      res.status(404).send({message:"No Data to update"})
    }

      
  } catch (error) {
    res.status(500).send({message:"Internal server error "})
  }

}

module.exports = {
                  uploadData,
                  getSheetData,
                  uploadMasterData,
                  getMasterData,
                  updateCustomerName,
                  modifySheetData,
                  modifyBaseline
                };
