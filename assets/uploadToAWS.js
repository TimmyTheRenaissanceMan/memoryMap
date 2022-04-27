const aws = require("aws-sdk");
// Upload files to AWS S3 
// File expects raw file data array
// fileType audio or image => data will be stores in the corresponding folder
// id => id of the new document to which the file is attached (name of the file === id) 
module.exports = function uploadToAWS(file, fileType, id) {
  const s3bucket = new aws.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    Bucket: process.env.S3_BUCKET,
    ContentType: file.mimetype,
    ACL: "public-read",
  });

  var params = {
    Bucket: process.env.S3_BUCKET,
    Key: fileType + "/" + id,
    Body: file.data,
    ContentType: file.mimetype,
    ACL: "public-read",
  };
  s3bucket.upload(params, function (err, data) {
    if (err) {
      console.log("error in callback");
      console.log(err);
    }
    console.log("success");
  });
};
