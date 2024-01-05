const cloudinary = require('cloudinary');


cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

// Cloudinary Upload Image

const cloudinaryUploadImage = async (fileToUpload) =>{

    try{

const data = await cloudinary.uploader.upload(fileToUpload, {
    resource_type: 'auto'
});

return data;

    }catch(e){
        return e
    }
}


// Cloudinary Remove Image

const cloudinaryRemoveImage = async (imagePublicId) =>{

    try{
const result = await cloudinary.uploader.destroy(imagePublicId);
return result
}


    catch(e){
        return e
    }
}

// Cloudinary Remove All Images 
const cloudinaryRemoveAllImages = async (PublicIds) =>{

    try{
const result = await cloudinary.v2.api.delete_resources(PublicIds);
return result
}


    catch(e){
        return e
    }
}

module.exports ={
    cloudinaryUploadImage,
    cloudinaryRemoveImage,
    cloudinaryRemoveAllImages
}
