const express = require('express')
const sequelize = require('./configure/database')
const userRoute = require('./route/user')

const app = express()
app.use(express.json())
app.use("/api/user",userRoute)

sequelize.sync().then(()=>{
    app.listen(4000,(res,req)=>{
        console.log("Listening to 4000")
    })
})



