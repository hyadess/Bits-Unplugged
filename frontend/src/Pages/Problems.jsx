import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import ProblemController from "../controller/problemController";
import CustomCard from "../Components/Cards/CustomCard";
import CardContainer from "../Components/Containers/CardContainer";
import ProblemCard from "../Components/Cards/ProblemCard";
import TableContainer from "../Components/Containers/TableContainer";

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
    const res = await problemController.getProblemsBySeries(id);
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
    <div>
      <div class="  bg-gray-900">
        <div class="gap-8 items-center py-4 mx-auto max-w-screen-xl xl:gap-16 sm:pt-16">
          <div class="mt-4 md:mt-0">
            <h2 class="mb-4 text-center md:text-left text-5xl tracking-tight font-extrabold text-gray-900 text-white">
              <span class=" text-pink-500">Problem Solving</span>
            </h2>

            <p class="mb-6 text-center md:text-left  font-light text-gray-500 md:text-lg text-gray-400">
              Solve problems for particular series right on our site now
            </p>
          </div>
        </div>
      </div>

      {!loading && (
        <TableContainer>
          {problemList.map((problem, index) => (
            <ProblemCard
              idx={index + 1}
              id={`Problem ${index + 1}`}
              name={problem.title}
              image={problem.logo}
              path={`/problem/${problem.problem_id}`}
              action="Get Started"
            />
          ))}
        </TableContainer>
      )}
    </div>
  );
}
