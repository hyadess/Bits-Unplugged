import Api from "./base";

class SetterActivityApi extends Api {
  setterActivityBySeries = async (setterId) => {
    return await this.get("/setterActivity/" + setterId + "/series");
  };
  famousProblemBySetter = async (setterId) => {
    return await this.get("/setterActivity/" + setterId + "/famousProblem");
  };
  approvalStatusStat = async (setterId) => {
    return await this.get("/setterActivity/" + setterId + "/approvalStatus");
  };
  getSetterInfo = async (setterId) => {
    return await this.get("/setterActivity/" + setterId + "/info");
  };
}


export default SetterActivityApi;