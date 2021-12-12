const path = require("path");
const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const morgan = require("morgan");
const { engine } = require("express-handlebars");
const passport = require("passport");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const connectDB = require("./config/db");

// load config
dotenv.config({ path: "./config/config.env" });

// passport config
require("./config/passport")(passport);

connectDB();

const app = express();

// body parser
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Logging
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// Handlebars
app.engine(".hbs", engine({ defaultLayout: "main", extname: ".hbs" }));
app.set("view engine", ".hbs");
app.set("views", "./views");

// sessions
app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: process.env.MONGO_URI,
      mongooseConnection: mongoose.connection,
    }),
  })
);

// passport middleware
app.use(passport.initialize());
app.use(passport.session());

// static
app.use(express.static(path.join(__dirname, "public")));
// Routes
app.use("/", require("./routes/homeRoute"));
app.use("/auth", require("./routes/auth"));
app.use("/stories", require("./routes/stories"));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`server running in ${process.env.NODE_ENV} port: ${PORT}`);
});
