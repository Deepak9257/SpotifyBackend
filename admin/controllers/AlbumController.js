const albumModel = require("../../models/Album");
const { uploadFile, deleteFile } = require("../../utils/cloudinary");

// function to create album

const createAlbum = async (req, res) => {

  const fileArray = req.files;

  const filePath = [fileArray[0].path];

  const fileUrl = await uploadFile(filePath); 
  
  const { name, description, artist, status, keywords } = req.body;

  const Exist = await albumModel.findOne({ name }) 

  if (Exist) {
    return res.json({ status: false, message: "Album Exist" })
  }

  const Album = new albumModel({
    name, artist, description, image:fileUrl[0], isActive:status, keywords

  })
  
  Album.save();
  return res.json({ status: true, message: "Album Created successfully" })

}

// function to delete album

const deleteById = async (req, res) => {

   const fileUrl = [];
  
    if (req.query.image) {
      fileUrl.push(req.query.image);
    }
  
    const delRes = await deleteFile(fileUrl);

    console.log("delete response :" , delRes);

  const Exist = await albumModel.findOne({ _id: req.query.id });

  if (!Exist) {
    return res.json({ status: false, message: "Album not found" });
  }

  await albumModel.findOneAndDelete({ _id: req.query.id });

  return res.json({
    status: true,
    message: "Album deleted successfully",
    cloudRes: delRes.result,
  });
};

// function to update/edit album

const updateById = async (req, res) => {

  const fileArray = req.files; // get the file array from multer

  let imageUrl = null;
  if (fileArray && fileArray.length > 0) {
    const filePath = [fileArray[0].path]; // extract the path of the file
    const uploadRes = await uploadFile(filePath); // upload the file 
    imageUrl = uploadRes[0];

  }

  console.log('imageUrl :', imageUrl)

  const { name, description, status, artist, keywords } = req.body; // get the text data from body

  const updateFields ={}

  // check if fields has value  then add into the database
  if(name){
    updateFields.name = name
  }

  if(description){
    updateFields.description = description
  }

  if(status){
    updateFields.isActive = status
  }

  if(keywords){
    updateFields.keywords = keywords
  }

  if(artist){
    updateFields.artist = artist
  }

  if(imageUrl){
    updateFields.image = imageUrl;
  }

  const Exist = await albumModel.findByIdAndUpdate({ _id: req.query.id }, updateFields);

  // if req.files has data then delete the old file 
  let delRes = null;
  const fileUrl = [req.query.image]; // get the file url

  if (fileArray && fileArray.length > 0 && fileUrl) {

    delRes = await deleteFile(fileUrl); // delete the old file

  }

  if (!Exist) {
    return res.json({ status: false, message: "Album not found" });
  }

  return res.json({
    status: true,
    message: "Album updated successfully",
    cloudRes: delRes ? delRes.result : null,
  })

}


// function to get album by ID

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
 
// function to get all album data

const getAllAlbum = async (req, res) => {

  const AlbumData = await albumModel.find({}).populate('artist');

  return res.json({
    status: true,
    message: "Albums fetch successfully",
    data: AlbumData,
  });

};

module.exports = { getAllAlbum, createAlbum, getById, deleteById, updateById };