const express = require("express")
const router = express.Router();
const PlaylistSongController = require("../controllers/PlaylistSongController")


router.post('/create', PlaylistSongController.createPlaylistSong)

router.get('/getAllSongs/:id', PlaylistSongController.getAllSongs)

module.exports = PlaylistSongRoute = router