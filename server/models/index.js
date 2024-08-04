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
        required: true
    },
    deraCoin: {
        type: Number,
        required: false,
        default: 0
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
    }
},

    { timestamps: true }
);

let referralSchema = new mongoose.Schema({
    referralCreaterUserID: {
        type: String,
        required: true
    },
    referralCode: {
        type: String,
        required: true
    },
    referralConsumers: {
        type: Number,
        required: false,
        default: 0
    },
},
{ timestamps: true }
)

let userModel = mongoose.model("User", userSchema);
let roomModel = mongoose.model("Room", roomSchema);
let referralModel = mongoose.model("Referral", referralSchema);

module.exports = {
    userModel,
    roomModel,
    referralModel
};