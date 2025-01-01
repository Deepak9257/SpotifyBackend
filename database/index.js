const { default: mongoose } = require("mongoose");
const { DB_URL } = require("../config");





const dbconn = () => {

    try {

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

