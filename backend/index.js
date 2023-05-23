require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const connection = require('./db');
const userRoutes = require('./routes/users');
const authRoutes = require('./routes/auth');

connection();

app.use(cors());
app.use(express.json());

//Routes

app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);


const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Listening on Port : ${PORT}`);
});

