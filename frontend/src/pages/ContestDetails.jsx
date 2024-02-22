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
  const navigate = useNavigate();

  const getContest = async () => {
    const res = await contestApi.getContestById(id);
    console.log("contest in details =>", res);
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

  const fetchLeaderboard = async () => {
    const leaderboardRes = await contestApi.getLeaderboard(id);
    console.log("leaderboard =>", leaderboardRes);
    if (leaderboardRes.success) setLeaderboard(leaderboardRes.data);
    return leaderboardRes;
  };

  useEffect(() => {
    const fetchData = async () => {
      await getContest();
      await fetchContestDetails();
      await fetchLeaderboard();
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
    <>
      {leaderboard && <Leaderboard leaderboard={leaderboard} contest_id={id} />}
      <ContestSettersList setterList={contest?.ContestSetters} />
      
    </>
  );
};

export default UserContestDetails;
