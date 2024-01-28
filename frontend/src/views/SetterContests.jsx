import CustomModal from "../components/Modal/CustomModal";
import Title from "../components/Title";
import ContestSetCard from "../components/Cards/ContestSetCard";
import CardContainer from "../containers/CardContainer";
import ProblemAddButton from "../components/Buttons/ProblemAddButton";
import { useEffect } from "react";

const SetterContestsView = ({
  contestList,
  deleteProblem,
  openModal,
  closeModal,
  createProblem,
  modalIsOpen,
}) => {
  useEffect(() => {
    console.log(contestList);
  });
  return (
    <div>
      <Title
        title={`Previous Contests`}
        sub_title={`Set contests with particular problems right on our site`}
      />

      <ProblemAddButton onClick={openModal} />

      <CardContainer col={1}>
        {contestList.map((contest, index) => (
          <ContestSetCard
            key={index}
            idx={index + 1}
            id={contest.id}
            name={contest.title}
            deleteAction={deleteProblem}
            isLive={contest.isLive}
            timestamp={contest.updatedAt}
            owner={contest.canvas?.name}
          />
        ))}
      </CardContainer>

      {modalIsOpen && (
        <CustomModal
          label={"Enter Problem Title"}
          placeholder={"Problem Title"}
          onClose={closeModal}
          onSubmit={createProblem}
        />
      )}
    </div>
  );
};

export default SetterContestsView;
