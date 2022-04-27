//jshint esversion:9
const path = require("path");
const Marker = require("../schemas/marker");
const aws = require("aws-sdk");

module.exports = function (app) {
  app.get("/api/marker", async (req, res) => {
    markers = await Marker.find({});
    res.json(markers);
  });

  app.post("/api/marker", async (req, res) => {
    let s3bucket;
    const s3 = new aws.S3();

    const data = JSON.parse(req.headers.data).textInput;
    console.log(req.files);

    switch (data.type) {
      case "text":
        Marker.create({
          lat: data.lat,
          lng: data.lng,
          name: data.name,
          location: data.location,
          message: data.message,
        }).then();
        break;
      case "image":
        Marker.create(
          {
            lat: data.lat,
            lng: data.lng,
            name: data.name,
            location: data.location,
            message: "",
            image: true,
            audio: false
          },
          (err, docs) => {
            s3bucket = new aws.S3({
              accessKeyId: process.env.AWS_ACCESS_KEY_ID,
              secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
              Bucket: process.env.S3_BUCKET,
              ContentType: req.files.file.mimetype,
              ACL: "public-read",
            });

            var params = {
              Bucket: process.env.S3_BUCKET,
              Key: "images/" + docs._id,
              Body: req.files.file.data,
              ContentType: req.files.file.mimetype,
              ACL: "public-read",
            };
            s3bucket.upload(params, function (err, data) {
              if (err) {
                console.log("error in callback");
                console.log(err);
                res.json({ error: err });
              }
              console.log("success");
              res.json({
                url: data.Location,
              });
            });
          }
        );
        break;
      case "audio":
        Marker.create({
          lat: data.lat,
          lng: data.lng,
          name: data.name,
          message: "",
          location: data.location,
          image: false,
          audio: true
        }, (err, docs) => {

        s3bucket = new aws.S3({
          accessKeyId: process.env.AWS_ACCESS_KEY_ID,
          secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
          Bucket: process.env.S3_BUCKET,
          ContentType: req.files.file.mimetype,
          ACL: "public-read",
        });

        var params = {
          Bucket: process.env.S3_BUCKET,
          Key: "audio/" + docs._id,
          Body: req.files.file.data,
          ContentType: req.files.file.mimetype,
          ACL: "public-read",
        };
        s3bucket.upload(params, function (err, data) {
          if (err) {
            console.log("error in callback");
            console.log(err);
            res.json({ error: err });
          }
          console.log("success");
          res.json({
            url: data.Location,
          });
        });
         })
        break;
    }

    console.log(req.body);
    console.log(req.headers.data);
  });

  app.get("*", function (req, res) {
    var filePath = "./client/build/index.html";
    var resolvedPath = path.resolve(filePath);
    return res.sendFile(resolvedPath);
  });
};
