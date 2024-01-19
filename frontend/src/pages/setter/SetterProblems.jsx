import SetterProblemsView from "../../views/SetterProblems";
import React, { useState, useEffect, Suspense } from "react";
import { useNavigate } from "react-router-dom";
import ProblemSetCard from "../../components/Cards/ProblemSetCard";
import ProblemController from "../../controller/problemController";
import TopicController from "../../controller/topicController";
import TableContainer from "../../containers/TableContainer";
import CancelIcon from "@mui/icons-material/Cancel";

import Title from "../../components/Title";
import AddIcon from "@mui/icons-material/Add";
import { setLoading } from "../../App";
import { problemApi } from "../../api";
const problemController = new ProblemController();
const topicController = new TopicController();

const SetterProblems = () => {
  const navigator = useNavigate();
  const switchPath = (pathname) => {
    navigator(pathname);
  };
  const [problemList, setProblemList] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const deleteProblem = async (problemId) => {
    const res = await problemApi.deleteProblem(problemId);
    if (res.success) {
      setProblemList(problemList.filter((problem) => problem.id !== problemId));
    }
  };
  const getProblemList = async () => {
    const res = await problemApi.getAllProblems();
    if (res.success) {
      // console.log(res.data);
      if (res.data.length > 0)
        setProblemList(res.data.sort((a, b) => a.id - b.id));
      else setLoading(false);
    }
  };

  const getProblemId = async (title) => {
    const res = await problemApi.createProblem(title);
    if (res.success) {
      return res.data.id;
    }
  };

  const createProblem = async (title) => {
    setLoading(true);
    closeModal();
    const problemId = await getProblemId(title);
    switchPath(`/problem/${problemId}/edit`);
  };

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  useEffect(() => {
    getProblemList();
  }, []);

  return (
    <SetterProblemsView
      openModal={openModal}
      closeModal={closeModal}
      deleteProblem={deleteProblem}
      createProblem={createProblem}
      problemList={problemList}
      modalIsOpen={modalIsOpen}
    />
  );
};

export default SetterProblems;
