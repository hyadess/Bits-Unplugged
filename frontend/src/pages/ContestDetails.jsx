import React, { useEffect, useState } from "react";
import { contestApi } from "../api";
import { useNavigate, useParams } from "react-router-dom";
import ContestSettersList from "./ContestSetterList";
import Leaderboard from "./LeaderBoard";
import ProblemCard from "components/Cards/UserContestProblemCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheckDouble,
  faCheckToSlot,
  faFire,
  faHeartPulse,
} from "@fortawesome/free-solid-svg-icons";
import HowToRegIcon from "@mui/icons-material/HowToReg";
import ContestProblemListCard from "components/Cards/ContestProblemListCard";

const UserContestDetails = () => {
  const { id } = useParams();
  const [endTime, setEndTime] = useState();
  const [contest, setContest] = useState(null);
  const [leaderboard, setLeaderboard] = useState(null);
  const [timeline, setTimeline] = useState(null);
  const [contestCollaborators, setContestCollaborators] = useState([]);
  const navigate = useNavigate();
  const [problems, setProblems] = useState([]);

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
    const leaderboardRes = await contestApi.getLeaderboard(id);
    if (leaderboardRes.success) setLeaderboard(leaderboardRes.data);
    return leaderboardRes;
  };
  const fetchTimeline = async () => {
    const timelineRes = await contestApi.getTimeline(id);
    console.log("Timeline =>", timelineRes);
    if (timelineRes.success) setTimeline(timelineRes.data);
    return timelineRes;
  };

  const handleProblemClick = (problemId) => {
    problemId == "details"
      ? navigate(`/contests/${id}`)
      : navigate(`/contests/${id}/problems/${problemId}`);
  };

  const getProblems = async () => {
    const res = await contestApi.getAllProblemsByContest(id);
    if (res.success) {
      const sortedProblems = res.data.sort((a, b) => a.rating - b.rating);
      setProblems(sortedProblems);
    }
    // console.log("contest problems ===>", problems);
    return res;
  };

  useEffect(() => {
    const fetchData = async () => {
      await getContest();
      await getProblems();
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
      <div className="mt-10">
        <div className="flex flex-col gap-3 overflow-y-auto w-full px-3">
          <div className="w-full p-5 rounded-lg shadow-md flex flex-row bu-text-primary bg-[#AADFCF] dark:bg-pink-600">
            <div className="text-xl w-[5%] font-medium">#</div>
            <div className="text-xl w-[40%] font-medium">Problem</div>
            <div className="text-xl w-[20%] font-medium flex gap-2 items-center justify-center">
              {/* <FontAwesomeIcon icon={faCheckDouble} /> */}
              <HowToRegIcon />
              Solve Count
            </div>
            <div className="text-xl w-20% font-medium flex gap-2 items-center justify-center">
              <FontAwesomeIcon icon={faFire} />
              Points
            </div>
            <div className="text-xl w-15% font-medium flex gap-2 items-center justify-center">
              <FontAwesomeIcon icon={faHeartPulse} />
              Status
            </div>
          </div>
          {problems?.map((problem, index) => (
            <ContestProblemListCard
              index={index}
              contestId={id}
              problem={problem}
              onClick={handleProblemClick}
              isSolved={problem.isSolved}
              path={`/contests/${id}/problems/${problem.id}`}
              count={problem.solveCount ?? 39}
            ></ContestProblemListCard>
          ))}
        </div>
        <ContestSettersList
          owner={contest?.owner}
          collaborators={contestCollaborators}
        />
      </div>
    )
  );
};

export default UserContestDetails;
