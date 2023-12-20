import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ProblemSetCard from "../Components/Cards/ProblemSetCard";
import ProblemController from "../controller/problemController";
import TopicController from "../controller/topicController";
import TableContainer from "../Components/Containers/TableContainer";

import Title from "../Components/Title";
import AddIcon from "@mui/icons-material/Add";

const problemController = new ProblemController();
const topicController = new TopicController();

const ProblemSet = () => {
  const navigator = useNavigate();
  const switchPath = (pathname) => {
    navigator(pathname);
  };
  const [problemList, setProblemList] = useState([]);
  const [topicList, setTopicList] = useState([]);

  const [loading, setLoading] = useState(false);
  const [data, setData] = useState();
  const baseURL = "https";

  const getProblemList = async () => {
    const res = await problemController.getMyProblems();
    if (res.success) {
      setProblemList(res.data);
      setLoading(false);
      console.log(res);
    }
  };

  const deleteAProblem = async (problem_id) => {
    const res = await problemController.deleteProblem(problem_id);
    if (res.success) {
      setProblemList(
        problemList.filter(
          (problemList) => problemList.problem_id !== problem_id
        )
      );
      setLoading(false);
    }
  };

  const getTopicList = async () => {
    const res = await topicController.getAllTopics();
    if (res.success) {
      setTopicList(res.data);
      setLoading(false);
      console.log(res);
    }
  };

  useEffect(() => {
    getProblemList();
    getTopicList();
  }, []);

  useEffect(() => {
    // getProblemList();
  }, [problemList]);

  return (
    <div>
      <Title
        title={`Problem Setting Interface`}
        sub_title={`Set problems for particular series right on our site`}
      />

      <div className="fixed bottom-10 right-10 hidden md:flex items-center justify-center ">
        <div
          onClick={() => switchPath("/topics")}
          class="w-16 h-16 rounded-full justify-center inline-flex items-center text-white font-medium text-sm p-4 text-center ursor-pointer shadow-lg cursor-pointer bu-button-secondary "
        >
          <div className="text-primary-900 dark:text-gray-900">
            <AddIcon sx={{ fontSize: "4rem" }} />
          </div>
        </div>
      </div>

      <div className="flex md:hidden items-center justify-center">
        <div
          onClick={() => switchPath("/topics")}
          class="w-full justify-center inline-flex my-8  text-center items-center text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm p-4 text-center focus:ring-primary-900 cursor-pointer gap-3 items-center"
        >
          <AddIcon sx={{ fontSize: "2rem" }} />
          <h5 class="text-2xl md:text-3xl text-center font-bold tracking-tight  text-white">
            New Problem
          </h5>
        </div>
      </div>

      {!loading && (
        <TableContainer>
          {problemList
            .sort((a, b) => a.problem_id - b.problem_id)
            .map((prob, index) => (
              <ProblemSetCard
                idx={index + 1}
                id={prob.problem_id}
                name={prob.title}
                deleteAction={deleteAProblem}
                is_live={prob.is_live}
              />
            ))}
        </TableContainer>
      )}
    </div>
  );
};

export default ProblemSet;
