import CustomModal from "../components/Modal/CustomModal";
import Title from "../components/Title";
import ContestSetCard from "../components/Cards/ContestSetCard";
import CardContainer from "../containers/CardContainer";
import ProblemAddButton from "../components/Buttons/ProblemAddButton";
import { useEffect } from "react";

const SetterContestsView = ({
  contestList,
  deleteContest,
  openModal,
  closeModal,
  createContest,
  modalIsOpen,
}) => {
  useEffect(() => {});
  return (
    <div>
      <Title
        title={`Previous Contests`}
        sub_title={`Set contests with particular problems right on our site`}
      />

      <ProblemAddButton onClick={openModal} />

      <div
        className={`grid grid-cols-1 justify-center items-center mx-auto max-w-screen-2xl gap-8 h-full w-full mb-3 md:grid-cols-1`}
      >
        {contestList.map((contest, index) => (
          <ContestSetCard
            key={index}
            idx={index + 1}
            id={contest?.id}
            name={contest?.title}
            deleteAction={deleteContest}
            isLive={contest?.isLive}
            timestamp={contest?.updatedAt}
            owner={contest?.owner}
            startDate={contest?.startDateTime}
            duration={contest?.duration}
            status={contest?.status}
            updatedAt={contest?.updatedAt}
          />
        ))}
      </div>

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

export default SetterContestsView;
