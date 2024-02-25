import { setLoading } from "App";
import React, { useState, useEffect } from "react";
import { problemApi } from "api";
import TableContainer from "containers/TableContainer";
import Title from "components/Title";
import RecentUpdateCard from "components/Cards/RecentUpdateCard";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheckDouble,
  faCheckToSlot,
  faFire,
  faHeartPulse,
  faXmark,
  faClock,
} from "@fortawesome/free-solid-svg-icons";
export default function SetterHome() {
  const [problems, setProblems] = useState([]);

  const getRecentyUpdatedProblems = async () => {
    const result = await problemApi.getRecentyUpdatedProblems();
    if (result.success) {
      setProblems(result.data);
    }
  };

  useEffect(() => {
    getRecentyUpdatedProblems();
    setLoading(false);
  }, []);
  return (
    problems.length > 0 && (
      <>
        <Title title={"You updated these problems recently"} />
        <div className="flex flex-col gap-5 w-full">
          <div className="w-full p-5 rounded-lg shadow-md flex flex-row bu-text-primary bg-[#AADFCF] dark:bg-pink-600">
            <div className="text-xl w-[35%] font-medium">Problem name</div>

            <div className="text-xl w-40% font-medium flex gap-2 items-center justify-center">
              <FontAwesomeIcon icon={faClock} />
              last updated
            </div>
          </div>
          {problems.length && (
            <>
              <TableContainer>
                {problems.map((problem, index) => (
                  <RecentUpdateCard
                    idx={index + 1}
                    id={`Problem ${index + 1}`}
                    name={problem.title}
                    path={`/problems/${problem.id}/preview`}
                    action="Get Started"
                    last_updated={problem.updatedAt}
                  />
                ))}
              </TableContainer>
            </>
          )}
        </div>
      </>
    )
  );
}
// Path: frontend/src/pages/setter/SetterHome.jsx
