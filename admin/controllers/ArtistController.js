const artistModel = require("../../models/Artist")



const createArtist = async (req, res) => {

  const { name, description, image, keywords } = req.body;

  const Exist = await artistModel.findOne({ name })

  if (Exist) {
    return res.json({ status: false, message: "Artist Exist" })
  }

  const Artist = new artistModel({
    name, description, image, keywords

  })

  Artist.save();
  return res.json({ status: true, message: "Artist Created successfully" })

}

const deleteById = async (req, res) => {
  const Exist = await artistModel.findOne({ _id: req.params.id });

  if (!Exist) {
    return res.json({ status: false, message: "Artist not found" });
  }

  await artistModel.findOneAndDelete({ _id: req.params.id });
  return res.json({
    status: true,
    message: "Artist delete successfully",

  });
};

const updateById = async (req, res) => {

  const { name, description, image, status , keywords} = req.body;

  const Exist = await artistModel.findByIdAndUpdate({_id:req.params.id} , {name, description, image, keywords, isActive:status})
  
  if(!Exist){
    return res.json({status:false, message: "Artist not found"});
  
  }

  return res.json({
    status:true,
    message:"Artist update successfully"

  })
}

const getById = async (req, res) => {
  const Exist = await artistModel.findOne({ _id: req.params.id });

  if (!Exist) {
    return res.json({ status: false, message: "Artist not found" });
  }

  return res.json({
    status: true,
    message: "Artist fetch successfully",
    data: Exist,
  });
};

const getAllArtist = async (req, res) => {

  const artistData = await artistModel.find({});

  return res.json({
    status: true,
    message: "artists fetch successfully",
    data: artistData,
  });

};




module.exports = { getAllArtist, createArtist, getById, deleteById, updateById };