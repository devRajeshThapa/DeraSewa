let express = require("express");
let { registerUser, loginUser, deleteUser ,hostRoom, getRooms,getRoom, getUser, getHosterRoom, deleteRoom, updateUserInfo, editRoom } = require("../controllers/index");

let router = express.Router();

router
.post("/register-user", registerUser)
.post("/login-user", loginUser)
.delete("/delete-user/:userID", deleteUser)
.post("/host-room", hostRoom)
.get("/get-rooms", getRooms)
.get("/get-room/:roomID", getRoom)
.get("/get-user/:userID", getUser)
.get("/get-hoster-rooms/:hosterID", getHosterRoom)
.delete("/delete-room/:roomID", deleteRoom)
.patch("/update-user-info/:userID", updateUserInfo)
.patch("/edit-room/:roomID", editRoom)

module.exports = router;