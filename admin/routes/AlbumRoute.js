const express = require("express")
const router = express.Router();
const AuthController = require("../controllers/AlbumController");
const { verifyJWT } = require("../../services/jwt");

// Routes to Post/Send/create API Data //
router.post('/create', verifyJWT, AuthController.createAlbum)

// Routes to Get/read API Data //
router.get('/get/:id', verifyJWT, AuthController.getById)
router.get('/getAll', verifyJWT,  AuthController.getAllAlbum)

// Route to Delete data by id
router.delete('/delete/:id', verifyJWT, AuthController.deleteById)

//Route to Update data by id
router.put('/update/:id', verifyJWT, AuthController.updateById)




module.exports = AuthRoutes = router