const express = require("express")
const router = express.Router();
const AlbumController = require("../controllers/AlbumController")



// Routes to Get API Data //
router.get('/get/:id', AlbumController.getById)
router.get('/getAll', AlbumController.getAllAlbum) 



module.exports = AuthRoutes = router