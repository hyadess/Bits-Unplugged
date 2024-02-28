import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";
import Title from "../../components/Title";
import ProblemCard from "../../components/Cards/ProblemCard";
import TableContainer from "../../containers/TableContainer";
import { problemApi, seriesApi, topicApi } from "../../api";
import PendingProblemCard from "../../components/Cards/PendingProblemCard";
import CardContainer from "../../containers/CardContainer2";
import ApprovedProblemCard from "../../components/Cards/ApprovedProblemCard";
import { setLoading, showSuccess } from "../../App";
import CustomModal from "../../components/Modal/CustomModal";
const AdminProblems = () => {
  const [pendingList, setPendingList] = useState([]);
  const [approvedList, setApprovedList] = useState([]);

  const [problemList, setProblemList] = useState([]);
  const [topicList, setTopicList] = useState([]);
  const [seriesList, setSeriesList] = useState([]);
  const [open, setOpen] = useState(false);
  const [problemId, setProblemId] = useState(null);
  const getProblemList = async () => {
    const res = await problemApi.getAllProblems();
    if (res.success) {
      setProblemList(res.data);

      setPendingList(
        res.data.filter((problem) => problem.approvalStatus === 2)
      );
      setApprovedList(
        res.data.filter((problem) => problem.approvalStatus === 1)
      );
      setLoading(false);
    }
  };

  const getTopicList = async () => {
    const res = await topicApi.getAllTopics();
    if (res.success) {
      setTopicList(res.data);
      console.log(res);
    }
  };

  const getSeriesList = async () => {
    const res = await seriesApi.getAllSeries();
    if (res.success) {
      setSeriesList(res.data);
      console.log(res);
    }
  };

  const approve = async (problemId) => {
    const res = await problemApi.approveProblem(problemId);
    if (res.success) {
      showSuccess("Problem approved", res);
      setApprovedList((prev) =>
        prev.concat(pendingList.filter((problem) => problem.id === problemId))
      );
      setPendingList((prev) =>
        prev.filter((problem) => problem.id !== problemId)
      );
    }
  };

  useEffect(() => {
    getProblemList();
    getSeriesList();
    getTopicList();
  }, []);

  return (
    <>
      <Title title={`Pending Problems`} sub_title={`Accept/Reject Problems`} />

      <CardContainer col={2}>
        {pendingList?.map((version, index) => (
          <PendingProblemCard
            key={index}
            idx={index + 1}
            id={version.id}
            name={version.title}
            image={version.logo}
            path={`/admin/problems/${version.id}`}
            action="Get Started"
            canvas={version.canvas?.name}
            timestamp={version.updatedAt}
            reject={() => {
              setProblemId(version.id);
              setOpen(true);
            }}
            approve={() => approve(version.id)}
            setter={version.problem.setter}
          />
        ))}
      </CardContainer>

      <Title
        title={`Approved Problems`}
        sub_title={`Add/Delete/Update Problems`}
      />

      <CardContainer col={2}>
        {approvedList?.map((problem, index) => (
          <ApprovedProblemCard
            key={index}
            idx={index + 1}
            id={problem.id}
            name={problem.title}
            image={problem.logo}
            problem={problem}
            path={`/admin/problems/${problem.id}`}
            canvas={problem.canvas?.name}
            timestamp={problem.updatedAt}
            topicList={topicList}
            seriesList={seriesList}
          />
        ))}
      </CardContainer>
      {open && (
        <CustomModal
          label={<b>Rejection Reason (Optional)</b>}
          placeholder={"Enter rejection reason"}
          onClose={() => setOpen(false)}
          onSubmit={async (value) => {
            const res = await problemApi.rejectProblem(problemId, value);
            setProblemId(null);
            setOpen(false);
            if (res.success) {
              showSuccess("Problem rejected", res);
              setPendingList((prev) =>
                prev.filter((problem) => problem.id !== problemId)
              );
            }
          }}
        />
      )}
    </>
  );
};

export default AdminProblems;
