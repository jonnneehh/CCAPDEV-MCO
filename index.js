import "dotenv/config";

import express from "express";
import exphbs from "express-handlebars";
import routes from "./routes/routes.js";
import db from "./models/db.js";

import passport from "passport";
import flash from "connect-flash";
import session from "express-session";

const port = process.env.PORT;

const app = express();

// Passport config
import passportconfig from "./configs/passport.js";
passportconfig(passport);

db.connect();

const hbs = exphbs.create({
    extname: "hbs",
    runtimeOptions: {
        allowProtoPropertiesByDefault: true,
        allowProtoMethodsByDefault: true
    },
    helpers: {
        blue: function(isUpvoted){
            if(isUpvoted) return "rgb(0, 0, 255)"
            else return "rgb(38, 38, 38)"
        },
        red: function (isDownvoted){
            if(isDownvoted) return "rgb(255, 0, 0)"
            else return "rgb(38, 38, 38)"
        }
    } 
})

app.engine("hbs", hbs.engine);

app.set("view engine", "hbs");
app.set("views", "./views");

app.use(express.static(`public`));

// Allows use of req.body 
app.use(express.urlencoded({extended: false}));  


// For express sessions
app.use(session({
    secret: "wenkwonk",
    resave: true,
    saveUninitialized: true
}));

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());


// For connect-flash
app.use(flash());

// Global variables
app.use( function (req, res, next) {
    res.locals.user = req.user || null;
    res.locals.success_msg = req.flash("success_msg");
    res.locals.error_msg = req.flash("error_msg");
    res.locals.error = req.flash("error");
    next();
})

app.use(`/`, routes);

app.listen(port, function () {
    console.log(`Server is running at:`);
    console.log(`http://localhost:` + port);
})
