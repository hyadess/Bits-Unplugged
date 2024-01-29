import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";
import Title from "../../components/Title";
import ProblemCard from "../../components/Cards/ProblemCard";
import TableContainer from "../../containers/TableContainer";
import { problemApi } from "../../api";
import PendingProblemCard from "../../components/Cards/PendingProblemCard";
import CardContainer from "../../containers/CardContainer2";
const AdminProblems = () => {
  const [problemList, setProblemList] = useState([]);
  const getProblemList = async () => {
    const res = await problemApi.getAllProblems();
    if (res.success) {
      setProblemList(res.data);
      console.log(res);
    }
  };

  useEffect(() => {
    getProblemList();
  }, []);
  return (
    <>
      <Title title={`Pending Problems`} sub_title={`Accept/Reject Problems`} />

      <CardContainer col={2}>
        {problemList &&
          problemList.map(
            (problem, index) =>
              problem.approvalStatus == 2 && (
                <PendingProblemCard
                  key={index}
                  idx={index + 1}
                  id={`Problem ${index + 1}`}
                  name={problem.title}
                  image={problem.logo}
                  path={`/admin/problems/${problem.id}`}
                  action="Get Started"
                  canvas={problem.canvas?.name}
                  timestamp={problem.updatedAt}
                />
              )
          )}
      </CardContainer>

      <Title
        title={`Approved Problems`}
        sub_title={`Add/Delete/Update Problems`}
      />

      <TableContainer>
        {problemList &&
          problemList.map(
            (problem, index) =>
              problem.approvalStatus == 1 && (
                <ProblemCard
                  key={index}
                  idx={index + 1}
                  id={`Problem ${index + 1}`}
                  name={problem.title}
                  image={problem.logo}
                  path={`/admin/problems/${problem.id}`}
                  action="Get Started"
                />
              )
          )}
      </TableContainer>
    </>
  );
};

export default AdminProblems;
