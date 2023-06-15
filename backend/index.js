require('dotenv').config();

const routes = require('./routes/users');
const posts = require('./routes/posts');
const login = require('./routes/login');
const verifyToken = require('./routes/validate-token');
const cors = require('cors');

const mongoString = process.env.DATABASE_URL
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();
const database = mongoose.connection;

mongoose.connect(mongoString);

database.on('error', (error) => {
    console.log(error);
})

database.once('connected', () => {
    console.log('Database Connected');
})



app.use(cors());
app.use(bodyParser.json());
app.use('/api', routes);
app.use('/api', login);

//Protected routes
app.use('/api', verifyToken, posts);

app.listen(3000, () => {
    console.log(`Server Started at ${3000}`)
})



