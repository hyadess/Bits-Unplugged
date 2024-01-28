import SetterContestsView from "../../views/SetterContests";
import React, { useState, useEffect, Suspense } from "react";
import { useNavigate } from "react-router-dom";
import { setLoading } from "../../App";
import { contestApi } from "../../api";
const SetterContests = () => {
  const navigate = useNavigate();
  const [contestList, setContestList] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const deleteProblem = async (problemId) => {
    const res = await contestApi.deleteProblem(problemId);
    if (res.success) {
      setContestList(contestList.filter((problem) => problem.id !== problemId));
    }
  };
  const getContestList = async () => {
    const res = await contestApi.getAllPublishedContests();
    console.log(res.data);
    if (res.success) {
      // console.log(res.data);
      if (res.data.length > 0)
        setContestList(res.data.sort((a, b) => a.id - b.id));
      else setLoading(false);
    }
  };

  const getProblemId = async (title) => {
    const res = await contestApi.createProblem(title);
    if (res.success) {
      return res.data.id;
    }
  };

  const createProblem = async (title) => {
    setLoading(true);
    closeModal();
    const problemId = await getProblemId(title);
    navigate(`/problems/${problemId}/edit`);
  };

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  useEffect(() => {
    getContestList();
  }, []);

  return (
    <SetterContestsView
      openModal={openModal}
      closeModal={closeModal}
      deleteProblem={deleteProblem}
      createProblem={createProblem}
      contestList={contestList}
      modalIsOpen={modalIsOpen}
    />
  );
};

export default SetterContests;
