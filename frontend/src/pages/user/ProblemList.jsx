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
  faGear,
  faList,
} from "@fortawesome/free-solid-svg-icons";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import HowToRegIcon from "@mui/icons-material/HowToReg";
import ArticleCard from "../../components/Cards/UserSeriesArticleCard";
import RecentProblems from "./RecentProblems";
import { set } from "date-fns";

export default function ProblemList() {
  const { id } = useParams();
  const [problemList, setProblemList] = useState([]);
  const [curProblemList, setCurProblemList] = useState([]);
  const [seriesNames, setSeriesNames] = useState([]);
  const [curSeries, setCurSeries] = useState("all");
  const [type, setType] = useState("all");

  const [typeProblemList, setTypeProblemList] = useState([]);
  const [seriesProblemList, setSeriesProblemList] = useState([]);

  const getProblemList = async () => {
    const res = await problemApi.getAllProblems();
    console.log(res);
    if (res.success) {
      setProblemList(res.data);
      setCurProblemList(res.data);
      setTypeProblemList(res.data);
      setSeriesProblemList(res.data);
      setSeriesNames(
        Array.from(
          new Set(["all", ...res.data.map((problem) => problem.series.name)])
        )
      );
      // const totSeries = ["all", ...seriesNames];
      // setSeriesNames(totSeries);

      setLoading(false);
    }
  };

  useEffect(() => {
    getProblemList();
  }, []);

  useEffect(() => {
    if (type === "all") {
      setTypeProblemList(problemList);
    } else if (type === "unsolved") {
      setTypeProblemList(
        problemList.filter((problem) => {
          return (
            problem.activities.length === 0 ||
            problem.activities[0].isSolved === false
          );
        })
      );
    } else if (type === "solved") {
      setTypeProblemList(
        problemList.filter((problem) => {
          return (
            problem.activities.length > 0 &&
            problem.activities[0].isSolved === true
          );
        })
      );
    }
  }, [type]);

  useEffect(() => {
    if (curSeries === "all") {
      setSeriesProblemList(problemList);
    } else {
      setSeriesProblemList(
        problemList.filter((problem) => {
          return problem.series.name === curSeries;
        })
      );
    }
  }, [curSeries]);

  useEffect(() => {
    setCurProblemList(
      typeProblemList.filter((problem) => {
        return seriesProblemList.includes(problem);
      })
    );
  }, [typeProblemList, seriesProblemList]);

  return (
    <>
      <RecentProblems />
      <div>
        <Title
          title={"Practice Problems"}
          sub_title={"Practice problems from different categories"}
        />
      </div>
      <div className="flex flex-row mb-4 pr-5 gap-8">
        <div>
          <DropdownMenu>
            <DropdownMenuTrigger>
              <div className="flex flex-row">
                <div className="bu-text-primary text-4xl">
                  <FontAwesomeIcon icon={faGear} />
                </div>
                <div className="mb-5 mt-2 pl-2 text-center md:text-left  md:text-lg bu-text-subtitle">
                  {type === "all"
                    ? "all"
                    : type === "unsolved"
                      ? "unsolved"
                      : type === "solved"
                        ? "solved"
                        : "all"}
                </div>
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>Filter</DropdownMenuLabel>
              <DropdownMenuSeparator />

              <DropdownMenuItem onClick={() => setType("all")}>
                <div>All</div>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setType("unsolved")}>
                <div>unsolved</div>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setType("solved")}>
                <div>solved</div>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div>
          <DropdownMenu>
            <DropdownMenuTrigger>
              <div className="flex flex-row">
                <div className="bu-text-primary text-4xl">
                  <FontAwesomeIcon icon={faList} />
                </div>
                <div className="mb-5 mt-2 pl-2 text-center md:text-left  md:text-lg bu-text-subtitle">
                  {curSeries}
                </div>
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <div className="scrollable-dropdown-menu">
                {seriesNames.map((series, index) => (
                  <DropdownMenuItem onClick={() => setCurSeries(series)}>
                    <div>{series}</div>
                  </DropdownMenuItem>
                ))}
              </div>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {curProblemList.length > 0 && (
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
            {curProblemList.map((problem, index) => (
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
