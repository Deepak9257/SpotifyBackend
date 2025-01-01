const songModel = require("../../models/Song")



const createSong = async (req, res) => {

  const { name,album, artist, songfile, time, description, image, status } = req.body;

  const Exist = await songModel.findOne({ name }) 

  if (Exist) {
    return res.json({ status: false, message: "Song Exist" })
  }

  const Song = new songModel({
    name, album, artist, songfile, time, description, image, isActive:status
  })

  Song.save();
  return res.json({ status: true, message: "Song created successfully" })

}

const deleteById = async (req, res) => {
  const Exist = await songModel.findOne({ _id: req.params.id });

  if (!Exist) {
    return res.json({ status: false, message: "Song not found" });
  }

  await songModel.findOneAndDelete({ _id: req.params.id });
  return res.json({
    status: true,
    message: "Song delete successfully",

  });
};
 
const updateById = async (req, res) => {

  const { name, album, artist, songfile, time, description, image, status} = req.body;

  const Exist = await songModel.findByIdAndUpdate({_id:req.params.id} , {name, album, artist, songfile, time, description, image, isActive:status})
  
  if(!Exist){
    return res.json({status:false, message: "Song not found"});
  
  }

  return res.json({
    status:true,
    message:"Song update successfully"

  })
}

const getById = async (req, res) => {
  const Exist = await songModel.findOne({ _id: req.params.id });

  if (!Exist) {
    return res.json({ status: false, message: "Song not found" });
  }

  return res.json({
    status: true,
    message: "Song fetch successfully",
    data: Exist,
  });
};

const getAllSongs = async (req, res) => {

  const songs = await songModel.find({}).populate(['artist', 'album']);

  return res.json({
    status: true,
    message: "songs fetch successfully",
    data: songs,
  });

};

module.exports = { getAllSongs, createSong, getById, deleteById, updateById };