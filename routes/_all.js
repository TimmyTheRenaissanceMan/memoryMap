//jshint esversion:9
const path = require("path");

module.exports = (function(app) {

app.get("/api/home", (req, res) => {
  res.json({data: "Connection established"});
});

app.get("/api/system_messages", async (req, res) => {
  const system_messages = await System_message.find({
    active: true
  }).exec();
  res.send(system_messages);
});


app.get('*', function(req, res) {
  var filePath = "./client/build/index.html";
  var resolvedPath = path.resolve(filePath);
  return res.sendFile(resolvedPath);
  });
});
