let express = require("express");
let { registerUser, loginUser, deleteUser, hostRoom, getRooms, getRoom, getUser, getHosterRoom, deleteRoom, updateUserInfo, editRoom, genOTP, genOTPForgotPass, getOTP, createUser, forgotPass, changePass } = require("../controllers/index");

let router = express.Router();

router
    .get("/", (req, res) => {
        let html = `

    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.6.0/css/all.min.css" integrity="sha512-Kc323vGBEqzTmouAECnVceyQqyqdsSiqLQISBL29aUW4U/M7pSPA/gEUZQqv1cwx4OnYxTxve5UMg5GT6L4JJg==" crossorigin="anonymous" referrerpolicy="no-referrer" />
<style>
  @import url('https://fonts.googleapis.com/css2?family=Oswald:wght@200..700&family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');
  *{
    margin: 0px;
    padding: 0px;
    box-sizing: border-box;
  }
  .wrapper{
    padding: 20px;
    height: 100%;
    width: 100%;
    background: linear-gradient(200deg, #DCFC35, black 75%);
  }
  .link {
    height: 100%;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .logo {
    font-family: "Poppins", sans-serif;
    font-size: 30px;
    font-weight: bolder;
    color: white;
  }

  span{
    color: #DCFC35;
  }

  a {
    font-family: "Poppins", sans-serif;
    font-weight: bold;
    color: black;
    text-decoration: none;
    padding: 10px;
    background-color: #DCFC35;
    border-radius: 15px;
  }
</style>
<div class="wrapper">
  <p class="logo">Dera<span>Sewa</span></p>
  <div class="link">
    <a href="https://drive.google.com/file/d/1P64d9eTs9X8Modoensq2gVTLCUsfvtSO/view?usp=sharing"
      download="DeraSewa">Download DeraSewa APK <i class="fa-solid fa-cloud-arrow-down"></i></a>
  </div>
</div>
    
    `
        res.send(html);
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