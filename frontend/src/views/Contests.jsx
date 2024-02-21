import CustomModal from "../components/Modal/CustomModal";
import Title from "../components/Title";
import ContestCard from "../components/Cards/ContestCard";
import CardContainer from "../containers/CardContainer";
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


      <CardContainer col={1}>
        {contestList.map((contest, index) => (
          <ContestCard
            key={index}
            idx={index + 1}
            id={contest.id}
            name={contest.title}
            deleteAction={deleteContest}
            isLive={contest.isLive}
            timestamp={contest.updatedAt}
            owner={contest.ContestSetters[0]}
            startDate={contest.startDateTime}
            endDate={new Date(contest.startDateTime).getTime() + contest.duration*3600*1000}
            status={contest.status}
            updatedAt={contest.updatedAt}
            userID={userID}
          />
        ))}
      </CardContainer>
    </div>
  );
};

export default ContestsView;
