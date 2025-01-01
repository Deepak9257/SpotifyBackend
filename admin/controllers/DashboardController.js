const albumModel = require("../../models/Album")
const artistModel = require("../../models/Artist");
const songModel = require("../../models/Song");
const userModel = require("../../models/User");


const getAllCount = async (req, res) => {

  const users = await userModel.countDocuments();
  const artists = await artistModel.countDocuments();
  const albums = await albumModel.countDocuments();
  const songs = await songModel.countDocuments();


  const totalCount = {
    users, artists, albums, songs
  }
  return res.json({
    status: true,
    message: "Counts fetch successfully",
    data: totalCount,
  });

};



module.exports = { getAllCount };