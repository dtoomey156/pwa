if (process.env.NODE_ENV !== "production") {
    require("dotenv").config();
}


const express = require("express");
const app = express();
const path = require("path");
const bcrypt = require("bcrypt");
const passport = require("passport");
const initializePassport = require("./passport-config");
const flash = require("express-flash");
const session = require("express-session");
const methodOverride = require("method-override")


initializePassport(
    passport,
    email => users.find(user => user.email === email),
    id => users.find(user => user.id === id)
);
const users = [];

// Sets the view engine as Embedded JavaScript templates as templating language
app.set("view-engine", "ejs");


// Serves static files via Express
app.use(express.static(path.join(__dirname, "public")));

// Parses the encoded URL info
app.use(express.urlencoded( {extended: false}));

app.use(flash());

app.use(session({
    secret: process.env.SESS_SECRET,
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(methodOverride("_method"));



// Routes that will be organized into the routes folder later

// Get routes
app.get("/", checkAuthenticated, (req, res) => {
    res.render("pages/index.ejs", {name: req.user.name});
});


app.get("/login", (req, res) => {
    res.render("pages/login.ejs");

});





app.get("/register", checkNotAuthenticated, (req, res) => {
    res.render("pages/register.ejs");

});


// Post routes
app.post("/login", checkNotAuthenticated, passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/login",
    failureFlash: true
}))

app.post("/register", checkNotAuthenticated, async (req, res) => {
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

app.delete("/logout", (req, res) => {
    req.logout( err => {
        if (err) {
            return next(err);
        }
        res.redirect("/login");
    });

});

function checkAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    } else {
        res.redirect("/login");
    }
}

function checkNotAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        res.redirect("/");
    } else {
        return next();
    }
}

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