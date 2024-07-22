let mongoose = require("mongoose");

let Mongoose = (MONGODB_URI) => {
    mongoose.connect(MONGODB_URI)
        .then(() => {
            console.log("Database connected");
        })
        .catch(() => {
            console.log("Database: Something went wrong");
        });
}

module.exports = {
    Mongoose,
    mongoose
};