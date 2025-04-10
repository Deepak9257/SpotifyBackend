const express = require("express")
const router = express.Router();
const AlbumController = require("../controllers/AlbumController");
const { verifyJWT } = require("../../services/jwt");
const upload = require("../../middlewares/multer");

// Routes to Post/Send/create API Data //
router.post('/create', upload.array('image'), AlbumController.createAlbum)

// Routes to Get/read API Data //
router.get('/get/:id', verifyJWT, AlbumController.getById)
router.get('/getAll', verifyJWT,  AlbumController.getAllAlbum)

// Route to Delete data by id
router.delete('/delete', AlbumController.deleteById)

//Route to Update data by id
router.put('/update', upload.array('image'), AlbumController.updateById)


module.exports = AuthRoutes = router