const albumModel = require("../../models/Album")



const createAlbum = async (req, res) => {
  
  const { name, description, artist, image, status, keywords } = req.body;

  const Exist = await albumModel.findOne({ name }) 

  if (Exist) {
    return res.json({ status: false, message: "Album Exist" })
  }

  const Album = new albumModel({
    name, artist, description, image, isActive:status, keywords

  })
  
  Album.save();
  return res.json({ status: true, message: "Album Created successfully" })

}

const deleteById = async (req, res) => {
  const Exist = await albumModel.findOne({ _id: req.params.id });

  if (!Exist) {
    return res.json({ status: false, message: "Album not found" });
  }

  await albumModel.findOneAndDelete({ _id: req.params.id });
  return res.json({
    status: true,
    message: "Album deleted successfully",

  });
};

const updateById = async (req, res) => {

  const { name, description, image, artist, status, keywords} = req.body;

  const Exist = await albumModel.findByIdAndUpdate({_id:req.params.id}, {name, description, artist, image, isActive:status, keywords})
  
  if(!Exist){
    return res.json({status:false, message: "Album not found"});
  
  }

  return res.json({
    status:true,
    message:"Album update successfully"

  })
}

const getById = async (req, res) => {
  const Exist = await albumModel.findOne({ _id: req.params.id });

  if (!Exist) {
    return res.json({ status: false, message: "Album not found" });
  }

  return res.json({
    status: true,
    message: "Album fetch successfully",
    data: Exist,
  });
};

const getAllAlbum = async (req, res) => {

  const AlbumData = await albumModel.find({}).populate('artist');

  return res.json({
    status: true,
    message: "Albums fetch successfully",
    data: AlbumData,
  });

};

module.exports = { getAllAlbum, createAlbum, getById, deleteById, updateById };