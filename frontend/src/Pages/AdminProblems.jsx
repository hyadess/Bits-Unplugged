import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import CustomCard from "../Components/Cards/CustomCard";
import CardContainer from "../Components/Containers/CardContainer";
import Cookies from "universal-cookie";
import Title from "../Components/Title";
import TopicCard from "../Components/Cards/TopicCard";
import AdminNavbar from "../Components/navbar/AdminNavbar";
import Layout4 from "../Components/Layouts/Layout4";
import ProblemCard from "../Components/Cards/ProblemCard";
import TableContainer from "../Components/Containers/TableContainer";

import ProblemController from "../controller/problemController";
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
    const res = await problemController.getAllProblems();
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
    <Layout4 nav={<AdminNavbar />}>
      <Title title={`Problems`} sub_title={`Add/Delete/Update Problems`} />

      {!loading && (
        <TableContainer>
          {problemList.map((problem, index) => (
            <ProblemCard
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
    </Layout4>
  );
};

export default AdminProblems;
