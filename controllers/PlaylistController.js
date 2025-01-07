const playlistModel = require("../models/Playlist")




const createPlaylist = async (req, res) => { 

  const { name, image, status, userId } = req.body

  const Exist = await playlistModel.findOne({ userId,name })

  if (Exist) {
    return res.json({ status: false, msg: "Already exist" })
  }

  const Playlist = new playlistModel({
    name, image, isActive: status, userId
  })

  Playlist.save();
  return res.json({status:true, msg:"Playlist created successfully", data: Playlist})
}

const getAll = async (req,res)=>{
  const {userId}=req.body
  const Playlist = await playlistModel.find({userId})
  return res.json({
    status:true,
    msg:"playlist fetch successfully",
    data:Playlist
  })
  
}

const getByID = async (req,res)=>{

  const Exist = await playlistModel.findOne({_id:req.params.id})

  if (!Exist) {
    return res.json({ status: false, message: "Playlist not found" });
  }

  return res.json({
    status:true,
    msg:"playlist fetch successfully",
    data:Exist
  })
  
}

const deleteById = async (req,res)=>{
  const Exist = await playlistModel.findOne({_id:req.params.id})
  
  if(!Exist){
    return res.json({status:false, msg:"Playlist not found"})

  }

  await playlistModel.findOneAndDelete({_id:req.params.id})
  return res.json({
    status:true,
    msg:"playlist deleted successfully",
    
  })
}

const updateById=async(req,res)=>{
  const {name, image, status}= req.body
  const Exist = await playlistModel.findByIdAndUpdate({_id:req.params.id}, {name, image, isActive:status})
  if(!Exist){
    return res.json({status:false, msg:"Playlist not found"})
  }

  return res.json({
    status:true,
    msg:"playlist update successfully"
  })

}

module.exports = { createPlaylist, getAll, getByID, deleteById, updateById  };