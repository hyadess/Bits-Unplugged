import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../ProbSetTab";
import { setLoading } from "../../App";
import { problemApi, userActivityApi } from "../../api";
import Confirmation from "../Confirmation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import DonutLargeIcon from "@mui/icons-material/DonutLarge";
import InsertChartIcon from "@mui/icons-material/InsertChart";
import {
  // faCircleCheck,
  // faCircleXmark,
  faR,
  faTag,
  fas,
  fa,
  faS,
  faFire,
  // far,
} from "@fortawesome/free-solid-svg-icons";
import {
  faCircleCheck,
  faCircleXmark,
} from "@fortawesome/free-regular-svg-icons";
import { fab } from "@fortawesome/free-brands-svg-icons";
import PersonIcon from "@mui/icons-material/Person";
import { Zoom } from "@mui/material";

export default function RecommendationCard({
  id,
  name,
  path,
  rating,
  deleteAction,
  isLive,
  setProblem,
  userCount,
  series,
  topic,
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
    <Zoom in={true}>
      <div className="w-full h-full" key={id}>
        <div
          className={
            "border rounded-lg shadow-md bg-gray-700 bu-card-primary flex flex-col p-5 pl-4 h-full cursor-pointer"
          }
          onClick={() => {
            setLoading(true);
            navigate(path);
          }}
        >
          <div className="flex flex-col gap-3">
            <div className="flex flex-col">
              <div className="flex flex-row justify-between pl-1">
                <h5 className="text-xl md:text-xl font-semibold tracking-tight bu-text-primary w-4/5 cursor-pointer h-full whitespace-nowrap overflow-hidden overflow-ellipsis max-w-full">
                  {name}
                </h5>

                <div
                  className={`flex flex-row items-center gap-2 ${
                    difficulty < 1100
                      ? "text-green-500 font-sm"
                      : difficulty < 1800
                        ? "text-[#FF981E] font-medium"
                        : "text-red-500 font-extrabold"
                  }`}
                >
                  <FontAwesomeIcon icon={faFire} />
                  <h3 className={`font-semibold text-sm`}>{difficulty}</h3>
                </div>
              </div>
              {/* <div className="pl-1 flex flex-row items-center gap-1 text-[#ba3030] dark:text-blue-400 text-xs">
              <FontAwesomeIcon icon={faTag} />
              <div className="bu-text-subtitle ">{`${topic} > ${series}`}</div>
            </div> */}
              <div className="bu-text-subtitle text-xs pl-1">{`${topic} > ${series}`}</div>
            </div>

            <div className="flex flex-row justify-between">
              <div className="flex flex-row gap-1 items-center">
                <div className="text-black text-xs">
                  <PersonIcon sx={{ fontSize: "1.3rem" }} />
                </div>
                <div class="w-41 font-poppins font-medium text-sm text-black">
                  {userCount}
                </div>
              </div>
              <div className="flex flex-row gap-1 items-center">
                <div className="text-black text-lg font-bold">
                  <InsertChartIcon sx={{ fontSize: "1.1rem" }} />
                </div>
                <div class="w-41 font-poppins font-medium text-sm text-black pt-[0.1rem]">
                  {acceptance}%
                </div>
              </div>
            </div>

            {/* <div className="text-center w-[15%] text-2xl font-bold">
            {isSolved === true ? (
              <FontAwesomeIcon icon={faCircleCheck} color="green" />
            ) : isSolved === false ? (
              <FontAwesomeIcon icon={faCircleXmark} color="red" />
            ) : (
              <></>
            )}
          </div> */}
          </div>
        </div>
      </div>
    </Zoom>
  );
}
