import SetterContestsView from "../../views/SetterContests";
import React, { useState, useEffect, Suspense } from "react";
import { useNavigate } from "react-router-dom";
import { setLoading } from "../../App";
import { contestApi } from "../../api"; // Assuming you have an authApi to get user information

const SetterContests = () => {
  const navigate = useNavigate();
  const [contestList, setContestList] = useState([]);
  const [collabContestList, setCollabContestList] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const deleteContest = async (contestID) => {
    const res = await contestApi.deleteContest(contestID);
    if (res.success) {
      setContestList(contestList.filter((contest) => contest.id !== contestID));
    }
  };

  const getContestList = async () => {
    const res = await contestApi.getMyOwnContests(); // owner contests
    // write a api to get collab contests
    const res2 = await contestApi.getMyContests();
    console.log(res.data);
    if (res.success && res2.success) {
      setContestList(res.data);
      setCollabContestList(res2.data);
      if (res.data.length == 0 && res2.data.length == 0) setLoading(false);
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
      collabContestList={collabContestList}
      modalIsOpen={modalIsOpen}
    />
  );
};

export default SetterContests;
