const { format } = require("date-fns");
const { v4: uuidv4 } = require("uuid");
const fs = require("fs");
const path = require("path");
const fsPromises = require("fs").promises;

/**
 * Creates a new log file and appends it to logs
 * @param {String} message exact message you want to save
 * @param {String} logFileName name of the log you want it to be saved as
 */
const logEvents = async (message, logFileName) => {
  const dateTime = format(new Date(), "yyyy/MM/dd HH:mm:ss");
  const logItem = `${dateTime}\t${uuidv4()}\t${message}\n`;

  try {
    // Check if directory logs exists
    if (!fs.existsSync(path.join(__dirname, "..", "logs"))) {
      // Create directory
      await fsPromises.mkdir(path.join(__dirname, "..", "logs"));
    }
    // Append the log item
    await fsPromises.appendFile(
      path.join(__dirname, "..", "logs", logFileName),
      logItem
    );
  } catch (err) {
    console.log(err);
  }
};

// Actual middleware that saves the log, displays the log, and gives control to the next middleware
const logger = (req, res, next) => {
    logEvents(`${req.method}\t${req.url}\t${req.headers.origin}`, "reqLog.log");
    console.log(`${req.method} ${req.path}`);
    next();
}

module.exports = { logEvents, logger }
