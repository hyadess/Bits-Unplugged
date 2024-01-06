import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ProblemSetCard from "../../components/Cards/ProblemSetCard";
import ProblemController from "../../controller/problemController";
import TopicController from "../../controller/topicController";
import TableContainer from "../../components/Containers/TableContainer";
import CancelIcon from "@mui/icons-material/Cancel";

import Title from "../../components/Title";
import AddIcon from "@mui/icons-material/Add";
import { setLoading } from "../../App";
import CardContainer from "../../components/Containers/CardContainer";

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
      if (res.data.length == 0) setLoading(false);
    }
  };
  useEffect(() => {
    getProblemList();
  }, []);

  return (
    <CardContainer col={2}>
      {problemList
        .sort((a, b) => a.problem_id - b.problem_id)
        .map((prob, index) => (
          <ProblemSetCard
            key={index}
            idx={index + 1}
            id={prob.problem_id}
            name={prob.title}
            deleteAction={deleteAProblem}
            is_live={prob.is_live}
            timestamp={prob.last_updated}
            canvas={prob.canvas_name}
          />
        ))}
    </CardContainer>
  );
};

export default SetterProblems;
