import React, { useState, useEffect } from "react";
import { Label } from "react-konva";
import { useNavigate } from "react-router-dom";
import DoneOutlineIcon from "@mui/icons-material/DoneOutline";

import "../ProbSetTab";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import AddTaskIcon from "@mui/icons-material/AddTask";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { Button, IconButton } from "@mui/material";
import ProblemController from "../../controller/problemController";
import EditIcon from "@mui/icons-material/Edit";
import Confirmation from "../Confirmation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { setLoading } from "../../App";
const problemController = new ProblemController();
const ProblemSetCard = ({ id, idx, name, deleteAction, isLive }) => {
  const [open, setOpen] = useState(false);
  const navigator = useNavigate();
  const switchPath = (pathname) => {
    navigator(pathname);
  };

  useEffect(() => {
    setLoading(false);
  }, []);
  const publishProblem = async () => {
    // await problemController.publishProblem(id);
  };
  const unpublishProblem = async () => {
    // await problemController.unpublishProblem(id);
  };
  return (
    <div className="items-center w-full" key={id}>
      <div
        className={
          "border rounded-lg shadow-lg bg-gray-700 bu-card-primary flex flex-row p-4 items-center"
        }
      >
        <h5 className="text-2xl text-center font-bold tracking-tight bu-text-primary w-10%">
          {idx}
        </h5>
        <h5
          className="text-2xl md:text-3xl pl-5 font-bold tracking-tight bu-text-title w-75% cursor-pointer"
          onClick={() => {
            setLoading(true);
            switchPath(`/problem/${id}/preview`);
          }}
        >
          {name}
        </h5>

        <div className="w-30% md:w-15% flex flex-row justify-end">
          <div className="w-1/3 flex items-center justify-center">
            <IconButton onClick={() => switchPath(`/problem/${id}/edit`)}>
              <div className="flex items-center bu-text-primary">
                <FontAwesomeIcon icon={faPenToSquare} size="sm" />
              </div>
            </IconButton>
          </div>

          <div className="w-1/3 flex items-center justify-center">
            {isLive == 1 ? (
              <IconButton onClick={() => unpublishProblem()}>
                <div className="flex items-center bu-text-primary">
                  <CheckCircleIcon sx={{ fontSize: "1.5rem" }} />
                </div>
              </IconButton>
            ) : (
              <IconButton onClick={() => publishProblem()}>
                <div className="flex items-center bu-text-subtitle">
                  <AddTaskIcon sx={{ fontSize: "1.5rem" }} />
                </div>
              </IconButton>
            )}
          </div>

          <div className="w-1/3 flex items-center justify-center">
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
