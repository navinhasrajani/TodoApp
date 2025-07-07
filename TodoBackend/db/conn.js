// MongoDb connection setup
const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async() => {
    try{
        console.log('Connecting to ', process.env.MONGO_DB_URL);
        const conn = await mongoose.connect(process.env.MONGO_DB_URL, {
            // No options are needed here as useNewUrlParser and useUnifiedTopology are default in Mongoose 6+
        });
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    }
    catch (error){
        console.error('MongoDB connection failed:', error.message);
    }
}

module.exports = connectDB;