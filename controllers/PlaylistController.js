const playlistModel = require("../models/Playlist")




const createPlaylist = async (req, res) => { 

  const { name, image, status, userId } = req.body

  let defaultPlaylistName = name ? name :  "My Playlist #1" 

  // default playlist name condition
  if(!name){  
    let playlistNum = 1;
    const playlistData = await playlistModel.find({userId});

    console.log(playlistData)

    const playlistNames = playlistData.map(playlist=>playlist.name)

    
    const playlistNumbers = playlistNames
    .filter(name => name.startsWith("My Playlist #"))
    .map(n => parseInt(n.replace("My Playlist #", "")))
    .filter(num=> !isNaN(num)) // get all the numbers

    console.log(playlistNumbers)
    
    if(playlistNumbers.length > 0){
        
      playlistNum = Math.max(...playlistNumbers) + 1

    }

    defaultPlaylistName = `My Playlist #${playlistNum}`
    
  }


  const Exist = await playlistModel.findOne({ userId,name:defaultPlaylistName })

  if (Exist) {
    return res.json({ status: false, msg: "Already exist" })
  }

  const Playlist = new playlistModel({
    name:defaultPlaylistName, image, isActive: status, userId
  })

  Playlist.save();
  return res.json({status:true, msg:"Playlist created successfully", data: Playlist})
}


const getAll = async (req,res)=>{
  const userId = req.user._id
  const Playlist = await playlistModel.find({userId})
  return res.json({
    status:true,
    msg:"playlist fetch successfully",
    data:Playlist,
   
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