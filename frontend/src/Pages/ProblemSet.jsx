import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ProblemSetCard from "../Components/Cards/ProblemSetCard";
import ProblemController from "../controller/problemController";
import TopicController from "../controller/topicController";
import TableContainer from "../Components/Containers/TableContainer";
import CustomCard from "../Components/Cards/CustomCard";
import { Label } from "react-konva";
import CardContainer from "../Components/Containers/CardContainer";
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
    getProblemList();
  }, [problemList]);

  return (
    <div>
      <Title
        title={`Problem Setting Interface`}
        sub_title={`Set problems for particular series right on our site`}
      />
      {/* <div class="  bg-gray-900">
        <div class="gap-8 items-center py-4 mx-auto max-w-screen-xl xl:gap-16 sm:pt-16">
          <div class="mt-4 md:mt-0">
            <h2 class="mb-4 text-center md:text-left text-5xl tracking-tight font-extrabold text-gray-900 text-white">
              <span class=" text-pink-500">Problem Setting Interface</span>
            </h2>

            <p class="mb-6 text-center md:text-left  font-light text-gray-500 md:text-lg text-gray-400">
              Set problems for particular series right on our site
            </p>
          </div>
        </div>
      </div> */}

      {/* <div class=" mt-5 bg-gray-800">
        <div class="gap-8 items-center py-4 px-4 mx-auto max-w-screen-2xl xl:gap-10 md:grid md:grid-cols-2 sm:py-16 sm:pb-0 lg:px-10">
          <div class="mt-4 md:mt-0">
            <h2 class="mb-4 text-center md:text-left text-3xl tracking-tight font-extrabold text-gray-900 text-white">
              <span class=" text-pink-500">Topics</span>
            </h2>

            <p class="mb-6 text-center md:text-left  font-light text-gray-500 md:text-lg text-gray-400">
              select topic on which you want to set a problem
            </p>
          </div>
        </div>
      </div> */}

      {/* {!loading && (
        <CardContainer>
          {topicList.map((topic, index) => (
            <CustomCard
              id={`Topic ${index + 1}`}
              name={topic.name}
              image={topic.logo}
              path={`/problemSet/topics/${topic.topic_id}`}
              action="View Series"
            />
          ))}
        </CardContainer>
      )} */}

      {/* <div class=" mt-5 bg-gray-800">
        <div class="gap-8 items-center py-4 px-4 mx-auto max-w-screen-2xl xl:gap-10 md:grid md:grid-cols-2 sm:py-16 sm:pb-0 lg:px-10">
          <div class="mt-4 md:mt-0">
            <h2 class="mb-4 text-center md:text-left text-3xl tracking-tight font-extrabold text-gray-900 text-white">
              <span class=" text-pink-500">Previous Problems</span>
            </h2>

            <p class="mb-6 text-center md:text-left  font-light text-gray-500 md:text-lg text-gray-400">
              see problems set by you
            </p>
          </div>
        </div>
      </div> */}

      <div className="fixed bottom-10 right-10 hidden md:flex items-center justify-center ">
        <a
          onClick={() => switchPath("/topics")}
          class="w-16 h-16 rounded-full justify-center inline-flex items-center text-white bg-pink-600 hover:bg-pink-700 focus:ring-pink-800 font-medium text-sm p-4 text-center ursor-pointer shadow-lg cursor-pointer"
        >
          <AddIcon sx={{ color: "rgb(17,24,39)", fontSize: "4rem" }} />
        </a>
      </div>

      <div className="flex md:hidden items-center justify-center">
        <a
          onClick={() => switchPath("/topics")}
          class="w-full justify-center inline-flex my-8  text-center items-center text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm p-4 text-center focus:ring-primary-900 cursor-pointer gap-3 items-center"
        >
          <AddIcon sx={{ fontSize: "2rem" }} />
          <h5 class="text-2xl md:text-3xl text-center font-bold tracking-tight text-gray-900 text-white">
            New Problem
          </h5>
        </a>
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
