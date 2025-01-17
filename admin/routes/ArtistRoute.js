const express = require("express")
const router = express.Router();
const ArtistController = require("../controllers/ArtistController")
const {verifyJWT} = require("../../services/jwt")

// Routes to Post/Send/create API Data //
router.post('/create',  verifyJWT, ArtistController.createArtist)

// Routes to Get/read API Data //
router.get('/get/:id', verifyJWT, ArtistController.getById)
router.get('/getAll', verifyJWT, ArtistController.getAllArtist)
 
// Route to Delete data by id
router.delete('/delete/:id', verifyJWT, ArtistController.deleteById)

//Route to Update data by id
router.put('/update/:id', verifyJWT, ArtistController.updateById)




module.exports = AuthRoutes = router