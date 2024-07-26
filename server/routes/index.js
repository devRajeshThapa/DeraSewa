let express = require("express");
let { registerUser, loginUser, verifyUser, deleteUser ,hostRoom, getRooms, getUser, getHosterRoom, deleteRoom, updateUserInfo } = require("../controllers/index");

let router = express.Router();

router
.post("/register-user", registerUser)
.post("/login-user", loginUser)
.post("/verify-user/:phoneNumber", verifyUser)
.delete("/delete-user/:userID", deleteUser)
.post("/host-room/", hostRoom)
.get("/get-rooms", getRooms)
.get("/get-user/:userID", getUser)
.get("/get-hoster-rooms/:userID", getHosterRoom)
.delete("/delete-room/:roomID", deleteRoom)
.patch("/update-user-info/:userID", updateUserInfo)

module.exports = router;