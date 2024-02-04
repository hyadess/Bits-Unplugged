import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button, IconButton } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import AddTaskIcon from "@mui/icons-material/AddTask";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTag, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { setLoading } from "../../App";
import { getTimeStamp } from "../../services/dateUtil";
import Confirmation from "../Confirmation";

const ContestSetCard = ({
  id,
  name,
  startDate,
  endDate,
  status,
  owner,
  collaborators,
  deleteAction,
}) => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(false);
  }, []);

  const publishContest = async () => {
    // Implement your logic for publishing the contest
  };

  const unpublishContest = async () => {
    // Implement your logic for unpublishing the contest
  };

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
            <h3 className="bu-text-primary">{owner}</h3>
          </div>
        </div>

        <div className="flex items-center justify-between mt-4">
          <div className="flex gap-4 items-center">
            <div className="bu-text-subtitle">{`Start Date: ${getTimeStamp(
              startDate
            )}`}</div>
            <div className="bu-text-subtitle">{`End Date: ${getTimeStamp(
              endDate
            )}`}</div>
            <div className="bu-text-subtitle">{`Status: ${status}`}</div>
          </div>

          <div className="flex gap-4 items-center">
            <IconButton
              onClick={() => navigate(`/contests/${id}/edit`)}
              className="text-blue-500 hover:text-blue-700"
            >
              <div className="flex items-center">
                <FontAwesomeIcon icon={faPenToSquare} size="sm" />
              </div>
            </IconButton>

            {status === "Live" ? (
              <IconButton
                onClick={unpublishContest}
                className="text-green-500 hover:text-green-700"
              >
                <div className="flex items-center">
                  <CheckCircleIcon sx={{ fontSize: "1.5rem" }} />
                </div>
              </IconButton>
            ) : (
              <IconButton
                onClick={publishContest}
                className="text-blue-500 hover:text-blue-700"
              >
                <div className="flex items-center">
                  <AddTaskIcon sx={{ fontSize: "1.5rem" }} />
                </div>
              </IconButton>
            )}

            <IconButton
              onClick={() => setOpen(true)}
              className="text-red-500 hover:text-red-700"
            >
              <div className="flex items-center">
                <FontAwesomeIcon icon={faTrashCan} size="sm" />
              </div>
            </IconButton>
          </div>
        </div>
      </div>

      <Confirmation open={open} setOpen={setOpen} onConfirm={deleteAction} param={id} />
    </div>
  );
};

export default ContestSetCard;
