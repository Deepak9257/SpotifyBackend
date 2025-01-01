const mongoose = require('mongoose');

const playlistSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },

    isActive: {
        type: Boolean,
        default: true
    },

    image: {
        type: String,
    }
    
},{
    
timestamps:true

});

const playlistModel = mongoose.model('playlist', playlistSchema);

module.exports = playlistModel;