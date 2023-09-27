
const express = require("express");
const app = express();
const path = require("path");

app.set("view-engine", "ejs");

app.use(express.static(path.join(__dirname, "public")));


app.get("/", (req, res) => {
    res.render("pages/index.ejs");
});

app.get("/login", (req, res) => {
    res.render("pages/login.ejs");

});


app.get("/register", (req, res) => {
    res.render("pages/register.ejs");

});

app.post("/register", (req, res) => {

})


app.listen(3000);











// const EXPRESS = require("express");
// require("dotenv").config();
// const BODYPARSER = require("body-parser");
// const CORS = require("cors");
// const MYSQL = require("mysql");

// const PORT = process.env.APP_PORT;

// const OPTIONS = {
//     connectionLimit: 10,
//     password: process.env.DB_PASS,
//     user: process.env.DB_USER,
//     database: process.env.MYSQL_DB,
//     host: process.env.DB_HOST,
//     port: process.env.DB_PORT,
//     createDatabaseTable: true
// }

// const POOL = mysql.createPool(options);


// const APP = express();

// APP.use(cors());

// APP.use(BODYPARSER.urlencoded({
//     extended: true
// }));

// APP.use(BODYPARSER.json());




// APP.listen(PORT, () => {
//     `server is listening on ${PORT}`
// });