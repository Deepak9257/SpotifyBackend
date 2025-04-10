const albumModel = require("../models/Album.js")


const getById = async (req, res) => {
    const Exist = await albumModel.findOne({ _id: req.params.id }).populate(['artist']);
  
    if (!Exist) {
      return res.json({ status: false, message: "Album not found" });
    }
    
    return res.json({
      status: true,
      message: "Album fetch Succussfully",
      data: Exist,
    });
  };

const getAllAlbum = async (req, res) => {

    const albumData = await albumModel.find({});
    res.json({albumData});

};

module.exports = AlbumController = {getAllAlbum, getById};