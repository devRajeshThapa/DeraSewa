let { userModel, roomModel, verificationModel } = require("../models/index");

let registerUser = async (req, res) => {
    let { firstName, lastName, email, phoneNumber, password, profilePicture } = await req.body;

    let user = await userModel.findOne({ phoneNumber });

    if (firstName && lastName && email && phoneNumber && password && profilePicture) {
        if (firstName.length >= 3 && lastName.length >= 3) {

            let emailValidator = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

            if (emailValidator.test(email)) {

                let phoneValidator = /^(\+\d{1,3}[- ]?)?\d{10}$/;

                if (phoneValidator.test(phoneNumber)) {
                    if (!user) {
                        if (password.length >= 8) {
                            if (profilePicture) {
                                let user = await userModel.create({
                                    firstName,
                                    lastName,
                                    email,
                                    phoneNumber,
                                    password,
                                    profilePicture
                                });

                                res.json({ userID: `${user._id}` });
                            } else {
                                res.json({ error: "Image format can be only - JPG, PNG, JPEG!" });
                            }
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
    let { phoneNumber, password } = await req.body;

    let user = await userModel.findOne({ phoneNumber, password });

    if (user) {
        res.json({ userID: `${user._id}` });
    } else if (!phoneNumber || !password) {
        res.json({ error: "All the input feild must be filled!" });
    } else {
        res.json({ error: "Your credentials didn't matched!" });
    }
}

let verifyUser = async(req, res) =>{
    let { phoneNumber } = await req.body
}

let deleteUser = async (req, res) => {

    let userID = req.params.userID

    let { password } = await req.body;

    if(password){
        let user = await userModel.findOne({ password });
        if(user){
            let user = await userModel.findByIdAndDelete(userID);
            res.json({ success: "Account succesfully deleted!" })
        }else{
            res.json({ error: "Password didn't matched!" })
        }
    }else{
        res.json({ error: "Please provide password!" })
    }
}

let hostRoom = async (req, res) => {

    let { userID, roomCoordinate, address, flat, apartment, floorNumber, bedRoom, bathRoom, kitchen, parking, price, discription, roomPictures } = await req.body;

    if(roomCoordinate && address && floorNumber && bedRoom && price && roomPictures){
        let room = await roomModel.create({
            userID, roomCoordinate, address, flat, apartment, floorNumber, bedRoom, bathRoom, kitchen, parking, price, discription, roomPictures
        });
        res.json({ success: "Room hosted succesfully!" });
    }else{
        res.json({ error: "All required feild must be feild!" });
    }
}

let getRooms = async (req, res) => {
    let room = await roomModel.find({});
    
    if(room){
        res.json(room);
    }else{
        res.send(false)
    }
}

let getRoom = async (req, res) =>{
    let roomID = await req.params.roomID;

    let room = await roomModel.findById(roomID);
    
    if(room){
        res.json(room);
    }else{
        res.send(false)
    }
}

let getUser = async (req, res) => {
    let userID = await req.params.userID;
    let user = await userModel.findById(userID);
    res.json(user);
}

let getHosterRoom = async (req, res) => {
    let userID = await req.params.userID;

    let room = await roomModel.find({ userID: `${userID}` });

    res.json(room);
}

let deleteRoom = async (req, res) => {
    let roomID = await req.params.roomID;

    let room = await roomModel.findByIdAndDelete(roomID);
}

let updateUserInfo = async (req, res) => {

    let userID = await req.params.userID;

    let { firstName, lastName, email, phoneNumber, password, profilePicture } = await req.body;

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
                    res.json({ error: "Password string can't be less than 8!" });
                }
            } else {
                res.json({ error: "Invalid phone number!" });
            }
        } else {
            res.json({ error: "Invalid email address!" });
        }
    } else {
        res.json({ error: "First Name or Last Name can't have less than 3 string!" });
    }

}

module.exports = {
    registerUser,
    loginUser,
    verifyUser,
    deleteUser,
    hostRoom,
    getRooms,
    getRoom,
    getUser,
    getHosterRoom,
    deleteRoom,
    updateUserInfo
}