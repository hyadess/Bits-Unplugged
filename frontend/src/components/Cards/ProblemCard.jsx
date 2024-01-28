import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../ProbSetTab";
import { setLoading } from "../../App";
import { problemApi } from "../../api";
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
export default function ProblemCard({
  id,
  name,
  path,
  deleteAction,
  isLive,
  setProblem,
  isSolved,
}) {
  const [acceptance, setAcceptance] = useState(Math.round(Math.random() * 100));
  const [difficulty, setDifficulty] = useState(
    ["Easy", "Medium", "Hard"][Math.floor(Math.random() * 3)]
  );
  useEffect(() => {
    setLoading(false);
  }, []);
  const navigate = useNavigate();
  const publishProblem = async () => {
    await problemApi.publishProblem(id);
  };
  const unpublishProblem = async () => {
    await problemApi.unpublishProblem(id);
  };
  return (
    <div className="w-full h-full" key={id}>
      <div
        className={
          "border rounded-lg shadow-md bg-gray-700 bu-card-primary flex flex-col p-5 h-full"
        }
      >
        {/* <h5 className="text-2xl text-center font-bold tracking-tight bu-text-primary w-10%">
          {idx}
        </h5> */}

        <div className="flex flex-row cursor-pointer">
          <h5
            className="text-xl md:text-2xl tracking-tight bu-text-primary w-[45%] cursor-pointer h-full whitespace-nowrap overflow-hidden overflow-ellipsis max-w-full"
            onClick={() => {
              setLoading(true);
              navigate(path);
            }}
          >
            {name}
          </h5>
          <h3
            className={`text-center w-[20%] text-lg ${
              acceptance > 70
                ? "text-green-500 font-sm"
                : acceptance > 40
                  ? "text-[#FF981E] font-medium"
                  : "text-red-500 font-bold"
            }`}
          >
            {acceptance}%
          </h3>

          <h3
            className={`text-center w-[20%] text-lg ${
              difficulty === "Medium"
                ? "text-[#FF981E] font-medium"
                : difficulty === "Easy"
                  ? "text-green-500 font-sm"
                  : "text-red-500 font-extrabold"
            }`}
          >
            {difficulty}
          </h3>
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
