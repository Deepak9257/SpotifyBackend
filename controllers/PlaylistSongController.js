const playlistSongModel = require("../models/PlaylistSong")


const createPlaylistSong = async (req, res) => {

    const { playlistId, song, status, artist, album } = req.body

    const exist = await playlistSongModel.findOne({ playlistId, song })

    if (exist) {
              
        return res.json({ status: false, msg: "Song already added to this playlist" });

    }

    const PlaylistSong = new playlistSongModel({
        playlistId, song, status, artist, album
    })

    PlaylistSong.save()
    return res.json({ status: true, msg: "song added", data: PlaylistSong })

}


const getAllSongs = async (req, res) => {

    const songs = await playlistSongModel.find({playlistId:req.params.id}).populate(['song','artist', 'album']);
  
    return res.json({
      status: true,
      message: "songs fetch successfully",
      data: songs,
    });
  
  };


module.exports = { createPlaylistSong, getAllSongs }