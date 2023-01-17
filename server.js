require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const app = express();
const path = require("path");
const PORT = process.env.PORT || 3500;
console.log();

const cors = require("cors");
const cookieParser = require("cookie-parser");
const errorHandler = require("./middleware/errorHandler");
const corsOptions = require("./config/corsOptions");
const connectDB = require("./config/dbConn");
const { logger, logEvents } = require("./middleware/logger");

connectDB();

// Log every req, res event
app.use(logger);

// Make API public
app.use(cors(corsOptions));

// Process json files
app.use(express.json());

// Parse cookies
app.use(cookieParser());

app.use("/", express.static(path.join(__dirname, "public")));
app.use("/", require("./routes/root"));
app.use("/users", require("./routes/userRoutes"));

// Handle non-existing paths
app.all("*", (req, res) => {
    res.status(404);
    if (req.accepts("html")) {
        res.sendFile(path.join(__dirname, "views", "404.html"));
    } else if (req.accepts("json")) {
        res.json({message: "Page you requested for doesn't exist!!!"})
    } else {
        res.type("txt").send("Page not found!!!");
    }
})

// Handle errors
app.use(errorHandler)

// Show logs when connected to DB
mongoose.connection.once("open", () => {
    console.log("Connected to MongoDB");
    app.listen(PORT, () => console.log(`Server running on ${PORT}`));
})

// Show err log and save the log to mongoLog file
mongoose.connection.on("error", (err) => {
    console.log(err);
    logEvents(`${err.no}: ${err.code}\t${err.syscall}\t${err.hostname}`, "mongoErrLog.log");
})