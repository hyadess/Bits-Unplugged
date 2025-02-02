const Controller = require("./base");
const ProfileRepository = require("../repositories/profileRepository");
const profileRepository = new ProfileRepository();
class ProfileController extends Controller {
  constructor() {
    super();
  }

  getProfile = async (req, res) => {
    let result = await profileRepository.getProfile(req.user.userId);
    this.handleResponse(result, res);
  };

  getIdByUsername = async (req, res) => {
    let result = await profileRepository.getIdByUsername(req.params.username);
    this.handleResponse(result, res);
  };



  getProfileByUsername = async (req, res) => {
    let result = await profileRepository.getProfileByUsername(req.params.username);
    this.handleResponse(result, res);
  };
  searchProfileByQuery = async (req, res) => {
    let result = await profileRepository.searchProfileByQuery(req.params.seachQuery);
    this.handleResponse(result, res);
  };

  setProfile = async (req, res) => {
    let result = await profileRepository.setProfile(req.body);
    this.handleResponse(result, res);
  };
  updateProfile = async (req, res) => {
    const requestBody = JSON.stringify(req.body, null, 2); // The '2' parameter specifies the indentation level

    let result = await profileRepository.updateProfile(
      req.user.userId,
      req.body
    );
    this.handleResponse(result, res);
  };
}

module.exports = ProfileController;
