import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import TableContainer from "../components/Containers/TableContainer";
import SubmissionController from "../controller/submissionController";
import ProblemController from "../controller/problemController";
import SubmissionCard from "../components/Cards/SubmissionCard";
import { Button } from "@mui/material";
import RotateLeftIcon from "@mui/icons-material/RotateLeft";
import SaveIcon from "@mui/icons-material/Save";
import SendIcon from "@mui/icons-material/Send";

import Cookies from "universal-cookie";
import Latex from "react-latex";
import EditIcon from "@mui/icons-material/Edit";
import Title from "../components/Title";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { setLoading } from "../App";

const submissionController = new SubmissionController();
const problemController = new ProblemController();

export default function ProblemsSubmissions() {
  const navigator = useNavigate();
  const { id } = useParams();
  const [problem, setProblem] = useState(null);
  const [submissionList, setSubmissionList] = useState([]);
  const [type, setType] = useState(-1);

  useEffect(() => {
    if (id !== undefined) {
      renderProblem();
      getSubmissions();
      setLoading(false);
    }
    const cookies = new Cookies();
    const isLoggedIn = !!cookies.get("token");
    if (isLoggedIn) {
      setType(cookies.get("type"));
    }
  }, []);

  const renderProblem = async () => {
    const result = await problemController.getProblemById(id);
    if (result.success) {
      setProblem(result.data[0]);
    }
  };

  const getSubmissions = async () => {
    const res = await submissionController.getAllSubmissionsByUserAndProblem(id);
    if (res.success) {
      // Filter out objects with serial_no equal to 0
      const filteredArray = res.data.filter((item) => item.serial_no !== 0);
      console.log(filteredArray);
      // Sort the remaining objects based on serial_no in ascending order
      const sortedArray = filteredArray.sort(
        (a, b) => a.serial_no - b.serial_no
      );
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
          {problem ? problem.topic_name + " > " + problem.series_name : ""}
        </span>
      </div>
      <TableContainer>
        {submissionList.map((submission, index) => (
          <SubmissionCard
            idx={index + 1}
            submission_id={submission.submission_id}
            verdict={submission.verdict}
            problem_name={problem.title}
            path={`/problem/${problem.problem_id}`}
            
          />
        ))}
      </TableContainer>
    </>

  ) : (
    <></>
  );
}
