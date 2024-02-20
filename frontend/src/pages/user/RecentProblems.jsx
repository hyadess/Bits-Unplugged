import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { setLoading } from "../../App";
import { userActivityApi } from "../../api";
import ProblemCard from "../../components/Cards/ProblemCard";
import Title from "../../components/Title";
import TableContainer from "../../containers/TableContainer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheckDouble,
  faCheckToSlot,
  faFire,
  faHeartPulse,
} from "@fortawesome/free-solid-svg-icons";
import HowToRegIcon from "@mui/icons-material/HowToReg";
export default function RecentProblems() {
  const [problems, setProblems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const getRecentProblems = async () => {
    const res = await userActivityApi.recentlyViewedProblems();
    if (res.success) {
      setProblems(res.data);
      console.log("recent problems", res.data);
      setLoading(false);
    } else {
      setError(true);
    }
  };

  useEffect(() => {
    getRecentProblems();
  }, []);

  return (
    problems.length > 0 && (
      <div className="flex flex-col w-full">
        <Title
          title={"Recently Viewed Problems"}
          sub_title={"problems you have recently viewed"}
        />
        <div className="flex flex-col gap-5 w-full">
          <div className="w-full p-5 rounded-lg shadow-md flex flex-row bu-text-primary bg-[#AADFCF] dark:bg-pink-600">
            <div className="text-xl w-[45%] font-medium">Name</div>
            <div className="text-xl w-[20%] font-medium flex gap-2 items-center justify-center">
              {/* <FontAwesomeIcon icon={faCheckDouble} /> */}
              <HowToRegIcon />
              Acceptance
            </div>
            <div className="text-xl w-20% font-medium flex gap-2 items-center justify-center">
              <FontAwesomeIcon icon={faFire} />
              Difficulty
            </div>
            <div className="text-xl w-15% font-medium flex gap-2 items-center justify-center">
              <FontAwesomeIcon icon={faHeartPulse} />
              Status
            </div>
          </div>
          <TableContainer>
            {problems.map((problem, index) => (
              <div className="flex w-full">
                <ProblemCard
                  idx={index + 1}
                  id={problem.problemId}
                  name={problem.title}
                  path={`/problems/${problem.problemId}`}
                  rating={problem.rating}
                  isSolved={
                    problem.isSolved === null ? -1 : problem.isSolved ? 1 : 0
                  }
                />
              </div>
            ))}
          </TableContainer>
        </div>
      </div>
    )
  );
}
