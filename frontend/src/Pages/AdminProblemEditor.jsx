import React, { useState, useEffect } from "react";

import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

import Cookies from "universal-cookie";
import CustomCard from "../Components/Cards/CustomCard";
import CardContainer from "../Components/Containers/CardContainer";
import ProblemSetSeriesCard from "../Components/Cards/ProblemSetSeriesCard";
import Title from "../Components/Title";

import Layout4 from "../Components/Layouts/Layout4";
import AdminNavbar from "../Components/navbar/AdminNavbar";
import {
  SelectionField2,
  TextField,
  TextField2,
} from "../Components/InputFields";

import TopicController from "../controller/topicController";

import SeriesController from "../controller/seriesController";
import ProblemController from "../controller/problemController";
import { Switch } from "@mui/material";
const problemController = new ProblemController();
const topicController = new TopicController();
const seriesController = new SeriesController();

const AdminProblemEditor = () => {
  const navigator = useNavigate();
  const switchPath = (pathname) => {
    navigator(pathname);
  };
  const [type, setType] = useState(-1);
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [problem, setProblem] = useState([]);
  const [seriesList, setSeriesList] = useState([]);
  const handleChange = (prop) => (event) => {
    setProblem({ ...problem, [prop]: event.target.value });
  };
  const getProblem = async () => {
    console.log(id);
    const res = await problemController.getProblemById(id);
    if (res.success) {
      setProblem(res.data[0]);
      setLoading(false);
      console.log(res);
    }
  };

  const getSeriesList = async () => {
    const res = await seriesController.getAllSeries();
    if (res.success) {
      const newArray = res.data.map((item) => ({
        value: item.series_id,
        label: item.name,
      }));
      setSeriesList(newArray);
      setLoading(false);
      console.log(res);
    }
  };

  const handleSave = async () => {
    {
      const res = await problemController.updateSeries(id, problem.series_id);
      if (res.success) {
        setLoading(false);
        console.log(res);
      }
    }

    {
      const res = (await problem.is_live)
        ? problemController.publishProblem(id)
        : problemController.unpublishProblem(id);
      if (res.success) {
        setLoading(false);
        console.log(res);
      }
    }
  };

  useEffect(() => {
    const cookies = new Cookies();
    setType(cookies.get("type"));
    getProblem();
    getSeriesList();
  }, []);
  return (
    <Layout4 nav={<AdminNavbar />}>
      <Title title={problem.title} sub_title={""} />
      <div className="flex flex-col gap-5">
        {/* <TextField2
          label="Problem Name"
          onChange={handleChange}
          value={problem.name}
          id="name"
        />
        <TextField2
          label="Description"
          onChange={handleChange}
          value={problem.description}
          id="description"
        />
        <TextField2
          label="Logo URL"
          onChange={handleChange}
          value={problem.logo}
          id="logo"
        /> */}
        <SelectionField2
          label="Series"
          onChange={handleChange}
          id="series_id"
          value={problem.series_id}
          options={seriesList}
        />
        <div className="flex flex-row items-center">
          <h1 className="bu-text-primary">Live</h1>
          <Switch
            checked={problem.is_live}
            onChange={() => {
              setProblem((prevJson) => ({
                ...prevJson,
                is_live: !prevJson.is_live,
              }));
            }}
          />
        </div>

        <button
          className="text-white font-medium rounded-lg text-lg px-7 py-2 text-center bu-button-primary mt-5"
          onClick={handleSave}
        >
          Save
        </button>
      </div>
    </Layout4>
  );
};

export default AdminProblemEditor;
