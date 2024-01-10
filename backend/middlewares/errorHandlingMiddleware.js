// handleRequestMiddleware.js

const handleRequestMiddleware = async (err, req, res, next) => {
  console.error("Error handling request:", error);
  res.status(500).json({ error: "Internal Server Error" });
};

module.exports = handleRequestMiddleware;
