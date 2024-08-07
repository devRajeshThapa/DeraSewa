let express = require("express");
let { registerUser, loginUser, verifyUser, deleteUser ,hostRoom, getRooms,getRoom, getUser, getHosterRoom, deleteRoom, updateUserInfo, generateReferral, referralInfo } = require("../controllers/index");

let router = express.Router();

router
.post("/register-user", registerUser)
.post("/login-user", loginUser)
.post("/verify-user/:phoneNumber", verifyUser)
.delete("/delete-user/:userID", deleteUser)
.post("/host-room", hostRoom)
.get("/get-rooms", getRooms)
.get("/get-room/:roomID", getRoom)
.get("/get-user/:userID", getUser)
.get("/get-hoster-rooms/:hosterID", getHosterRoom)
.delete("/delete-room/:roomID", deleteRoom)
.patch("/update-user-info/:userID", updateUserInfo)
.get("/generate-referral/:referralCreaterUserID", generateReferral)
.get("/referral-info/:userID", referralInfo)

module.exports = router;