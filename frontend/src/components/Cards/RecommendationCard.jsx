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

export default function RecommendationCard({
  id,
  name,
  path,
  rating,
  deleteAction,
  isLive,
  setProblem,
}) {
  const [isSolved, setIsSolved] = useState(null);
  const [acceptance, setAcceptance] = useState(0);
  const getAcceptance = async (id) => {
    const res = await userActivityApi.acceptanceByProblem(id);
    if (res.success && res.data.length > 0) {
      console.log(res.data);
      setAcceptance(
        Number(res.data[0].successful_submissions) +
          Number(res.data[0].failed_submissions) ===
          0
          ? 0
          : Math.round(
              (Number(res.data[0].successful_submissions) * 100) /
                (Number(res.data[0].successful_submissions) +
                  Number(res.data[0].failed_submissions))
            )
      );
    } else {
      setAcceptance(0);
    }
  };
  const getIfSolved = async (id) => {
    const res = await userActivityApi.isSolvedByUser(id);
    if (res.success && res.data.length > 0) {
      setIsSolved(res.data[0].isSolved);
      console.log("isSolved fetched", res.data);
    }
  };

  const [difficulty, setDifficulty] = useState(rating);
  useEffect(() => {
    getAcceptance(id);
    getIfSolved(id);
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
          <h5 className="text-xl md:text-2xl tracking-tight bu-text-primary w-[45%] cursor-pointer h-full whitespace-nowrap overflow-hidden overflow-ellipsis max-w-full">
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
            {isSolved === true ? (
              <FontAwesomeIcon icon={faCircleCheck} color="green" />
            ) : isSolved === false ? (
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
