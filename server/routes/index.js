let express = require("express");
let { registerUser, loginUser, deleteUser, hostRoom, getRooms, getRoom, getUser, getHosterRoom, deleteRoom, updateUserInfo, editRoom, genOTP, genOTPForgotPass, getOTP, createUser, forgotPass, changePass } = require("../controllers/index");

let router = express.Router();

router
  .get("/", (req, res) => {
    res.redirect('https://devrajeshthapa.github.io/Derasewa/');
  })
  .post("/register-user", registerUser)
  .post("/login-user", loginUser)
  .delete("/delete-user/:userID", deleteUser)
  .post("/host-room", hostRoom)
  .get("/get-rooms/:userID", getRooms)
  .get("/get-room/:roomID", getRoom)
  .get("/get-user/:userID", getUser)
  .get("/get-hoster-rooms/:hosterID", getHosterRoom)
  .delete("/delete-room/:roomID", deleteRoom)
  .patch("/update-user-info/:userID", updateUserInfo)
  .patch("/edit-room/:roomID", editRoom)
  .get("/gen-otp/:email", genOTP)
  .get("/gen-otp-forgot-pass/:email", genOTPForgotPass)
  .get("/get-otp/:email", getOTP)
  .post("/create-user", createUser)
  .patch("/forgot-pass/:email", forgotPass)
  .patch("/change-pass/:email", changePass)

module.exports = router;