import SetterContestsView from "../../views/SetterContests";
import React, { useState, useEffect, Suspense } from "react";
import { useNavigate } from "react-router-dom";
import { setLoading } from "../../App";
import { contestApi } from "../../api";
const SetterContests = () => {
  const navigate = useNavigate();
  const [contestList, setContestList] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const deleteProblem = async (contestID) => {
    const res = await contestApi.deleteProblem(contestID);
    if (res.success) {
      setContestList(contestList.filter((problem) => problem.id !== contestID));
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

  const getContestId = async (title) => {
    const res = await contestApi.addContest(title);
    if (res.success) {
      return res.data.id;
    }
  };

  const createContest = async (title) => {
    setLoading(true);
    closeModal();
    const contestID = await getContestId(title);
    navigate(`/contests/${contestID}/edit`);
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
      createContest={createContest}
      contestList={contestList}
      modalIsOpen={modalIsOpen}
    />
  );
};

export default SetterContests;
