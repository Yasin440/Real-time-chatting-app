const mongoose = require('mongoose');
const dbConnect = () => {
    mongoose.connect(process.env.DB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        // useCreateIndex: true
    }).then(() => {
        console.log('MongoDB database connected')
    }).catch(error => {
        console.log(error);
    })
}
module.exports = dbConnect;