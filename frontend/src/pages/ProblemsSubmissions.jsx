import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import TableContainer from "../containers/TableContainer";
import SubmissionCard from "../components/Cards/SubmissionCard";
import { setLoading } from "../App";
import { problemApi, submissionApi } from "../api";
export default function ProblemsSubmissions() {
  const { id } = useParams();
  const [problem, setProblem] = useState(null);
  const [submissionList, setSubmissionList] = useState([]);

  useEffect(() => {
    if (id !== undefined) {
      renderProblem();
      getSubmissions();
      setLoading(false);
    }
  }, []);

  const renderProblem = async () => {
    const result = await problemApi.getProblemById(id);
    if (result.success) {
      setProblem(result.data);
    }
  };

  const getSubmissions = async () => {
    const res = await submissionApi.getAllSubmissionsByUserAndProblem(id);
    if (res.success) {
      // Filter out objects with serialNo equal to 0
      const filteredArray = res.data.filter((item) => item.serialNo !== 0);
      console.log(filteredArray);
      // Sort the remaining objects based on serialNo in ascending order
      const sortedArray = filteredArray.sort((a, b) => a.serialNo - b.serialNo);
      setSubmissionList(sortedArray);
    }
  };

  return problem ? (
    <>
      <div class="flex flex-col py-4 max-w-screen-xl sm:pt-12 gap-3">
        <div class="mt-4 md:mt-0">
          <h2 class="text-left text-5xl tracking-tight font-extrabold ">
            <span class="bu-text-title">{problem.title}</span>
          </h2>
        </div>
        <span class="bu-text-subtitle text-xl">
          {problem
            ? problem.series.topic.name + " > " + problem.series.name
            : ""}
        </span>
      </div>
      <TableContainer>
        {submissionList.map((submission, index) => (
          <SubmissionCard
            idx={index + 1}
            submissionId={submission.id}
            verdict={submission.verdict}
            problem_name={problem.title}
            path={`/problem/${problem.id}`}
          />
        ))}
      </TableContainer>
    </>
  ) : (
    <></>
  );
}
