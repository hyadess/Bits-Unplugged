import React, { useEffect, useState } from "react";
import CancelIcon from "@mui/icons-material/Cancel";
import Checkbox from "@mui/material/Checkbox";
import { showSuccess } from "../App";
import { contestApi } from "../api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFire, faPlus, faTag } from "@fortawesome/free-solid-svg-icons";
import { useNavigate, useParams } from "react-router-dom";
import ProblemCard from "components/Cards/UserContestProblemCard";
// ... other imports

const ContestProblemList = () => {
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
    console.log("contest problems ===>", problems);
    return res;
  };

  const getContest = async () => {
    const res = await contestApi.getContestById(id);
    if (res.success) setContest(res.data[0]);
    return res;
  };

  const handleProblemClick = (problemId) => {
    problemId == "details"
      ? navigate(`/contests/${id}`)
      : navigate(`/contests/${id}/problems/${problemId}`);
    setSelectedProblemId(problemId);
  };

  return (
    <div className="flex flex-col gap-5 w-full">
      <div className="flex flex-col gap-3 overflow-y-auto w-full px-3">
        <div className="w-full p-5 py-4 rounded-lg shadow-md flex flex-row bu-text-primary bg-[#AADFCF] dark:bg-pink-600">
          <h2 className="text-3xl font-extrabold">Problems</h2>
        </div>
        {problems?.map((problem, index) => (
          <ProblemCard
            index={index}
            contestId={id}
            problem={problem}
            onClick={handleProblemClick}
            selectedId={selectedProblemId}
            isSolved={problem.isSolved}
          ></ProblemCard>
        ))}
      </div>
    </div>
  );
};

export default ContestProblemList;
