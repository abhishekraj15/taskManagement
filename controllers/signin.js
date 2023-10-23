const path = require("path");

exports.signInPage = (req,res) => {
    return res.status(200).sendFile(path.join(__dirname,"../public","/signin.html"))
}