import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ProblemSetCard from "../Components/Cards/ProblemSetCard";
import ProblemController from "../controller/problemController";
import TopicController from "../controller/topicController";
import CustomCard from "../Components/Cards/CustomCard";
import { Label } from "react-konva";
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
  // const getCanvasList = async () => {
  //   const res = await canvasController.getAllCanvas();
  //   if (res.success) {
  //     setCanvasList(res.data);
  //     setLoading(false);
  //     console.log(res);
  //   }
  // };
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
      <div class="bg-white  dark:bg-gray-900">
        <div class="gap-8 items-center py-4 mx-auto max-w-screen-xl xl:gap-16 sm:pt-16">
          <div class="mt-4 md:mt-0">
            <h2 class="mb-4 text-center md:text-left text-5xl tracking-tight font-extrabold text-gray-900 dark:text-white">
              <span class="text-pink-600 dark:text-pink-500">
                Problem Setting Interface
              </span>
            </h2>

            <p class="mb-6 text-center md:text-left  font-light text-gray-500 md:text-lg dark:text-gray-400">
              Set problems for particular series right on our site
            </p>
          </div>
        </div>
      </div>

      <div class="bg-white mt-5 dark:bg-gray-800">
        <div class="gap-8 items-center py-4 px-4 mx-auto max-w-screen-2xl xl:gap-10 md:grid md:grid-cols-2 sm:py-16 sm:pb-0 lg:px-10">
          <div class="mt-4 md:mt-0">
            <h2 class="mb-4 text-center md:text-left text-3xl tracking-tight font-extrabold text-gray-900 dark:text-white">
              <span class="text-pink-600 dark:text-pink-500">Topics</span>
            </h2>

            <p class="mb-6 text-center md:text-left  font-light text-gray-500 md:text-lg dark:text-gray-400">
              select topic on which you want to set a problem
            </p>
          </div>
        </div>
      </div>

      {!loading && (
        <div className="flex flex-row flex-wrap items-center justify-between items-center pb-8 mx-auto max-w-screen-2xl xl:gap-20 x:gap:16 gap-10 md:grid md:grid-cols-2">
          {topicList.map((topic, index) => (
            <CustomCard
              id={`Topic ${index + 1}`}
              name={topic.name}
              image={topic.logo}
              path={`/problemSet/topics/${topic.topic_id}`}
              action="View Series"
            />
          ))}
        </div>
      )}

      <div class="bg-white mt-5 dark:bg-gray-800">
        <div class="gap-8 items-center py-4 px-4 mx-auto max-w-screen-2xl xl:gap-10 md:grid md:grid-cols-2 sm:py-16 sm:pb-0 lg:px-10">
          <div class="mt-4 md:mt-0">
            <h2 class="mb-4 text-center md:text-left text-3xl tracking-tight font-extrabold text-gray-900 dark:text-white">
              <span class="text-pink-600 dark:text-pink-500">
                Previous Problems
              </span>
            </h2>

            <p class="mb-6 text-center md:text-left  font-light text-gray-500 md:text-lg dark:text-gray-400">
              see problems set by you
            </p>
          </div>
        </div>
      </div>

      {!loading && (
        <div className="flex flex-row flex-wrap items-center justify-between items-center pb-8 mx-auto max-w-screen-2xl xl:gap-20 x:gap:16 gap-10 md:grid md:grid-cols-2">
          {problemList
            .sort((a, b) => a.problem_id - b.problem_id)
            .map((prob, index) => (
              <ProblemSetCard
                id={prob.problem_id}
                name={prob.title}
                deleteAction={deleteAProblem}
                is_live={prob.is_live}
              />
            ))}
        </div>
      )}
    </div>
  );
};

export default ProblemSet;
