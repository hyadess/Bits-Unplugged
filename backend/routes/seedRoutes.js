const { submissionController } = require("../controllers");
const { authRepository } = require("../repositories");
const submissionService = require("../services/submissionService");

const router = require("express").Router();

router.post("/submissions", async (req, res) => {
  try {
    // Insert demo data into the database
    for (let userId = 10; userId <= 150; userId++)
      for (let problemId = 1; problemId <= 60; problemId++)
        // pick a random number of submissions for each problem
        for (let t = 0; t < Math.floor(Math.random() * 10); t++)
          await submissionService.submitSolution(userId, problemId, {
            // pick a random verdict for each submission
            verdict: ["Accepted", "Wrong answer"][
              Math.floor(Math.random() * 2)
            ],
            canvasData: {},
            duration: 3 + Math.floor(Math.random() * 100),
            userActivity: {},
            image: "",
            // pick a random date in the past year
            createdAt: new Date(
              Date.now() - Math.floor(Math.random() * 365 * 24 * 60 * 60 * 1000)
            ),
          });

    res.status(201).json({ message: "Demo data inserted successfully" });
  } catch (err) {
    console.error("Error inserting demo data:", err);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.post("/submissions/:id", async (req, res) => {
  try {
    // Insert demo data into the database
    for (let userId = req.params.id; userId <= req.params.id; userId++)
      for (let problemId = 1; problemId <= 60; problemId++)
        // pick a random number of submissions for each problem
        for (let t = 0; t < Math.floor(Math.random() * 10); t++)
          await submissionService.submitSolution(userId, problemId, {
            // pick a random verdict for each submission
            verdict: ["Accepted", "Wrong answer"][
              Math.floor(Math.random() * 2)
            ],
            canvasData: {},
            duration: 3 + Math.floor(Math.random() * 100),
            userActivity: {},
            image: "",
            // pick a random date in the past year
            createdAt: new Date(
              Date.now() - Math.floor(Math.random() * 365 * 24 * 60 * 60 * 1000)
            ),
          });

    res.status(201).json({ message: "Demo data inserted successfully" });
  } catch (err) {
    console.error("Error inserting demo data:", err);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.post("/users", async (req, res) => {
  try {
    // Insert demo data into the database
    for (let i = 0; i < 100; i++)
      await authRepository.signup({
        // pick a random username
        username: `user_${Math.random().toString(36).substring(2, 15)}`,
        // pick a random fullname
        fullname: `Name_${Math.random().toString(36).substring(2, 15)}`,
        // pick a random email
        email: `${Math.random().toString(36).substring(2, 15)}@gmail.com`,
        pass: "root",
        type: "0",
        hashPass:
          "$2a$10$kK3WAxrbCLl0qHjswaujb.MYnkqRUeLLO0Pck80QFhc47FLnLWKOK",
      });

    res.status(201).json({ message: "Demo users inserted successfully" });
  } catch (err) {
    console.error("Error inserting demo data:", err);
    res.status(500).json({ message: "Internal server error" });
  }
});

// router.get("/live", canvasController.getAllCanvases); // pending
module.exports = router;
