const app = require("./app").app;
const { PORT } = require("./config/config");

const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
module.exports = { server };
