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
  faQuestion,
  faCheck,
  faXmark,
  // far,
} from "@fortawesome/free-solid-svg-icons";
import {
  faCircleCheck,
  faCircleXmark,
} from "@fortawesome/free-regular-svg-icons";
import { fab } from "@fortawesome/free-brands-svg-icons";

export default function ContestProblemListCard({
  index,
  contestId,
  problem,
  path,
  isSolved,
  count,
}) {
  const [acceptance, setAcceptance] = useState(0);

  useEffect(() => {
    setLoading(false);
  }, []);
  const navigate = useNavigate();
  return (
    <div className="w-full h-full" key={index}>
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

        <div className="flex flex-row ">
          <h2 className="text-left text-2xl font-extrabold tracking-tight w-[5%]">
            <span className="bu-text-title">
              {String.fromCharCode(65 + index)}
            </span>
          </h2>
          <h5 className="text-xl md:text-2xl tracking-tight bu-text-primary w-[47%] cursor-pointer h-full whitespace-nowrap overflow-hidden overflow-ellipsis max-w-full">
            {problem.title}
          </h5>
          <h3
            className={`justify-center flex flex-row gap-1 items-center text-center w-[20%] text-lg font-medium bu-text-primary`}
          >
            <div className="text-sm">
              <FontAwesomeIcon icon={faXmark} />
            </div>

            {count}
          </h3>

          <h3 className={`text-center w-[15%] text-lg bu-text-primary`}>
            {problem.rating}
          </h3>
          <div
            className={`w-[13%] text-center text-${
              isSolved === null ? "" : "2"
            }xl w-1/6`}
          >
            {isSolved !== null &&
              (isSolved ? (
                <FontAwesomeIcon icon={faCircleCheck} color="green" />
              ) : (
                <FontAwesomeIcon icon={faCircleXmark} color="red" />
              ))}
            {/* <FontAwesomeIcon
              icon={
                isSolved === null ? faQuestion : isSolved ? faCheck : faXmark
              }
              color={isSolved === null ? "black" : isSolved ? "green" : "red"}
            /> */}
          </div>
        </div>
      </div>
    </div>
  );
}
