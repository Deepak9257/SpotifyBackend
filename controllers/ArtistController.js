const artistModel = require("../models/Artist")



const getById = async (req, res) => {
    const Exist = await artistModel.findOne({ _id: req.params.id });
  
    if (!Exist) {
      return res.json({ status: false, message: "Albumb not found" });
    }
  
    return res.json({
      status: true,
      message: "Albumb fetch Succussfully",
      data: Exist,
    });
  };

const getAllArtist = async (req, res) => {

    const artistData = await artistModel.find({});
    
    res.json({artistData});

};




module.exports = {getAllArtist, getById};