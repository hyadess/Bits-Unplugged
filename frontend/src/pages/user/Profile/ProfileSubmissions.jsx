import React, { useState, useEffect, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Title from "../../../components/Title";
import { setLoading } from "../../../App";
import { submissionApi } from "../../../api";
import { Tooltip } from "react-tooltip";
import CalendarHeatmap from "react-calendar-heatmap";
import TableContainer from "../../../containers/TableContainer";
import SubmissionCard from "../../../components/Cards/SubmissionCard";
import "react-calendar-heatmap/dist/styles.css";
import "./heatmap.scss";
import CardContainer from "containers/CardContainer2";

export default function ProfileSubmissions() {
  const navigate = useNavigate();
  const [submissions, setSubmissions] = useState([]);
  const { username } = useParams();

  const getSubmissions = async () => {
    const res = await submissionApi.getAllSubmissionsByUser(username);
    if (res.success) {
      setSubmissions(res.data);
      //console.log(submissions);

      setLoading(false);
    }
  };

  useEffect(() => {
    getSubmissions();
    //setLoading(false);
  }, []);

  return (
    <div className="flex flex-col w-full pt-20">
      <CardContainer>
        {submissions.map((submission, index) => (
          <div className="flex w-full">
            <SubmissionCard
              idx={index + 1}
              submissionId={submission.id}
              verdict={submission.verdict}
              problem_name={submission.name}
              timestamp={submission.createdAt}
              image={submission.image}
            />
          </div>
        ))}
      </CardContainer>
    </div>
  );
}
