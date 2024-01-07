const express = require("express");
const app = express();
const path = require("path");
const cors = require("cors");
const cron = require("node-cron");
const https = require("https");
const cookieParser = require("cookie-parser");
cron.schedule("*/14 * * * *", () => {
  let host = process.env.BASE_URL;
  https
    .get(host, (resp) => {
      if (resp.statusCode == 200) console.log(host + " is alive");
      else console.log(host + " is dead");
    })
    .on("error", (err) => {
      console.log("Error: " + err.message);
    });
});


// const fileUpload = require("express-fileupload");
const appRoutes = require("./routes/appRoutes");
const CLIENT_BUILD_PATH = path.join(__dirname, "../frontend/build");

const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true,
};
app.use(cors(corsOptions));
app.use(cookieParser());

// app.use(cors());
app.use(express.json());
app.use(express.static("public"));
app.use(express.static(CLIENT_BUILD_PATH));
// Use cookie-parser middleware

// app.use(fileUpload());



app.use("/api", appRoutes);

app.get("*", (request, response) => {
  response.sendFile(path.join(CLIENT_BUILD_PATH, "index.html"));
});

module.exports = { app };
