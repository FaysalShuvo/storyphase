const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const { engine } = require("express-handlebars");
const connectDB = require("./config/db");

// load config
dotenv.config({ path: "./config/config.env" });
connectDB();

const app = express();

// Logging
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// Handlebars
app.engine(".hbs", engine({ defaultLayout: "main", extname: ".hbs" }));
app.set("view engine", ".hbs");
app.set("views", "./views");

// Routes
app.use("/", require("./routes/homeRoute"));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`server running in ${process.env.NODE_ENV} port: ${PORT}`);
});
