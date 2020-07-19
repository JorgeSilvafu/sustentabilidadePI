const express = require('express');
const router = express.Router();
const User = require('../models/user');



// @route GET /users/getAllUsers
// @desc Get All Users
// @access Private
router.get('/getAllUsers', async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
});

// @route GET /users/getUser/:id
// @desc Get User
// @access Private
router.get('/getUser/:id', getUser, (req, res) => {
    res.send(res.user);
});

// @route POST /users/createUser
// @desc Create User
// @access Private
router.post('/createUser', async (req, res) => {
    const user = new User({
        username: req.body.username,
        password: req.body.password,
        email: req.body.email,
        role: req.body.role
    })
    try {
        const newUser = await user.save();
        res.status(201).json(newUser);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// @route POST /users/updateUser/:id
// @desc Update User
// @access Private
router.patch('/updateUser/:id', getUser, async (req, res) => {
    if (res.body.password != null) {
        res.user.password = req.body.password;
    }
    if (res.body.email != null) {
        res.user.email = req.body.email;
    }
    if (res.body.role != null) {
        res.user.role = req.body.role;
    }
    try {
        const updatedUser = await res.user.save();
        res.json(updatedUser);
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
});

// @route GET /users/deleteUser/:id
// @desc Delete User
// @access Private
router.delete('/deleteUser/:id', getUser, async (req, res) => {
    try {
        await res.user.remove();
        res.json({ message: 'Utilizador eliminado' });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
});

async function getUser(req, res, next) {
    let user;
    try {
        user = await User.findById(req.params.id);
        if (user == null) {
            return res.status(404).json({ message: 'Utilizador inexistente' })
        }

    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
    res.user = user;
    next();
}

module.exports = router;