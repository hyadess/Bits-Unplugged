import SetterContestsView from "../../views/SetterContests";
import React, { useState, useEffect, Suspense } from "react";
import { useNavigate } from "react-router-dom";
import { setLoading } from "../../App";
import { contestApi } from "../../api";
const SetterContests = () => {
  const navigate = useNavigate();
  const [contestList, setContestList] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const deleteContest = async (contestID) => {
    const res = await contestApi.deleteContest(contestID);
    if (res.success) {
      setContestList(contestList.filter((contest) => contest.id !== contestID));
    }
  };
  const getContestList = async () => {
    const res = await contestApi.getAllContests();
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
      
      console.log(res.data[0].id);
      return res.data[0].id;
    }
  };

  const createContest = async (title) => {
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
      deleteContest={deleteContest}
      createContest={createContest}
      contestList={contestList}
      modalIsOpen={modalIsOpen}
    />
  );
};

export default SetterContests;
