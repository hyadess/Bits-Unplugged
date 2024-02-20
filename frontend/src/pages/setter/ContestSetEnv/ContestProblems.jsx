import React, { useEffect, useState } from "react";
import { useContestContext } from "../../../store/ContestContextProvider";
import ProblemSetCard from "../../../components/Cards/ContestProblemCard";
import CardContainer from "../../../containers/CardContainer2";
import { problemApi } from "../../../api";
import { contestApi } from "../../../api";
import ProblemListModal from "../../../components/Modal/ProblemSelectModal";
import ProblemAddButton from "../../../components/Buttons/ProblemAddButton";

const ProblemsTab = () => {
  const { state: contest, dispatch } = useContestContext();

  const [problemList, setProblemList] = useState([]);
  //const [problems, setProblems] = useState([]);
  const [isAddModalOpen, setAddModalOpen] = useState(false);

  const deleteProblem = async (problemId) => {
    console.log("Deleting problem", contest.id, problemId);
    const res = await contestApi.deleteProblem(contest.id, problemId);
    if (res.success) {
      dispatch({
        type: "DELETE_PROBLEM",
        payload: problemId,
      });
    }
  };

  const handleAddModalOpen = () => {
    setAddModalOpen(true);
  };

  const handleAddModalClose = () => {
    setAddModalOpen(false);
  };

  const handleAddProblems = async (selectedProblems) => {
    console.log("Selected Problems:", selectedProblems);

    // Assuming you have the contest object available
    const contestId = contest.id;

    // Loop through selected problems and add each to the contest
    selectedProblems.forEach(async (selectedProblem) => {
      await contestApi.addProblemToContest(contestId, selectedProblem.id);
    });
    dispatch({
      type: "ADD_PROBLEM",
      payload: selectedProblems,
    });
    // Close the modal
    handleAddModalClose();
  };

  const getProblemList = async () => {
    const res = await problemApi.getAllProblems();
    console.log(res.data);
    if (res.success) {
      // console.log(res.data);
      if (res.data.length > 0)
        setProblemList(res.data.sort((a, b) => a.id - b.id));
    }
  };

  // const getProblems = async () => {
  //   const res = await contestApi.getAllProblemsByContest(contest.id);
  //   console.log(res.data);
  //   if (res.success) {
  //     // console.log(res.data);
  //     if (res.data.length > 0)
  //       setProblems(res.data.sort((a, b) => a.id - b.id));
  //   }
  // };

  useEffect(() => {
    getProblemList();
  }, []);

  return (
    <div>
      <h1>Problem Page</h1>
      <ProblemAddButton onClick={handleAddModalOpen} />

      <CardContainer col={2}>
        {contest?.problems?.map((prob, index) => (
          <ProblemSetCard
            contestId={contest.id}
            key={index}
            idx={index + 1}
            id={prob.id}
            currentPoints={prob.rating}
            name={prob.title}
            isLive={prob.isLive}
            timestamp={prob.updatedAt}
            canvas={prob.canvas?.name}
            deleteAction={deleteProblem}
          />
        ))}
      </CardContainer>

      {isAddModalOpen && (
        <ProblemListModal
          problems={problemList.filter((problem) => contest.problems.every((p) => p.id !== problem.id))}
          onClose={handleAddModalClose}
          onAdd={handleAddProblems}
        />
      )}

      {/* Your other page content goes here */}
    </div>
  );
};

export default ProblemsTab;
