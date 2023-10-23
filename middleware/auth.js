const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

exports.encrypt = async (req,res,next) => {
    try {
        const reqPassword = req.body.password;
        if(reqPassword){
            const password = await bcrypt.hash(reqPassword,10);
            req.body.password = password;
            next();
        }else{
            throw new Error("Password not received");
        }
    } catch (error) {
        return res.status(400).json({
            success: false,
            error: error.message
        })
    }
}

exports.authentication = async (req,res,next) => {
    try {
        const {email,password} = req.body;
        if(email){
            const user = await User.findOne({email});
            if(user){
                const hashPassword = user.password;
                const checkPassword = await bcrypt.compare(password,hashPassword);
                if(checkPassword){
                    const tok = jwt.sign({userId: user.id, name: user.username},process.env.PRIVATE_KEY);
                    // req.body.tok = tok;
                    // next();
                    return res.status(200).json({success: true,token: tok})
                }else{
                    throw new Error("Password is incorrect");
                }
            }else{
                throw new Error("User not found");
            }
        }
        throw new Error("Something went wrong");

    } catch (error) {
        return res.status(400).json({
            success: false,
            error: error.message
        })
    }
}

exports.authorization = async (req,res,next) => {
    try {
        const authHeader = req.headers.authorization;
        const authArr = authHeader.split(" ");
        const authToken = authArr[1];

        if(authToken){
            jwt.verify(authToken,process.env.PRIVATE_KEY,(err,data) => {
                if(err){
                    throw new Error("Not Verified");
                }
                req.body.id = data.userId;
                next();
            })
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