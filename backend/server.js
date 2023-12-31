const express = require('express');
const mongoose = require('mongoose')
const userRoute = require('./route/user');
const uploadDataRoute = require('./route/uploadData')
require("dotenv").config()

const app = express();

app.use(express.json());
app.use("/api/user", userRoute);
app.use("/api/upload",uploadDataRoute)

mongoose.set('strictQuery',true)
mongoose.connect(process.env.DB_URL)
.then(() => {
    app.listen(4000, () => {
      console.log(`Connected to DB and Listening to 4000!`);
    });
  })
  .catch((error) => {
    console.log("Not connected!");
    console.log("reason : ", error);
  });