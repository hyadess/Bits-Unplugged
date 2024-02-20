import React, { useEffect, useState } from "react";
import CancelIcon from "@mui/icons-material/Cancel";
import Checkbox from "@mui/material/Checkbox";
import { showSuccess } from "../App";
import { contestApi } from "../api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFire, faPlus, faTag } from "@fortawesome/free-solid-svg-icons";
import { useNavigate, useParams } from "react-router-dom";
import ContestProblem from "./ContestProblem";
import LayoutMain from "../components/Layouts/LayoutMain";
import Leaderboard from "./Timer";
import CountdownTimer from "./Timer";
import ContestProblemList from "./ContestProblemList";

// Inside the UserContest component
const UserContest = () => {
  const { id } = useParams();
  const { problemid } = useParams();
  const [endTime, setendTime] = useState();
  const navigate = useNavigate();
  const EndAction = async () => {
    navigate("/contests/" + id);
    // try {
    //   // Call contestApi.updateStatus with the contest ID and the new status
    //   await contestApi.endContest(id);
    //   console.log("Contest status updated to 'ended'");
    // } catch (error) {
    //   console.error("Error updating contest status", error);
    // }
  };
  useEffect(() => {
    // Call a function to fetch contest details and get the contest duration
    const fetchContestDetails = async () => {
      try {
        const contest = await contestApi.getContestById(id);
        if (contest.success) {
          const contestDuration = contest.data[0].duration * 60 * 60 * 1000;
          const startDateTime = new Date(contest.data[0].startDateTime);
          setendTime(new Date(startDateTime.getTime() + contestDuration));
          console.log("Contest end time : ", startDateTime, endTime);
        }
      } catch (error) {
        console.error("Error fetching contest details", error);
      }
    };

    fetchContestDetails();

    // Cleanup function
    return () => {
      // Add any cleanup logic if needed
    };
  }, []); // Removed 'id' from the dependency array

  return <>{problemid && <ContestProblem />}</>;
};

export default UserContest;
