if (process.env.NODE_ENV !== "production") {
    require("dotenv").config();
  }


const express = require("express");
const app = express();
const path = require("path");
const bcrypt = require("bcrypt");

const users = [];

// Sets the view engine as Embedded JavaScript templates as templating language
app.set("view-engine", "ejs");


// Serves static files via Express
app.use(express.static(path.join(__dirname, "public")));

// Parses the encoded URL info
app.use(express.urlencoded( {extended: false}));


// Routes that will be organized into the routes folder later
app.get("/", (req, res) => {
    res.render("pages/index.ejs");
});

app.get("/login", (req, res) => {
    res.render("pages/login.ejs");

});

app.post("/login", (req, res) => {
    

});


//
//Register routes
//

app.get("/register", (req, res) => {
    res.render("pages/register.ejs");

});

app.post("/register", async (req, res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        users.push({
            id: Date.now().toString(),
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword
        });

        res.redirect("/login");

    } catch {
        res.redirect("/register");
        console.log("something went wrong");
    }
    console.log(users);
})


// launches the app 
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