const mongoose = require('mongoose');

const artistSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description:{
        type: String,
    },
    isActive: {
        type: Boolean,
        default: true
    },
    keywords:{
        type:String,
        default:true
    },
    image: {
        type: String,
    }
},{
timestamps:true

});

const artistModel = mongoose.model('artists', artistSchema);

module.exports = artistModel;