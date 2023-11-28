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

const problemController = new ProblemController();
export default function ProblemSetCard({ id, name, deleteAction, is_live }) {
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
    <div class="items-center py-4 px-4 ">
      <div
        class={
          "max-w-sm  border border-gray-500 rounded-lg shadow-lg bg-gray-700 border-gray-700"
        }
      >
        <h5 class="mt-4 text-2xl text-center font-bold tracking-tight text-gray-900 text-white">
          Problem {id}
        </h5>
        <h5 class="m-4 text-3xl text-center font-bold tracking-tight text-gray-900 text-primary-500">
          {name}
        </h5>
        {/* <img class="w-full" src={image} alt="" /> */}
        <div className="w-full flex items-center justify-center">
          <a
            onClick={() => switchPath(`/problemSet/${id}`)}
            class="inline-flex my-4  text-center items-center text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center focus:ring-primary-900"
          >
            <Label class="text-lg text-center font-bold tracking-tight text-gray-900 text-white">
              Get Started
            </Label>
          </a>
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
        <div
          className="hbox pr-1 pl-1"
          style={{ justifyContent: "space-between", alignItems: "center" }}
        >
          {is_live == 1 ? (
            <IconButton onClick={() => unpublishProblem()}>
              <CheckCircleIcon sx={{ fontSize: "1.5rem", color: "green" }} />
            </IconButton>
          ) : (
            <IconButton onClick={() => publishProblem()}>
              <AddTaskIcon sx={{ fontSize: "1.5rem" }} />
            </IconButton>
          )}

          <IconButton onClick={() => deleteAction(id)}>
            <DeleteIcon
              variant="outlined"
              sx={{ fontSize: "1.5rem", color: "white" }}
            />
          </IconButton>
        </div>
      </div>
    </div>
  );
}
