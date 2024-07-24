let { userModel, roomModel } = require("../models/index");

let registerUser = async (req, res)=>{
    let { firstName, lastName, email, phoneNumber, password, profilePicture } = await req.body;

    let user = await userModel.findOne({phoneNumber});

    if(firstName && lastName && email && phoneNumber && password && profilePicture){
        if( firstName.length >= 3 && lastName.length >= 3 ){

            let emailValidator = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    
            if(emailValidator.test(email)){

                let phoneValidator = /^(\+\d{1,3}[- ]?)?\d{10}$/;

                if(phoneValidator.test(phoneNumber)){
                    if(!user){
                        if(password.length >= 8){
                            if(profilePicture){
                                let user = await userModel.create({
                                    firstName,
                                    lastName,
                                    email,
                                    phoneNumber,
                                    password,
                                    profilePicture
                                });
                            
                                res.json({ userID: `${user._id}` });
                            }else{
                                res.json({ error: "Image format can be only - JPG, PNG, JPEG!" });
                            }
                        }else{
                            res.json({ error: "Password string can't be less than 8!" });
                        }
                    }else{
                        res.json({ error: "Phone number already registered!" });
                    }
                }else{
                    res.json({ error: "Invalid phone number!" });
                }
            }else{
                res.json({ error: "Invalid email address!" });
            }
        }else{
            res.json({ error: "First Name or Last Name can't have less than 3 string!" });
        }
    }else{
        res.json({ error: "All the feild must be filled!" });
    }
}

let loginUser = async (req, res)=>{
    let { phoneNumber, password } = await req.body;

    let user = await userModel.findOne({phoneNumber, password});

    if(user){
        res.json({ userID: `${user._id}` });
    }else if(!phoneNumber || !password){
        res.json({ error: "All the input feild must be filled!" });
    }else{
        res.json({ error: "Your credentials didn't matched!" });
    }
}

let hostRoom = async (req, res)=>{
    let { userID, roomLocation, address, flat, private, floorNumber, bedRoom, bathRoom, kitchen, parking, price, discription, roomPictures } = await req.body;

    let room = await roomModel.create({
        userID, roomLocation, address, flat, private, floorNumber, bedRoom, bathRoom, kitchen, parking, price, discription, roomPictures
    });

    room.roomLocation.forEach((item)=>{
        console.log(item)
    })
}

let getRooms = async (req,res)=>{
    let room = await roomModel.find({});
    res.json(room);
}

let getUser = async (req, res)=>{
    let userID = await req.params.userID;

    let user = await userModel.findById(userID);

    res.json(user);
}

let getHosterRoom = async (req, res)=>{
    let userID = await req.params.userID;

    let room = await roomModel.find({userID: `${userID}`});

    res.json(room);
}

let deleteRoom = async (req, res)=>{
    let roomID = await req.params.roomID;

    let room = await roomModel.findByIdAndDelete(roomID);
}

let updateUserInfo = async (req, res)=>{
    let userID = await req.params.userID

    let { firstName, lastName, email, phoneNumber, password, profilePicture } = await req.body;

    let user = await userModel.findByIdAndUpdate(userID, {
        firstName: `${firstName}`,
        lastName: `${lastName}`,
        email: `${email}`,
        phoneNumber: `${phoneNumber}`,
        password: `${password}`,
        profilePicture: `${profilePicture}`
    })
}

module.exports = {
    registerUser,
    loginUser,
    hostRoom,
    getRooms,
    getUser,
    getHosterRoom,
    deleteRoom,
    updateUserInfo
}