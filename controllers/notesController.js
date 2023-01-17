const asyncHandler = require("express-async-handler");
const Note = require("../models/Note");
const User = require("../models/User");

/**
 * @desc Get all notes
 * @route GET /notes
 * @access Private
 */
const getAllNotes = asyncHandler(async (req, res) => {
  // Fetch notes from DB
  const notes = await Note.find().lean().exec();

  // Check if there are any notes
  if (!notes?.length) {
    return res.status(400).json({ message: "There are no notes!" });
  }

  // Display notes
  res.status(200).json(notes);
});

/**
 * @desc Create note
 * @route POST /notes
 * @access Private
 */
const createNote = asyncHandler(async (req, res) => {
  // Extract note info
  const { user, title, text } = req.body;

  // Check if all fields are filled
  if (!user || !title || !text) {
    return res
      .status(400)
      .json({ message: "Please provide userId, title, text fields!" });
  }

  //   Check if user exists
  const userDB = await User.findById(user).exec();
  if (!userDB) {
    return res.status(400).json({ message: "User doesn't exist!" });
  }

  // Create and save to DB
  const noteData = {
    user,
    title,
    text,
  };
  const newNote = await Note.create(noteData);

  // Log result
  return res
    .status(400)
    .json({ message: `Note is created successfully for ${userDB.username}` });
});

/**
 * @desc Update note
 * @route PATCH /notes
 * @access Private
 */
const updateNote = asyncHandler(async (req, res) => {});

/**
 * @desc Delete note
 * @route DELETE /notes
 * @access Private
 */
const deleteNote = asyncHandler(async (req, res) => {});

module.exports = {
  getAllNotes,
  createNote,
  updateNote,
  deleteNote,
};
