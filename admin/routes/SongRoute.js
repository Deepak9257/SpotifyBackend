const express = require("express")
const router = express.Router();

const SongController = require("../controllers/SongController")
const {verifyJWT} = require("../../services/jwt")

// Routes to Post/Send/create API Data //
router.post('/create',  verifyJWT,  SongController.createSong)

router.get('/getAll', verifyJWT, SongController.getAllSongs)

router.delete('/delete/:id', verifyJWT, SongController.deleteById)

router.put('/update/:id', verifyJWT, SongController.updateById)








module.exports = AuthRoutes = router