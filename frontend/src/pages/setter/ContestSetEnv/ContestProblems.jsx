import React, { useEffect, useState } from "react";
import { useContestContext } from "../../../store/ContestContextProvider";
import ProblemSetCard from "../../../components/Cards/ProblemSetCard";
import CardContainer from "../../../containers/CardContainer2";
import { problemApi } from "../../../api";
import { contestApi } from "../../../api";
import ProblemListModal from "../../../components/Modal/ProblemSelectModal";
import ProblemAddButton from "../../../components/Buttons/ProblemAddButton";


const ProblemsTab = () => {
  const { state: contest, dispatch } = useContestContext();

  const [problemList, setProblemList] = useState([]);
  const [problems, setProblems] = useState([]);
  const [isAddModalOpen, setAddModalOpen] = useState(false);

  const deleteProblem = async (problemId) => {
    const res = await contestApi.deleteProblem(problemId);
    if (res.success) {
      setProblems(problems.filter((problem) => problem.id !== problemId));
    }
  };

  const handleAddModalOpen = () => {
    setAddModalOpen(true);
  };

  const handleAddModalClose = () => {
    setAddModalOpen(false);
  };

  const handleAddProblems = (selectedProblems) => {
    console.log("Selected Problems:", selectedProblems);
  
    // Assuming you have the contest object available
    const contestId = contest.id;
  
    // Loop through selected problems and add each to the contest
    selectedProblems.forEach((selectedProblemId) => {
      contestApi.addProblemToContest(contestId, selectedProblemId);
      setProblemList(problemList.filter((problem) => problem.id !== selectedProblemId));
    });
    getProblems();  
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

  const getProblems = async () => {
    const res = await contestApi.getAllProblemsByContest(contest.id);
    console.log(res.data);
    if (res.success) {
      // console.log(res.data);
      if (res.data.length > 0)
        setProblems(res.data.sort((a, b) => a.id - b.id));
    }
  };

  useEffect(() => {
    getProblemList();
    getProblems();
  }, []);


  return (
    <div>
      <h1>Problem Page</h1>
      <ProblemAddButton onClick={handleAddModalOpen} />

      <CardContainer col={2}>
        {problems.map((prob, index) => (
          <ProblemSetCard
            key={index}
            idx={index + 1}
            id={prob.id}
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
          problems={problemList}
          onClose={handleAddModalClose}
          onAdd={handleAddProblems}
        />
      )}

      {/* Your other page content goes here */}
    </div>
  );
};

export default ProblemsTab;
