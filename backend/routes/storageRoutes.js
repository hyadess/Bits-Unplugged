const router = require("express").Router();
const authMiddleware = require("../services/tokenValidationService");
const passport = require("passport");
const fs = require("fs");
router.use(
  passport.authenticate("jwt", { failureRedirect: "/invalid", session: false })
);

router.post("/delete", (req, res) => {
  const { path } = req.body;
  // Check if path is an array or not
  console.log(req.body);
  if (Array.isArray(path)) {
    // If path is an array, loop through each path
    path.forEach((p) => {
      const filePath = `public${p}`;
      fs.unlink(filePath, (err) => {
        if (err) {
          console.error(err);
          // return res.status(500).json("File not found");
        }
      });
    });
    res.json({ message: "Files deleted successfully" });
  } else {
    const filePath = `public${path}`;
    fs.unlink(filePath, (err) => {
      if (err) {
        console.error(err);
        return res.status(500).json("File not found");
      }
      res.json({ message: "File deleted successfully" });
    });
  }
});

router.post("/upload", (req, res) => {
  console.log(req.files);
  if (req.files === null) {
    return res.status(400).json({ msg: "No file uploaded" });
  }

  const file = req.files.file;
  // Check if file is an array or not
  if (Array.isArray(file)) {
    // If file is an array, loop through each file
    const promises = [];
    const fileNames = [];
    file.forEach((f) => {
      const timestamp = Date.now(); // Get current timestamp
      const randomString = Math.random().toString(36).substring(7); // Generate random string
      const fileExtension = f.name.split(".").pop();
      const uniqueFileName = `${timestamp}_${randomString}.${fileExtension}`;
      const promise = new Promise((resolve, reject) => {
        f.mv(`public/uploads/${uniqueFileName}`, (err) => {
          if (err) {
            console.error(err);
            reject(err);
          } else {
            fileNames.push(`/uploads/${uniqueFileName}`);
            resolve();
          }
        });
      });
      promises.push(promise);
    });

    // Wait for all promises to resolve
    Promise.all(promises)
      .then(() => {
        res.json({
          paths: fileNames,
        });
      })
      .catch((err) => {
        res.status(500).send(err);
      });
  } else {
    const timestamp = Date.now(); // Get current timestamp
    const fileExtension = file.name.split(".").pop();
    const randomString = Math.random().toString(36).substring(7); // Generate random string
    const uniqueFileName = `${timestamp}_${randomString}.${fileExtension}`;
    file.mv(`public/uploads/${uniqueFileName}`, (err) => {
      if (err) {
        console.error(err);
        return res.status(500).send(err);
      }
      res.json({
        path: `/uploads/${uniqueFileName}`,
      });
    });
  }
});

module.exports = router;
