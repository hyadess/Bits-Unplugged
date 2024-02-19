import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFire } from "@fortawesome/free-solid-svg-icons";
import { contestApi } from "api";

const ProblemCard = ({ contestId, problem, selectedId ,onClick }) => {
    const [isSolved, setIsSolved]= useState();

    useEffect(() => {
        getIsSolved();
    }, []);
    
      const getIsSolved = async () => {
        const res = await contestApi.isContestProblemSolved(contestId,problem.id);
        if (res.data.length>0) {
          setIsSolved(true);
        }else{
            setIsSolved(false);
        }
        return res;
      };
      
      
      return (
    <div
      key={problem.id}
      className={`flex flex-col items-left mb-4 hover:bg-gray-100 p-4 rounded-md cursor-pointer relative w-[15vw] h-[10vh] ${
        selectedId==problem.id ? "bg-gray-100" : ""} ${isSolved ? "bg-green-100" : ""}`}
      onClick={() => onClick(problem.id)}
    >
      <h2 className="text-left text-2xl font-extrabold tracking-tight">
        <span className="bu-text-title">{problem.title}</span>
      </h2>
      <div className="absolute bottom-2 right-2 flex flex-row items-center gap-2 text-[#ba3030] dark:text-blue-400">
        <h3 className="bu-text-subtitle font-semibold text-sm">
          {problem.rating}
        </h3>
        <FontAwesomeIcon icon={faFire} />
      </div>
    </div>
  );
};

export default ProblemCard;
