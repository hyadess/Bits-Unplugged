import React, { useState, useEffect } from "react";
import { Label } from "react-konva";
import { useNavigate } from "react-router-dom";
import DoneOutlineIcon from "@mui/icons-material/DoneOutline";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import "../ProbSetTab";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import AddTaskIcon from "@mui/icons-material/AddTask";
import { Button, IconButton } from "@mui/material";
import SubmissionController from "../../controller/submissionController";
import EditIcon from "@mui/icons-material/Edit";
import { setLoading } from "../../App";
const submissionController = new SubmissionController();
export default function SubmissionCard({
  submission_id,
  idx,
  problem_name,
  verdict,
  path,

}) {
  useEffect(() => {
    setLoading(false);
  }, []);
  const navigator = useNavigate();
  const switchPath = (pathname) => {
    navigator(pathname);
  };

  return (
    <div class="items-center w-full">
      <div
        class={
          "border rounded-lg shadow-lg bg-gray-700 bu-card-primary flex flex-row p-4 items-center"
        }
      >
        <h5 class="text-2xl text-center font-bold tracking-tight bu-text-primary w-10%">
          {idx}
        </h5>
        <h5
          class="text-2xl md:text-3xl pl-5 font-bold tracking-tight bu-text-title w-75% cursor-pointer"
        //   onClick={() => {
        //     setLoading(true);
        //     switchPath(path);
        //   }}
        >
          {problem_name}_{submission_id}
        </h5>
        <h1
          class="text-xl md:text-xl pl-5 font-bold tracking-tight bu-text-title w-75% cursor-pointer"
        //   onClick={() => {
        //     setLoading(true);
        //     switchPath(path);
        //   }}
        >
          {verdict}
        </h1>
      </div>
    </div>
  );
}
