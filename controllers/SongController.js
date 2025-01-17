const songModel = require("../models/Song")







const getById = async (req, res) => {
  const Exist = await songModel.findOne({ _id: req.params.id }).populate(['artist', 'album']);

  if (!Exist) {
    return res.json({ status: false, message: "Song not found" });
  }

  return res.json({
    status: true,
    message: "Song fetch successfully",
    data: Exist,
  });
};

const getAllSongs = async (req, res) => {

  const songs = await songModel.find({}).populate(['artist', 'album']);

  return res.json({
    status: true,
    message: "songs fetch successfully",
    data: songs,
  });

};

const getAllByAlbum = async (req, res) => {

  const songs = await songModel.find({album:req.params.id}).populate(['artist', 'album']);

  return res.json({
    status: true,
    message: "songs fetch successfully",
    data: songs,
  });
};

  const getAllByArtist = async (req, res) => {

    const songs = await songModel.find({artist:req.params.id}).populate(['artist', 'album']);
  
    return res.json({
      status: true,
      message: "songs fetch successfully",
      data: songs,
    });
};

module.exports = { getAllSongs, getAllByAlbum, getById, getAllByArtist };