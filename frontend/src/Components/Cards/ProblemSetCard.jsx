import React, { useState, useEffect } from "react";
import { Label } from "react-konva";
import { useNavigate } from "react-router-dom";
import DoneOutlineIcon from "@mui/icons-material/DoneOutline";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import "../ProbSetTab";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import AddTaskIcon from "@mui/icons-material/AddTask";
import { Button, IconButton } from "@mui/material";
import ProblemController from "../../controller/problemController";
import EditIcon from "@mui/icons-material/Edit";
import Confirmation from "../Confirmation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
const problemController = new ProblemController();
export default function ProblemSetCard({
  id,
  idx,
  name,
  deleteAction,
  is_live,
}) {
  const [open, setOpen] = useState(false);
  const navigator = useNavigate();
  const switchPath = (pathname) => {
    navigator(pathname);
  };

  const publishProblem = async () => {
    await problemController.publishProblem(id);
  };
  const unpublishProblem = async () => {
    await problemController.unpublishProblem(id);
  };
  return (
    <div class="items-center w-full">
      <div
        class={
          "border border-gray-500 rounded-lg shadow-lg bg-gray-700 border-gray-700 flex flex-row p-4 items-center"
        }
      >
        <h5 class="text-2xl text-center font-bold tracking-tight text-gray-900 text-white w-10%">
          {idx}
        </h5>
        <h5
          class="text-2xl md:text-3xl pl-5 font-bold tracking-tight text-gray-900 text-primary-500 w-75% cursor-pointer"
          onClick={() => switchPath(`/problem/${id}/preview`)}
        >
          {name}
        </h5>
        {/* <img class="w-full" src={image} alt="" /> */}
        <div className="w-10% md:w-5% flex items-center justify-center">
          <IconButton onClick={() => switchPath(`/problem/${id}/edit`)}>
            <FontAwesomeIcon icon={faPenToSquare} color="white" size="md" />
          </IconButton>
          {/* <a
            onClick={() => switchPath(`/problemSet/${id}`)}
            class="inline-flex my-4  text-center items-center text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center focus:ring-primary-900"
          >
            <Label class="text-lg text-center font-bold tracking-tight text-gray-900 text-white">
              Get Started
            </Label>
          </a> */}
        </div>
        {/* <div className="w-full flex items-center justify-center">
          <a
            onClick={() => deleteAction(id)}
            class="inline-flex my-4 text-center items-center text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-10 py-2.5 text-center focus:ring-primary-900"
          >
            <Label class="text-lg text-center font-bold tracking-tight text-gray-900 text-white">
              delete
            </Label>
          </a>
        </div> */}
        <div className="w-10% md:w-5% flex items-center justify-center">
          {/* <button
            className="submit-button"
            class="text-white font-medium rounded-lg text-lg px-7 py-3.5 text-center bg-pink-600 hover:bg-pink-700 focus:ring-pink-800"
            onClick={updateAll}
          >
            PUBLISH
          </button> */}

          {is_live == 1 ? (
            <IconButton onClick={() => unpublishProblem()}>
              <CheckCircleIcon sx={{ fontSize: "1.5rem", color: "white" }} />
            </IconButton>
          ) : (
            <IconButton onClick={() => publishProblem()}>
              <AddTaskIcon sx={{ fontSize: "1.5rem" }} />
            </IconButton>
          )}
        </div>

        <div className="w-10% md:w-5% flex items-center justify-center">
          <IconButton onClick={() => setOpen(true)}>
            <FontAwesomeIcon icon={faTrashCan} color="white" size="md" />
          </IconButton>

          {/* <button
            className="submit-button"
            class="text-white font-medium rounded-lg text-lg px-7 py-3.5 text-center bg-blue-600 hover:bg-blue-700 focus:ring-blue-800"
            // onClick={() => deleteAction(id)}
          >
            DELETE
          </button> */}
        </div>

        {/* <div
          className="hbox pr-1 pl-1 w-20%"
          style={{ justifyContent: "space-between", alignItems: "center" }}
        ></div> */}
      </div>
      <Confirmation
        open={open}
        setOpen={setOpen}
        onConfirm={deleteAction}
        param={id}
      />
    </div>
  );
}
