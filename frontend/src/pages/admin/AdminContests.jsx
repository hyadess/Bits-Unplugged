import ContestsView from "../../views/Contests";
import React, { useState, useEffect, Suspense } from "react";
import { useNavigate } from "react-router-dom";
import { setLoading, showSuccess } from "../../App";
import { contestApi } from "../../api"; // Assuming you have an authApi to get user information
import { jwtDecode } from "jwt-decode";
import Title from "components/Title";
import ProblemAddButton from "components/Buttons/ProblemAddButton";
import CardContainer from "containers/CardContainer2";
import ContestCard from "components/Cards/AdminContestCard";
import CustomModal from "components/Modal/CustomModal";
import PendingContestCard from "components/Cards/PendingContestCard";
import ScheduledContestCard from "components/Cards/ScheduledContestCard";

const AdminContests = () => {
  const navigate = useNavigate();
  const [pendingList, setPendingList] = useState([]);
  const [approvedList, setApprovedList] = useState([]);
  const [scheduledList, setScheduledList] = useState([]);

  const [contestList, setContestList] = useState([]);

  const getContestList = async () => {
    const res = await contestApi.getAllContests();
    if (res.success) {
      if (res.data.length > 0) {
        setPendingList(
          res.data.filter((contest) => contest.status === "requested")
        );
        setApprovedList(
          res.data.filter((contest) => contest.status === "approved")
        );
        setScheduledList(
          res.data.filter((contest) => contest.status === "scheduled")
        );
        setContestList(res.data.sort((a, b) => a.id - b.id));
      } else setLoading(false);
    }
  };

  const approve = async (contestId) => {
    const res = await contestApi.updateContest(contestId, {
      status: "approved",
    });
    if (res.success) {
      showSuccess("Contest approved", res);
      setApprovedList((prev) =>
        prev.concat(pendingList.filter((contest) => contest.id === contestId))
      );
      setPendingList((prev) =>
        prev.filter((contest) => contest.id !== contestId)
      );
    }
  };

  const reject = async (contestId) => {
    const res = await contestApi.updateContest(contestId, {
      status: "rejected",
    });
    if (res.success) {
      setPendingList((prev) =>
        prev.filter((contest) => contest.id !== contestId)
      );
    }
  };

  const schedule = async (contestId, date, difficulty) => {
    const res = await contestApi.updateContest(contestId, {
      startDateTime: date,
      status: "scheduled",
      difficulty: difficulty,
    });
    if (res.success) {
      showSuccess("Contest scheduled successfully", res);
      setApprovedList((prev) =>
        prev.filter((contest) => contest.id !== contestId)
      );
      setScheduledList((prev) =>
        prev.concat(approvedList.filter((contest) => contest.id === contestId))
      );
    }
  };
  useEffect(() => {
    getContestList();
  }, []);

  return (
    <div>
      <Title title={`Pending Contests`} sub_title={`Accept/Reject Contests`} />

      {/* <ProblemAddButton onClick={openModal} /> */}

      <CardContainer col={2}>
        {pendingList.map((contest, index) => (
          <PendingContestCard
            key={index}
            idx={index + 1}
            id={contest.id}
            name={contest.title}
            isLive={contest.isLive}
            timestamp={contest.updatedAt}
            owner={contest.owner}
            status={contest.status}
            updatedAt={contest.updatedAt}
            reject={() => reject(contest.id)}
            approve={() => approve(contest.id)}
          />
        ))}
      </CardContainer>

      <Title title={`Approved Contests`} sub_title={`Schedule Contests`} />
      <CardContainer col={2}>
        {approvedList.map((contest, index) => (
          <ContestCard
            key={index}
            idx={index + 1}
            id={contest.id}
            name={contest.title}
            isLive={contest.isLive}
            timestamp={contest.updatedAt}
            owner={contest.owner}
            startDateTime={contest.startDateTime}
            duration={contest.duration}
            endDate={contest.endDate}
            status={contest.status}
            updatedAt={contest.updatedAt}
            schedule={schedule}
            // difficulty={contest.difficulty}
            // userID={userID}
          />
        ))}
      </CardContainer>

      <Title title={`Scheduled Contests`} sub_title={`Contests`} />
      <CardContainer col={2}>
        {scheduledList.map((contest, index) => (
          <ScheduledContestCard
            key={index}
            idx={index + 1}
            id={contest.id}
            name={contest.title}
            isLive={contest.isLive}
            timestamp={contest.updatedAt}
            owner={contest.owner}
            startDateTime={contest.startDateTime}
            duration={contest.duration}
            endDate={contest.endDate}
            status={contest.status}
            updatedAt={contest.updatedAt}
            difficulty={contest.difficulty}
            // userID={userID}
          />
        ))}
      </CardContainer>
    </div>
  );
};

export default AdminContests;
