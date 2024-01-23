import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import TableContainer from "../containers/TableContainer";
import SubmissionCard from "../components/Cards/SubmissionCard";
import { setLoading } from "../App";
import { problemApi, submissionApi } from "../api";
export default function ProblemsSubmissions() {
  const { id } = useParams();
  const [problem, setProblem] = useState(null);
  // const [submissionList, setSubmissionList] = useState([]);

  useEffect(() => {
    if (id !== undefined) {
      renderProblem();
      // getSubmissions();
      setLoading(false);
    }
  }, []);

  const renderProblem = async () => {
    const res = await submissionApi.getAllSubmissionsByUserAndProblem(id);
    if (res.success) {
      setProblem(res.data);
    }
  };

  // const getSubmissions = async () => {
  //   const res = await submissionApi.getAllSubmissionsByUserAndProblem(id);
  //   if (res.success) {
  //     setProblem(res.data);
  //   }
  // };

  return (
    problem && (
      <>
        <div className="flex flex-col py-4 max-w-screen-xl sm:pt-12 gap-3">
          <div className="mt-4 md:mt-0">
            <h2 className="text-left text-5xl tracking-tight font-extrabold ">
              <span className="bu-text-title">{problem.title}</span>
            </h2>
          </div>
          <span className="bu-text-subtitle text-xl">
            {problem && problem.series.topic.name + " > " + problem.series.name}
          </span>
        </div>
        <TableContainer>
          {problem.submissions.map((submission, index) => (
            <SubmissionCard
              idx={index + 1}
              submissionId={submission.id}
              verdict={submission.verdict}
              problem_name={problem.title}
              path={`/problems/${problem.id}`}
            />
          ))}
        </TableContainer>
      </>
    )
  );
}
