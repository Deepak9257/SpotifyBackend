const mongoose = require('mongoose');

const albumbSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    artist: {
        type: String,
        ref:"artists",
        required: true
    },
    description:{
        type:String,
    },
    
    isActive: {
        type: Boolean,
        default: true
    },
    image: {
        type: String,
        required:true
    }
},{
timestamps:true

});

const albumModel = mongoose.model('album', albumbSchema);

module.exports=albumModel;