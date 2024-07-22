let express = require("express");
let { registerUser, loginUser } = require("../controllers/index");

let router = express.Router();

router
.post("/register-user", registerUser)
.post("/login-user", loginUser);

module.exports = router;