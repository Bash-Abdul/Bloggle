const mongoose = require('mongoose');

let isConnected = false; // Track the connection status

const connectDB = async () => {
    if (isConnected) {
        console.log("Database is already connected");
        return;
    }

    try {
        const db = await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        isConnected = db.connections[0].readyState;
        console.log("Connected to MongoDB");
    } catch (error) {
        console.error("Error connecting to MongoDB", error);
        process.exit(1); // Exit the process with a failure code
    }
};

module.exports = connectDB;
