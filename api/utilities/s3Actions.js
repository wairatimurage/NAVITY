const AWS = require("aws-sdk");
const path = require("path");
const { tinifyBase64 } = require("./tinify");
const { handleStorageErrors } = require("./errorHandling");
require("dotenv").config({ path: path.join(__dirname, ".env") });

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ID,
  secretAccessKey: process.env.AWS_SECRET,
});

const uploadFile = async (baseString, fileName) => {
  let _location;
  try {
    //   image compression
    const _content = await tinifyBase64(baseString);

    // Setting up S3 upload parameters
    const params = {
      Bucket: process.env.BUCKET,
      Key: fileName,
      Body: _content,
      ContentType: "image/png",
    };

    // Uploading files to the bucket
    s3.upload(params, function (err, data) {
      if (err) {
        throw err;
      }
      console.log(`File uploaded successfully. ${data.Location}`);
      _location = data.Location;
    });
  } catch (_err) {
    handleStorageErrors(_err);
  }
  return _location;
};

const deleteFile = async (fileName) => {
  s3.deleteObject(
    {
      Bucket: process.env.BUCKET,
      Key: fileName,
    },
    function (err, data) {
      if (err) throw err;
      console.log("successfuly deleted " + JSON.stringify(data));
    }
  );
};

module.exports = { uploadFile, deleteFile };
