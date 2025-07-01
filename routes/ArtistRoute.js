const express = require("express")
const router = express.Router();
const ArtistController = require("../controllers/ArtistController")


// Routes to Get API Data //
router.get('/get/:id', ArtistController.getById)
router.get('/getAll', ArtistController.getAllArtist)



module.exports = AuthRoutes = router