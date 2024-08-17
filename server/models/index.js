let mongoose = require("mongoose");

let userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    profilePicture: {
        type: String,
        required: false
    },
},
    { timestamps: true }
);

let roomSchema = new mongoose.Schema({
    userID: {
        type: String,
        required: true
    },
    roomCoordinate: {
        type: Array,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    flat: {
        type: Boolean,
    },
    apartment: {
        type: Boolean,
    },
    floorNumber: {
        type: Number,
        required: true
    },
    bedRoom: {
        type: Number,
        required: true
    },
    bathRoom: {
        type: Boolean,
        required: true
    },
    kitchen: {
        type: Boolean,
        required: true
    },
    parking: {
        type: Boolean,
        required: true
    },
    price: {
        type: String,
        required: true
    },
    description: {
        type: String,
    },
    roomPictures: {
        type: Array,
        required: true
    },
    phoneNumber: {
        type: String,
        required: true
    }
},

    { timestamps: true }
);

let verificationSchema = new mongoose.Schema({
    email: {
        required: true,
        type: String
    },
    OTP: {
        type: Number,
        required: true
    }
})


let userModel = mongoose.model("User", userSchema);
let roomModel = mongoose.model("Room", roomSchema);
let verificationModel = mongoose.model("Verify", verificationSchema)

module.exports = {
    userModel,
    roomModel,
    verificationModel
};