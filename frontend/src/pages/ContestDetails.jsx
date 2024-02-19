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
import ContestSettersList from "./ContestSetterList";
import ProblemList from "./ContestProblemList";
import ContestContextProvider from "store/ContestContextProvider";

const UserContestDetails = () => {
    const { id } = useParams();
    const [endTime, setEndTime] = useState();
    const [contest, setContest] = useState(null);

    const EndAction = async () => {
        try {
          // Call contestApi.updateStatus with the contest ID and the new status
          await contestApi.endContest(id);
          console.log("Contest status updated to 'ended'");
        } catch (error) {
          console.error("Error updating contest status", error);
        }
    };
  
    const getContest = async () => {
      const res = await contestApi.getContestById(id);
      if (res.success) setContest(res.data[0]);
      return res;
    };
  
    const fetchContestDetails = async () => {
      if (contest) {
        const contestDuration = contest?.duration * 60 * 60 * 1000;
        const startDateTime = new Date(contest?.startDateTime);
        setEndTime(new Date(startDateTime.getTime() + contestDuration));
      }
    };
  
    useEffect(() => {
      const fetchData = async () => {
        await getContest();
        await fetchContestDetails();
      };
  
      fetchData();
    }, [id]);
  
  
  
    return (
      <LayoutMain
        left={
          <>
            <ProblemList /> 
          </>
        }
        right={
          endTime && (
            <CountdownTimer
              targetDate={endTime}
              flag={"end"}
              EndAction={EndAction}
            />
          )
        }
      >
        {<ContestSettersList
            setterList={contest?.ContestSetters} />}
      </LayoutMain>
    );
  };

  export default UserContestDetails;