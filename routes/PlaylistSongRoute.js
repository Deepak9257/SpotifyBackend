const express = require("express")
const router = express.Router();
const PlaylistSongController = require("../controllers/PlaylistSongController")


router.post('/create', PlaylistSongController.createPlaylistSong)

router.get('/getAllSongs/:id', PlaylistSongController.getAllSongs)

router.get('/getSongsByUserId/:id', PlaylistSongController.getSongsByUserId)

router.delete('/deletPlaylistSong', PlaylistSongController.deletPlaylistSong)

module.exports = PlaylistSongRoute = router