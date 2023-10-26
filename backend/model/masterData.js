const mongoose = require('mongoose')

const masterData = new mongoose.Schema({
    dataType:{
        type:String,
        required:true,
    },
    data:[
        {
            ApplicationTreatment: {
              type: String
            },
            Simple: {
              type: Number
            },
            Medium: {
              type: Number
            },
            Complex: {
              type: Number
            },
          }, 
    ]
}) 
module.exports = mongoose.model('MasterData',masterData)