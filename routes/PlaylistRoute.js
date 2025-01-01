const express = require("express")
const router = express.Router();
const PlaylistController = require("../controllers/PlaylistController")



router.post('/create', PlaylistController.createPlaylist)
router.get('/getAll', PlaylistController.getAll)
router.get('/getById/:id', PlaylistController.getByID)
router.delete('/deleteById/:id', PlaylistController.deleteById)
router.put('/update/:id', PlaylistController.updateById)

module.exports = PlaylistRoute = router