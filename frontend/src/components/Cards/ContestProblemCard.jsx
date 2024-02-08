import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../ProbSetTab";
import AddTaskIcon from "@mui/icons-material/AddTask";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { Button, IconButton, Input } from "@mui/material";
import Confirmation from "../Confirmation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopy, faTag, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { setLoading } from "../../App";
import { getTimeStamp } from "../../services/dateUtil";

const ProblemSetCard = ({
  id,
  idx,
  name,
  deleteAction,
  isLive,
  timestamp,
  canvas,
  cloneProblem,
}) => {
  const [open, setOpen] = useState(false);
  const [points, setPoints] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(false);
    console.log(parseInt(timestamp, 10));
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
      <div className="border rounded-lg shadow-lg bg-gray-700 bu-card-primary flex flex-col p-5 justify-between">
        <div className="flex flex-col cursor-pointer">
          <h5 className="text-2xl md:text-3xl font-bold tracking-tight bu-text-title w-75% cursor-pointer h-full whitespace-nowrap overflow-hidden overflow-ellipsis max-w-full">
            {name}
          </h5>
        </div>

        <div className="flex flex-row items-center justify-between">
          {/* Input field for points moved to the right */}
          <div className="flex items-center gap-5 text-[#ba3030] dark:text-blue-400">
            <label className="text-xl md:text-xl font-bold tracking-tight bu-text-title cursor-pointer">
              Points:</label>
            <Input
              type="number"
              value={points}
              onChange={(e) => setPoints(e.target.value)}
              className="bg-gray-50 border border-green-100 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-.8 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
            />
          </div>

          <div className="flex flex-row items-center gap-2 text-[#ba3030] dark:text-blue-400">
            {/* You can customize this section */}
            <IconButton onClick={() => navigate(`/problems/${id}/edit`)}>
              <div className="flex items-center bu-text-primary">
                <FontAwesomeIcon icon={faPenToSquare} size="sm" />
              </div>
            </IconButton>

            <IconButton onClick={() => cloneProblem(id)}>
              <div className="flex items-center bu-text-primary">
                <FontAwesomeIcon icon={faCopy} size="sm" />
              </div>
            </IconButton>

            <IconButton onClick={() => setOpen(true)}>
              <div className="flex items-center bu-text-primary">
                <FontAwesomeIcon icon={faTrashCan} size="sm" />
              </div>
            </IconButton>
          </div>
        </div>
      </div>

      <Confirmation
        open={open}
        setOpen={setOpen}
        onConfirm={deleteAction}
        param={id}
      />
    </div>
  );
};

export default ProblemSetCard;
