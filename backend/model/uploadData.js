        const mongoose = require('mongoose');

        const uploadData = new mongoose.Schema({
        user_id: {
            type:Number,
            required:true,
            unique:true
        },
        uploadData: [
            {
            ApplicationTreatment:{
                type: String
            },
            Simple: {
                type:Number
            },
            Medium:  {
                type:Number
            },
            Complex:  {
                type:Number
            },
            },
        ],
        });

        module.exports = mongoose.model('UploadData', uploadData);
