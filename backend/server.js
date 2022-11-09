const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/database');
const app = express();
dotenv.config({
    path: './config/config.env',
})

const PORT = process.env.PORT || 4000;
app.get('/', (req, res) => {
    res.send('server in running');
})

//connect database
connectDB()

app.listen(PORT, () => {
    console.log(`server in running on port ${PORT}`);
})

