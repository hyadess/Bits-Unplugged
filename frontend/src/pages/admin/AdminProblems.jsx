import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import CustomCard from "../../components/Cards/CustomCard";
import CardContainer from "../../components/Containers/CardContainer";
import Cookies from "universal-cookie";
import Title from "../../components/Title";
import TopicCard from "../../components/Cards/TopicCard";
import AdminNavbar from "../../components/navbar/AdminNavbar";
import Layout4 from "../../components/Layouts/Layout4";
import ProblemCard from "../../components/Cards/ProblemCard";
import TableContainer from "../../components/Containers/TableContainer";

import ProblemController from "../../controller/problemController";
const problemController = new ProblemController();

const AdminProblems = () => {
  const [type, setType] = useState(-1);
  const navigator = useNavigate();
  const switchPath = (pathname) => {
    navigator(pathname);
  };

  const [loading, setLoading] = useState(false);
  const [data, setData] = useState();
  const [problemList, setProblemList] = useState([]);
  const baseURL = "https";

  const getProblemList = async () => {
    const res = await problemController.getSubmittedProblems();
    if (res.success) {
      setProblemList(res.data);
      setLoading(false);
      console.log(res);
    }
  };

  useEffect(() => {
    const cookies = new Cookies();
    setType(cookies.get("type"));
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
                path={`/admin/problems/${problem.problem_id}`}
                action="Get Started"
              />
            ))}
        </TableContainer>
      )}
    </>
  );
};

export default AdminProblems;
