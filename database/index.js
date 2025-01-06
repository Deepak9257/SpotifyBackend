const { default: mongoose } = require("mongoose");
require('dotenv').config();




const dbconn = () => {

    try {
        const DB_URL = process.env.DB_URL || 'mongodb+srv://spotify:spotify@spotify.0qovp.mongodb.net/spotify'
        mongoose.connect(DB_URL);
        const db = mongoose.connection;
        db.on('connected', () => {
            console.log("database connected")

        });

        db.on('error', () => {
            throw new Error("database not connected")
        });

    }
    catch (err) {
        console.log("database not connected");

    }

}

dbconn();