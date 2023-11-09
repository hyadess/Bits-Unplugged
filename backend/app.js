const express = require("express");
const app = express();
const path = require("path");
const cors = require("cors");
// const fileUpload = require("express-fileupload");
const appRoutes = require("./routes/appRoutes");
// const corsOptions = {
//   origin: "http://frontend", // Replace with your frontend's service name
// };

// app.use(cors(corsOptions));
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