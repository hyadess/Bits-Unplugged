import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheck,
  faFire,
  faQuestion,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { contestApi } from "api";

const ProblemCard = ({
  index,
  contestId,
  problem,
  selectedId,
  onClick,
  isSolved,
}) => {
  // const [isSolved, setIsSolved] = useState();

  // useEffect(() => {
  //   getIsSolved();
  // }, []);

  // const getIsSolved = async () => {
  //   const res = await contestApi.isContestProblemSolved(contestId, problem.id);
  //   if (res.data && res.data.length > 0) {
  //     setIsSolved(true);
  //   } else {
  //     setIsSolved(false);
  //   }
  //   return res;
  // };

  return (
    <div
      key={problem.id}
      className={`flex flex-row justify-between bg-gray-100 hover:shadow hover:bg-white p-4 rounded-md cursor-pointer w-full ${
        selectedId == problem.id ? "bg-white shadow-md" : "opacity-[80%]"
      }`}
      onClick={() => onClick(problem.id)}
    >
      <div className="flex flex-row gap-3 w-3/4 items-center">
        <div className={`text-${isSolved === null ? "" : "2"}xl w-1/6`}>
          <FontAwesomeIcon
            icon={isSolved === null ? faQuestion : isSolved ? faCheck : faXmark}
            color={isSolved === null ? "black" : isSolved ? "green" : "red"}
          />
        </div>
        <h2 className="text-left text-2xl font-extrabold tracking-tight">
          <span className="bu-text-title">
            {String.fromCharCode(65 + index)}
          </span>
        </h2>
      </div>

      <div className="flex flex-row items-center gap-2 text-[#ba3030] dark:text-blue-400">
        <h3 className="bu-text-subtitle font-semibold text-sm">
          {problem.rating}
        </h3>
        <FontAwesomeIcon icon={faFire} />
      </div>
    </div>
  );
};

export default ProblemCard;
