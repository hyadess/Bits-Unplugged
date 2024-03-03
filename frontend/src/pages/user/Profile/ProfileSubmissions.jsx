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
import ProfileSubmissionCard from "components/Cards/ProfileSubmissionCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheckDouble,
  faCheckToSlot,
  faFire,
  faHeartPulse,
  faXmark,
  faClock,
  faStopwatch,
  faGavel,
} from "@fortawesome/free-solid-svg-icons";
import HowToRegIcon from "@mui/icons-material/HowToReg";

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
    <>
      <Title title={"My Submissions"} />
      <div className="flex flex-col w-full gap-5">
        <div className="w-full p-5 rounded-lg shadow-md flex flex-row bu-text-primary bg-[#AADFCF] dark:bg-pink-600">
          <div className="text-xl w-[50%] font-medium">Problem name</div>
          <div className="text-xl w-30% font-medium flex gap-2 items-center justify-center">
            <FontAwesomeIcon icon={faClock} />
            When
          </div>
          <div className="text-xl w-20% font-medium flex gap-2 items-center justify-center">
            <FontAwesomeIcon icon={faGavel} />
            Verdict
          </div>
        </div>
        <TableContainer>
          {submissions?.map((submission, index) => (
            <ProfileSubmissionCard
              idx={index + 1}
              submissionId={submission.id}
              verdict={submission.verdict}
              name={submission.name}
              timestamp={submission.createdAt}
              image={submission.image}
              duration={submission.duration ?? 30}
            />
          ))}
        </TableContainer>
      </div>
    </>
  );
}
