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
import ProblemController from "../controller/problemController";
import SeriesController from "../controller/seriesController";
import { setLoading } from "../App";
import { TableContainer } from "@mui/material";
import ProblemCard from "../Components/Cards/ProblemCard";

const topicController = new TopicController();
const problemController = new ProblemController();
const seriesController = new SeriesController();

const AdminSeriesEditor = () => {
  const navigator = useNavigate();
  const switchPath = (pathname) => {
    navigator(pathname);
  };
  const [type, setType] = useState(-1);
  const { id } = useParams();
  const [series, setSeries] = useState([]);
  const [topicList, setTopicList] = useState([]);
  const [problemList, setProblemList] = useState([]);

  const handleChange = (prop) => (event) => {
    setSeries({ ...series, [prop]: event.target.value });
  };

  const getSeries = async () => {
    console.log(id);
    const res = await seriesController.getSeriesById(id);
    if (res.success) {
      setSeries(res.data[0]);
      setLoading(false);
    }
  };

  const getProblemList = async () => {
    const res = await seriesController.getAllProblems(id);
    if (res.success) {
      setProblemList(res.data);
      console.log(res.data);
    }
  };

  const getTopicList = async () => {
    const res = await topicController.getAllTopics();
    if (res.success) {
      const newArray = res.data.map((item) => ({
        value: item.topic_id,
        label: item.name,
      }));
      setTopicList(newArray);
    }
  };

  const handleSave = async () => {
    for (let i = 0; i < problemList.length - 1; i++) {
      for (let j = i + 1; j < problemList.length; j++) {
        if (
          problemList[i].serial_no !== 0 &&
          problemList[i].serial_no === problemList[j].serial_no
        ) {
          alert("Duplicate serial no.");
          return;
        }
      }
    }

    for (let i = 0; i < problemList.length; i++) {
      await problemController.updateSerial(
        problemList[i].problem_id,
        problemList[i].serial_no
      );
    }

    const res = await seriesController.updateSeries(id, series);
    if (res.success) {
      console.log(res);
    }
  };
  useEffect(() => {
    const cookies = new Cookies();
    setType(cookies.get("type"));
    getSeries();
    getProblemList();
    getTopicList();
  }, []);
  return (
    <>
      <Title title={series.name} sub_title={series.description} />
      <div className="flex flex-col gap-5">
        <TextField2
          label="Series Name"
          onChange={handleChange}
          value={series.name}
          id="name"
        />
        <TextField2
          label="Description"
          onChange={handleChange}
          value={series.description}
          id="description"
        />
        <TextField2
          label="Logo URL"
          onChange={handleChange}
          value={series.logo}
          id="logo"
        />
        <SelectionField2
          label="Topic"
          onChange={handleChange}
          id="topic_id"
          value={series.topic_id}
          options={topicList}
        />
        <div className="bu-bg-title text-white p-5 rounded-md text-3xl font-bold">
          Problems
        </div>
        <div className="flex flex-col gap-2">
          {problemList &&
            problemList.map((problem, index) => (
              <div className="flex flex-row items-center gap-5 justify-between">
                <div className="bu-text-primary text-2xl">{problem.title}</div>
                <input
                  label="Serial No"
                  value={problem.serial_no}
                  type="number"
                  className="bu-input-primary border sm:text-sm rounded-lg block p-2.5 text-center  placeholder-gray-400"
                  onChange={(e) => {
                    setProblemList((prevArray) => {
                      const newArray = [...prevArray];
                      newArray[index] = {
                        ...newArray[index],
                        serial_no: e.target.value,
                      };
                      return newArray;
                    });
                  }}
                />
                {/* <ProblemCard
                  idx={index + 1}
                  id={`Problem ${index + 1}`}
                  name={problem.title}
                  image={problem.logo}
                  path={`/admin/problems/${problem.problem_id}`}
                  action="Get Started"
                /> */}
              </div>
            ))}
        </div>
        <button
          className="text-white font-medium rounded-lg text-lg px-7 py-2 text-center bu-button-primary mt-5"
          onClick={handleSave}
        >
          Save
        </button>
      </div>
    </>
  );
};

export default AdminSeriesEditor;
