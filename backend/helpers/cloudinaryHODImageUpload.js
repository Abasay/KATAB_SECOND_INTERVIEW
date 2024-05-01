const { v2: cloudinary } = require('cloudinary');
const { v4: uuidv4 } = require('uuid');

const cloudinaryHODImageUpload = async (fileBinaryData) => {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });

  const picUpload = await cloudinary.uploader.upload(fileBinaryData, {
    public_id: 'hod_pic_' + uuidv4(),
    folder: 'hods-photos',
  });

  return picUpload.url;
};

module.exports = { cloudinaryHODImageUpload };
