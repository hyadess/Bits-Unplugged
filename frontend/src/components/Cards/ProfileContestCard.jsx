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

export default function ProfileContestCard({
  id,
  name,
  path,
  rating,
  isSolved,
  rank,
  solved,
  ratingChange,
  newRating,
}) {
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
  const [difficulty, setDifficulty] = useState(rating);
  useEffect(() => {
    getAcceptance(id);
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
          <h5 className="text-xl md:text-2xl tracking-tight bu-text-primary w-[31%] cursor-pointer h-full whitespace-nowrap overflow-hidden overflow-ellipsis max-w-full">
            {name}
          </h5>
          <h3 className={`text-center w-[14%] text-lg bu-text-primary`}>
            {rank}
          </h3>
          <h3 className={`text-center w-[13%] text-lg  bu-text-primary`}>
            {solved}
          </h3>
          <h3
            className={`text-center w-[22%] text-xl font-medium ${
              ratingChange >= 0 ? "text-green-500" : "text-red-500"
            }`}
          >
            {`${ratingChange >= 0 ? "+" : ""}${ratingChange}`}
          </h3>
          <div className="text-center w-[20%] text-lg  bu-text-primary">
            {newRating}
          </div>
        </div>
      </div>
    </div>
  );
}
