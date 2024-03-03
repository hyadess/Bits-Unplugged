import React, { useState, useEffect, Suspense } from "react";
import Title from "components/Title";
import ContestCard from "components/Cards/ContestCard";
import { useNavigate } from "react-router-dom";
import { setLoading } from "App";
import { contestApi } from "api"; // Assuming you have an authApi to get user information
import TableContainer from "containers/TableContainer";
import { jwtDecode } from "jwt-decode";
import ProfileContestCard from "components/Cards/ProfileContestCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowTrendUp,
  faCheckDouble,
  faCheckToSlot,
  faFire,
  faHeartPulse,
  faPercent,
} from "@fortawesome/free-solid-svg-icons";
import HowToRegIcon from "@mui/icons-material/HowToReg";
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

      {contestList.length > 0 && (
        <div className="flex flex-col gap-5 w-full">
          <div className="w-full p-5 rounded-lg shadow-md flex flex-row bu-text-primary bg-[#AADFCF] dark:bg-pink-600">
            <div className="text-xl w-[31%] font-medium">Name</div>
            <div className="text-xl w-[14%] font-medium flex gap-2 items-center justify-center">
              {/* <FontAwesomeIcon icon={faCheckDouble} /> */}
              <HowToRegIcon />
              Rank
            </div>
            <div className="text-xl w-[13%] font-medium flex gap-2 items-center justify-center">
              <FontAwesomeIcon icon={faPercent} />
              Solved
            </div>
            <div className="text-xl w-[22%] font-medium flex gap-2 items-center justify-center">
              <FontAwesomeIcon icon={faArrowTrendUp} />
              Rating Change
            </div>
            <div className="text-xl w-[20%] font-medium flex gap-2 items-center justify-center">
              <FontAwesomeIcon icon={faFire} />
              New Rating
            </div>
          </div>
          <TableContainer>
            {contestList.map((contest, index) => (
              <ProfileContestCard
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
                // change here
                rank={contest.rank ?? 49}
                solved={contest.solved ?? 3}
                ratingChange={contest.ratingChange ?? 19}
                newRating={contest.newRating ?? 819}
              />
            ))}
          </TableContainer>
        </div>
      )}
      {/* <div
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
      </div> */}
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
