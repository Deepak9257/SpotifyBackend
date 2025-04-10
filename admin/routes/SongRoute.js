const express = require("express")
const router = express.Router();

const SongController = require("../controllers/SongController")
const {verifyJWT} = require("../../services/jwt");
const upload = require("../../middlewares/multer");

// Routes to Post/Send/create API Data //
router.post('/create', upload.fields([{ name: 'songfile' }, { name: 'image' }]),  SongController.createSong)

router.get('/getAll', verifyJWT, SongController.getAllSongs)
 
router.delete('/delete', SongController.deleteById)

router.put('/update', upload.fields([{ name: 'songfile' }, { name: 'image' }]), SongController.updateById)


module.exports = AuthRoutes = router