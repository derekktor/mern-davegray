const mongoose = require("mongoose");

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.DB_URI);
    } catch (err) {
        console.log(err);
    }
}

module.exports = connectDB;