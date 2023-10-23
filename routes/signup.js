const express = require("express");
const signupController = require("../controllers/signup");
const middleware = require("../middleware/auth");
const router = express.Router();

router.get("/",signupController.signupPage);
router.post("/signup",middleware.encrypt,signupController.signupReq);

module.exports = router;