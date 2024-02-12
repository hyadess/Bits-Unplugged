import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import RecentFailCard from "../../components/Cards/RecentFailCard";
import TableContainer from "../../containers/TableContainer";
import Title from "../../components/Title";
import { setLoading } from "../../App";
// import { Switch } from "@mui/material";
// import { useState } from 'react'
import { Switch } from "@headlessui/react";
import { userActivityApi } from "../../api";
import CardContainer from "../../containers/CardContainer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheckDouble,
  faCheckToSlot,
  faFire,
  faHeartPulse,
  faXmark,
  faClock,
} from "@fortawesome/free-solid-svg-icons";
import HowToRegIcon from "@mui/icons-material/HowToReg";
export default function ProfileRecentFails() {
  const [recentFailList, setRecentFailList] = useState([]);
  const getRecentFailList = async () => {
    const res = await userActivityApi.mostRecentFailsByUser();
    console.log(res);
    if (res.success) {
      setRecentFailList(res.data);
    }
  };

  useEffect(() => {
    getRecentFailList();
  }, []);

  return (
    <>
      <div className="flex flex-col gap-5 w-full">
        <div className="w-full p-5 rounded-lg shadow-md flex flex-row bu-text-primary bg-[#AADFCF] dark:bg-pink-600">
          <div className="text-xl w-[27%] font-medium">Problem name</div>
          <div className="text-xl w-[18%] font-medium flex gap-2 items-center justify-center">
            {/* <FontAwesomeIcon icon={faCheckDouble} /> */}
            <FontAwesomeIcon icon={faXmark} />
            attempts
          </div>
          <div className="text-xl w-15% font-medium flex gap-2 items-center justify-center">
            <FontAwesomeIcon icon={faFire} />
            Difficulty
          </div>
          <div className="text-xl w-40% font-medium flex gap-2 items-center justify-center">
            <FontAwesomeIcon icon={faClock} />
            last tried
          </div>
        </div>
        {recentFailList.length && (
          <>
            <TableContainer>
              {recentFailList.map((problem, index) => (
                <RecentFailCard
                  idx={index + 1}
                  id={`Problem ${index + 1}`}
                  name={problem.title}
                  path={`/problems/${problem.problemId}`}
                  action="Get Started"
                  attempts={problem.totalFailedAttempt}
                  difficulty={problem.rating}
                  last_tried={problem.lastSolveTimestamp}
                />
              ))}
            </TableContainer>
          </>
        )}
      </div>
    </>
  );
}
