const express = require('express');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
// const bodyParser = require('body-parser');
const connectDB = require('./config/database');
const app = express();
const PORT = process.env.PORT || 4000;
const authRoute = require('./routes/authRoute')

dotenv.config({
    path: './config/config.env',
})

app.use(express.json());
// app.use(bodyParser());
app.use(cookieParser());
app.use('/api/chat', authRoute);
app.get('/api', (req, res) => {
    res.send('server in running');
})

//connect database
connectDB()

app.listen(PORT, () => {
    console.log(`server in running on port ${PORT}`);
})

