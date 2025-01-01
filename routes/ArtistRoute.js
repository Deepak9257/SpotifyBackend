const express = require("express")
const router = express.Router();
const AuthController = require("../controllers/ArtistController")

// Routes to Post/Send API Data //


// Routes to Get API Data //
router.get('/get/:id', AuthController.getById)
router.get('/getAll', AuthController.getAllArtist)



module.exports = AuthRoutes = router