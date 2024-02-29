import CustomModal from "../components/Modal/CustomModal";
import Title from "../components/Title";
import ContestCard from "../components/Cards/ContestCard";
import CardContainer from "../containers/CardContainer2";
import ProblemAddButton from "../components/Buttons/ProblemAddButton";
import { useEffect } from "react";

const ContestsView = ({
  contestList,
  deleteContest,
  openModal,
  closeModal,
  createContest,
  modalIsOpen,
  userID,
}) => {
  useEffect(() => {
    console.log(contestList);
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
          />
        ))}
      </div>
    </div>
  );
};

export default ContestsView;
