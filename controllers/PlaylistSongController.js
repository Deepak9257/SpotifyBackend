const playlistSongModel = require("../models/PlaylistSong")


const createPlaylistSong = async (req, res) => {

  const { playlistId, song, artist, album, userId } = req.body

  if(playlistId.length===0){
    return res.json({status:false, message:'no playlist selected'})
  }

  for (let id of playlistId){

    const exist = await playlistSongModel.findOne({ userId, playlistId: id, song })

    if (exist) {
      
      return res.json({ status: false, message: "Song already added to this playlist" });
  
    }
  
    const PlaylistSong = new playlistSongModel({
      playlistId :id,
      song,
      artist,
      album,
      userId
    })
  
    await PlaylistSong.save()

  }

  return res.json({ 
    status: true, 
    message: "song added",
    
  
  })

}


const deletPlaylistSong = async(req, res)=>{

  try {
    const {playlistId, song} = req.body

    if(playlistId.length===0){
      return res.json({status:false, message:'no playlist selected'})
    }
    
    for(let id of playlistId){
  
      const exist = await playlistSongModel.findOneAndDelete({playlistId:id, song})
      
      if(!exist){
        return res.json({
          status:false,
          message:'no playlist song to delete'
        })
      }
    }
  

    return res.json({
      status:true,
      message:'playlist song deleted successfully'
    })
    
  } catch (error) {
    console.log(error)
    return res.status(400).json({
      status:false,
      message:'server error'
    })
    
  } 

}


const getAllSongs = async (req, res) => {

  const songs = await playlistSongModel.find({ playlistId: req.params.id }).populate(['song', 'artist', 'album']);

  return res.json({
    status: true,
    message: "songs fetch successfully",
    data: songs,
  });

};

const getSongsByUserId = async (req, res) => {

  const songs = await playlistSongModel.find({userId:req.params.id})

  return res.json({
    status: true,
    message: "songs fetch successfully",
    data: songs,
  })
}


module.exports = { createPlaylistSong, getAllSongs, getSongsByUserId, deletPlaylistSong }