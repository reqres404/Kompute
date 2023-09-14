const express = require('express')
const router = express.Router()
const verifyJWT = require('../middleware/verifyJWT')
const {register,login,users,updateToAdmin} = require('../controller/user')


router.get("/test",(req,res)=>{
    console.log("this is test")
})
router.post("/register",register)
router.post("/login",login)
router.get("/users",verifyJWT,users)
router.get("/updaterole",updateToAdmin)


module.exports = router