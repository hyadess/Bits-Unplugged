const express = require("express");
const app = express();
const path = require("path");
const cors = require("cors");
const cron = require("node-cron");
var ping = require("ping");
cron.schedule("*/12 * * * *", function () {
  let host = "bitsunplugged.onrender.com";
  var cfg = {
    timeout: 100,
    // WARNING: -i 2 may not work in other platform like windows
    extra: ["-i", "2"],
  };

  ping.sys.probe(
    host,
    (isAlive) => {
      var msg = isAlive
        ? "host " + host + " is alive"
        : "host " + host + " is dead";
      console.log(msg);
    },
    cfg
  );
});
// const fileUpload = require("express-fileupload");
const appRoutes = require("./routes/appRoutes");
const CLIENT_BUILD_PATH = path.join(__dirname, "../frontend/build");


app.use(cors());
app.use(express.json());
app.use(express.static("public"));
app.use(express.static(CLIENT_BUILD_PATH));
// app.use(fileUpload());

app.use("/api", appRoutes);

app.get("*", (request, response) => {
  response.sendFile(path.join(CLIENT_BUILD_PATH, "index.html"));
});

module.exports = { app };