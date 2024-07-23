let { userModel, roomModel } = require("../models/index");

let registerUser = async (req, res)=>{
    let { firstName, lastName, email, phoneNumber, password, profilePicture } = await req.body;

    let user = await userModel.create({
        firstName,
        lastName,
        email,
        phoneNumber,
        password,
        profilePicture
    });

    res.json({ userID: `${user._id}` });
}

let loginUser = async (req, res)=>{
    let { phoneNumber, password } = await req.body;

    let user = await userModel.findOne({phoneNumber, password});

    console.log(user)

    if(user){
        res.json({ userID: `${user._id}` });
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