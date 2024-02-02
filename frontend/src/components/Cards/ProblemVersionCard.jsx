import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../ProbSetTab";
import AddTaskIcon from "@mui/icons-material/AddTask";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { Button, IconButton } from "@mui/material";
import Confirmation from "../Confirmation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheckDouble,
  faCopy,
  faHourglassHalf,
  faTag,
  faTrashCan,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { setLoading } from "../../App";
import { getTimeStamp } from "../../services/dateUtil";
const ProblemVersionCard = ({
  id,
  idx,
  name,
  deleteAction,
  isLive,
  timestamp,
  canvas,
  cloneProblem,
  approvalStatus,
  feedback,
}) => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    setLoading(false);
    console.log(parseInt(timestamp, 10)); // Convert the string to a number
    const date = new Date(parseInt(timestamp, 10));
    console.log(canvas);
  }, []);
  const publishProblem = async () => {
    // await problemController.publishProblem(id);
  };
  const unpublishProblem = async () => {
    // await problemController.unpublishProblem(id);
  };
  return (
    <div className="w-full" key={id}>
      <div
        className={
          "border rounded-lg shadow-lg bg-gray-700 bu-card-primary flex flex-col p-5 justify-between"
        }
      >
        {/* <h5 className="text-2xl text-center font-bold tracking-tight bu-text-primary w-10%">
          {idx}
        </h5> */}

        <div
          className="flex flex-col cursor-pointer"
          onClick={() => {
            setLoading(true);
            navigate(`/problems/${id}/preview`);
          }}
        >
          <h5 className="text-2xl md:text-3xl font-bold tracking-tight bu-text-title w-75% cursor-pointer h-full whitespace-nowrap overflow-hidden overflow-ellipsis max-w-full">
            {name}
          </h5>

          {canvas && (
            <div className="flex flex-row items-center gap-2 text-[#ba3030] dark:text-blue-400">
              <FontAwesomeIcon icon={faTag} />
              <h3 className="bu-text-primary">{canvas}</h3>
            </div>
          )}
        </div>

        <div className="flex justify-between items-end">
          <div className="bu-text-subtitle">{getTimeStamp(timestamp)}</div>
          <div className="bu-text-primary">
            {approvalStatus == 0 ? (
              <div className="flex flex-row gap-2">
                <div className="bu-text-subtitle">Rejected</div>
                <div className="text-red-500">
                  <FontAwesomeIcon icon={faXmark} />
                </div>
              </div>
            ) : approvalStatus == 1 ? (
              <div className="flex flex-row gap-2">
                <div className="bu-text-subtitle">Approved</div>
                <div className="text-green-500">
                  <FontAwesomeIcon icon={faCheckDouble} />
                </div>
              </div>
            ) : (
              <div className="flex flex-row gap-2">
                <div className="bu-text-subtitle">Pending</div>
                <div className="text-gray-500">
                  <FontAwesomeIcon icon={faHourglassHalf} />
                </div>
              </div>
            )}
          </div>
        </div>

        {feedback && (
          <div className="rounded-lg bu-nav-color w-full p-2 mt-5 flex justify-center">
            <div className="bu-text-subtitle align-middle">{feedback}</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProblemVersionCard;
