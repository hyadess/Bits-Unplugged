import React from "react";
import { useContestContext } from "../../../store/ContestContextProvider";
import ProblemSetCard from "../../../components/Cards/ProblemSetCard";

const ProblemsTab = () => {
  const { state: contest } = useContestContext();

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">List of Problems</h2>

      {contest.problems && contest.problems.length > 0 ? (
        <div>
          {contest.problems.map((problem) => (
            <ProblemSetCard key={problem.id} problem={problem} />
            // You may replace ProblemCard with your actual component
          ))}
        </div>
      ) : (
        <p>No problems available in the contest.</p>
      )}
    </div>
  );
};

export default ProblemsTab;
