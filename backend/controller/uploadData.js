const ExcelJS = require('exceljs');
const express = require('express')
const router = express.Router()
const UploadData = require("../model/uploadData")

const uploadData =async (req,res) =>{
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded.' });
    }
  
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
  
    const user_id = await req.body.user_id;
    try {
      const uploadData = new UploadData({
        user_id: user_id,
        uploadData: data, 
      });
  
      await uploadData.save();
      console.log(uploadData)
  
      res.status(200).json({ message: 'Data saved successfully' });
    } catch (error) {
      console.error('Error saving data to MongoDB', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }

  const getSheetData = async(req,res)=>{
    try {
        const user_id = req.query.user_id;
    
        const result = await UploadData.find({ user_ID: user_id });
    
        if (result.length === 0) {
          return res.status(404).json({ message: 'No data found for the specified user_ID' });
        }
    
        res.status(200).json(result);
      } catch (error) {
        console.error('Error retrieving data from MongoDB', error);
        res.status(500).json({ message: 'Internal Server Error' });
      }
}

module.exports = {uploadData,getSheetData}