import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ProblemController from "../../controller/problemController";

import ProblemCard from "../../Components/Cards/ProblemCard";
import TableContainer from "../../Components/Containers/TableContainer";
import Title from "../../Components/Title";
import { setLoading } from "../../App";

const problemController = new ProblemController();

export default function Problems() {
  const navigator = useNavigate();
  const switchPath = (pathname) => {
    navigator(pathname);
  };

  const { id } = useParams();
  const [problemList, setProblemList] = useState([]);

  const getProblemList = async () => {
    const res = await problemController.getProblemsBySeries(id);
    if (res.success) {
      // Filter out objects with serial_no equal to 0
      const filteredArray = res.data.filter((item) => item.serial_no !== 0);

      // Sort the remaining objects based on serial_no in ascending order
      const sortedArray = filteredArray.sort(
        (a, b) => a.serial_no - b.serial_no
      );
      setProblemList(sortedArray);
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