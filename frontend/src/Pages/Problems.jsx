import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import ProblemController from "../controller/problemController";
import CustomCard from "../Components/Cards/CustomCard";

const problemController = new ProblemController();

export default function Problems() {
  const navigator = useNavigate();
  const switchPath = (pathname) => {
    navigator(pathname);
  };

  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [problemList, setProblemList] = useState([]);
  const [data, setData] = useState();
  const baseURL = "https";
  const getData = async () => {
    try {
      const res = await axios.get(`${baseURL}/courses`);
      setData(res.data);
      setLoading(false);
    } catch (e) {
      console.log(e);
    }
  };

  const getProblemList = async () => {
    const res = await problemController.getProblemsByAlgo(id);
    if (res.success) {
      setProblemList(res.data);
      setLoading(false);
      console.log(res);
    }
  };

  useEffect(() => {
    getProblemList();
  }, []);
  return (
    <div className="flex flex-col min-h-screen dark:bg-gray-900">
      {/* <Navbar /> */}
      <div class="bg-white mt-20 dark:bg-gray-900">
        <div class="gap-8 items-center py-4 px-4 mx-auto max-w-screen-2xl xl:gap-16 md:grid md:grid-cols-2 sm:py-16 sm:pb-0 lg:px-10">
          <div class="mt-4 md:mt-0">
            <h2 class="mb-4 text-center md:text-left text-5xl tracking-tight font-extrabold text-gray-900 dark:text-white">
              <span class="text-pink-600 dark:text-pink-500">
                Problem Solving
              </span>
            </h2>

            <p class="mb-6 text-center md:text-left  font-light text-gray-500 md:text-lg dark:text-gray-400">
              Solve problems for particular series right on our site now
            </p>
          </div>
        </div>
      </div>

      {!loading && (
        <div className="flex flex-row flex-wrap items-center justify-between items-center pb-8 px-4 mx-auto max-w-screen-2xl xl:gap-16 md:grid md:grid-cols-4 sm:py-6 lg:px-6">
          {problemList.map((problem, index) => (
            <CustomCard
              id={`Problem ${index + 1}`}
              name={problem.title}
              image={problem.logo}
              path={`/problem/${problem.problem_id}`}
              action="Get Started"
            />
          ))}
        </div>
      )}
    </div>
  );
}
