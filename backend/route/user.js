const express = require('express')
const router = express.Router()
const verifyJWT = require('../middleware/verifyJWT')
const {register,login,users} = require('../controller/user')


router.get("/test",(req,res)=>{
    console.log("this is test")
})
router.post("/register",register)
router.post("/login",login)
router.get("/users",verifyJWT,users)
module.exports = router