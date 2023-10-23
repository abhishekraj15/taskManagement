const path = require("path");
const User = require("../models/user");

exports.signupPage = (req,res) => {
    return res.status(201).sendFile(path.join(__dirname,"../public","/signup.html"))
}

exports.signupReq = async (req,res) => {
    try {
        const user = req.body;
        if(user){
            const data = await User.create(user);
            return res.status(200).json({success: true,data})
        }else{
            throw new Error("Something went wrong");
        }
    } catch (error) {
        return res.status(400).json({
            success: false,
            error: error.message
        })
    }
}