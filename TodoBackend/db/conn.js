// MongoDb connection setup
const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async() => {
    try{
        console.log('Connecting to ', process.env.MONGO_DB_URL);
        const conn = await mongoose.connect(process.env.MONGO_DB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    }
    catch (error){
        console.error('MongoDB connection failed:', error.message);
    }
}

module.exports = connectDB;