const express = require("express")
const router = express.Router();
const ArtistController = require("../controllers/ArtistController")
const {verifyJWT} = require("../../services/jwt");
const upload = require("../../middlewares/multer");

// Route to create API Data //
router.post('/create', upload.array('image'), ArtistController.createArtist)

// Routes to Get/read API Data // 
router.get('/get/:id', verifyJWT, ArtistController.getById)
router.get('/getAll', verifyJWT, ArtistController.getAllArtist)
 
// Route to Delete data by id
router.delete('/delete',  ArtistController.deleteById)

//Route to Update data by id
router.put('/update', upload.array('image'), ArtistController.updateById)


module.exports = AuthRoutes = router