const users = require('../controllers/users');
const Model = require('../models/users');
const express = require('express');
const router = express.Router();
module.exports = router;

//Get all Users
router.get('/', users.getAllUsers);
//Create User
router.post('/', users.createNewUser);
//Get User By ID
router.get('/getOne/:id', users.getUserById)
//Update User
router.patch('/update/:id', users.updateUser)
//Delete User
router.delete('/delete/:id', users.deleteUser)