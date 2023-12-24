import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import ProblemController from "../controller/problemController";

import ProblemCard from "../Components/Cards/ProblemCard";
import TableContainer from "../Components/Containers/TableContainer";
import Title from "../Components/Title";
import { setLoading } from "../App";

const problemController = new ProblemController();

export default function Problems() {
  const navigator = useNavigate();
  const switchPath = (pathname) => {
    navigator(pathname);
  };

  const { id } = useParams();

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
      // setLoading(false);
    }
  };

  useEffect(() => {
    getProblemList();
  }, []);
  return (
    <>
      {problemList.length && (
        <>
          <Title
            title={"Problem Solving"}
            sub_title={
              "Solve problems for particular series right on our site now"
            }
          />

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
        </>
      )}
    </>
  );
}
