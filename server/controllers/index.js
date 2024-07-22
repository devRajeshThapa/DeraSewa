let { userModel } = require("../models/index");

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

module.exports = {
    registerUser,
    loginUser
}