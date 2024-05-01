const { v2: cloudinary } = require('cloudinary');
const { v4: uuidv4 } = require('uuid');

const cloudinaryFileUpload = async (fileBinaryData, file_name) => {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });

  return new Promise((resolve, reject) => {
    cloudinary.uploader
      .upload_stream(
        {
          resource_type: 'auto', // or 'image'
          public_id: file_name,
          folder: 'transport_Ids',
          format: 'pdf',
        },
        (error, result) => {
          if (error) {
            reject(error);
          } else {
            resolve(result);
          }
        }
      )
      .end(fileBinaryData);
  });
};

module.exports = { cloudinaryFileUpload };
