const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const Users = require('../models/users');

module.exports = {
    getAllUsers: async (req, res) => {
        try {
            const data = await Users.find();
            res.json(data);
        } catch (error) {
            res.status(500).json({message: error.message})
        }
    },

    createNewUser: async (req, res) => {

        // Email exists
        const isEmailRegistered = await Users.findOne({ email: req.body.email });

        if( isEmailRegistered ) {
            return res.status(400).json({error: 'Email already taken'})
        }

        // Encrypted Passoword
        const salt = await bcrypt.genSalt(10);
        const password = await bcrypt.hash(req.body.password, salt);

        const user = new Users({
            name: req.body.name,
            email: req.body.email,
            password: password
        })
    
        try {
            const userToSave = await user.save();
            res.status(200).json(userToSave)
        } catch (error) {
            res.status(400).json({message: error.message})
        }
    },

    getUserById: async (req, res) => {
        try {
            const data = await Users.findById(req.params.id);
            res.json(data)
        } catch (error) {
            res.status(500).json({message: error.message})
        }
    },

    updateUser: async (req, res) => {
        try {
            const id = req.params.id;
            const updatedData = req.body;
            const options = { new: true };
    
            const result = await Users.findByIdAndUpdate(
                id, updatedData, options
            )
            res.send(result)
        } catch (error) {
            res.status(400).json({message: error.message})
        }
    },

    deleteUser: async (req, res) => {
        try {
            const id = req.params.id;
            const data = await Users.findByIdAndDelete(id);
            res.send('User deleted')
        } catch (error) {
            res.status(400).json({message: error.message})
        }
    }
}
