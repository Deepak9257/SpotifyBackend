const mongoose = require('mongoose');

const songSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    
    album:{
        type: String, 
        ref:"album",
        required:true

    },
    artist:{
        type: String,
        ref:"artists",
        required:true
    },
    description:{
        type: String,
    },
    time:{
        type: String,
    },
    isActive: {
        type: Boolean,
        default: true
    },
    image: {
        type: String,
    },
    songfile: {
        type: String,
    }
},{
timestamps:true

});

const songModel = mongoose.model('songs', songSchema);

module.exports = songModel;