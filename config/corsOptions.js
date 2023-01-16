const allowedOrigins = require("./allowedOrigins");

const corsOptions = {
    origin: (origin, callback) => {
        // Check if origin is in allowed list
        // Check if there's even a origin (POSTMAN is originless)
        if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
            // Error obj: null
            // Allowed boolean: true
            callback(null, true);
        } else {
            callback(new Error("Not allowed by CORS!"));
        }
    },
    credentials: true,
    optionsSuccessStatus: 200
};

module.exports = corsOptions;