const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User= require('../model/user')

const saltRounds = 10;


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
        res.status(201).json({ message: 'User created successfully', user: newUser,token });
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).json({ message: 'User creation failed' });
    }
};
const login = async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await User.findOne({ where: { username } });

        if (!user) {
            res.status(404).send('No User with that username found');
        } else {
            const passwordMatch = await bcrypt.compare(password, user.password);
            const userRole = await user.role
            if (passwordMatch) {
                const token = jwt.sign({_id:user._id},'secretkey')
                res.status(200).json({message:'User is authenticated',token:token,role:userRole});
            } else {
                res.status(400).send('Wrong password');
            }
        }
    } catch (error) {
        res.status(500).send(error);
    }
};
const users = async(req,res)=>{
    const user = await User.findAll()
    res.status(200).send(user)
}

module.exports = {register,login,users}