const cloudinary = require('cloudinary').v2;
require('dotenv').config();
const fs = require("fs");

// Configuration
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SCERET_KEY // Click 'View API Keys' above to copy your API secret
});

// Upload an image
const uploadFile = async (path) => {
    try {

        if (!path || path.length === 0) {
            return null;
        }

        const fileUrl = await Promise.all(path.map(async (item) => {

            const displayName = item.replace(/^uploads[\\/]+/, '').replace(/\.(jpg|jpeg|mp3)$/, '');

            const res = await cloudinary.uploader.upload(item, {
                resource_type: "auto",
                public_id: displayName,
            });

            fs.unlinkSync(item);
            // console.log('file uploaded successfully:', res);
            return res.secure_url;

        }))

        return fileUrl;



    } catch (error) {

        for (let item of path) {
            fs.unlinkSync(item); // remove the locally saved file if any error
        }
        console.log('error in uploading file :', error);
        return null;
    }
}

// delete uploaded file 

const deleteFile = async (fileUrl) => {

    try {
        const result = []
        for (let item of fileUrl) {
            const originalName = item.split('/');
            const fileName = originalName[originalName.length - 1].replace(/\.(jpg|jpeg|mp3)$/, '');

            let resourceType = 'image';

            if (item.endsWith('.mp3')) {
                resourceType = 'video'; 
            }

            const res = await cloudinary.uploader.destroy(fileName, { resource_type: resourceType })

            result.push(res)
        }
        
        return result;

    } catch (error) {
        return console.log('error :', error)
    }

}



module.exports = { uploadFile, deleteFile }