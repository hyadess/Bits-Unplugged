import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ProblemController from "../../controller/problemController";

import ProblemCard from "../../components/Cards/ProblemCard";
import TableContainer from "../../components/Containers/TableContainer";
import Title from "../../components/Title";
import { setLoading } from "../../App";
// import { Switch } from "@mui/material";
// import { useState } from 'react'
import { Switch } from "@headlessui/react";

const problemController = new ProblemController();

export default function Problems() {
  const { id } = useParams();
  const [listType, setListType] = useState("all");
  const [problemList, setProblemList] = useState([]);
  const [allProblemList, setAllProblemList] = useState([]);
  const [unsolvedProblemList, setUnsolvedProblemList] = useState([]);

  const getProblemList = async () => {
    // if (listType === "all")
    {
      const res = await problemController.getProblemsBySeries(id);
      if (res.success) {
        // Filter out objects with serialNo equal to 0
        const filteredArray = res.data.filter(
          (item) => item.serialNo !== 0 && item.serialNo !== null
        );

        // Sort the remaining objects based on serialNo in ascending order
        const sortedArray = filteredArray.sort(
          (a, b) => a.serialNo - b.serialNo
        );
        setAllProblemList(sortedArray);
        setProblemList(sortedArray);
      }
    }
    {
      const res = await problemController.getUnsolvedProblemsBySeries(id);
      if (res.success) {
        // Filter out objects with serialNo equal to 0
        const filteredArray = res.data.filter((item) => item.serialNo !== 0);

        // Sort the remaining objects based on serialNo in ascending order
        const sortedArray = filteredArray.sort(
          (a, b) => a.serialNo - b.serialNo
        );
        setUnsolvedProblemList(sortedArray);
      }
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
                setProblemList(unsolvedProblemList);
              } else {
                setListType("all");
                setProblemList(allProblemList);
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
                path={`/problem/${problem.problemId}`}
                action="Get Started"
              />
            ))}
          </TableContainer>
        </>
      )}
    </>
  );
}
