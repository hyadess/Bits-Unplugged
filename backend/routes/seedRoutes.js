const { submissionController } = require("../controllers");
const { authRepository, contestRepository } = require("../repositories");
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

calculateAdjustedPoints = (
  actualPoints,
  submissionTime,
  numWrongAnswers,
  contestDuration
) => {
  // Calculate time penalty
  // console.log(submissionTime, contestDuration);
  const timePenaltyFactor = 0.9 * actualPoints; // Adjust this factor as needed
  // we need to keep 10% points remaining at the end of contest
  // so we can decrease 0.9 * actual_points in contestDuration window
  // contestDuration -> 0.9 * actual_points
  // 1 -> 0.9 * actual_points / contestDuration
  // submissionTime -> 0.9 * actual_points *
  const timePenalty =
    Math.max(0, submissionTime / contestDuration) * timePenaltyFactor;

  // Calculate wrong answer penalty based on actual points
  const wrongAnswerPenaltyFactor = 0.05; // Adjust this factor as needed
  const wrongAnswerPenalty =
    actualPoints * wrongAnswerPenaltyFactor * numWrongAnswers;

  // const wrong_answer_penalty = num_wrong_answers * 5;
  // Adjusted points
  // console.log(timePenalty, wrongAnswerPenalty);
  let adjustedPoints = actualPoints - timePenalty - wrongAnswerPenalty;

  // Ensure adjusted points are not negative
  adjustedPoints = Math.max(0.1 * actualPoints, adjustedPoints);

  // return Math.round(adjustedPoints / 10) * 10;
  return Math.round(adjustedPoints);
};
// console.log(participantData);

router.post("/contest/submissions/:contestId", async (req, res) => {
  try {
    for (let i = 3; i <= 45; i++) {
      for (let j = 1; j <= 7; j++) {
        for (let k = 1; k <= 5; k++) {
          const points = [200, 400, 600, 800, 1000, 1200, 1400];
          const verdicts =
            i > 19
              ? [
                  "Wrong answer",
                  "Wrong answer",
                  "Wrong answer",
                  "Accepted",
                  "Wrong answer",
                  "Wrong answer",
                  "Wrong answer",
                  "Wrong answer",
                  "Wrong answer",
                ]
              : [
                  "Wrong answer",
                  "Wrong answer",
                  "Accepted",
                  "Wrong answer",
                  "Wrong answer",
                ];
          const verdict =
            verdicts[Math.floor(Math.random() * (i > 19 ? 9 : 5))];
          //   // generate random duration between 1 and 3600
          const duration = Math.floor(Math.random() * 600) + 1;
          //   // generate random submission time between 1 and 3600
          const submittedAt =
            Math.round(
              (Math.floor(Math.random() * (3600000 - 5000)) + 5000) / 5000
            ) * 5000;

          let result =
            await contestRepository.addSubmissionToContestFromParticipant(
              j,
              req.params.contestId,
              i,
              verdict,
              null,
              {},
              points[j - 1],
              duration,
              null,
              submittedAt
            );
        }
      }
    }
    res.status(201).json({ message: "Demo data inserted successfully" });
  } catch (err) {
    console.error("Error inserting contest data:", err);
    res.status(500).json({ message: "Internal server error" });
  }
});

// router.get("/live", canvasController.getAllCanvases); // pending
module.exports = router;
