import ContestsView from "../../views/Contests";
import React, { useState, useEffect, Suspense } from "react";
import { useNavigate } from "react-router-dom";
import { setLoading } from "../../App";
import { contestApi} from "../../api"; // Assuming you have an authApi to get user information
import { jwtDecode } from 'jwt-decode';

const Contests = () => {
  const navigate = useNavigate();
  const [contestList, setContestList] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [userId, setUserId] = useState(null);

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

  const fetchUser = async () => {
    const decoded = jwtDecode(localStorage.getItem("token"));
    if (decoded) {
      setUserId(decoded);
    }
  };

  useEffect(() => {
    getContestList();
    fetchUser();
  }, []);

  return (
    <ContestsView
      openModal={openModal}
      closeModal={closeModal}
      deleteContest={deleteContest}
      createContest={createContest}
      contestList={contestList}
      modalIsOpen={modalIsOpen}
      userId={userId} 
    />
  );
};

export default Contests;
