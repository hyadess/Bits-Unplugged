import CustomModal from "../components/Modal/CustomModal";
import Title from "../components/Title";
import ProblemSetCard from "../components/Cards/ProblemSetCard";
import CardContainer from "../containers/CardContainer";
import ProblemAddButton from "../components/Buttons/ProblemAddButton";
import { useEffect } from "react";

const SetterProblemsView = ({
  problemList,
  deleteProblem,
  openModal,
  closeModal,
  createProblem,
  modalIsOpen,
}) => {
  useEffect(() => {
    console.log(problemList);
  });
  return (
    <div>
      <Title
        title={`Problem Setting Interface`}
        sub_title={`Set problems for particular series right on our site`}
      />

      <ProblemAddButton onClick={openModal} />

      <CardContainer col={2}>
        {problemList.map((prob, index) => (
          <ProblemSetCard
            key={index}
            idx={index + 1}
            id={prob.id}
            name={prob.title}
            deleteAction={deleteProblem}
            isLive={prob.isLive}
            timestamp={prob.updatedAt}
            canvas={prob.canvas?.name}
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

export default SetterProblemsView;
