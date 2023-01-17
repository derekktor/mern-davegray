const User = require("../models/User");
const Note = require("../models/Note");
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");

/**
 * @desc Get all users
 * @route GET /users
 * @access Private
 */
const getAllUsers = asyncHandler(async (req, res) => {
    // Get all users but without their password and in pretty json format
    const users = await User.find().select("-password").lean()

    // Check if there are any users
    if (!users?.length) {
        return res.status(400).json({message: "No users found!"});
    }

    res.json(users);
})

/**
 * @desc Create new user
 * @route POST /users
 * @access Private
 */
const createUser = asyncHandler(async (req, res) => {
    const {username, password, roles} = req.body

    // Check if fields are filled
    if (!username || !password || !Array.isArray(roles) || !roles.length) {
        return res.status(400).json({message: "Please fill username, password, roles fields!!!"});
    }

    // Check for duplicate
    const duplicate = await User.findOne({ username }).lean().exec();
    if (duplicate) {
        return res.status(409).json({message: "Username already exists!!!"});
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user object
    const userData = {username, "password": hashedPassword, roles};
    const newUser = await User.create(userData);
    
    // Check if user was created in DB
    if (newUser) {
        res.status(201).json({message: `${newUser.username} is created successfully!!!`});
    } else {
        res.status(400).json({message: `Invalid data provided!!!`});
    }
})

/**
 * @desc Update user
 * @route PATCH /users
 * @access Private
 */
const updateUser = asyncHandler(async (req, res) => {
    // Extract user info
    const {id, username, password, roles, active} = req.body;

    // Check if fields are correct
    if (!id || !username || !Array.isArray(roles) || !roles.length || typeof active !== "boolean") {
        return res.status(400).json({message: "Please provide every field in its correct format!!!"});
    }

    // Find user
    const user = await User.findById(id);

    // Check if user exists
    if (!user) {
        return res.status(400).json({message: "User doesn't exist!!!"});
    }
    
    // Check for duplicate
    const duplicate = await User.findOne({username}).lean().exec();
    if (duplicate && duplicate?._id.toString() !== id) {
        return res.status(409).json({message: `${username} already exists!!!`});
    }

    // Update user info
    user.username = username;
    user.roles = roles;
    user.active = active;

    // Hash the password and update password
    if (password) {
        user.password = bcrypt.hash(password, 10);
    }

    // Save new user info to DB
    const updatedUser = await user.save();

    // Log result
    res.status(201).json({message: `${updatedUser.username} is updated successfully!!!`});
})

/**
 * @desc Delete user
 * @route DELETE /users
 * @access Private
 */
const deleteUser = asyncHandler(async (req, res) => {
    // Get user id
    const {id} = req.body;

    // Check if user provided any id
    if (!id) {
        return res.status(400).json({message: `Please provide ID!!!`});
    }
    
    // Check if any note exists for a given user id
    const notes = await Note.find({user: id}).lean().exec();
    if (notes?.length) {
        return res.status(400).json({message: `User has notes!!!`});
    }

    // Check if user exists
    const user = await User.findById(id).exec();
    if (!user) {
        return res.status(400).json({message: `User doesn't exist!!!`});
    }

    // Delete user from DB
    const result = await user.deleteOne();

    // Log result
    const reply = `${result.username}[${result._id}] is deleted successfully!!!`;
    res.json(reply);
})

module.exports = {
    getAllUsers,
    createUser,
    updateUser,
    deleteUser
}