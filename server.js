const express = require("express");
const app = express();
const path = require("path");
const PORT = process.env.PORT || 3500;

const { logger } = require("./middleware/logger");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const errorHandler = require("./middleware/errorHandler");


// Log every req, res event
app.use(logger);

// Make it public
app.use(cors());

// Process json files
app.use(express.json());

// Parse cookies
app.use(cookieParser);

app.use("/", express.static(path.join(__dirname, "public")));
app.use("/", require("./routes/root"));

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

app.use(errorHandler)

app.listen(PORT, () => console.log(`Server running on ${PORT}`));