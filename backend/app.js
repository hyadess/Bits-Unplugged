const express = require("express");
const app = express();
const path = require("path");
const cors = require("cors");
const cron = require("node-cron");
const https = require("https");
cron.schedule("*/12 * * * *", () => {
  let host = "https://bitsunplugged.onrender.com/api";
  https
    .get(host, (resp) => {
      if (resp.statusCode == 200) console.log("Bit Unplugged is alive");
      else console.log("Bit Unplugged is dead");
    })
    .on("error", (err) => {
      console.log("Error: " + err.message);
    });
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