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
      <div className="border rounded-lg shadow-lg bg-gray-700 bu-card-primary flex flex-col p-5 h-full">
        <div className="flex flex-col cursor-pointer" onClick={() => navigate(`/contests/${id}/preview`)}>
          <h5 className="text-2xl md:text-3xl font-bold tracking-tight bu-text-title w-75% cursor-pointer h-full whitespace-nowrap overflow-hidden overflow-ellipsis max-w-full">
            {name}
          </h5>
          <div className="flex flex-row items-center gap-2 text-[#ba3030] dark:text-blue-400">
            <FontAwesomeIcon icon={faTag} />
            <h3 className="bu-text-primary">owner</h3>
          </div>
        </div>

        <div className="flex justify-between items-end">
          <div className="bu-text-subtitle">
            {`Start Date: {getTimeStamp(startDate)} - End Date: {getTimeStamp(endDate)}`}
          </div>
          <div className="bu-text-primary mt-2">
            {`Collaborators: {collaborators.join(", ")}`}
          </div>
          <div className="flex flex-row ">
            <div className="w-1/4 flex items-center justify-center">
              <div className="bu-text-primary">{`Status: ${status}`}</div>
            </div>
            <div className="w-1/4 flex items-center justify-center">
              <IconButton onClick={() => navigate(`/contests/${id}/edit`)}>
                <div className="flex items-center bu-text-primary">
                  <FontAwesomeIcon icon={faPenToSquare} size="sm" />
                </div>
              </IconButton>
            </div>
            <div className="w-1/4 flex items-center justify-center">
              {status === "Live" ? (
                <IconButton onClick={unpublishContest}>
                  <div className="flex items-center bu-text-primary">
                    <CheckCircleIcon sx={{ fontSize: "1.5rem" }} />
                  </div>
                </IconButton>
              ) : (
                <IconButton onClick={publishContest}>
                  <div className="flex items-center bu-text-subtitle">
                    <AddTaskIcon sx={{ fontSize: "1.5rem" }} />
                  </div>
                </IconButton>
              )}
            </div>
            <div className="w-1/4 flex items-center justify-center">
              <IconButton onClick={() => setOpen(true)}>
                <div className="flex items-center bu-text-primary">
                  <FontAwesomeIcon icon={faTrashCan} size="sm" />
                </div>
              </IconButton>
            </div>
          </div>
        </div>
      </div>

      

      <Confirmation open={open} setOpen={setOpen} onConfirm={deleteAction} param={id} />
    </div>
  );
};

export default ContestSetCard;
