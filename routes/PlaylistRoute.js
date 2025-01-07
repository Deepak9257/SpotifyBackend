const express = require("express")
const router = express.Router();
const PlaylistController = require("../controllers/PlaylistController")
const {verifyJWT} = require("../services/jwt")


router.post('/create', PlaylistController.createPlaylist)
router.get('/getAll', verifyJWT,  PlaylistController.getAll)
router.get('/getById/:id', PlaylistController.getByID)
router.delete('/deleteById/:id', PlaylistController.deleteById)
router.put('/update/:id', PlaylistController.updateById)

module.exports = PlaylistRoute = router