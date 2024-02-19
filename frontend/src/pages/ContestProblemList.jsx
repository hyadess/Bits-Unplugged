import React, { useEffect, useState } from "react";
import CancelIcon from "@mui/icons-material/Cancel";
import Checkbox from "@mui/material/Checkbox";
import { showSuccess } from "../App";
import { contestApi } from "../api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFire, faPlus, faTag } from "@fortawesome/free-solid-svg-icons";
import { useNavigate, useParams } from "react-router-dom";
import ContestProblem from "./ContestProblem";
import LayoutMain from "../components/Layouts/LayoutMain";
import Leaderboard from "./Timer";
import CountdownTimer from "./Timer";
import ContestSettersList from "./ContestSetterList";

// ... other imports

const ProblemList = () => {
  const [problems, setProblems] = useState([]);
  const { id } = useParams();
  const navigate = useNavigate();
  const { problemid } = useParams();
  const [selectedProblemId, setSelectedProblemId] = useState(null);
  const [contest, setContest] = useState(null);

  useEffect(() => {
    getContest();
    getProblems();
  }, []);

  const getProblems = async () => {
    const res = await contestApi.getAllProblemsByContest(id);
    if (res.success) {
      const sortedProblems = res.data.sort((a, b) => a.rating - b.rating);
      setProblems(sortedProblems);
    }
    return res;
  };

  const getContest = async () =>{
    const res = await contestApi.getContestById(id);
    if(res.success)setContest(res.data[0]);
    return res;
  }

  const handleProblemClick = (problemId) => {
    problemId == "details"
      ? navigate(`/contests/${id}`)
      : navigate(`/contests/${id}/problems/${problemId}`);
    setSelectedProblemId(problemId);
  };

  return (
    <div className="flex flex-col gap-5">
      <div className="max-h-[80vh] overflow-y-auto">
        <div
          className={`flex flex-col items-left mb-4 hover:bg-gray-100 p-4 rounded-md cursor-pointer relative w-[15vw] h-[10vh] ${
            problemid === "details" ? "bg-gray-100" : ""
          } ${selectedProblemId === "details" ? "bg-gray-100" : ""}`}
          onClick={() => handleProblemClick("details")}
        >
          <h2 className="text-left text-3xl font-extrabold tracking-tight ">
          <span className="bu-text-title">{contest?.title}</span>
        </h2>
        </div>
        {problems?.map((problem) => (
          <div
            key={problem.id}
            className={`flex flex-col items-left mb-4 hover:bg-gray-100 p-4 rounded-md cursor-pointer relative w-[15vw] h-[10vh] ${
              selectedProblemId === problem.id ? "bg-gray-100" : ""
            }`}
            onClick={() => handleProblemClick(problem.id)}
          >
            <h2 className="text-left text-2xl font-extrabold tracking-tight ">
          <span className="bu-text-title">{problem.title}</span>
        </h2>
            <div className="absolute bottom-2 right-2 flex flex-row items-center gap-2 text-[#ba3030] dark:text-blue-400">
              <h3 className="bu-text-subtitle font-semibold text-sm">
                {problem.rating}
              </h3>
              <FontAwesomeIcon icon={faFire} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProblemList;