let express = require("express");
let { registerUser, loginUser, deleteUser, hostRoom, getRooms, getRoom, getUser, getHosterRoom, deleteRoom, updateUserInfo, editRoom, genOTP, genOTPForgotPass, getOTP, createUser, forgotPass, changePass } = require("../controllers/index");

let router = express.Router();

router
  .get("/", (req, res) => {
    let html = `
        <title>DeraSewa - Official</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.6.0/css/all.min.css" integrity="sha512-Kc323vGBEqzTmouAECnVceyQqyqdsSiqLQISBL29aUW4U/M7pSPA/gEUZQqv1cwx4OnYxTxve5UMg5GT6L4JJg==" crossorigin="anonymous" referrerpolicy="no-referrer" />
<style>
  @import url('https://fonts.googleapis.com/css2?family=Oswald:wght@200..700&family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');
  *{
    margin: 0px;
    padding: 0px;
    box-sizing: border-box;
  }
  body{
    overflow: hidden;
  }
  .wrapper{
    padding: 10px;
    height: 100%;
    width: 100%;
    background: linear-gradient(400deg, #198450,black 50%);
  }

  .logoWrapper{
    display: flex;
    flex-direction: row;
    aligh-items: flex-end;
    gap: 5px
  }

  .logo {
    font-family: "Poppins", sans-serif;
    font-size: 30px;
    font-weight: bolder;
    color: white;
  }

  span{
    color: #84eab3;
  }

  .link {
    height: 100%;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
  }

  .download{
    font-family: "Poppins", sans-serif;
    font-weight: bold;
    color: black;
    text-decoration: none;
    padding: 10px;
    background-color: #84eab3;
    border-radius: 15px;
  }

  .latest{
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 5px
  }

  .copyright{
   color: white;
   font-family: "Poppins", sans-serif;
  }

  .box{
   color: white;
   font-family: "Poppins", sans-serif;
   display: flex;
   flex-direction: column;
   gap: 5px
  }

  summary{
   font-weight: bold;
  }
  
  li{
   font-weight: 300;
  }

  a{
  color: white;
  }
</style>
<div class="wrapper">
  <div class="logoWrapper">
    <p class="logo">Dera<span>Sewa</span></p>
  </div>
  <div class="link">
    <div class="box">
      <a class="download" href="https://drive.google.com/file/d/1P64d9eTs9X8Modoensq2gVTLCUsfvtSO/view?usp=sharing" download="DeraSewa">
      DeraSewa(V1.0.0) APK <i class="fa-solid fa-cloud-arrow-down"></i>
    </a>
      <details>
        <summary>Changelogs</summary>
          <p>※ Initial version</p>
      </details>
    </div>
    <br>
    <div class="box">
      <a class="download latest" href="https://drive.google.com/file/d/1CK677CPsVJqBfa--MSMnPcHZlgbK5f1u/view?usp=sharing" download="DeraSewa">
        <p>DeraSewa(V1.5.0) APK <i class="fa-solid fa-cloud-arrow-down"></i></p>
      </a>
      <details>
        <summary>Changelogs(Latest)</summary>
          <p>※ New loading UI</p>
          <p>※ Resend OTP</p>
          <p>※ Contact link redirection</p>
          <p>※ Fixed some minor bugs.</p>
      </details>
    </div>
    <br>
    <p class="copyright">&#169 <a href="https://rajeshthapa69.com.np/">Rajesh Thapa</a></p>
    <br>
    <br>
    <br>
    <br>
    <br>
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