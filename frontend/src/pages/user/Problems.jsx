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
export default function Problems() {
  const { id } = useParams();
  const [listType, setListType] = useState("all");
  const [problemList, setProblemList] = useState([]);
  const allProblemList = useRef([]);
  const unsolvedProblemList = useRef([]);
  const [series, setSeries] = useState(null);
  const [articleList, setArticleList] = useState([]);

  const getArticles = async () => {
    const res = await articleApi.getArticlesBySeries(id);

    if (res.success) {
      setArticleList(res.data);
      console.log(res.data);
      // setLoading(false);
    }
  };
  const getSeries = async () => {
    const res = await seriesApi.getSeriesById(id);
    if (res.success) {
      setSeries(res.data);
      setLoading(false);
    }
  };

  const getProblemList = async () => {
    const res = await problemApi.getProblemsBySeries(id);
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
    }
  };

  useEffect(() => {
    getProblemList();
    getArticles();
    getSeries();
  }, []);

  return (
    <>
      <div>
        <Title title={series?.name} sub_title={series?.description} />
        {/* <div className="mb-5 flex flex-row items-center gap-2">
          <Switch
            checked={listType !== "all"}
            onChange={() => {
              if (listType === "all") {
                setListType("unsolved");
                setProblemList(unsolvedProblemList.current);
              } else {
                setListType("all");
                setProblemList(allProblemList.current);
              }
            }}
            className={`${
              listType !== "all"
                ? "bg-teal-800 dark:bg-pink-500"
                : "bg-gray-400 dark:bg-gray-600"
            }
          relative inline-flex h-[25px] w-[64px] shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none  focus-visible:ring-2 focus-visible:ring-white/75`}
          >
            <span className="sr-only">User setting</span>
            <span
              aria-hidden="true"
              className={`${
                listType !== "all" ? "translate-x-7" : "translate-x-[-2px]"
              }
            pointer-events-none inline-block h-[34px] w-[34px] transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out`}
            />
          </Switch>
          <p className="bu-text-subtitle text-center  font-bold  md:text-left md:text-lg">
            {listType}
          </p>
        </div> */}
      </div>

      {articleList.length > 0 && (
        <div className="flex flex-col gap-5 w-full mb-5">
          {/* <div className="w-full p-5 rounded-lg shadow-md flex flex-row bu-text-primary bg-[#AADFCF] dark:bg-pink-600 ">
            <div className="text-xl w-[45%] font-medium">Articles</div>
            <div className="text-xl w-[20%] font-medium flex gap-2 items-center justify-center">
              <HowToRegIcon />
              Readers
            </div>
            <div className="text-xl w-20% font-medium flex gap-2 items-center justify-center">
              <FontAwesomeIcon icon={faFire} />
              Time
            </div>
            <div className="text-xl w-15% font-medium flex gap-2 items-center justify-center">
              <FontAwesomeIcon icon={faHeartPulse} />
              Seen
            </div>
          </div> */}

          <TableContainer>
            {articleList.map((article, index) => (
              <ArticleCard
                idx={index + 1}
                id={article.id}
                title={article.title}
                subtitle={article.subtitle}
                path={`/articles/${article.id}`}
                // isSolved={
                //   article.activities.length > 0
                //     ? article.activities[0].isSolved === null
                //       ? -1
                //       : article.activities[0].isSolved
                //         ? 1
                //         : 0
                //     : -1
                // }
              />
            ))}
          </TableContainer>
        </div>
      )}

      {problemList.length > 0 && (
        <div className="flex flex-col gap-5 w-full">
          <div className="w-full p-5 rounded-lg shadow-md flex flex-row bu-text-primary bg-[#AADFCF] dark:bg-pink-600">
            <div className="text-xl w-[45%] font-medium">Practice Problems</div>
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
