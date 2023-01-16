const express = require("express");
const app = express();
const path = require("path");
const { logger } = require("./logs/logger");
const PORT = process.env.PORT || 3500;

// Log every req, res event
app.use(logger);

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

app.listen(PORT, () => console.log(`Server running on ${PORT}`));