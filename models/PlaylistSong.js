const mongoose = require('mongoose');

const playlistSongSchema = new mongoose.Schema({
    playlistId: {
        type: String,
        required: true
    },

    song:{
        type: String,
        ref:"songs",
        required:true
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

    isActive: {
        type: Boolean,
        default: true
    },
    
},{
    
timestamps:true

});

const playlistSongModel = mongoose.model('playlistSong', playlistSongSchema);

module.exports = playlistSongModel;