import React, { useState, useEffect, Suspense } from "react";
import Title from "components/Title";
import ContestCard from "components/Cards/ContestCard";
import { useNavigate } from "react-router-dom";
import { setLoading } from "App";
import { contestApi } from "api"; // Assuming you have an authApi to get user information
import { jwtDecode } from "jwt-decode";

const ProfileContestsView = ({
  contestList,
  deleteContest,
  openModal,
  closeModal,
  createContest,
  modalIsOpen,
  userID,
}) => {
  useEffect(() => {
    console.log("Contest List:", contestList);
  });
  return (
    <div>
      <Title
        title={`Contests`}
        sub_title={`Participate in contests with various problems right on our site`}
      />

      <div
        className={`grid grid-cols-1 justify-center items-center mx-auto max-w-screen-2xl gap-8 h-full w-full mb-3 md:grid-cols-2`}
      >
        {contestList.map((contest, index) => (
          <ContestCard
            key={index}
            idx={index + 1}
            id={contest.id}
            name={contest.title}
            deleteAction={deleteContest}
            isLive={contest.isLive}
            timestamp={contest.updatedAt}
            owner={contest.owner}
            startDate={contest.startDateTime}
            endDate={
              new Date(contest.startDateTime).getTime() +
              contest.duration * 3600 * 1000
            }
            duration={contest.duration}
            status={contest.status}
            updatedAt={contest.updatedAt}
            userID={userID}
            difficulty={contest.difficulty}
          />
        ))}
      </div>
    </div>
  );
};

const ProfileContests = () => {
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
    const res = await contestApi.getAllParticipatedContests();

    if (res.success) {
      console.log("Profile Contests:", res.data);
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
    <ProfileContestsView
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

export default ProfileContests;
