const songModel = require("../../models/Song");
const { uploadFile, deleteFile } = require("../../utils/cloudinary");



const createSong = async (req, res) => {

  const filesArray = req.files; // get file array from multer

  const filePath = [filesArray['songfile'][0].path, filesArray['image'][0].path] // extract the path and set in array

  const fileUrl = await uploadFile(filePath); // upload the file in cloudinary

  const { name, album, artist, time, description, status, keywords } = req.body;

  const Exist = await songModel.findOne({ name })

  if (Exist) {
    return res.json({ status: false, message: "Song Exist" })
  }

  const Song = new songModel({
    name, album, artist, songfile: fileUrl[0], time, description, image: fileUrl[1], isActive: status, keywords
  })

  Song.save();
  return res.json({ status: true, message: "Song created successfully" })

}

const deleteById = async (req, res) => {

  const fileUrl = [];

  if (req.query.audio) {
    fileUrl.push(req.query.audio);
  }

  if (req.query.image) {
    fileUrl.push(req.query.image);
  }

  const delRes = await deleteFile(fileUrl);

  const Exist = await songModel.findOne({ _id: req.query.id });

  if (!Exist) {
    return res.json({ status: false, message: "Song not found" });
  }

  await songModel.findOneAndDelete({ _id: req.query.id });
  return res.json({
    status: true,
    message: "Song delete successfully",
    cloudRes: delRes ? delRes : null

  });
};

// function to update the song 
const updateById = async (req, res) => {

  const fileArray = req.files; // get the file array from multer

  let AudiofilePath = [];
  let ImgfilePath = [];

  if (fileArray && fileArray.songfile) {
    AudiofilePath.push(fileArray['songfile'][0].path) // extract the path of the file
  }

  if(fileArray && fileArray.image){
    ImgfilePath.push(fileArray['image'][0].path) // extract the path of the file
  }

  // upload the audio file if has 
  let audioUrl = null;

  if (AudiofilePath && AudiofilePath.length > 0) {
    const uploadRes = await uploadFile(AudiofilePath); // upload the file 
    audioUrl = uploadRes[0]
  }

  // upload the image file if has 
  let imageUrl = null;
  if (ImgfilePath && ImgfilePath.length > 0) {
    const uploadRes = await uploadFile(ImgfilePath); // upload the file 
    imageUrl = uploadRes[0]
  }

  const { name, album, artist, description, status, keywords } = req.body; // get the text data from body

  
  const updateFields = {}



  // check if fields has value then save the data in mongodb
  if (name) {
    updateFields.name = name
  }

  if (description) {
    updateFields.description = description
  }

  if (status) {
    updateFields.isActive = status
  }

  if (artist) {
    updateFields.artist = artist
  }

  if (album) {
    updateFields.album = album
  }

  if (keywords) {
    updateFields.keywords = keywords
  }

  if (imageUrl) {
    updateFields.image = imageUrl;
  }

  if (audioUrl) {
    updateFields.songfile = audioUrl;
  }

  const Exist = await songModel.findByIdAndUpdate({ _id: req.query.id }, updateFields) // save data if ID matched

  // if ID is not found then send the response and exit from the function
  if (!Exist) {
    return res.json({ status: false, message: "Song not found" });
  }

  // if req.files valid and data has saved then delete the old files 
  let delRes = [];
  // function to delete image file

  if (ImgfilePath && ImgfilePath.length > 0) {
    const ImgfileUrl = [req.query.image]; // get the file url from query
    const deleteRes = await deleteFile(ImgfileUrl); // delete the old file
    delRes.push(deleteRes[0]);
  }
  // function to delete audio file

  if (AudiofilePath && AudiofilePath.length > 0) {
    const AudiofileUrl = [req.query.audio]; // get the file url
    const deleteRes = await deleteFile(AudiofileUrl); // delete the old file
    delRes.push(deleteRes[0]);

  }

  return res.json({
    status: true,
    message: "Song update successfully",
    cloudRes: delRes ? delRes : null

  })
}

// function to get the song by ID

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

// function to get the all song data

const getAllSongs = async (req, res) => {

  const songs = await songModel.find({}).populate(['artist', 'album']);

  return res.json({
    status: true,
    message: "songs fetch successfully",
    data: songs,
  });

};

module.exports = { getAllSongs, createSong, getById, deleteById, updateById };