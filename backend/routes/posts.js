const express = require('express');
const posts = require('../controllers/posts');

const router = express.Router();
module.exports = router;

//Get all Posts
router.get('/getPosts',posts.getAllPosts);
//Create Post
router.post('/newPost', posts.createNewPost);
