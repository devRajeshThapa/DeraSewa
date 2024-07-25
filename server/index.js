let express = require("express");
require("dotenv").config();
let router = require("./routes/index");
let { Mongoose } = require("./connections/index");
let bodyParser = require("body-parser")


let PORT = process.env.PORT;
let MONGODB_URI = process.env.MONGODB_URI;

Mongoose(MONGODB_URI);

let app = express();

app.use(bodyParser.json({limit: "50mb"}));
app.use(bodyParser.urlencoded({limit: "50mb", extended: true, parameterLimit:50000}));

app.use("/", router);

app.listen(PORT, ()=>{
    console.log(`Server started at PORT ${PORT}`);
})

