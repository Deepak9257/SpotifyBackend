const artistModel = require("../../models/Artist");
const { uploadFile, deleteFile } = require("../../utils/cloudinary");


// function to create artist and save into database
const createArtist = async (req, res) => {

  const fileArray = req.files; // get the file array from multer

  const filePath = fileArray.map((item) => { return item.path }); // extract file path and set into the array

  const imageUrl = await uploadFile(filePath); // upload the file in cloudinary

  const { name, description, keywords, status } = req.body;

  const Exist = await artistModel.findOne({ name })

  if (Exist) {
    return res.json({ status: false, message: "Artist Exist" })
  }

  const Artist = new artistModel({
    name, description, image: imageUrl[0], keywords, status

  })

  Artist.save();
  return res.json({ status: true, message: "Artist Created successfully" })

}

// function to delete artist

const deleteById = async (req, res) => {

  const fileUrl = [];

  if (req.query.image) {
    fileUrl.push(req.query.image);
  }

  const delRes = await deleteFile(fileUrl);

  const Exist = await artistModel.findOne({ _id: req.query.id });

  if (!Exist) {
    return res.json({ status: false, message: "Artist not found" });
  }

  await artistModel.findOneAndDelete({ _id: req.query.id });
  return res.json({
    status: true,
    message: "Artist delete successfully",
    cloudRes: delRes.result
  });
};

// function to edit/update the artist

const updateById = async (req, res) => {

  const fileArray = req.files; // get the file array from multer

  let imageUrl = null;
  if (fileArray && fileArray.length > 0) {
    const filePath = [fileArray[0].path]; // extract the path of the file
    const uploadRes = await uploadFile(filePath); // upload the file 
    imageUrl = uploadRes[0];

  }

  const { name, description, status, keywords } = req.body; // get the text data from body

  const updateFields ={}

  // check if fields has value 
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

  if(imageUrl){
    updateFields.image = imageUrl;
  }

  const Exist = await artistModel.findByIdAndUpdate({ _id: req.query.id }, updateFields);

  // if req.files valid and data has saved then delete the old file 
  let delRes = null;
  const fileUrl = [req.query.image]; // get the file url

  if (fileArray && fileArray.length > 0 && fileUrl) {

    delRes = await deleteFile(fileUrl); // delete the old file

  }

  if (!Exist) {
    return res.json({ status: false, message: "Artist not found" });
  }

  return res.json({
    status: true,
    message: "Artist update successfully",
    cloudRes: delRes ? delRes.result : null,
  })

}

// function to get artist data by its ID
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

// function to get all artist data 

const getAllArtist = async (req, res) => {

  const artistData = await artistModel.find({});

  return res.json({
    status: true,
    message: "artists fetch successfully",
    data: artistData,
  });

};




module.exports = { getAllArtist, createArtist, getById, deleteById, updateById };