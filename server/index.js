let express = require("express");
require("dotenv").config();
let router = require("./routes/index");
let { Mongoose } = require("./connections/index");


let PORT = process.env.PORT;
let MONGODB_URI = process.env.MONGODB_URI;

Mongoose(MONGODB_URI);

let app = express();

app.use(express.urlencoded({ extended: false }));

app.use("/", router);

app.listen(PORT, ()=>{
    console.log(`Server started at PORT ${PORT}`);
})

