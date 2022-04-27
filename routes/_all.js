//jshint esversion:9
const path = require("path");
const Marker = require("../schemas/marker");
const aws = require("aws-sdk");
const uploadToAWS = require("../assets/uploadToAWS");

module.exports = function (app) {
  app.get("/api/marker", async (req, res) => {
    markers = await Marker.find({});
    res.json(markers);
  });

  app.post("/api/marker", async (req, res) => {

    const data = JSON.parse(req.headers.data).textInput;

    switch (data.type) {
      case "text":
        Marker.create({
          lat: data.lat,
          lng: data.lng,
          name: data.name,
          location: data.location,
          message: data.message,
        }, (err, docs) => {
          res.json({ _id: docs._id });
        });
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
            audio: false,
          },
          (err, docs) => {
            uploadToAWS(req.files.file, data.type, docs._id);
            res.json({ _id: docs._id });
          }
        );
        break;
      case "audio":
        Marker.create(
          {
            lat: data.lat,
            lng: data.lng,
            name: data.name,
            message: "",
            location: data.location,
            image: false,
            audio: true,
          },
          (err, docs) => {
            uploadToAWS(req.files.file, data.type, docs._id);
            res.json({ _id: docs._id });
          }
        );
        break;
    }
  });

  app.get("*", function (req, res) {
    var filePath = "./client/build/index.html";
    var resolvedPath = path.resolve(filePath);
    return res.sendFile(resolvedPath);
  });
};
