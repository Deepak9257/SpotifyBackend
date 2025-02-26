const songModel = require("../models/Song");

const getById = async (req, res) => {
  const Exist = await songModel
    .findOne({ _id: req.params.id })
    .populate(["artist", "album"]);

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
  const songs = await songModel.find({}).populate(["artist", "album"]);

  return res.json({
    status: true,
    message: "songs fetch successfully",
    data: songs,
    searchQuery: req.query,
  });
};

// search Functionality
const getSearch = async (req, res) => {
  const searchQuery = req.query.search ? req.query.search.toLocaleLowerCase() : "";
  const songs = await songModel.find({}).populate(["artist", "album"]);

  if (searchQuery) {
   
    const filterData = songs.filter((song) => {
      const songName = song.name.toLocaleLowerCase();
      const songKeywords = song.keywords.toLocaleLowerCase();

      const artistName = song.artist.name.toLocaleLowerCase();
      const artistKeywords = song.artist.keywords.toLocaleLowerCase();

      const albumName = song.album.name.toLocaleLowerCase();
      const albumKeywords = song.artist.keywords.toLocaleLowerCase();

      return (
        songName.contains(searchQuery) ||
        artistName.contains(searchQuery) ||
        albumName.contains(searchQuery) ||
        songKeywords.contains(searchQuery) ||
        artistKeywords.contains(searchQuery) ||
        albumKeywords.contains(searchQuery)
      );
    });

    console.log("search query :", searchQuery);

    return res.json({
      status: true,
      message: "search fetch successfully",
      data: filterData,
    });
  }


  return res.json({
    status: true,
    message: "search fetch successfully",
    data: songs,
  });
};

const getAllByAlbum = async (req, res) => {
  const songs = await songModel
    .find({ album: req.params.id })
    .populate(["artist", "album"]);

  return res.json({
    status: true,
    message: "songs fetch successfully",
    data: songs,
  });
};

const getAllByArtist = async (req, res) => {
  const songs = await songModel
    .find({ artist: req.params.id })
    .populate(["artist", "album"]);

  return res.json({
    status: true,
    message: "songs fetch successfully",
    data: songs,
  });
};

module.exports = {
  getAllSongs,
  getAllByAlbum,
  getById,
  getAllByArtist,
  getSearch,
};
