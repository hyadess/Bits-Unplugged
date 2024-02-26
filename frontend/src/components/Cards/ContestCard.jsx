import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button, IconButton } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import AddTaskIcon from "@mui/icons-material/AddTask";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHandPointRight, faTag, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { setLoading } from "../../App";
import { getTimeStamp } from "../../services/dateUtil";
import Confirmation from "../Confirmation";
import { contestApi } from "api";
// ... (previous imports)
import { format } from "date-fns";
const ContestCard = ({
  id,
  name,
  startDate,
  endDate,
  status,
  owner,
  updatedAt,
  registerAction,
  userID,
}) => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const [isRegistered, setRegistered] = useState(false);


  const handleButtonClick = async () => {
    const res = await contestApi.participateUpcomingContest(id);
    navigate(`/contests/${id}`);
  };
  
  const getRegistrationInfo = async () => {

    const res = await contestApi.isRegistered(id);
    console.log("register", id, res);
    if(res.data.length>0)setRegistered(true);
    else setRegistered(false);
  };

  useEffect(() => {
    getRegistrationInfo();
    setLoading(false);
  }, []);

  return (
    <div className="w-full h-full" key={id}>
      <div className="border rounded-lg shadow-lg bg-gray-700 bu-card-primary flex flex-col p-5">
        <div
          className="cursor-pointer"
          onClick={() => navigate(`/contests/${id}/preview`)}
        >
          <h5 className="text-2xl md:text-3xl font-bold tracking-tight bu-text-title">
            {name}
          </h5>
          <div className="flex flex-row items-center gap-2 text-[#ba3030] dark:text-blue-400">
            <FontAwesomeIcon icon={faTag} />
            <h3 className="bu-text-primary font-semibold">{owner.username}</h3>
          </div>
        </div>

        <div className="flex justify-between mt-4">
          <div className="flex flex-col gap-2 items-start">
            <div className="bu-text-subtitle font-semibold">
              {startDate
                ? `Start Date: ${format(
                    new Date(startDate),
                    "d MMMM, yyyy 'at' h.mm a"
                  )}`
                : "Start Date: Yet to be added"}
            </div>
            <div className="bu-text-subtitle font-semibold">
              {endDate
                ? `End Date: ${format(
                    new Date(endDate),
                    "d MMMM, yyyy 'at' h.mm a"
                  )}`
                : "End Date: Yet to be added"}
            </div>
          </div>

          <div className="flex flex-col gap-2 items-center">
            <div className={`bu-text-subtitle font-semibold text-${status === "Live" ? 'green' : 'blue'}-500`}>
              {`Status: ${status}`}
            </div>
            <div className="bu-text-subtitle font-semibold">
              {updatedAt && `Last Updated: ${getTimeStamp(updatedAt)}`}
            </div>
          </div>
          {new Date(startDate).getTime() < Date.now() && (
          <div className="flex gap-4 items-center">
            <div className="flex w-full cursor-pointer items-center justify-center">
              <div
                onClick={() => handleButtonClick()}
                className="bu-button-secondary my-8 inline-flex  items-center rounded-lg px-5 py-2.5 text-center text-sm font-medium"
              >
                <h5 className="bu-text-primary text-center text-lg font-bold tracking-tight">
                {isRegistered ? 'Enter' : 'Register'}   
                  {/* <FontAwesomeIcon icon={faHandPointRight} /> */}
                </h5>
              </div>
            </div>
          </div>)}
        </div>
      </div>

      <Confirmation open={open} setOpen={setOpen} onConfirm={registerAction} param={id} />
    </div>
  );
};

export default ContestCard;
