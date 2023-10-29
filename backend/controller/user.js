const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User= require('../model/user')
const UploadData = require("../model/uploadData");
const MasterData = require("../model/masterData")
const saltRounds = 10;

const dataArray = [
    {
      "ApplicationTreatment": "COTS Rehost",
      "Simple": 0,
      "Medium": 0,
      "Complex": 0,
      "_id": "653a4218696138efbe944460"
    },
    {
      "ApplicationTreatment": "COTS Replatform",
      "Simple": 0,
      "Medium": 0,
      "Complex": 0,
      "_id": "653a4218696138efbe944461"
    },
    {
      "ApplicationTreatment": "Bespoke Rehost",
      "Simple": 0,
      "Medium": 0,
      "Complex": 0,
      "_id": "653a4218696138efbe944462"
    },
    {
      "ApplicationTreatment": "Bespoke Replatform",
      "Simple": 0,
      "Medium": 0,
      "Complex": 0,
      "_id": "653a4218696138efbe944463"
    },
    {
      "ApplicationTreatment": "Bespoke Refactor",
      "Simple": 0,
      "Medium": 0,
      "Complex": 0,
      "_id": "653a4218696138efbe944464"
    }
  ]

const register = async (req, res) => {
    const { username, email, password } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        const newUser = await User.create({
            username,
            email,
            password: hashedPassword, 
        });
        const token = jwt.sign({userId:newUser.id},'secretkey',{expiresIn:'1h'})
        res.status(201).json({ message: 'User created successfully', user: newUser,token,_id:newUser._id });
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).json({ message: 'User creation failed' });
    }
};
const updateToAdmin = async(req,res)=>{
    const {id} = req.body
    const user = await User.findOne({where:{id}})
    user.role = "Admin"
    
    res.status(200).json({role:user.role})
}
const login = async (req, res) => {
    const {password,email } = req.body;

    try {
        const user = await User.findOne({ email }); 
        if (!user) {
            return res.status(404).json({ message: 'No User with that username found' });
        }

        const passwordMatch = await bcrypt.compare(password, user.password);

        if (passwordMatch) {
            const token = jwt.sign({ _id: user._id }, 'secretkey');
            const user_id = user._id.toString()
            const uploadData = await UploadData.findOne({user_id})
            const masterData = await MasterData.findOne({dataName:"master"})
            if(!uploadData){
                const newUploadData = new UploadData({
                    user_id :user_id,
                    customerName: " ",
                    uploadData:dataArray,
                    userBaseline:masterData.data
                })
                await newUploadData.save();
            }
            return res.status(200).json({ message: 'User is authenticated', user:user,token });
        } else {
            return res.status(400).json({ message: 'Wrong password' });
        }
    } catch (error) {
        console.error('Error logging in:', error);
        return res.status(500).json({ message: 'Login failed' });
    }
};
const users = async(req,res)=>{
    const user = await User.findAll()
    res.status(200).send(user)
}

module.exports = {register,login,users,updateToAdmin}