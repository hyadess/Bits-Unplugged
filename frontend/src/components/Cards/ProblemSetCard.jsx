import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../ProbSetTab";
import AddTaskIcon from "@mui/icons-material/AddTask";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { Button, IconButton } from "@mui/material";
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
  isPublished,
}) => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    setLoading(false);
  }, []);

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
          <div className="flex flex-row ">
            <div className="w-1/3 flex items-center justify-center">
              <IconButton onClick={() => navigate(`/problems/${id}/edit`)}>
                <div className="flex items-center bu-text-primary">
                  <FontAwesomeIcon icon={faPenToSquare} size="sm" />
                </div>
              </IconButton>
            </div>

            <div className="w-1/3 flex items-center justify-center">
              <IconButton onClick={() => cloneProblem(id)}>
                <div className="flex items-center bu-text-primary">
                  <FontAwesomeIcon icon={faCopy} size="sm" />
                </div>
              </IconButton>
            </div>

            <div className="w-1/3 flex items-center justify-center">
              <IconButton onClick={() => setOpen(true)} disabled={isPublished}>
                <div
                  className={`flex items-center bu-text-${
                    isPublished ? "disabled" : "primary"
                  }`}
                >
                  <FontAwesomeIcon icon={faTrashCan} size="sm" />
                </div>
              </IconButton>
            </div>
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
