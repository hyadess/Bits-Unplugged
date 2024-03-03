import React, { useEffect, useState } from "react";
import { contestApi } from "../api";
import { useNavigate, useParams } from "react-router-dom";
import ContestSettersList from "./ContestSetterList";
import Leaderboard from "./LeaderBoard";

const UserContestDetails = () => {
  const { id } = useParams();
  const [endTime, setEndTime] = useState();
  const [contest, setContest] = useState(null);
  const [leaderboard, setLeaderboard] = useState(null);
  const [timeline, setTimeline] = useState(null);
  const [contestCollaborators, setContestCollaborators] = useState([]);
  const navigate = useNavigate();

  const getContest = async () => {
    const res2 = await contestApi.showAllCollaborators(id);
    if (res2.success) {
      console.log("collaborators: ", res2.data);
      setContestCollaborators(res2.data);
    }

    const res = await contestApi.getContestById(id);
    console.log("Owner", res.data);
    if (res.success) {
      setContest(res.data[0]);
      console.log("Owner", res.data[0].owner);
    }
    return res;
  };

  const fetchContestDetails = async () => {
    if (contest) {
      const contestDuration = contest?.duration * 60 * 60 * 1000;
      const startDateTime = new Date(contest?.startDateTime);
      setEndTime(new Date(startDateTime.getTime() + contestDuration));
    }
  };

  const fetchLeaderboard = async () => {
    const leaderboardRes = await contestApi.getLeaderboard(id,0);
    if (leaderboardRes.success) setLeaderboard(leaderboardRes.data);
    return leaderboardRes;
  };
  const fetchTimeline = async () => {
    const timelineRes = await contestApi.getTimeline(id);
    console.log("Timeline =>", timelineRes);
    if (timelineRes.success) setTimeline(timelineRes.data);
    return timelineRes;
  };

  useEffect(() => {
    const fetchData = async () => {
      await getContest();
      await fetchContestDetails();
      await fetchLeaderboard();
      await fetchTimeline();
    };

    fetchData();
  }, [id]);

  useEffect(() => {
    const fetchData = async () => {
      await fetchContestDetails();
    };
    fetchData();
  }, [contest]);

  return (
    contest && (
      <>
        {/* {leaderboard && <Leaderboard leaderboard={leaderboard} contest_id={id} timeline={timeline}/>} */}
        <ContestSettersList
          owner={contest?.owner}
          collaborators={contestCollaborators}
        />
      </>
    )
  );
};

export default UserContestDetails;
