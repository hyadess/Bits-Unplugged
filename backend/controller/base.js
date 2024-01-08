class Controller {
  constructor() {}
  handleResponse(result, res) {
    if (result.success) {
      res.status(200).json(result.data);
    } else {
      res.status(500).json(result);
    }
  }

  handleRequest = async (res, action) => {
    try {
      await action();
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal server error" });
    }
  };
}

module.exports = Controller;
