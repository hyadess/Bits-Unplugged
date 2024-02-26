import React, { useState, useEffect, useRef, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { setLoading } from "../App";

import SubmissionCard from "components/Cards/ContestProblemSubmissionCard";

import CardContainer from "containers/CardContainer2";

import { contestApi } from "../api";
import Title from "components/Title";

export default function ContestParticipant() {
  const { id, username } = useParams();
  const [submissions, setSubmissions] = useState([]);
  const [graphData, setGraphData] = useState([{}]);

  const getUserSubmissions = async () => {
    const result = await contestApi.getAllSubmissionsByUserAndContest(
      id,
      username
    );
    if (result.success) {
      setSubmissions(result.data);
    }
  };

  const calculateGraphData = () => {
    let sortedSubmissions = [...submissions];

    // Sort the copied submissions array based on createdAt in ascending order
    sortedSubmissions.sort((a, b) => a.createdAt - b.createdAt);

    // Initialize a variable to keep track of cumulative points
    let cumulativePoints = 0;

    // Iterate over the sorted submissions array to update point to cumulative sum till now
    sortedSubmissions.forEach((submission) => {
      cumulativePoints += submission.points;
      submission.points = cumulativePoints;
    });

    // const data = submissions.map((submission) => {
    //   return {
    //     x: submission.createdAt,
    //     y: submission.points,
    //   };
    // });
    setGraphData(sortedSubmissions);
  };

  useEffect(() => {
    getUserSubmissions();
    setLoading(false);
  }, []);

  useEffect(() => {
    calculateGraphData();
  }, [submissions]);

  return (
    submissions && (
      <>
        <Title title={`submissions for ${username}`}>{username}</Title>
        <CardContainer>
          {submissions.map((submission, index) => (
            <SubmissionCard
              idx={index + 1}
              submissionId={submission.id}
              verdict={submission.verdict}
              user_name={submission.title}
              // path={`/problems/${problem.id}`}
              timestamp={submission.createdAt}
              image={submission.image}
              activity={submission.userActivity}
            />
          ))}
        </CardContainer>
      </>
    )
  );
}
