const mongoose = require('mongoose');

const Post = require('../models/posts');

module.exports = {
    getAllPosts: async (req, res) => {
        try {
            const data = await Post.find();
            res.json(data);
        } catch (error) {
            res.status(500).json({message: error.message})
        }
    },

    createNewPost: async (req, res) => {
        const data = new Post({
            title: req.body.title,
            message: req.body.message,
            creationDate: req.body.creationDate
        })
    
        try {
            const dataToSave = await data.save();
            res.status(200).json(dataToSave)
        } catch (error) {
            res.status(400).json({message: error.message})
        }
    },
}
