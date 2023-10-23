const express = require("express");
const signinController = require("../controllers/signin");
const middleware = require("../middleware/auth");
const router = express.Router();

router.get("/signin",signinController.signInPage);

router.post("/signin/user",middleware.authentication);

module.exports = router;