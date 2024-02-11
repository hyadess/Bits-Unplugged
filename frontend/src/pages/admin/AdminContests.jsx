import ContestsView from "../../views/Contest";
import React, { useState, useEffect, Suspense } from "react";
import { useNavigate } from "react-router-dom";
import { setLoading } from "../../App";
import { contestApi } from "../../api"; // Assuming you have an authApi to get user information
import { jwtDecode } from "jwt-decode";
import Title from "components/Title";
import ProblemAddButton from "components/Buttons/ProblemAddButton";
import CardContainer from "containers/CardContainer2";
import ContestCard from "components/Cards/AdminContestCard";
import CustomModal from "components/Modal/CustomModal";
import PendingContestCard from "components/Cards/PendingContestCard";

const AdminContests = () => {
  const navigate = useNavigate();
  const [contestList, setContestList] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  // const [userId, setUserId] = useState(null); // New state to store user_id

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
    navigate(`/AdminContests/${contestID}/edit`);
  };

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  // const fetchUser = async () => {
  //   const decoded = jwtDecode(localStorage.getItem("token"));
  //   if (decoded) {
  //     setUserId(decoded);
  //   }
  // };

  useEffect(() => {
    getContestList();
    // fetchUser();
  }, []);

  return (
    <div>
      <Title title={`Pending Contests`} sub_title={`Accept/Reject Contests`} />

      {/* <ProblemAddButton onClick={openModal} /> */}

      <CardContainer col={2}>
        {contestList.map(
          (contest, index) =>
            contest.status == "requested" && (
              <PendingContestCard
                key={index}
                idx={index + 1}
                id={contest.id}
                name={contest.title}
                deleteAction={deleteContest}
                isLive={contest.isLive}
                timestamp={contest.updatedAt}
                owner={contest.ContestSetters[0]}
                startDate={contest.startDate}
                endDate={contest.endDate}
                status={contest.status}
                updatedAt={contest.updatedAt}
                // userID={userID}
              />
            )
        )}
      </CardContainer>

      <Title title={`Approved Contests`} sub_title={`Schedule Contests`} />
      <CardContainer col={2}>
        {contestList.map(
          (contest, index) =>
            contest.status == "upcoming" && (
              <ContestCard
                key={index}
                idx={index + 1}
                id={contest.id}
                name={contest.title}
                deleteAction={deleteContest}
                isLive={contest.isLive}
                timestamp={contest.updatedAt}
                owner={contest.ContestSetters[0]}
                startDate={contest.startDate}
                startDateTime={contest.startDateTime}
                duration={contest.duration}
                endDate={contest.endDate}
                status={contest.status}
                updatedAt={contest.updatedAt}
                // userID={userID}
              />
            )
        )}
      </CardContainer>

      {modalIsOpen && (
        <CustomModal
          label={"Enter Contest Title"}
          placeholder={"Contest Title"}
          onClose={closeModal}
          onSubmit={createContest}
        />
      )}
    </div>
  );
};

export default AdminContests;
