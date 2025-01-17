const express = require("express")
const router = express.Router();
const AlbumController = require("../controllers/AlbumController");
const { verifyJWT } = require("../../services/jwt");

// Routes to Post/Send/create API Data //
router.post('/create', verifyJWT, AlbumController.createAlbum)

// Routes to Get/read API Data //
router.get('/get/:id', verifyJWT, AlbumController.getById)
router.get('/getAll', verifyJWT,  AlbumController.getAllAlbum)

// Route to Delete data by id
router.delete('/delete/:id', verifyJWT, AlbumController.deleteById)

//Route to Update data by id
router.put('/update/:id', verifyJWT, AlbumController.updateById)


module.exports = AuthRoutes = router