import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ProblemCard from "../../components/Cards/ProblemCard";
import TableContainer from "../../containers/TableContainer";
import Title from "../../components/Title";
import { setLoading } from "../../App";
// import { Switch } from "@mui/material";
// import { useState } from 'react'
import { Switch } from "@headlessui/react";
import { articleApi, problemApi, seriesApi } from "../../api";
import CardContainer from "../../containers/CardContainer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheckDouble,
  faCheckToSlot,
  faFire,
  faHeartPulse,
} from "@fortawesome/free-solid-svg-icons";
import HowToRegIcon from "@mui/icons-material/HowToReg";
import ArticleCard from "../../components/Cards/UserSeriesArticleCard";
export default function ProblemList() {
  const { id } = useParams();
  const [problemList, setProblemList] = useState([]);
  const allProblemList = useRef([]);
  const unsolvedProblemList = useRef([]);
  const getProblemList = async () => {
    const res = await problemApi.getAllProblems();
    console.log(res);
    if (res.success) {
      allProblemList.current = res.data;
      setProblemList(res.data);

      const unsolvedProblems = res.data.filter((problem) => {
        return (
          problem.activities &&
          problem.activities.length > 0 &&
          problem.activities[0].isSolved === false
        );
      });
      unsolvedProblemList.current = unsolvedProblems;
      setLoading(false);
    }
  };

  useEffect(() => {
    getProblemList();
  }, []);

  return (
    <>
      <div>
        <Title
          title={"Practice Problems"}
          sub_title={"Practice problems from different categories"}
        />
      </div>

      {problemList.length > 0 && (
        <div className="flex flex-col gap-5 w-full">
          <div className="w-full p-5 rounded-lg shadow-md flex flex-row bu-text-primary bg-[#AADFCF] dark:bg-pink-600">
            <div className="text-xl w-[45%] font-medium">Problem Name</div>
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
            {problemList.map((problem, index) => (
              <ProblemCard
                idx={index + 1}
                id={problem.id}
                name={problem.title}
                image={problem.logo}
                rating={problem.rating}
                path={`/problems/${problem.id}`}
                action="Get Started"
                topic={problem.series.topic.name}
                series={problem.series.name}
                acceptance={Math.round(Math.random() * 100)}
                difficulty={
                  ["Easy", "Medium", "Hard"][Math.floor(Math.random() * 3)]
                }
                isSolved={
                  problem.activities.length > 0
                    ? problem.activities[0].isSolved === null
                      ? -1
                      : problem.activities[0].isSolved
                        ? 1
                        : 0
                    : -1
                }
              />
            ))}
          </TableContainer>
        </div>
      )}
    </>
  );
}
