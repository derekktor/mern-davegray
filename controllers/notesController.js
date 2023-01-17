const asyncHandler = require("express-async-handler");
const Note = require("../models/Note");
const User = require("../models/User");

/**
 * @desc Get all notse
 * @route GET /notes
 * @access Private
 */
const getAllNotes = asyncHandler(async (req, res) => {
    // Fetch notes from DB
    const notes = await Note.find().lean().exec();

    // Check if there are any notes
    if (!notes?.length) {
        return res.status(400).json({message: "There are no notes!"});
    }

    // Display notes
    res.status(200).json(notes);
});

module.exports = {
    getAllNotes
}