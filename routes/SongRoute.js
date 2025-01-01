const express = require("express")
const router = express.Router();
const SongController = require("../controllers/SongController")




// Routes to Get API Data //
router.get('/get/:id', SongController.getById)
router.get('/getAll', SongController.getAllSongs)
router.get('/getAllByAlbum/:id', SongController.getAllByAlbum)


module.exports = AuthRoutes = router