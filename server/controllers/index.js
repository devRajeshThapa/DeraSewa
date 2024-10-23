let { userModel, roomModel, verificationModel } = require("../models/index");
let { registerAccountAlert, loginAlert, deleteAccountAlert, hostRoomAlert, deleteRoomAlert, editRoomAlert, changePassAlert } = require("./mail");
const nodemailer = require("nodemailer");
require("dotenv").config();

const transporter = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // Use `true` for port 465, `false` for all other ports
    auth: {
        user: process.env.VERIFICATION_EMAIL,
        pass: process.env.VERIFICATION_EMAIL_APP_PASS
    },
});

let registerUser = async (req, res) => {
    let { firstName, lastName, email, phoneNumber, password } = await req.body;

    if (firstName && lastName && email && phoneNumber && password) {
        if (firstName.length >= 3 && lastName.length >= 3) {

            let emailValidator = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

            if (emailValidator.test(email)) {

                let user = await userModel.findOne({ email })

                if (!user) {
                    let phoneValidator = /^(\+\d{1,3}[- ]?)?\d{10}$/;
                    if (phoneValidator.test(phoneNumber)) {
                        let user = await userModel.findOne({ phoneNumber });
                        if (!user) {
                            if (password.length >= 8) {
                                res.json({ success: "Valid" })
                            } else {
                                res.json({ error: "Password string can't be less than 8!" });
                            }
                        } else {
                            res.json({ error: "Phone number already registered!" });
                        }
                    } else {
                        res.json({ error: "Invalid phone number!" });
                    }
                } else {
                    res.json({ error: "Email already registered!" })
                }
            } else {
                res.json({ error: "Invalid email address!" });
            }
        } else {
            res.json({ error: "First Name or Last Name can't have less than 3 string!" });
        }
    } else {
        res.json({ error: "All the feild must be filled!" });
    }
}

let loginUser = async (req, res) => {
    let { email, password } = await req.body;

    let user = await userModel.findOne({ email, password });

    if (user) {
        res.json({ userID: `${user._id}` });

        let userData = {
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName
        }
        loginAlert(userData);
    } else if (!email || !password) {
        res.json({ error: "All the input feild must be filled!" });
    } else {
        res.json({ error: "Your credentials didn't matched!" });
    }
}

let deleteUser = async (req, res) => {

    let userID = req.params.userID

    let { password } = await req.body;

    if (password) {
        let user = await userModel.findOne({ password });
        let room = await roomModel.find({ userID: `${userID}` })

        if (room) {
            let room = await roomModel.deleteMany({ userID: `${userID}` })
        }
        if (user) {
            let user = await userModel.findByIdAndDelete(userID);
            res.json({ success: "Account succesfully deleted!" })

            let userData = {
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName
            }
            deleteAccountAlert(userData);
        } else {
            res.json({ error: "Password didn't matched!" })
        }
    } else {
        res.json({ error: "Please provide password!" })
    }
}

let hostRoom = async (req, res) => {

    let { userID, roomCoordinate, address, flat, apartment, floorNumber, bedRoom, bathRoom, kitchen, parking, price, description, roomPictures, phoneNumber, anotherPhone } = await req.body;

    let user = await userModel.findById(userID);

    if (anotherPhone) {
        if (roomCoordinate && address && floorNumber && bedRoom && price && roomPictures && phoneNumber) {
            let phoneValidator = /^(\+\d{1,3}[- ]?)?\d{10}$/;
            if (phoneValidator.test(phoneNumber)) {
                let room = await roomModel.create({
                    userID, roomCoordinate, address, flat, apartment, floorNumber, bedRoom, bathRoom, kitchen, parking, price, description, roomPictures, phoneNumber
                });
                res.json({ success: "Room hosted succesfully!" });

                let userData = {
                    email: user.email,
                    firstName: user.firstName,
                    lastName: user.lastName
                }
                hostRoomAlert(userData);
            } else {
                res.json({ error: "Invalid phone number!" })
            }
        } else {
            res.json({ error: "All required feild must be feild!" });
        }
    } else {
        if (roomCoordinate && address && floorNumber && bedRoom && price && roomPictures) {
            let room = await roomModel.create({
                userID, roomCoordinate, address, flat, apartment, floorNumber, bedRoom, bathRoom, kitchen, parking, price, description, roomPictures, phoneNumber: `${user.phoneNumber}`
            });
            res.json({ success: "Room hosted succesfully!" });
        } else {
            res.json({ error: "All required feild must be feild!" });
        }
    }
}

let getRooms = async (req, res) => {
    let userID = await req.params.userID;

    let user = await userModel.findById(userID);

    let email = await user.email;

    let verify = await verificationModel.find({ email: `${email}` });

    if (verify) {
        await verificationModel.deleteMany({ email: `${email}` });
    }

    let room = await roomModel.find({});

    if (room) {
        res.json(room);
    } else {
        res.send(false)
    }
}

let getRoom = async (req, res) => {
    let roomID = await req.params.roomID;

    let room = await roomModel.findById(roomID);

    if (room) {
        res.json(room);
    } else {
        res.send(false)
    }
}

let getUser = async (req, res) => {
    let userID = await req.params.userID;
    let user = await userModel.findById(userID);
    res.json(user);
}

let getHosterRoom = async (req, res) => {
    let hosterID = await req.params.hosterID;
    let room = await roomModel.find({ userID: `${hosterID}` });

    res.json(room);
}

let deleteRoom = async (req, res) => {
    let roomID = await req.params.roomID;

    let { password, userID } = await req.body;

    if (password) {
        let user = await userModel.findOne({ _id:`${userID}`, password:`${password}` });
        let userData = {
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName
        }

        if (user) {
            let room = await roomModel.findByIdAndDelete(roomID);
            res.json({ success: "Room succesfully deleted!" })
            deleteRoomAlert(userData);
        } else {
            res.json({ error: "Password didn't matched!" })
        }
    } else {
        res.json({ error: "Please provide password!" })
    }
}

let updateUserInfo = async (req, res) => {

    let userID = await req.params.userID;

    let { firstName, lastName, email, phoneNumber, password, profilePicture } = await req.body;

    if (firstName && lastName, email, phoneNumber, password) {
        if (firstName.length >= 3 && lastName.length >= 3) {

            let emailValidator = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

            if (emailValidator.test(email)) {

                let phoneValidator = /^(\+\d{1,3}[- ]?)?\d{10}$/;

                if (phoneValidator.test(phoneNumber)) {
                    if (password.length >= 8) {
                        if (profilePicture) {
                            let user = await userModel.findByIdAndUpdate(userID, {
                                firstName: `${firstName}`,
                                lastName: `${lastName}`,
                                email: `${email}`,
                                phoneNumber: `${phoneNumber}`,
                                password: `${password}`,
                                profilePicture: `${profilePicture}`
                            })
                            res.json({ success: "Profile updated successfully!" });
                        } else {
                            res.json({ error: "Image format can be only - JPG, PNG, JPEG!" });
                        }
                    } else {
                        res.json({ error: "Password string length can't be less than 8!" });
                    }
                } else {
                    res.json({ error: "Invalid phone number!" });
                }
            } else {
                res.json({ error: "Invalid email address!" });
            }
        } else {
            res.json({ error: "First Name and Last Name string can't have length less than 3!" });
        }
    } else {
        res.json({ error: "All the input feild must be filled!" });
    }

}

let editRoom = async (req, res) => {
    let roomID = await req.params.roomID;
    let { userID, roomCoordinate, address, flat, apartment, floorNumber, bedRoom, bathRoom, kitchen, parking, price, description, roomPictures, phoneNumber } = await req.body;

    let user = await userModel.findById(userID);

    if (roomCoordinate && address && floorNumber && bedRoom && price && roomPictures, phoneNumber) {
        let phoneValidator = /^(\+\d{1,3}[- ]?)?\d{10}$/;
        if (phoneValidator.test(phoneNumber)) {
            let room = await roomModel.findByIdAndUpdate(roomID, {
                userID,
                roomCoordinate,
                address,
                flat,
                apartment,
                floorNumber,
                bedRoom,
                bathRoom,
                kitchen,
                parking,
                price,
                description,
                roomPictures,
                phoneNumber
            })
            res.json({ success: "Room info changed successfully!" })

            let userData = {
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName
            }
            editRoomAlert(userData);
        } else {
            res.json({ error: "Invalid phone number!" })
        }
    } else {
        res.json({ error: "All required feild must be feild!" })
    }
}
let genOTP = async (req, res) => {

    let email = await req.params.email;

    let OTP = await (Math.floor(Math.random() * 10000) + 10000).toString().substring(1);

    let verification = await verificationModel.create({
        email: `${email}`,
        OTP: `${OTP}`
    })

    async function main() {
        // send mail with defined transport object
        const info = await transporter.sendMail({
            from: {
                name: "DeraSewa",
                address: process.env.VERIFICATION_EMAIL
            },
            to: `${email}`, // list of receivers
            subject: "User Verification", // Subject line
            html: `
            <div style="font-family: Helvetica,Arial,sans-serif;min-width:1000px;overflow:auto;line-height:2">
  <div style="margin:50px auto;width:70%;padding:20px 0">
    <div style="border-bottom:1px solid #eee">
      <a href="" style="font-size:1.4em;color: #00466a;text-decoration:none;font-weight:600">DeraSewa</a>
    </div>
    <p style="font-size:1.1em">Dear, User</p>
    <p>Thank you for choosing DeraSewa. Use the following OTP to complete your Sign Up procedures. OTP is valid for 5 minutes</p>
    <h2 style="background: #00466a;margin: 0 auto;width: max-content;padding: 0 10px;color: #fff;border-radius: 4px;">${OTP}</h2>
    <p style="font-size:0.9em;">Regards,<br />DeraSewa</p>
    <hr style="border:none;border-top:1px solid #eee" />
    <div style="float:right;padding:8px 0;color:#aaa;font-size:0.8em;line-height:1;font-weight:300">
      <p>DeraSewa</p>
      <p>Maitidevi, Kathmandu</p>
    </div>
  </div>
</div>
            `, // html body
        });

        console.log("Message sent: %s", info.messageId);
        // Message sent: <d786aa62-4e0a-070a-47ed-0b0666549519@ethereal.email>
    }

    main().catch(console.error);
}

let getOTP = async (req, res) => {
    let email = await req.params.email;

    let verify = await verificationModel.find({ email: `${email}` });

    if (verify) {
        res.json({ OTP: `${verify[verify.length - 1].OTP}` });
    }
}

let createUser = async (req, res) => {
    let { firstName, lastName, email, phoneNumber, password } = await req.body;

    let user = await userModel.create({
        firstName,
        lastName,
        email,
        phoneNumber,
        password,
    });

    res.json({ userID: `${user._id}` });

    let userData = {
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName
    }

    registerAccountAlert(userData);
}

let forgotPass = async (req, res) => {
    let email = await req.params.email;

    let { password } = await req.body

    if (email && password) {
        let user = await userModel.find({ email: `${email}` });

        if (user.length !== 0) {
            if(password.length >= 8){
                res.json({ success: "Enter OTP to verify!" })
            }else{
                res.json({ error: "Password string can't be less than 8!" })
            }
        } else {
            res.json({ error: "Email does not exist!" })
        }
    } else {
        res.json({ error: "All the input feild must be filled!" })
    }
}

let genOTPForgotPass = async (req, res) => {
    let email = await req.params.email;

    let user = await userModel.findOne({ email, password });

    let OTP = await (Math.floor(Math.random() * 10000) + 10000).toString().substring(1);

    let verification = await verificationModel.create({
        email: `${email}`,
        OTP: `${OTP}`
    })

    async function main() {
        // send mail with defined transport object
        const info = await transporter.sendMail({
            from: {
                name: "DeraSewa",
                address: process.env.VERIFICATION_EMAIL
            },
            to: `${email}`, // list of receivers
            subject: "User Verification", // Subject line
            html: `
            <div style="font-family: Helvetica,Arial,sans-serif;min-width:1000px;overflow:auto;line-height:2">
  <div style="margin:50px auto;width:70%;padding:20px 0">
    <div style="border-bottom:1px solid #eee">
      <a href="" style="font-size:1.4em;color: #00466a;text-decoration:none;font-weight:600">DeraSewa</a>
    </div>
    <p style="font-size:1.1em">Dear, ${user.firstName} ${user.lastName}</p>
    <p>Thank you for choosing DeraSewa. Use the following OTP to change your password. OTP is valid for 5 minutes</p>
    <h2 style="background: #00466a;margin: 0 auto;width: max-content;padding: 0 10px;color: #fff;border-radius: 4px;">${OTP}</h2>
    <p style="font-size:0.9em;">Regards,<br />DeraSewa</p>
    <hr style="border:none;border-top:1px solid #eee" />
    <div style="float:right;padding:8px 0;color:#aaa;font-size:0.8em;line-height:1;font-weight:300">
      <p>DeraSewa</p>
      <p>Maitidevi, Kathmandu</p>
    </div>
  </div>
</div>
            `, // html body
        });

        console.log("Message sent: %s", info.messageId);
        // Message sent: <d786aa62-4e0a-070a-47ed-0b0666549519@ethereal.email>
    }

    main().catch(console.error);
}

let changePass = async(req, res)=>{

    let email = await req.params.email;

    let { password, OTP } = await req.body;

    let verify = await verificationModel.find({ email: `${email}` });

    if(OTP){
        if (verify[verify.length - 1].OTP == Number(OTP)) {
            let user = await userModel.findOneAndUpdate({ email: `${email}` }, {
                password: `${password}`
            })
            res.json({ success: "Password changed succesfully!" })

            let userData = {
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName
            }
            changePassAlert(userData);
        }else{
            res.json({ error: "OTP did not matched!" })
        }
    }else{
        res.json({ error: "Please enter the OTP!" })
    }
}

module.exports = {
    registerUser,
    loginUser,
    deleteUser,
    hostRoom,
    getRooms,
    getRoom,
    getUser,
    getHosterRoom,
    deleteRoom,
    updateUserInfo,
    editRoom,
    genOTP,
    getOTP,
    createUser,
    forgotPass,
    genOTPForgotPass,
    changePass
}