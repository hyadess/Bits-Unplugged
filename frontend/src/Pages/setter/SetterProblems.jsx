import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ProblemSetCard from "../../Components/Cards/ProblemSetCard";
import ProblemController from "../../controller/problemController";
import TopicController from "../../controller/topicController";
import TableContainer from "../../Components/Containers/TableContainer";
import CancelIcon from "@mui/icons-material/Cancel";

import Title from "../../Components/Title";
import AddIcon from "@mui/icons-material/Add";
import { setLoading } from "../../App";

const problemController = new ProblemController();
const topicController = new TopicController();

const SetterProblems = () => {
  const [problemList, setProblemList] = useState([]);
  const deleteAProblem = async (problem_id) => {
    const res = await problemController.deleteProblem(problem_id);
    if (res.success) {
      setProblemList(
        problemList.filter(
          (problemList) => problemList.problem_id !== problem_id
        )
      );
    }
  };
  const getProblemList = async () => {
    const res = await problemController.getMyProblems();
    if (res.success) {
      setProblemList(res.data);
      //   setLoading(false);
    }
  };
  useEffect(() => {
    getProblemList();
  }, []);

  return (
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
  );
};

export default SetterProblems;
