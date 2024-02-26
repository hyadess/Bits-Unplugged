import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../ProbSetTab";
import { setLoading } from "../../App";
import { problemApi, userActivityApi } from "../../api";
import Confirmation from "../Confirmation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  // faCircleCheck,
  // faCircleXmark,
  faR,
  faTag,
  fas,
  fa,
  faS,
  // far,
} from "@fortawesome/free-solid-svg-icons";
import {
  faCircleCheck,
  faCircleXmark,
} from "@fortawesome/free-regular-svg-icons";
import { fab } from "@fortawesome/free-brands-svg-icons";

export default function ArticleCard({
  id,
  title,
  subtitle,
  path,
  rating,
  deleteAction,
  isLive,
  setProblem,
  isSolved,
}) {
  useEffect(() => {
    setLoading(false);
  }, []);
  const navigate = useNavigate();

  return (
    <div className="w-full h-full" key={id}>
      <div
        className={
          "border rounded-lg shadow-md bg-gray-700 bu-card-primary flex flex-col p-5 h-full cursor-pointer"
        }
        onClick={() => {
          setLoading(true);
          navigate(path);
        }}
      >
        {/* <h5 className="text-2xl text-center font-bold tracking-tight bu-text-primary w-10%">
          {idx}
        </h5> */}

        <div className="flex flex-row">
          <div className="flex flex-col gap-2 w-[85%]">
            <h5 className="text-xl md:text-2xl tracking-tight bu-text-primary cursor-pointer h-full whitespace-nowrap overflow-hidden overflow-ellipsis max-w-full font-semibold">
              {title}
            </h5>
            <h5 className="text-sm md:text-lg tracking-tight bu-text-subtitle cursor-pointer h-full whitespace-nowrap overflow-hidden overflow-ellipsis max-w-full">
              {subtitle}
            </h5>
          </div>

          <div className="text-center w-[15%] text-2xl font-bold">
            {isSolved === 1 ? (
              <FontAwesomeIcon icon={faCircleCheck} color="green" />
            ) : isSolved === 0 ? (
              <FontAwesomeIcon icon={faCircleXmark} color="red" />
            ) : (
              <></>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
