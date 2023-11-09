import React, { useState, useEffect } from "react";
import { Label } from "react-konva";
import { useNavigate } from "react-router-dom";
import DoneOutlineIcon from "@mui/icons-material/DoneOutline";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import "./ProbSetTab";
export default function ProblemSetCard({ id, name, deleteAction, is_live }) {
  const navigator = useNavigate();
  const switchPath = (pathname) => {
    navigator(pathname);
  };

  return (
    <div class="items-center py-4 px-4 ">
      <div class="max-w-sm bg-white border border-gray-500 rounded-lg shadow-lg dark:bg-gray-700 dark:border-gray-700">
        <h5 class="mt-4 text-2xl text-center font-bold tracking-tight text-gray-900 dark:text-white">
          Problem {id}
        </h5>
        <h5 class="m-4 text-3xl text-center font-bold tracking-tight text-gray-900 text-primary-500">
          {name}
        </h5>
        {/* <img class="w-full" src={image} alt="" /> */}
        <div className="w-full flex items-center justify-center">
          <a
            onClick={() => switchPath(`/problemSet/${id}`)}
            class="inline-flex my-4  text-center items-center text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:focus:ring-primary-900"
          >
            <Label class="text-lg text-center font-bold tracking-tight text-gray-900 text-white">
              Get Started
            </Label>
          </a>
        </div>
        <div className="w-full flex items-center justify-center">
          <a
            onClick={() => deleteAction(id)}
            class="inline-flex my-4 text-center items-center text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-10 py-2.5 text-center dark:focus:ring-primary-900"
          >
            <Label class="text-lg text-center font-bold tracking-tight text-gray-900 text-white">
              delete
            </Label>
          </a>
        </div>
        {is_live == 1 ? (
          <CheckCircleIcon sx={{ fontSize: "1.5rem", color: "green" }} />
        ) : (
          <img
            src="https://o.remove.bg/downloads/d896127a-e3ad-4ea1-811d-604174e0da97/Flat_tick_icon-removebg-preview.png"
            alt="Image"
            className="no-image-Style"
          />
        )}
      </div>
    </div>
  );
}
