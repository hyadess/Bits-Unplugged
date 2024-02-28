const SetterActivityRepository = require("../repositories/setterActivityRepository");
const Controller=require("./base");

const setterActivityRepository=new SetterActivityRepository();


class SetterActivityController extends Controller{
    constructor(){
        super();
    }
    setterActivityBySeries = async (req, res, next) => {
       
        let result = await setterActivityRepository.setterActivityBySeries(req.params.setterId);
        if(result.success){
            res.status(200).json(result.data);
        }
        else{
            res.status(404).json(result);
        }
            
    };

    famousProblemBySetter = async (req, res, next) => {
        let result = await setterActivityRepository.famousProblemBySetter(req.params.setterId);
        if(result.success){
            res.status(200).json(result.data);
        }
        else{
            res.status(404).json(result);
        }
    }

    approvalStatusStat = async (req, res, next) => {
        let result = await setterActivityRepository.approvalStatusStat(req.params.setterId);
        if(result.success){
            res.status(200).json(result.data);
        }
        else{
            res.status(404).json(result);
        }
    }

    getSetterInfo = async (req, res) => {
        let result = await setterActivityRepository.getSetterInfo(req.params.setterId);
        if(result.success){
            res.status(200).json(result.data);
        }
        else{
            res.status(404).json(result);
        }
    }


}
module.exports=SetterActivityController;


