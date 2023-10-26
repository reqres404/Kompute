const mongoose = require('mongoose');

const uploadDataSchema = new mongoose.Schema({
  user_id: {
    type: Number,
    required: true,
    unique: true
  },
  customerName:{
    type:String,
    required:true,
    default:""
  },
  uploadData: [
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
  ],
  userBaseline: [],
});

module.exports = mongoose.model('UploadData', uploadDataSchema);
