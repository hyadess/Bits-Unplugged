import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ProblemCard from "../../components/Cards/ProblemCard";
import TableContainer from "../../containers/TableContainer";
import Title from "../../components/Title";
import { setLoading } from "../../App";
// import { Switch } from "@mui/material";
// import { useState } from 'react'
import { Switch } from "@headlessui/react";
import { problemApi } from "../../api";

export default function Problems() {
  const { id } = useParams();
  const [listType, setListType] = useState("all");
  const [problemList, setProblemList] = useState([]);
  const allProblemList = useRef([]);
  const unsolvedProblemList = useRef([]);
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
  }, []);

  return (
    <>
      <div>
        <Title
          title={"Problem Solving"}
          sub_title={
            "Solve problems for particular series right on our site now"
          }
        />
        <div className="mb-5 flex flex-row items-center gap-2">
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
        </div>
      </div>

      {problemList.length && (
        <>
          <TableContainer>
            {problemList.map((problem, index) => (
              <ProblemCard
                idx={index + 1}
                id={`Problem ${index + 1}`}
                name={problem.title}
                image={problem.logo}
                path={`/problem/${problem.id}`}
                action="Get Started"
              />
            ))}
          </TableContainer>
        </>
      )}
    </>
  );
}
