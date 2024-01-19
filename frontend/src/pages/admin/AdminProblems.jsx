import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";
import Title from "../../components/Title";
import ProblemCard from "../../components/Cards/ProblemCard";
import TableContainer from "../../containers/TableContainer";
import { problemApi } from "../../api";
const AdminProblems = () => {
  const [type, setType] = useState(-1);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState();
  const [problemList, setProblemList] = useState([]);
  const baseURL = "https";

  const getProblemList = async () => {
    const res = await problemApi.getAllProblems();
    if (res.success) {
      setProblemList(res.data);
      setLoading(false);
      console.log(res);
    }
  };

  useEffect(() => {
    const cookies = new Cookies();
    setType(localStorage.getItem("type"));
    getProblemList();
  }, []);
  return (
    <>
      <Title title={`Problems`} sub_title={`Add/Delete/Update Problems`} />

      {!loading && (
        <TableContainer>
          {problemList &&
            problemList.map((problem, index) => (
              <ProblemCard
                key={index}
                idx={index + 1}
                id={`Problem ${index + 1}`}
                name={problem.title}
                image={problem.logo}
                path={`/admin/problems/${problem.id}`}
                action="Get Started"
              />
            ))}
        </TableContainer>
      )}
    </>
  );
};

export default AdminProblems;
